fetch("http://localhost:8088/food")
  .then((response) => response.json())
  .then((myParsedFoods) => {
    myParsedFoods.forEach((food) => {
      fetch(
        `https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`
      )
        .then((response) => response.json())
        .then((productInfo) => {
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
          if (productInfo.product.nutriments["energy-kcal"]) {
            food.kcal = productInfo.product.nutriments["energy-kcal"];
          } else {
            food.kcal = "Content not available";
          }
          if (productInfo.product.nutriments.fat) {
            food.fat = productInfo.product.nutriments.fat;
          } else {
            food.fat = "Content not available";
          }
          if (productInfo.product.nutriments.sugars) {
            food.sugar = productInfo.product.nutriments.sugars;
          } else {
            food.sugar = "Content not available";
          }

          const foodAsHTML = foodFactory(food);
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
    <p>Calories Per Serving: ${thing.kcal}</p>
    <p>Fats Per Serving: ${thing.fat}</p>
    <p>Sugars Per Serving: ${thing.sugar}</p>
    <p>Available in: ${thing.country}</p>
  </div>
  `;
}

function addFoodToDom(item) {
  document.querySelector(".foodList").innerHTML += item;
}
