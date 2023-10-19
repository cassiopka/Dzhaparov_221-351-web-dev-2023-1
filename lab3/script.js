function showIngredients() {
  let dishSelect = document.getElementById("dishSelect");
  let ingredientsSection = document.getElementById("ingredientsSection");
  let ingredientsList = document.getElementById("ingredientsList");

  // Очищаем список ингредиентов
  ingredientsList.innerHTML = "";

  // Получаем выбранное значение из списка блюд
  let selectedDish = dishSelect.value;

  // Проверяем выбранное значение и выводим соответствующие ингредиенты
  if (selectedDish === "1") {
    ingredientsList.innerHTML += "<li>Креветки</li>";
    ingredientsList.innerHTML += "<li>Кукурузный крахмал</li>";
    ingredientsList.innerHTML += "<li>Яйцо</li>";
    ingredientsList.innerHTML += "<li>Соль</li>";
    ingredientsList.innerHTML += "<li>Перец</li>";
    ingredientsList.innerHTML += "<li>Растительное масло</li>";
  } else if (selectedDish === "2") {
    ingredientsList.innerHTML += "<li>Лапша</li>";
    ingredientsList.innerHTML += "<li>Говядина</li>";
    ingredientsList.innerHTML += "<li>Морковь</li>";
    ingredientsList.innerHTML += "<li>Лук</li>";
    ingredientsList.innerHTML += "<li>Чеснок</li>";
    ingredientsList.innerHTML += "<li>Соевый соус</li>";
    ingredientsList.innerHTML += "<li>Острый перец</li>";
    ingredientsList.innerHTML += "<li>Растительное масло</li>";
  } else if (selectedDish === "3") {
    ingredientsList.innerHTML += "<li>Курица</li>";
    ingredientsList.innerHTML += "<li>Арахисы</li>";
    ingredientsList.innerHTML += "<li>Перец чили</li>";
    ingredientsList.innerHTML += "<li>Чеснок</li>";
    ingredientsList.innerHTML += "<li>Соевый соус</li>";
    ingredientsList.innerHTML += "<li>Рисовый уксус</li>";
    ingredientsList.innerHTML += "<li>Сахар</li>";
    ingredientsList.innerHTML += "<li>Растительное масло</li>";
  } else {
    ingredientsList.innerHTML = "<li>Выберите блюдо, чтобы увидеть ингредиенты</li>";
  }
}