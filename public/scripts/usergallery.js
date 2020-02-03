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
  const cards = resortsArr.map((resort) => {
    return getTemplate(resort);
  }).join('');

  cardGallery.insertAdjacentHTML('beforeend', cards);
};

function getTemplate(resortObj) {
  return `
    <p>${resortObj.name}</p>
    <p>${resortObj.address}</p>
    <p>${resortObj.phoneNumber}</p>
    <p>${resortObj.reviews[0].comment}</p>
  `
}