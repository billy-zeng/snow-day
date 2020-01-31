console.log('maingallery JS connected...');

fetch('/api/v1/resorts', {
  method: 'GET'
})
  .then((dataStream) => dataStream.json())
  .then((dataObj) => console.log(dataObj))
  .catch((err) => console.log(err));

  