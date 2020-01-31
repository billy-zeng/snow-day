console.log('maingallery JS connected...');

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
