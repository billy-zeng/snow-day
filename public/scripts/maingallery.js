console.log('maingallery JS connected...');

// const logoutButton = document.getElementById('logout');

// logoutButton.addEventListener('click', (event) => {
//   event.preventDefault();
//   fetch('/api/v1/users/logout', {
//     method: 'DELETE'
//   })
//     .then((dataStream) => dataStream.json())
//     .then((data) => {
//       if(data.status === 200){
//         window.location = '/homepage';
//       } else console.log(data);
//     })
//     .catch((err) => console.log(err));
// });

const cardGallery = document.getElementById('cardGallery');

fetch('/api/v1/resorts', {
  method: 'GET'
})
  .then((dataStream) => dataStream.json())
  .then((dataObj) => {
    console.log(dataObj);
    render(dataObj.foundResorts);
  })
  .catch((err) => console.log(err));

function render(resortsArr) {
  resortsArr.map((resort) => {
    getTemplate(resort);
  });
};

// function getTemplate(resortObj) {
//  fetch(`/api/v1/resorts/${resortObj.lat}/${resortObj.lng}`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//     }
//   })
//     .then((snowdepthDataStream) => snowdepthDataStream.json())
//     .then((snowdepthDataObj) => {
//       console.log(snowdepthDataObj);
//       console.log(resortObj);
//       const cardTemplate = `
//       <p>${resortObj.name}</p>
//       <p>${resortObj.address}</p>
//       <p>${resortObj.phoneNumber}</p>
//       <p>Estimated snow depth: ${snowdepthDataObj.response.periods[0].snowDepthIN}</p>
//     `
//       cardGallery.insertAdjacentHTML('beforeend', cardTemplate);
//     })
//     .catch((err) => console.log(err));
// };

function getTemplate(resortObj) {
  fetch(`/api/v1/resorts/${resortObj.lat}/${resortObj.lng}`, {
     method: 'GET',
     headers: {
       "Content-Type": "application/json",
     }
   })
     .then((snowdepthDataStream) => snowdepthDataStream.json())
     .then((snowdepthDataObj) => {
       console.log(snowdepthDataObj);
       console.log(resortObj);
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
                <a class="header">
                  <p id="weather">*<span id="temperature_${resortObj._id}>Forecast: </span>* | *Snow Pack: ${snowdepthDataObj.response.periods[0].snowDepthIN}in *</p>
                </a>
                <div class="ui divider"></div>
                <p id="elevation">Base ${resortObj.elevation_base} | Summit ${resortObj.elevation_summit}</p>
                <div class="ui divider"></div>
                <p id="lifts">${resortObj.lifts} Lifts | ${resortObj.runs} Runs</p>
              </div>
              <div class="content">
                <div class="ui stackable three item menu">
                  <a class="item" href="${resortObj.mainWebsite}"
                    ><i class="linkify icon"></i>Website</a
                  >
                  <a
                    class="item"
                    href="${resortObj.ticketWebsite}"
                    ><i class="linkify icon"></i>Tickets</a
                  >
                  <a class="item" href="tel:${resortObj.phoneNumber}"
                    ><i class="phone square icon"></i>${resortObj.phoneNumber}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
     `
      cardGallery.insertAdjacentHTML('beforeend', cardTemplate);
      

      // logic to determine if we should append sun icon
      // if (snowdepthDataObj.response.periods[0].snowDepthIN > 20){
      //   document.getElementById(resortObj._id).insertAdjacentHTML('beforeend', '<i class="right floated sun outline icon"></i>');
      // }

      $('.ui.accordion').accordion('refresh');
     })
     .catch((err) => console.log(err));
 };

// function getAverageTemp(resortObj) {
//    fetch(`/api/v1/resorts/temperature/${resortObj.lat}/${resortObj.lng}`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//     }
//   })
//     .then((temperatureDataStream) => temperatureDataStream.json())
//     .then((temperatureDataObj) => {
//       console.log(temperatureDataObj);
//     })
//     .catch((err) => console.log(err));
// }

/* Semantic UI  */
$(".ui.accordion").accordion();
