import "./App.css";
import { useState } from "react";


function App() {
    const [counterValue, setCounterValue] = useState(0);


  const handleClick = () => {
    if (counterValue === 10)
      setCounterValue(0); //reset counter
    else setCounterValue(counterValue + 1);
  };


  return (
    <>
      <div className="App">
        <h1>Counter</h1>
        <h2>It counts from 0 to 10 inclusive!</h2>
        <button onClick={handleClick}>
          {counterValue===10?"Reset":"Count up"}
        </button>
        <label>{counterValue}</label>
      </div>
    </>
  );
}

export default App;
