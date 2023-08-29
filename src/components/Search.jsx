import React from 'react'
import './search.css'

function Search({search, setSearch, setQuery,diet, setDiet, health, setHealth }) {
     // Filters
    const diets = ['balanced','high-fiber','high-protein','low-carb','low-fat','low-sodium'];

    const healths = ['alcohol-free',
    'immuno-supportive',
    'celery-free',
    'crustacean-free',
    'dairy-free',
    'egg-free',
    'fish-free',
    'fodmap-free',
    'gluten-free',
    'keto-friendly',
    'kidney-friendly',
    'kosher',
    'low-potassium',
    'lupine-free',
    'mustard-free',
    'low-fat-abs',
    'No-oil-added',
    'low-sugar',
    'paleo',
    'peanut-free',
    'pecatarian',
    'pork-free',
    'red-meat-free',
    'sesame-free',
    'shellfish-free',
    'soy-free',
    'sugar-conscious',
    'tree-nut-free',
    'vegan',
    'vegetarian',
    'wheat-free']

    const updateSearch = e => {
        setSearch(e.target.value);
    }    

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

  return (
    <div className='search'>
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
    </div>
  )
}

export default Search