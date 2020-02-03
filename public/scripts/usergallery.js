console.log('usergallery JS connected...');

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
  `
}