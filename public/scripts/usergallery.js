console.log('usergallery JS connected...');

// const logoutButton = document.getElementById('logoutButton');

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

const currentUserId = "5e34ac0393955c298bfddf1f"

fetch(`/api/v1/users/${currentUserId}`, {
  method: 'GET'
})
  .then((dataStream) => dataStream.json())
  .then((dataObj) => {
    console.log(dataObj.data.userResorts);
    render(dataObj.data.userResorts);
  })
  .catch((err) => console.log(err));

function render(resortsArr) {
  resortsArr.map((resort) => {
    getTemplate(resort);
  });
};

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
       <p>${resortObj.name}</p>
       <p>${resortObj.address}</p>
       <p>${resortObj.phoneNumber}</p>
       <p>Estimated snow depth: ${snowdepthDataObj.response.periods[0].snowDepthIN}</p>
     `
       cardGallery.insertAdjacentHTML('beforeend', cardTemplate);
     })
     .catch((err) => console.log(err));
 };