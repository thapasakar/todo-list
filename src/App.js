import { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";
import Navbar from "./Navbar";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  console.log(list);
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) {
      // display alert
      setAlert({
        show: true,
        type: "danger",
        msg: "title and date can not be empty",
      });
    } else if (isEdit) {
      // edit
      console.log("EDITTTTTT");
      // Iterates and returns individual item and adds into the list
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title, date };
          }
          return item;
        })
      );
      setTitle("");
      setDate("");
      setAlert({
        show: true,
        type: "success",
        msg: "edited to do",
      });
      setIsEdit(false);
    } else {
      const newItem = {
        title: title,
        date: date,
        id: new Date().getTime().toString(),
      };
      setList([...list, newItem]);
      setTitle("");
      setDate("");
      setAlert({
        show: true,
        type: "success",
        msg: "added new to do",
      });
    }
  };

  // Save data on local storage whenever list changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  // When user clicks EDIT BUTTON
  const handleEdit = (id) => {
    setIsEdit(true);
    const item = list.find((item) => item.id === id);
    setEditId(id);
    setTitle(item.title);
    setDate(item.date);
  };

  // Save every item except deleted item
  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
    setAlert({
      show: true,
      type: "success",
      msg: "To Do deleted",
    });
  };

  return (
    <div className="App">
      <Navbar />
      <main className="container">
        {alert.show && <Alert alert={alert} setAlert={setAlert} />}
        <form>
          <div className="input-container">
            <input
              type="text"
              placeholder="title"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            {isEdit ? "Edit" : "New Task"}
          </button>
        </form>
        <div className="underline"></div>
        <List list={list} handleEdit={handleEdit} handleDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;
