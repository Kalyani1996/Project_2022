import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
import Home from "./components/home";
import CreateUser from "./components/createuser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainRouterComponent from "./components/mainroutercomponent";

// import { RandomNumber } from './components/RandomNumber';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <NavBar />
        <MainRouterComponent />
      </BrowserRouter>

    </div>

    
  );
}

export default App;
