//import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Vehicles } from './components/Vehicles';
import {Navigation} from './components/Navigation';

//import {BrowseRouter, Route, Switch} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Mtable from "./components/Vehicles"

function App() {
  return (
   <Mtable/>
  );
}

export default App;
