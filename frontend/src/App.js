import React, { useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import Filter from "./components/Filter";
import Add from "./components/Add";
import Form from "./components/Form";
import axios from "axios";

let y = 1;
const App = () => {
  const localName = localStorage.getItem("username");
  const dataGlobal = useRef([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching data...");

      try {
        const responseData = await axios.get("http://localhost:5000/api/ideas");
        // console.log(responseData.data);
        setData(responseData.data.data);
        dataGlobal.current = responseData.data.data;
        // console.log(dataGlobal);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filterSubmitHandler = (inputState) => {
    if (inputState === "" || inputState === "All") {
      setData(dataGlobal.current);
      return;
    }
    let newData = dataGlobal.current.filter((item) => {
      return item.tag.toLowerCase() === inputState.toLowerCase();
    });

    setData(newData);
  };

  const [showForm, setShowForm] = useState(false);

  const addHandler = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (id) => {
    console.log("id " + id);
    try {
      axios.delete(`http://localhost:5000/api/ideas/${id}`);
    } catch (error) {
      console.log(error);
    }

    setData((prevIdeas) => prevIdeas.filter((idea) => idea._id !== id));
  };

  const formSubmitHandler = async (newData) => {
    let newIdea;

    try {
      const responseData = await axios.post("http://localhost:5000/api/ideas", {
        text: newData.text,
        tag: newData.tag,
        username: newData.username,
      });
      newIdea = responseData.data.data;
      // console.log(responseData);
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem("username", newIdea.username);
    setData((prevdata) => [...prevdata, newIdea]);
    setShowForm(false);
  };

  return (
    <div className="app">
      <Add onClick={addHandler} />
      <Form
        showForm={showForm}
        onClose={addHandler}
        onSubmit={formSubmitHandler}
      />
      <h1>Random Ideas</h1>
      <h3>Read other people's ideas and post your own!</h3>
      <Filter submitHandler={filterSubmitHandler} />
      {data.length === 0 && <p>No data</p>}

      <div className="card-container">
        {data.map((card) => {
          // console.log(card);
          const deleteable = card.username === localName;
          // console.log(deleteable);
          return (
            <Card
              id={card._id}
              idea={card.text}
              tag={card.tag}
              username={card.username}
              date={card.date}
              deleteable={deleteable}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
