import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "hello world",
    type: "success",
  });
  const [filter, setFilter] = useState(`all`);
  const showAlert = (show = false, msg = ``, type = ``) => {
    setAlert({ show, msg, type });
  };

  //submit handler

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "please enter value", "error");
    } else if (isEditing && name) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            setName(item.title);
            return { ...item, title: name };
          }
          return item;
        })
      );

      showAlert(true, "your list is updated", "success");
      setIsEditing(false);
      setName("");
      setEditId(null);
    } else {
      showAlert(true, "todo list added", "success");
      setList([
        ...list,
        {
          id: new Date().getTime().toString(),
          title: name,
          isCompleted: false,
        },
      ]);
      setName("");
    }
  };
  const [completedList, setCompletedList] = useState([]);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const checkComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, isCompleted: item.isCompleted ? false : true };
        }

        return item;
      })
    );
  };
  const removeHandler = (id) => {
    showAlert(true, "todo list removed", "success");
    setList(list.filter((item) => item.id !== id));
  };
  const editHandler = (id) => {
    const editingItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(editingItem.title);
    setEditId(id);
  };
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  return (
    <section className="hero">
      {alert.show && <Alert {...alert} list={list} clearAlert={showAlert} />}
      <h1 className="title">
        Todo <span>List</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="create task"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="submit-btn">{isEditing ? "edit" : "submit"} </button>
        <select
          onChange={filterHandler}
          name="value"
          id="status"
          value={filter.value}
        >
          <option value="all">All</option>
          <option value="completed">completed</option>
          <option value="incomplete">incomplete</option>
        </select>
      </form>

      <List
        filter={filter}
        list={list}
        checkComplete={checkComplete}
        removeHandler={removeHandler}
        editHandler={editHandler}
      />
      <button
        onClick={() => {
          list.length > 0 && showAlert(true, "items removed", "success");
          setList([]);
        }}
        className="delete-btn"
      >
        Clear All
      </button>
    </section>
  );
};

export default App;
