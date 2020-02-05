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
      // console.log(data);
    })
    .catch(err => console.log(err));
});

const cardGallery = document.getElementById("cardGallery");

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
  // fetch(`/api/v1/weather/snowdepth/${resortObj.lat}/${resortObj.lng}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  //   .then(snowdepthDataStream => snowdepthDataStream.json())
  //   .then(snowdepthDataObj => {
  //     console.log(snowdepthDataObj);
  //     console.log(resortObj);

  const cardTemplate = `
        <div class="ui accordion gallery-card">
          <div class="title">
            <div class="ui fluid card">
              <div class="ui content">
                <a class="titleBar header" id="${resortObj._id}">
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
                        <span id="temperature_${resortObj._id}"></span>
                      </div>
                      <div class="label">
                        Daytime Avg
                      </div>
                    </div>
                    <div class="ui divider"></div>
                    <div class="ui tiny horizontal statistic">
                      <div class="value">
                        <span id="snowdepth_${resortObj._id}">"</span>
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
                        ${resortObj.elevation_base}
                      </div>
                      <div class="label">
                        Base
                      </div>
                    </div>
                    <div class="ui mini statistic">
                      <div class="value">
                        ${resortObj.elevation_summit}
                      </div>
                      <div class="label">
                        Summit
                      </div>
                    </div>
                  </a>
                </div>
                <div class="content">
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
                    <div class="ui item toggle checkbox">
                      <input type="checkbox" name="favorite" data-resortid="${resortObj._id}" />
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

  // getAverageTemp(resortObj);

  $(".ui.accordion").accordion("refresh");
  $(".checkbox").checkbox("refresh");
  //     })
  //     .catch(err => console.log(err));
}

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
        .insertAdjacentHTML("beforeend", avgTemperature);

      // logic to determine if we should append sun icon
      const snowdepth = document.getElementById(`snowdepth_${resortObj._id}`);
      if (parseInt(snowdepth.innerText) > 20 && avgTemperature < 30) {
        document
          .getElementById(resortObj._id)
          .insertAdjacentHTML(
            "beforeend",
            '<i class="right floated sun outline icon"></i>'
          );
      }
    })
    .catch(err => console.log(err));
}

function addResort(resortId) {
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
$("body").on("click", ".checkbox > label", event => {
  console.log(event.target);
  console.log(event.target.previousElementSibling.checked);
  // console.log(event.target.previousElementSibling);
  let targetResortId = event.target.previousElementSibling.dataset.resortid;
  console.log(targetResortId);
  if (event.target.previousElementSibling.checked) {
    addResort(targetResortId);
  } else {
    removeResort(targetResortId);
  }
});

// ${snowdepthDataObj.response.periods[0].snowDepthIN}" --- SNOW DEPTH value; removed for testing
