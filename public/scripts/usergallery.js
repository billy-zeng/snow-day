//———————————————————————— Variables ————————————————————————//

const logoutButton = document.getElementById("logout");
const cardGallery = document.getElementById("cardGallery");

//———————————————————————— Functions ————————————————————————//

// On page load, check to see if a user is logged in
fetch("/api/v1/verify", {
  method: "GET"
})
  .then(response => {
    if (response.status === 200) {
      displayUserResorts();
    } else {
      displayErrorMessage();
    }
  })
  .catch(err => console.log(err));

// Display error message if user is not logged in
function displayErrorMessage() {
  cardGallery.insertAdjacentHTML(
    "afterbegin",
    `
    <section class="credentials">
      <section class="logoblock">
        <h1>SnowDay<i class="snowflake outline icon"></i></h1>
      </section>
      <div class="ui segment">
        <p>
          You must be logged in to view your personalized list of resorts.
        </p>
      </div>
      <div class="ui two item menu">
        <a class="ui item" href="signup">Sign Up</a>
        <a class="ui item" href="login">Log In</a>
      </div>
    </section>`
  );
}

// Fetch user resorts data
function displayUserResorts() {
  fetch("/api/v1/users/userResorts", {
    method: "GET",
    headers: {
      credentials: "include"
    }
  })
    .then(dataStream => dataStream.json())
    .then(dataObj => {
      render(dataObj.data);
    })
    .catch(err => console.log(err));
}

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
                    <div class="ui item toggle checkbox checked">
                      <input type="checkbox" name="favorite" data-resortid="${resortObj._id}" checked/>
                      <label class="favorite">Favorite</label>
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
      document
        .getElementById(`temperature_${resortObj._id}`)
        .insertAdjacentHTML("afterbegin", avgTemperature);
      // logic to determine if we should append sun icon
      const snowdepth = document.getElementById(`snowdepth_${resortObj._id}`);
      if (parseInt(snowdepth.innerText) > 20 && avgTemperature < 30) {
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

// Remove resort from user's saved resorts
function removeResort(resortId) {
  fetch(`/api/v1/users/userResorts/${resortId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      credentials: "include"
    }
  }).catch(err => console.log(err));
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
  const $targetResort = $parent.attr("id");
  $("#theModal").modal("show");
  $("#theModal").data("resort", $targetResort);
});

// Modal cancel button event listener
$("body").on("click", ".cancel", () => {
  let $card = $("#theModal").data("resort");
  $(`#${$card} .checkbox`).checkbox("check");
  $(".ui.modal").modal("hide");
});

// Modal confirm button event listener
$("body").on("click", ".approve", () => {
  let $card = $("#theModal").data("resort");
  removeResort($card);
  $(`#${$card}`).remove();
  $(".ui.modal").modal("hide");
});

// Logout button event listener
logoutButton.addEventListener("click", event => {
  fetch("/api/v1/users/logout", {
    method: "DELETE"
  })
    .then(dataStream => dataStream.json())
    .then(data => {
      if (data.status === 200) {
        window.location = "/";
      }
    })
    .catch(err => console.log(err));
});
