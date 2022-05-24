import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import NavbarState from './context/navbar/NavbarState';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alerts/AlertState';
import Alert from './components/Alert';
import alertContext from './context/alerts/alertContext';
import { useContext } from 'react';


function App() {
  let aContext = useContext(alertContext);
  console.log(aContext);
  //const { alert } = aContext;
  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <NavbarState>
              <Navbar />
            </NavbarState>            
            <div className='container'>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<Signup />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
