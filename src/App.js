import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = 'd20946cf';
  const APP_KEY = 'bf0fbbbc7230ee42fae6feb291a872af';

  // Filters
  const diets = ['balanced','high-fiber','high-protein','low-carb','low-fat','low-sodium'];
  const healths = ['alcohol-free','immuno-supportive','celery-free','crustacean-free','dairy-free','egg-free','fish-free','fodmap-free','gluten-free','keto-friendly','kidney-friendly','kosher','low-potassium','lupine-free','mustard-free','low-fat-abs','No-oil-added','low-sugar','paleo','peanut-free','pecatarian','pork-free','red-meat-free','sesame-free','shellfish-free','soy-free','sugar-conscious','tree-nut-free','vegan','vegetarian','wheat-free']

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

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <div className="seach-area">
          <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Search for a Recipe..." />
          <button className="search-button" type="submit" >Search</button>
        </div>
        <br />

        <div className="search-filters">
          {/* Diet Filter */}
          <select id="filter-diet" value={diet} onChange={e=>setDiet(e.target.value)} >
            <option value="">Select Diet</option>
            {diets.map(dietItem => (
                  <option>{dietItem}</option>
            ))}
          </select>

          {/* Health Filter */}
          <select value={health} onChange={e=>setHealth(e.target.value)} >
            <option value="">Select Health</option>
            {healths.map(healthItem => (
                  <option>{healthItem}</option>
            ))}
          </select>
        </div>


      </form>

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
          <p id='no-result'>Sorry Nothing Came UP :(</p>
        }
      </div>
    </div>
  );
}

export default App;
