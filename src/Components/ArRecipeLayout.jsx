import { useState } from "react";
// import "./App.css";
import { CiBookmark } from "react-icons/ci"; //bookmark vide 
import { FaBookmark } from "react-icons/fa"; // bookmark with color

import { useEffect } from "react";
const key = "cbed10cacb9c81e2a7e48b59678ca090	";
const app_id = "b90b16e8";

export default function ArRecipe() {
useEffect(()=>{
  setTimeout(() => {
    
  }, 5000);
},[])



  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState();
  let searchedRecipes = recipes?.filter((r)=>r?.recipe.title.includes(query) );
  if (query===""){
    searchedRecipes =[]
  }


  const [selectedId, setselectedId] = useState("");
  function selectrecipe(id) {
    setselectedId(id);
  }

  return (
    <div className="bg-green-100 h-screen">
      <Header query={query} setquery={setquery} />
      <div className="grid grid-cols-3 h-96 gap-9 my-8">
        <RecipeBoard selectedrecipe={selectedId} />
        <div className="h-auto w-1 bg-slate-400 justify-self-center"></div>
        <RecipeList
          query={query}
          recipes={searchedRecipes}
          setrecipes={setrecipes}
          selectrecipe={selectrecipe}
        />
      </div>
    </div>
  );
}

function Header({ query, setquery }) {
  return (
    <div className="bg-green-200	flex justify-between items-center p-5 rounded text-white content-center   ">
      <div className="flex">

      <CiBookmark className="bookmark" />
       <pre>الوصفات المحفوظة</pre>
      </div>
      <div className="">
        <input
          type="text"
          className=" bg-green-300 placeholder-white rounded p-2  "
          placeholder="ابحث عن وصفة "
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
      <div className="flex">
        <span className="text-xl mx-3">🥦</span>
        <p className="font-semibold tracking-widest font-mono"> Recipe</p>
      </div>    </div>
  );
}
function RecipeList({ query, recipes, setrecipes, selectrecipe }) {
  useEffect(() => {
    const controller = new AbortController();
   const timefetching = setTimeout(()=>{RecipeFetch()}, 5000);
    async function RecipeFetch() {
      try {
        const res = await fetch(
         "http://localhost:9000/recipes"   ,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("something wrong ");
        }

        const data = await res.json();
        // console.log("type de chainement d api", data);
        if (data.response === false) {
          throw new Error("Recipe Not found");
        }

        setrecipes(data.recipes);
        // console.log("recipes", data.recipes);
      } catch (err) {
        console.log(err);
      }
    }
    if (!query.length || query.length<1 || query==="") {
      setrecipes([]);
      return;
    }
    RecipeFetch();
    return function () {
      clearTimeout(timefetching);
      controller.abort();
    }; // component unmount
  }, [query,setrecipes]);

  return (
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-auto  ml-16 p-2 ">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className=" flex border  border-b-1  bg-transparent gap-3 p-9 "
          onClick={() => selectrecipe(recipe.recipe.recipe_id)}
        >
          {/* {console.log(recipe)} */}
          <img
            src={recipe.recipe.image_url}
            alt={recipe.recipe.title}
            height="60px"
            width="70px"
            className="rounded"
          />

          <div className="text-white">
            <h3>{recipe.recipe.title}</h3>
            {/* <span>{recipe.recipe.publisher}:الكاتب</span> */}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecipeBoard({ selectedrecipe }) {
  console.log(selectedrecipe)
  const [data, setdata] = useState([]);
  console.log("data",data)
const filtredata = Array.isArray(data) && data.filter((d)=>d?.recipe?.recipe_id===selectedrecipe ) ;
console.log("test",filtredata) ;
useEffect(()=>{
async function recipeselectedfetch(){
const res= await fetch("http://localhost:9000/recipes").then((res)=>res.json()).then((res)=>setdata(res.recipes))
}
recipeselectedfetch();
},[selectedrecipe])
  return (
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-scroll overflow-x-hidden mr-9 p-2">
      <div>
        
        {selectedrecipe && filtredata && 
      <div>
<h1>{filtredata[0]?.recipe?.title}</h1>
      <img src={filtredata[0]?.recipe?.image_url} alt="" />
      <span>
        <h6>:المكونات</h6>
        <ul>
        {filtredata[0]?.recipe?.ingredients.map(ing=><li>{ing}</li>)}
        </ul>
      </span>
      <button className="bg-green-500 p-4">اضافة للمفضلة</button>
      </div>
      
      }
      
      </div>
    </div>
  );
}
