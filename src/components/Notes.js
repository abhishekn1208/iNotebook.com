import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import Notesitem from "./Notesitem";
import AddedNote from "./AddedNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, addNotes } = context;
  return (
    <>
        <AddedNote/>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Notesitem note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
