//———————————————————————— Variables ————————————————————————//

const logoutButton = document.getElementById("logout");
const cardGallery = document.getElementById("cardGallery");

//———————————————————————— Functions ————————————————————————//

// Fetch all resort data on page load
fetch("/api/v1/resorts", {
  method: "GET"
})
  .then(dataStream => dataStream.json())
  .then(dataObj => {
    render(dataObj.foundResorts);
  })
  .catch(err => console.log(err));

// Render resort card templates to the DOM
function render(resortsArr) {
  resortsArr.map(resort => {
    getTemplate(resort);
  });
}

// Generate card templates for each resort
function getTemplate(resortObj) {
  // Fetch recent snowdepth data 
  fetch(`/api/v1/weather/snowdepth/${resortObj.lat}/${resortObj.lng}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(snowdepthDataStream => snowdepthDataStream.json())
    .then(snowdepthDataObj => {
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

      // Append template to the DOM
      cardGallery.insertAdjacentHTML("beforeend", cardTemplate);
      // Set default toggle boxes
      setToggleBox(resortObj._id);
      // Get weather forecast data
      getAverageTemp(resortObj);
      // Refreshes for Semantic UI 
      $(".ui.accordion").accordion("refresh");
      $(".checkbox").checkbox("refresh");
    })
    .catch(err => console.log(err));
}

// calculates average daily temperature forecast for the upcoming week
function getAverageTemp(resortObj) {
  // Fetch weather forecast data
  fetch(`/api/v1/weather/temperature/${resortObj.lat}/${resortObj.lng}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(temperatureDataStream => temperatureDataStream.json())
    .then(temperatureDataObj => {
      let tempSum = 0;
      temperatureDataObj.response[0].periods.forEach(day => {
        tempSum += day.avgTempF;
      });
      const avgTemperature = Math.round(tempSum / 7);
      // Append average temperature value to the resort card template
      document.getElementById(`temperature_${resortObj._id}`).insertAdjacentHTML("afterbegin", avgTemperature);
      // logic to determine if we should append sun icon
      const snowdepth = document.getElementById(`snowdepth_${resortObj._id}`);
      if (parseInt(snowdepth.innerText) > 20 && avgTemperature < 35) {
        document.getElementById(`titleBar_${resortObj._id}`).insertAdjacentHTML("beforeend", '<i class="right floated sun outline icon"></i>');
      }
    })
    .catch(err => console.log(err));
}

// Sets toggle boxes of resorts that are already in user's userResort array to CHECKED
function setToggleBox(resortId){
  fetch('/api/v1/users/userResorts', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "credentials": "include"
    } 
  })
    .then((userResortsDataStream) => userResortsDataStream.json())
    .then((userResorts) => {
      const resortIdArr = userResorts.data.map((userResort) => {
        return userResort._id;
      })
      if(resortIdArr.includes(resortId)){
        $(`#toggleBox_${resortId}`).checkbox("check");
      }
    })
    .catch(err => console.log(err));
}

// Add resort to user's saved resorts
function addResort(resortId){
  fetch(`/api/v1/users/userResorts/${resortId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      credentials: "include"
    }
  })
    .catch(err => console.log(err));
}

// Remove resort from user's saved resorts
function removeResort(resortId) {
  fetch(`/api/v1/users/userResorts/${resortId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      credentials: "include"
    }
  })
    .catch(err => console.log(err));
}

//———————————————————————— Semantic UI ————————————————————————//

$(".ui.accordion").accordion();
$(".checkbox").checkbox("attach events", ".toggle.button");
$(".checkbox").checkbox("attach events", ".check.button", "check");
$(".checkbox").checkbox("attach events", ".uncheck.button", "uncheck");

//———————————————————————— Event Listeners ————————————————————————//

// Toggle box event listener
$("body").on("click", ".checkbox", event => {
  const $parent = $(event.target).closest(".gallery-card");
  const $checkbox = $parent.find('input')[0];
  // Add or remove resort depending on current state of toggle box
  if ($checkbox.checked) {
    addResort($parent.attr("id"));
  } else {
    removeResort($parent.attr("id"));
  }
});

// Logout button event listener
logoutButton.addEventListener("click", event => {
  fetch("/api/v1/users/logout", {
    method: "DELETE"
  })
    .then(dataStream => dataStream.json())
    .then(data => {
      if (data.status === 200) window.location = "/";
    })
    .catch(err => console.log(err));
});

