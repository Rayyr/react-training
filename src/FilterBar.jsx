import React from 'react';
import Button from './Button.jsx';

function FilterBar({ filter, setFilter }) {
  return (
    <div className="filters">
      <Button
        className={filter === "All" ? "colored" : ""}
        onClick={() => setFilter("All")}
        content="All"
      />
       

      <Button
        className={filter === "Completed" ? "colored" : ""}
        onClick={() => setFilter("Completed")}
        content="Completed"
      />
        
       

      <Button
        className={filter === "Active" ? "colored" : ""}
        onClick={() => setFilter("Active")} 
        content="Active"
      />
       
    </div>
  );
}

export default FilterBar;