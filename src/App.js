import React, { useRef, useReducer, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "onHandleSubmit":
      return action.inputRef.current.value
        ? [...state, action.inputRef.current.value.toUpperCase()]
        : state;
    case "handleRemoveItem":
      return state.filter((item, index) => index !== action.index);
    default:
      return state;
  }
};
function App() {
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "onHandleSubmit", inputRef });
    inputRef.current.blur();
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <div className="card" style={{ width: "22rem" }}>
        <div className="card-body">
          <h3 className="card-title">ToDo_Aplication</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Add Item..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onFocus={() => (inputRef.current.value = "")}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  +
                </button>
              </div>
            </div>
          </form>
          <div>
            {state[0] ? <h4 className="card-title">Pending tasks</h4> : ""}
            {state.map((item, index) => {
              return (
                <ul className="list-group" key={index}>
                  <li className="list-group-item list-group-item-success">
                    <span>{item}</span>
                    <button
                      className="btn delet-btn"
                      key={index}
                      onClick={() =>
                        dispatch({ type: "handleRemoveItem", index })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        fill="currentColor"
                        className="bi bi-x-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                    </button>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
