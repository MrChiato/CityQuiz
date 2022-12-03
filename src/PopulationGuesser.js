import { useEffect, useState } from "react";
import { countries } from "./Data";
import "./App.css";
import React from "react";

function PopulationGuesser() {
  const [city, setCity] = useState("");
  const [curcountry, setCountry] = useState("");
  const [population, setPopulation] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [options, setOptions] = useState([""]);

  const getCity = () => {
    const getRandomCountry = Math.floor(
      Math.random() * Object.keys(countries).length
    );
    const randomCity = Math.floor(
      Math.random() * countries[getRandomCountry].cities.length
    );
    setCountry(countries[getRandomCountry].country);
    const thisPop = countries[getRandomCountry].cities[randomCity].population;
    setPopulation(thisPop);
    setAnswer(thisPop);
    randomizeButtons(thisPop);
    return countries[getRandomCountry].cities[randomCity].city;
  };
  const randomizeButtons = (eAnswer) => {
    const correctButton = Math.floor(Math.random() * 3);
    let wrongOption1 = randomPop();
    while (wrongOption1 === eAnswer) {
      wrongOption1 = randomPop();
    }
    let wrongOption2 = randomPop();
    while (wrongOption2 === eAnswer) {
      wrongOption2 = randomPop();
    }
    const optionArray = [];
    optionArray.push(wrongOption1);
    optionArray.push(wrongOption2);
    optionArray.splice(correctButton, 0, eAnswer);
    setOptions(optionArray);
  };
  const randomPop = () => {
    let randomPop = Math.floor(Math.random() * ((answer * 10) - (answer / 10)) + (answer / 10)); //generate random pop
    return randomPop;
  };
  const guessCountry = (guess) => {
    const resultTextField = document.getElementById("ResultText");
    if (guess === "") return;
    if (guess === answer) {
      setStreak(streak + 1);
      setCorrect(correct + 1);
      resultTextField.style.color = "green";
      resultTextField.innerText =
        "Correct! The population of " + city + " is " + population;
    } else {
      setStreak(0);
      setWrong(wrong + 1);
      resultTextField.style.color = "red";
      resultTextField.innerText =
        "Wrong! The population of " + city + " is " + population;
    }
    setCity(getCity);
  };
  useEffect(() => {
    setCity(getCity);
  }, []);
  return (
    <div className="App">
      <p className="Text">
        City: <br /> <span className="InfoText">{city}</span> <br /> Country:{" "}
        <br /> <span className="InfoText">{curcountry}</span>
      </p>
      <span className="ScoreText">
        Correct: {correct} wrong: {wrong}
      </span>
      <span className="ScoreText">Streak: {streak}</span>
      <span id="ResultText">Guess the population of the city</span>
      <div className="InputDiv">
        {/*<input autoFocus id="GuessField" placeholder='Country..'></input>
          <button className='Button' onClick={()=>{guessCountry()}}>Guess</button>*/}
        <button className="Button" onClick={() => guessCountry(options[0])}>
          {options[0].toLocaleString()}
        </button>
        <button className="Button" onClick={() => guessCountry(options[1])}>{options[1].toLocaleString()}</button>
        <button className="Button" onClick={() => guessCountry(options[2])}>{options[2].toLocaleString()}</button>
      </div>
    </div>
  );
}

export default PopulationGuesser;
