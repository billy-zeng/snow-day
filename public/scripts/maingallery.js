console.log("maingallery JS connected...");

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", event => {
  fetch("/api/v1/users/logout", {
    method: "DELETE"
  })
    .then(dataStream => dataStream.json())
    .then(data => {
      if (data.status === 200) {
        window.location = "/";
      } else console.log(data);
    })
    .catch(err => console.log(err));
});

const cardGallery = document.getElementById("cardGallery");

// fetch to get all resort data
fetch("/api/v1/resorts", {
  method: "GET"
})
  .then(dataStream => dataStream.json())
  .then(dataObj => {
    console.log(dataObj);
    render(dataObj.foundResorts);
  })
  .catch(err => console.log(err));

function render(resortsArr) {
  resortsArr.map(resort => {
    getTemplate(resort);
  });
}

function getTemplate(resortObj) {
  fetch(`/api/v1/weather/snowdepth/${resortObj.lat}/${resortObj.lng}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(snowdepthDataStream => snowdepthDataStream.json())
    .then(snowdepthDataObj => {
      console.log(snowdepthDataObj);
      console.log(resortObj);

      // break this out into another function?
      const cardTemplate = `
        <div id="${resortObj._id}" class="ui accordion gallery-card">
          <div class="title">
            <div class="ui fluid card">
              <div class="ui content">
                <a class="titleBar header" id="titleBar_${resortObj._id}">
                  <i class="snowflake icon"> </i>${resortObj.name}
                </a>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="resort-info">
              <div class="ui card fluid">
                <div class="content">
                  <a class="ui centered header">
                    <div class="ui tiny horizontal statistic">
                      <div class="value">
                        <span id="temperature_${resortObj._id}">˚</span>
                      </div>
                      <div class="label">
                        Daytime Avg
                      </div>
                    </div>
                    <div class="ui divider"></div>
                    <div class="ui tiny horizontal statistic">
                      <div class="value">
                        <span id="snowdepth_${resortObj._id}">${snowdepthDataObj.response.periods[0].snowDepthIN}"</span>
                      </div>
                      <div class="label">
                        Snow Depth
                      </div>
                    </div>
                  </a>
                  <div class="ui divider"></div>
                  <a class="ui centered header">
                    <div class="ui mini statistic">
                      <div class="value">
                        ${resortObj.lifts}
                      </div>
                      <div class="label">
                        Lifts
                      </div>
                    </div>
                    <div class="ui mini statistic">
                      <div class="value">
                        ${resortObj.runs}
                      </div>
                      <div class="label">
                        Runs
                      </div>
                    </div>
                    <div class="ui mini statistic">
                      <div class="value">
                        ${resortObj.elevation_base}"
                      </div>
                      <div class="label">
                        Base
                      </div>
                    </div>
                    <div class="ui mini statistic">
                      <div class="value">
                        ${resortObj.elevation_summit}"
                      </div>
                      <div class="label">
                        Summit
                      </div>
                    </div>
                  </a>
                </div>
                <div class="content" id="content_${resortObj._id}">
                  <div class="ui stackable four item menu">
                    <a class="item" href="${resortObj.mainWebsite}"
                      ><i class="linkify icon"></i>Website</a
                    >
                    <a
                      class="item"
                      href="${resortObj.ticketWebsite}"
                      ><i class="linkify icon"></i>Tickets</a
                    >
                    <a class="item" href="${resortObj.phoneNumber}"
                      ><i class="phone square icon"></i>${resortObj.phoneNumber}</a
                    >
                    <div class="ui item toggle checkbox checked" id="toggleBox_${resortObj._id}">
                      <input type="checkbox" name="favorite" data-resortid="${resortObj._id}" id="checkbox_${resortObj._id}" />
                      <label>Favorite</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      cardGallery.insertAdjacentHTML("beforeend", cardTemplate);
      setToggleBox(resortObj._id);

      getAverageTemp(resortObj);

      $(".ui.accordion").accordion("refresh");
      $(".checkbox").checkbox("refresh");
    })
    .catch(err => console.log(err));
}

