import React, { useState } from "react";
import './Filter.css';

const Filter = (props) => {
  const [inputState, setInputState] = useState("");

  const changeInput = (e)=>{
    e.preventDefault();
    setInputState(e.target.value);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    props.submitHandler(inputState);
  }

  const selectHandler = (e)=>{
    e.preventDefault();
    setInputState(e.target.value);
  }

  return (
    <form>
      <input type="text" placeholder="Filter by tag" value={inputState} onChange={changeInput}/>
      <select name="tagFilterSelect" id="tag-filter-select" onChange={selectHandler}>
        <option value="All">All</option>
        <option value="Technology">Technology</option>
        <option value="Software">Software</option>
        <option value="Business">Business</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Inventions">Inventions</option>
        <option value="Food">Food</option>
      </select>
      <button type="submit" onClick={handleSubmit}>Filter</button>
    </form>
  );
};

export default Filter;
