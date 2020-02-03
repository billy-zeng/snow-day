console.log("maingallery JS connected...");

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
  const cards = resortsArr
    .map(resort => {
      return getTemplate(resort);
    })
    .join("");

  cardGallery.insertAdjacentHTML("beforeend", cards);
  $(".ui.accordion").accordion("refresh");
}

function getTemplate(resortObj) {
  return `
    <div class="ui styled accordion">
      <div class="title floated left">
        <i class="dropdown icon"></i>
        ${resortObj.name}
      </div>
      <div class="content">
        <p>${resortObj.address}</p>
        <p>${resortObj.phoneNumber}</p>
      </div>
    </div>
    `;
}

/* Semantic UI  */
$(".ui.accordion").accordion();
