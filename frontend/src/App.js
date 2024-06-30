import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home />}/>
          <Route path='/login' element= {<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


