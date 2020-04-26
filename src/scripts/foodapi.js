// Create a function which returns a string template. The template is the
// HTML representation for a food item.
// Create a function that inserts an HTML representation of a food into the DOM
fetch("http://localhost:8088/food")
  .then((foods) => foods.json())
  .then((parsedFoods) => {
    parsedFoods.forEach((food) => {
      const foodAsHTML = foodFactory(food);
      addFoodToDom(foodAsHTML);
    });
  });

// debugger;
function foodFactory(thing) {
  return `
  <div class="children">
    <h1>${thing.name}</h1>
    <p>${thing.category}</p>
    <p>${thing.ethnicity}</p>
  </div>
  `;
}

function addFoodToDom(item) {
  let foodEl = document.querySelector(".foodList");
  foodEl.innerHTML += item;
}
