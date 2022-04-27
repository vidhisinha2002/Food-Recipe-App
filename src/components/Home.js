import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import  { useState } from "react";
import "../App.css";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./Recipe";
import Alert from "./Alert";
import { signInWithGoogle } from "../firebase";
const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  
  return (
    
    <>
    <br></br>
    <center>
     <div className="align">
      Welcome!! &ensp;
        {user && user.email}<br></br>
        <Button  variant="primary" onClick={handleLogout}>
          Log out
        </Button>
        </div>
        </center>
      <div className="d-grid gap-2">
        
        

        <div class="right">
{/*
      <h2>{localStorage.getItem("name")}</h2>
      <h2>{localStorage.getItem("email")}</h2>
     <img class="circle" src={localStorage.getItem("profilePic")} />*/}
</div>
      <h1 >Food   Recipe   App</h1>
      {/*<h2 class="typewriter">Everything You Need </h2><br></br>*/}
      <form onSubmit={onSubmit} className="search-form">
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          
          placeholder="Search Food"
        />
        <button class="button" type="submit" value="Search" >SEARCH </button>
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
      </div>
    </>
  );
};

export default Home;




  

  

  