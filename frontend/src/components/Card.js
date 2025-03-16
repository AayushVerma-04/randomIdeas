import React from "react";
import "./Card.css";
const Card = (props) => {
  return (
      <div className="card">
        {props.deleteable && <p className="delete" onClick={()=>{props.handleDelete(props.id)}}>x</p>}
        <p className="idea">{props.idea}</p>
        <div className="tag" data-category={props.tag}>
          {props.tag}
        </div>
        <p className="descr">{"Created by " + props.username+ " on " + props.date.slice(0, 10)}</p>
      </div>
  );
};

export default Card;
