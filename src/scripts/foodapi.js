// List the following additional information.

// Calories per serving
// Fat per serving
// Sugar per serving

fetch("http://localhost:8088/food")
  .then((response) => response.json())
  .then((myParsedFoods) => {
    myParsedFoods.forEach((food) => {
      fetch(
        `https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`
      )
        .then((response) => response.json())
        .then((productInfo) => {
          // debugger;
          if (productInfo.product.ingredients_text) {
            food.ingredients = productInfo.product.ingredients_text;
          } else {
            food.ingredients = "No ingredients listed";
          }
          if (productInfo.product.countries) {
            food.country = productInfo.product.countries;
          } else {
            food.country = "No countries listed";
          }
          if (productInfo.product["nutriment_energy-kcal-tr"]) {
            food.kcal = productInfo.product["nutriment_energy-kcal-tr"];
          } else {
            food.kcal = "Content not available";
          }
          if (productInfo.product.nutriment_label["fat"]) {
            food.fat = productInfo.product.nutriment_label["fat"];
          } else {
            food.fat = "Content not available";
          }
          if (productInfo.product.sugar) {
            food.sugar = productInfo.product.sugar;
          } else {
            food.sugar = "Content not available";
          }

          // Produce HTML representation
          const foodAsHTML = foodFactory(food);

          // Add representaiton to DOM
          addFoodToDom(foodAsHTML);
        });
    });
  });

function foodFactory(thing) {
  return `
  <div class="children">
    <h1>${thing.name}</h1>
    <p>Origin: ${thing.origin}</p>
    <p>Category: ${thing.category}</p>
    <p>Ingredients: ${thing.ingredients}</p>
    <p>Calories: ${thing.kcal}</p>
    <p>Fats: ${thing.fat}</p>
    <p>Sugars: ${thing.sugar}</p>
    <p>Available in: ${thing.country}</p>
  </div>
  `;
}

function addFoodToDom(item) {
  let foodEl = document.querySelector(".foodList");
  foodEl.innerHTML += item;
}
