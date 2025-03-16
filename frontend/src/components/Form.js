import React, { useEffect, useState } from "react";
import "./Form.css";

const Form = ({ showForm, onClose, onSubmit }) => {
  // const flag = useRef(true);

  const initialname = localStorage.getItem("username");

  const [text, setText] = useState("");
  const [username, setUsername] = useState(initialname);
  const [tag, setTag] = useState("");
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let error = "";
    if(!value.trim()){
      error = "Field cannot be empty";
    }
    else if (field === "username" && !isNaN(value)) {
      error = "Please enter a valid username";
    }
    else if (field === "tag" && value==="Select") {
      error = "Please select a tag";
    }
    else if (field === "text" && value.length < 10) {
      error = "Please enter 10 characters at least";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error;
  };

  useEffect(() => {
    setText("");
    setTag("");
    setUsername(initialname);
    setErrors({});
  }, [showForm, initialname]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const formData = {
    text,
    tag,
    username,
  };

  const handleSubmit = () => {
    const ue = validate("username", username);
    const texte = validate("text", text);
    const tage = validate("tag", tag);

    if (!ue && !tage && !texte) {
      console.log(formData);
      onSubmit(formData);
    }
  };

  const ideaHandler = (e) => {
    setText(e.target.value);
  };
  const usenameHandler = (e) => {
    setUsername(e.target.value);
  };
  const tagHandler = (e) => {
    setTag(e.target.value);
  };

  const handleBlur = (e) => {
    validate(e.target.name, e.target.value);
  };

  return (
    showForm && (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <h3>Enter a Username</h3>
          <h4>(Please use only one username)</h4>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={usenameHandler}
            onBlur={handleBlur}
          />
          {errors.username && <h4 className="error">{errors.username}</h4>}

          <h3>What's Your Idea?</h3>
          <textarea
            id="idea"
            name="text"
            placeholder="Describe your idea..."
            onChange={ideaHandler}
            onBlur={handleBlur}
          />
          {errors.text && <h4 className="error">{errors.text}</h4>}

          <h3>Tag</h3>
          <select onChange={tagHandler} name="tag" onBlur={handleBlur}>
            <option>Select</option>
            <option value="Technology">Technology</option>
            <option value="Software">Software</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Inventions">Inventions</option>
            <option value="Food">Food</option>
          </select>
          {errors.tag && <h4 className="error">{errors.tag}</h4>}

          <button
            onClick={handleSubmit}
            disabled={errors.username || errors.tag || errors.text}
          >
            Submit
          </button>
        </div>
      </div>
    )
  );
};

export default Form;
