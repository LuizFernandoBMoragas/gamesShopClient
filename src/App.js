import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState();
  console.log(listGames);

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:8080/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/getCards").then((response) => {
      setListGames(response.data);
    });
  });

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Game shop</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="cost"
          placeholder="Price"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="register-input"
          onChange={handleChangeValues}
        />
        <button className="register-button" onClick={() => handleClickButton()}>
          Register
        </button>
      </div>

      {typeof listGames !== "undefined" &&
        listGames.map((value) => {
          return (
            <Card
              key={value.id}
              listGames={listGames}
              setListGames={setListGames}
              id={value.idgames}
              name={value.name}
              cost={value.cost}
              category={value.category}
            ></Card>
          );
        })}
    </div>
  );
}

export default App;
