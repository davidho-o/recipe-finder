import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [ingredient,setIngredient] = useState('');
  const [lista,setList] = useState([]);
  const handleChange = (e) =>{
    setIngredient(e.target.value);
  }
  const search = async() =>{
    console.log("searching...")
    const result = await fetch(`https://api.edamam.com/search?q=${ingredient}&app_id=1c1ce910&app_key=
      887fcb91823c9c068ee0d73d92e3041c`)
    const hits = (await result.json()).hits;
    console.log(hits);
    setList(hits);
  }

  useEffect(()=>{
    console.log(lista);
  },[lista]);
  return (
    <div className="App">
      <div>
      <input placeholder="Search for an ingredient..." className='input' onChange={handleChange} value={ingredient}></input>
      <button onClick={search} className='buton'>Search</button>
      </div>
      <ul className='list'>
        {lista.map((item,index)=>{
          return(
          <li key={index} className='recipe'>
            {<img src={item.recipe.image} className='image'/>}
            {item.recipe.label}
            {item.recipe.totalTime}
          </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
