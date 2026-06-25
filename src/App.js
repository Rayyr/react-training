 import './App.css';
import Dashboard from './components/Dashboard.jsx';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';

function App() {
  return (
 
    <Routes>
      <Route path="/"  element="Home.jsx"/>
      <Route path="/students" element="Students.jsx"/>
      <Route path="/students/:id" element="StudentDetails.jsx"/>
      <Route path="/about" element="About.jsx"/>
    <Dashboard/>
   </Routes>
  );
}

export default App;
