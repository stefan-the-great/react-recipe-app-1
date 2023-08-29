import React from "react";
import "./recipe.css";

const Recipe = ({url, image, title, source, calories, cuisineType, mealType, dishType}) => {
    return(
        <a className="recipeCard" href={url} >
            <img src={image} alt={title} />
            <div>
                <h1>{title}</h1>
                <p>Source: {source}<br/>{calories.toFixed(2)} calories</p>
            </div>
            <ol className="recipeCategories">
                <li>{cuisineType}</li>
                <li>{mealType}</li>
                <li>{dishType}</li>
            </ol>
        </a>
    )
};

export default Recipe;