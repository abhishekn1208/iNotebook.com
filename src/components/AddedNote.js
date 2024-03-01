import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import Notes from "./Notes";

const AddedNote = () => {
  const context = useContext(NoteContext);
  const { addNotes  } = context // eslint-disable-next-line;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleonClick = () => {};

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
    return (
      <div className="container my-3 mx-10">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlfor="title" className="form-label">title </label>
            <input type="text"className="form-control"id="title" name="title"aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlfor="desc" className="form-label">Description</label>
            <input type="desc"className="form-control"id="desc" name="desc" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleonClick}>
            Submit
          </button>
        </form>
        <Notes />
      </div>
    );
  };
export default AddedNote;
