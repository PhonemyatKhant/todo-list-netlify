import React from "react";
import { FaEdit, FaCheck, FaTrashAlt } from "react-icons/fa";
const List = ({ list, checkComplete, removeHandler, editHandler, filter }) => {
  return (
    <div className="list-container">
      {list.map((item) => {
        const { id, title, isCompleted } = item;
        const article = (
          <>
            <span>{title} </span>
            <div className="btn-container">
              <button onClick={() => editHandler(id)} className="edit-btn">
                <FaEdit style={{ color: "orange" }} />
              </button>
              <button
                onClick={() => checkComplete(id)}
                className="complete-btn"
              >
                <FaCheck style={{ color: "green" }} />
              </button>
              <button onClick={() => removeHandler(id)} className="remove-btn">
                <FaTrashAlt style={{ color: "red" }} />
              </button>
            </div>
          </>
        );

        if (filter === "completed" && isCompleted) {
          return (
            <article
              className={`list ${isCompleted ? "completed" : ""}`}
              key={id}
            >
              {article}
            </article>
          );
        } else if (filter === "incomplete" && !isCompleted) {
          return (
            <article
              className={`list ${isCompleted ? "completed" : ""}`}
              key={id}
            >
              {article}
            </article>
          );
        } else if (filter === "all") {
          return (
            <article
              className={`list ${isCompleted ? "completed" : ""}`}
              key={id}
            >
              {article}
            </article>
          );
        }
      })}
    </div>
  );
};

export default List;