// calculates average daily temperature forecast for the upcoming week
function getAverageTemp(resortObj) {
  fetch(`/api/v1/weather/temperature/${resortObj.lat}/${resortObj.lng}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(temperatureDataStream => temperatureDataStream.json())
    .then(temperatureDataObj => {
      console.log(temperatureDataObj);
      let tempSum = 0;
      temperatureDataObj.response[0].periods.forEach(day => {
        tempSum += day.avgTempF;
      });
      const avgTemperature = Math.round(tempSum / 7);
      document
        .getElementById(`temperature_${resortObj._id}`)
        .insertAdjacentHTML("afterbegin", avgTemperature);

      // logic to determine if we should append sun icon
      const snowdepth = document.getElementById(`snowdepth_${resortObj._id}`);
      if (parseInt(snowdepth.innerText) > 20 && avgTemperature < 35) {
        document
          .getElementById(`titleBar_${resortObj._id}`)
          .insertAdjacentHTML(
            "beforeend",
            '<i class="right floated sun outline icon"></i>'
          );
      }
    })
    .catch(err => console.log(err));
}

// sets toggle boxes of resorts that are already in user's userResort array to CHECKED
function setToggleBox(resortId){
  console.log(resortId);
  fetch('/api/v1/users/userResorts', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "credentials": "include"
    } 
  })
    .then((userResortsDataStream) => userResortsDataStream.json())
    .then((userResorts) => {
      console.log(userResorts.data);
      const resortIdArr = userResorts.data.map((userResort) => {
        return userResort._id;
      })
      console.log(resortIdArr);

      if(resortIdArr.includes(resortId)){
        // document.getElementById(`toggleBox_${resortId}`).classList.add('checked');
        // document.getElementById(`checkbox_${resortId}`).setAttribute('checked', "");
        $(`#toggleBox_${resortId}`).checkbox("check");

        console.log(resortId);
      } else {
        console.log("not in this user's resorts")
      }
    })
    .catch(err => console.log(err));
}

// adds resort to user's saved resorts
function addResort(resortId){
  fetch(`/api/v1/users/userResorts/${resortId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      credentials: "include"
    }
  })
    .then(updatedUser => updatedUser.json())
    .then(updatedUserObj => console.log(updatedUserObj))
    .catch(err => console.log(err));
}

function removeResort(resortId) {
  fetch(`/api/v1/users/userResorts/${resortId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      credentials: "include"
    }
  })
    .then(updatedUser => updatedUser.json())
    .then(updatedUserObj => console.log(updatedUserObj))
    .catch(err => console.log(err));
}

/* Semantic UI  */
$(".ui.accordion").accordion();
$(".checkbox").checkbox("attach events", ".toggle.button");
$(".checkbox").checkbox("attach events", ".check.button", "check");
$(".checkbox").checkbox("attach events", ".uncheck.button", "uncheck");

// $("body").on("click", ".checkbox > label", event => {
//   console.log(event.target);
//   console.log(event.target.previousElementSibling.checked);
//   // console.log(event.target.previousElementSibling);
//   let targetResortId = event.target.previousElementSibling.dataset.resortid;
//   console.log(targetResortId);
//   if (event.target.previousElementSibling.checked) {
//     addResort(targetResortId);
//   } else {
//     removeResort(targetResortId);
//   }
// });

$("body").on("click", ".checkbox", event => {
  const $parent = $(event.target).closest(".gallery-card");
  const $checkbox = $parent.find('input')[0];
  const $labelParent = $(event.target).parent("div");
  // console.log($parent);
  // console.log($parent.attr("id"));
  // console.log($checkbox);
  console.log(event.target)
  console.log($checkbox.checked)
  // if (!event.target.checked || !$labelParent.checked) {

  if ($checkbox.checked) {
    // console.log($parent.attr("id"));
    addResort($parent.attr("id"));
  } else {
    removeResort($parent.attr("id"));
  }
});

// ${snowdepthDataObj.response.periods[0].snowDepthIN}" --- SNOW DEPTH value; removed for testing
