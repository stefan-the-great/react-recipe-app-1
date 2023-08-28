import React from "react";
import style from "./Recipe.module.css"

const Recipe = (props) => {
    return(
        <a className={style.recipeCard} href={props.url} >
            <img src={props.image} alt={props.title} />
            <div>
                <h1>{props.title}</h1>
                <p>Source: {props.source}<br/>{props.calories.toFixed(2)} calories</p>
            </div>
            <ol className="recipeCategories">
                <li>{props.cuisineType}</li>
                <li>{props.mealType}</li>
                <li>{props.dishType}</li>
            </ol>
        </a>
    )
};

export default Recipe;