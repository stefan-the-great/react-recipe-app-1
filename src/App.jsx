import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './components/Recipe';
import Header from './components/Header';
import Search from './components/Search';

const App = () => {

  const APP_ID = 'd20946cf';
  const APP_KEY = 'bf0fbbbc7230ee42fae6feb291a872af';

  // const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [resultStatus, setResultStatus] = useState();
  const [diet, setDiet] = useState('');
  const [health, setHealth] = useState('');


  useEffect(() => {
    getRecipes();
  }, [query]);

  
  const getRecipes = async () => {
    var REQUEST = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`;

    // If a Diet filter is selected => add parameter 
    if (diet !== '') {
      REQUEST += `&diet=${diet}`
    }

    // If a Health filter is selected => add parameter 
    if (health !== '') {
      REQUEST += `&diet=${health}`
    }

    const response = await fetch(REQUEST);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setRecipes(data.hits);

      if ((data.hits).length > 0) {
        setResultStatus(true);
      }
      else{
        setResultStatus(false);
      }
    }
    // else{
    //   setResultStatus(false);
    // }
  }

  return (
    <div className="App">
      <Header />
      <Search search={search} setSearch={setSearch} setQuery={setQuery}diet={diet} setDiet={setDiet} health={health} setHealth={setHealth} />

      {recipes.length > 0 ?  <p id='recipe-count'>{recipes.length} Recipes Shown</p> : ""}
      <div className="recipe-cards">
        {resultStatus ? 
          recipes.map(recipe => (
            <Recipe 
              key={recipe.recipe.url}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              cuisineType={recipe.recipe.cuisineType}
              mealType={recipe.recipe.mealType}
              dishType={recipe.recipe.dishType}
              source={recipe.recipe.source}
              url={recipe.recipe.url} />
          ))  : 
          <div id='no-result'>
            <h3>
              Sorry... Nothing came up!
            </h3>
            <h4>
              Try searching for something else
            </h4>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
