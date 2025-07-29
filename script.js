const searchBox=document.querySelector('#form-input');
const searchbutton=document.querySelector('.search-btn');
const RecipeContainer=document.querySelector('.recipeContainer');
const RecipeDetailsConatiner=document.querySelector('.recipeDetailsContainer');
const coloseBtn=document.querySelector('.recipe-close-btn');
const recipeDetails=document.querySelector('.recipe-details');


const fetchRecipe=async (value)=>{
    RecipeContainer.innerHTML="<h2>Fetching receipe...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        const response= await data.json(); 
        RecipeContainer.innerHTML="";
        response.meals.forEach(meal=> {
        const recipediv=document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML=`
        <img src="${meal.strMealThumb}"></img>
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish</p>
        <p>${meal.strCategory} Catgory</p>
        
        `
        const button=document.createElement("button")
        button.textContent="View Recipe";
        recipediv.appendChild(button);

        button.addEventListener('click',()=>{
            RecipePopup(meal);
             
        })

        coloseBtn.addEventListener('click',()=>{
            RecipeDetailsConatiner.style.display="none";
        })
        
        RecipeContainer.appendChild(recipediv);
        });  
    } catch (error) {
        RecipeContainer.innerHTML="<h2>Error in fetching Recipes</h2>";
    }
    
}

searchbutton.addEventListener('click',function(e){
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        RecipeContainer.innerHTML=`<h3>Please Type a Meal</h3>`;
        return;
    }
    fetchRecipe(searchInput);
})

const RecipePopup=(meal)=>{
    recipeDetails.innerHTML=`
        <h3>${meal.strMeal}</h3>
        <h4>Ingridents</h4>
        <ul>${fetchIngridents(meal)}</ul>
        <h4>Instructions</h4>
        <p>${meal.strInstructions}</p>
    `
    
    recipeDetails.parentElement.style.display="block"; 
     
}
const fetchIngridents=(meal)=>{
    
    let ingridentlist="";
    for (let i = 1; i <=20 ; i++) {
       const ingrident=meal[`strIngredient${i}`];
    
        if(ingrident){
            const measure=meal[`strMeasure${i}`];
            ingridentlist+=`<li>${measure} ${ingrident}</li>`
        }
        else{
            break;
        }

    }
    return ingridentlist;
}
