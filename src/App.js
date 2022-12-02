import './App.css';
import * as ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import CountryGuesser from './CountryGuesser';
import PopulationGuesser from './PopulationGuesser';

function App() {
  return (
    <HashRouter>
    <Routes>
      <Route path='/' element={<CountryGuesser/>}/>
      <Route path='/pop' element={<PopulationGuesser/>}/>
    </Routes>
  </HashRouter>
  );
}

export default App;
