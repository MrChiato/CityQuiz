
import { useEffect, useState } from 'react';
import { countries } from './Data';

function PopulationGuesser() {
    const [city, setCity] = useState("a");
    const [population, setPopulation] = useState(0)
    const [streak, setStreak] = useState(0);
    const [answer, setAnswer] = useState("");
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [options, setOptions] = useState([""])
  
    const getCity = () =>{
        const getRandomCountry = Math.floor(Math.random() * Object.keys(countries).length);
        const randomCity = Math.floor(Math.random() * countries[getRandomCountry].cities.length);
        const correctAnswer = countries[getRandomCountry].country;
        setPopulation(countries[getRandomCountry].cities[randomCity].population)
        setAnswer(correctAnswer)
        randomizeButtons(correctAnswer);
      return countries[getRandomCountry].cities[randomCity].city;
    }
    const randomizeButtons = (eAnswer) =>{
      const correctButton = (Math.floor(Math.random()*3))
      let wrongOption1 = randomCountry();
      while (wrongOption1 === eAnswer){
        wrongOption1 = randomCountry();
      }
      let wrongOption2 = randomCountry();
      while (wrongOption2 === eAnswer){
        wrongOption2 = randomCountry();
      }
      const optionArray = [];
      optionArray.push(wrongOption1);
      optionArray.push(wrongOption2);
      optionArray.splice(correctButton, 0, eAnswer);
      setOptions(optionArray);
    }
    const randomCountry = () =>{
      const randomNumber = Math.floor(Math.random() * Object.keys(countries).length);
      const randomCountry = countries[randomNumber].country;
      return randomCountry
    }
    const guessCountry = (guess) =>{
      const resultTextField = document.getElementById("ResultText");
      if (guess === "")
        return
      if (guess.toLowerCase() === answer.toLowerCase()) {
        setStreak(streak+1);
        setCorrect(correct+1);
        resultTextField.style.color = "green";
        resultTextField.innerText = ("Correct! "+city+" is located in "+answer);
      }
      else{
        setStreak(0);
        setWrong(wrong+1);
        resultTextField.style.color = "red";
        resultTextField.innerText = ("Wrong! "+city+" is located in "+answer);
      }
      setCity(getCity);
    }
    useEffect(() => {
      setCity(getCity)
      /*document.addEventListener('keydown', (event)=>{
        if (event.repeat)
          return;
        console.log("test")
      });*/
      
    },[])
    return (
      <div className="App">
        <p className='Text'>City: <br/> <span className='InfoText'>{city}</span> <br/> Population: <br/> <span className='InfoText'>{population.toLocaleString()}</span></p>
        <span className='ScoreText'>Correct: {correct} wrong: {wrong}</span>
        <span className='ScoreText'>Streak: {streak}</span>
        <span id='ResultText'>Guess which country the city is located in</span>
        <div className='InputDiv'>
          {/*<input autoFocus id="GuessField" placeholder='Country..'></input>
          <button className='Button' onClick={()=>{guessCountry()}}>Guess</button>*/}
          <button className='Button' onClick={()=>guessCountry(options[0])}>{options[0]}</button>
          <button className='Button' onClick={()=>guessCountry(options[1])}>{options[1]}</button>
          <button className='Button' onClick={()=>guessCountry(options[2])}>{options[2]}</button>
        </div>
      </div>
    );
  }
  
  export default PopulationGuesser;