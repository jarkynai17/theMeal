//  DOM
const categories = document.querySelector(".categories")
const categories2 = document.querySelector(".categories2")
const searchInput = document.querySelector("#search")
const searchDIV = document.querySelector(".search")


// REST API
const BASE_URL = "https://www.themealdb.com/api/json/v1/1"
const foodApi = {
  categories: "/categories.php",
  filterCategory:"/filter.php?c=",
  searchByName: "/search.php?s="
}
searchInput.onchange = ()=> {
    searchFood(searchInput.value)
}
async function searchFood(name){
    const res = await fetch(BASE_URL + foodApi.searchByName + name)
    const data = await res.json()
    console.log(data,'---data---');
    if(data.meals === null){
        searchDIV.innerHTML = `<h1 class="text-center text-light" >No Food Found!<h1/>`
         return
        }
    for (const ct of data.meals) {
        searchDIV.innerHTML +=   `
        <div class="card" style="width: 18rem;">
          <img   src="${ct.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title text-center">${ct.strMeal}</h5>
          </div>
        </div>`
      }
}
// then = async
async function fetchCategories() {
  const res = await fetch(BASE_URL + foodApi.categories)
  const { categories } = await res.json()
  console.log(categories);
  renderCategories(categories)
}
fetchCategories()

function renderCategories(data) {
  for (const ct of data.slice(0, 12)) {
    categories.innerHTML += `
    <div class="card" style="width: 18rem;">
      <img onclick="getCategory(event)" data-name="${ct.strCategory}"  src="${ct.strCategoryThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">${ct.strCategory}</h5>
      </div>
    </div>`
  }
}
function getCategory(event) {
  const categoryName = event.target.getAttribute("data-name");
  
  fetchCategoryByName(categoryName)
  const section = document.getElementById("foods")
  const ctName = document.getElementById("ct-name")
  ctName.innerText = categoryName
  section.scrollIntoView({
    behavior: 'smooth'
  })
}
 async function fetchCategoryByName(name){
    const res = await fetch(BASE_URL + foodApi.filterCategory + name)
    const {meals} = await res.json()
    renderCategories2(meals)
}


function renderCategories2(data) {
    categories2.innerHTML = ""
    for (const ct of data) {
      categories2.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img   src="${ct.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center">${ct.strMeal}</h5>
        </div>
      </div>`
    }
  }

