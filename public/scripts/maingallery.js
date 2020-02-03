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

// fetch('https://api.aerisapi.com/winter/snowdepth/45.37,-121.7?client_id=Zc6ukuD2NZWLcVQhjTnKx&client_secret=WtzA8Yipil9TNFiwtuvck2TTu1NeLUTZwAs8GsCG/v1/resorts', {
//   method: 'GET',
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   }
// })
//   .then((weatherDataStream) => console.log(weatherDataStream))
//   // .then((weatherDataObj) => {
//   //   console.log(weatherDataObj);
//   //   // render(dataObj.foundResorts);
//   // })
//   .catch((err) => console.log(err));

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
