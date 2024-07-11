import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

const List = ({ list, handleEdit, handleDelete }) => {
  return (
    <div className="list-display">
      {list.map((item) => (
        <div className="single-list" key={item.id}>
          <div className="list-text">
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </div>
          <div className="list-icons">
            <AiOutlineEdit
              className="edit-icon"
              onClick={() => handleEdit(item.id)}
            />
            <AiOutlineDelete
              className="delete-icon"
              onClick={() => handleDelete(item.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
