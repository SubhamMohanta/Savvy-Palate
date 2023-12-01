const randomCard=document.getElementById("random-food")
const footerRandomCard=document.getElementById("footer-random-food")
const ingredeintsCard=document.getElementById("ing")
const recipebutton=document.querySelector(".recipe-btn")
const recipeCard=document.getElementById("texting")

randomCard.onclick=()=>{
    ingredeintsCard.classList.remove("hide")
}
ingredeintsCard.onclick=()=>{
    ingredeintsCard.classList.add("hide")
}

function randomFood(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((data)=>{
        return data.json();
    }).then((completeData)=>{
        let random='';
        let random2='';
        random=`<div class="food-card">
            <div id="food-card-inner">                    
                <div>
                    <img id="generated"src=${completeData.meals[0].strMealThumb} alt="">
                </div>
                <div id="real-image">
                    <img id="generated-1"src=${completeData.meals[0].strMealThumb} alt="">
                </div>
                <div id="random-meal-text">
                <h2>${completeData.meals[0].strMeal}</h2>
                </div>
                
            </div>
        </div>`
        random2=`<div class="ingredeints">
                    <h3>${completeData.meals[0].strMeal}</h3>
                    <h3>Category</h3>
                    <h3>${completeData.meals[0].strCategory}</h3>
                    <h3>ingredeints</h3>
                    <p>${completeData.meals[0].strIngredient1} <br> 
                    ${completeData.meals[0].strIngredient2} <br>
                    ${completeData.meals[0].strIngredient3} <br>
                    ${completeData.meals[0].strIngredient4} <br>
                    ${completeData.meals[0].strIngredient5} <br>
                    ${completeData.meals[0].strIngredient6} <br>
                    ${completeData.meals[0].strIngredient7} <br>
                    ${completeData.meals[0].strIngredient8} <br>
                    ${completeData.meals[0].strIngredient9} <br>
                    ${completeData.meals[0].strIngredient10}</p>
                </div>`;

    document.getElementById("random-food").innerHTML=random;
    document.getElementById("ing").innerHTML=random2;

    }).catch((error)=>{
        console.log(error)
    })
}

randomFood()


var search=document.getElementById("searchBox")
function SearchedFood(){
    document.getElementById("searchheading").classList.remove("hide")
    var input=search.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`)
    .then((data)=>{
        return data.json();

    }).then((completeData)=>{
        let random='';
        if(completeData.meals){
                completeData.meals.forEach((meal)=>{
                random+=`<div class="food-card" data-id="${meal.idMeal}">
                <div id="food-card-inner">  
                <div>
                    <img id="generated-2"src=${meal.strMealThumb} alt="">
                </div>
                <div id="real-image">
                <img id="generated-3"src=${meal.strMealThumb} alt="">
                </div>
                <div id="random-meal-text">
                <h2>${meal.strMeal}</h2>
                </div>
                <h3 id="recipe-btn" onClick="getMealRecipe(${meal.idMeal})">Get Recipe</h3>
                </div>
                </div>`
        })
        }
        else{
                random= `<h3 class="notfound">Category "${input}" Not Found</h3>`
            }
    document.getElementById("searched-food").innerHTML=random;
    }).catch((error)=>{
        console.log(error)
    })
    }


    function getMealRecipe(e){
            fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+e)
            .then(response => response.json())
            .then((meal)=>{
                meal= meal.meals[0];
                document.getElementById("texting").innerHTML=`<div class="Recipe">
                <h3>${meal.strMeal}</h3>
                <img src=${meal.strMealThumb} >
                <h3>Category</h3>
                <p>${meal.strCategory}</p>   
                <h3>Ingredeints</h3>
                <p>${meal.strIngredient1} &nbsp ${meal.strIngredient2} &nbsp ${meal.strIngredient3}
                <br>${meal.strIngredient4} &nbsp ${meal.strIngredient5} &nbsp ${meal.strIngredient6} &nbsp ${meal.strIngredient7}
                <br>${meal.strIngredient8} &nbsp ${meal.strIngredient9} &nbsp ${meal.strIngredient10}</p>
                <div id="closeRecipe">Close</div>
            </div>`;
                
                document.querySelector(".recipeDiv").style.display ="block"
                document.getElementById("closeRecipe").onclick=()=>{
                    document.querySelector(".recipeDiv").style.display ="none"
                }
            });
        }

document.getElementById("searchBox").addEventListener("keydown",(e)=>{
    if(e.code=="Enter"){
        SearchedFood()
    }
})