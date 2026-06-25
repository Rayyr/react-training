 import './App.css';
import Dashboard from './components/Dashboard.jsx';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Home from './Pages/Home.jsx';

function App() {
  return (
 
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/students" element="Students.jsx"/>
      <Route path="/students/:id" element="StudentDetails.jsx"/>
      <Route path="/about" element="About.jsx"/>
      <Route path="/d" element={<Dashboard/>}/>
   </Routes>
  );
}

export default App;
