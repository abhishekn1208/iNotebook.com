import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{
  const notesinitial = [
    {
      "_id": "65d15837a87540ffaa31ebdf",
      "user": "65d13d6340a1ce4dc5f9e16a",
      "title": "My Title",
      "description": "Hello, here I am trying to setup add notes router",
      "tag": "General",
      "date": "2024-02-18T01:07:03.320Z",
      "__v": 0
    },
    {
      "_id": "65d15837a87540ffaa31ebe1",
      "user": "65d13d6340a1ce4dc5f9e16a",
      "title": "My Title",
      "description": "Hello, here I am trying to setup add notes router",
      "tag": "General",
      "date": "2024-02-18T01:07:03.528Z",
      "__v": 0
    },
    {
      "_id": "65d16d62f0017dd4f901d68b",
      "user": "65d13d6340a1ce4dc5f9e16a",
      "title": "My Title",
      "description": "Hello, here I am trying to setup add notes router",
      "tag": "General",
      "date": "2024-02-18T02:37:22.139Z",
      "__v": 0
    },
    {
      "_id": "65d16d62f0017dd4f901d68d",
      "user": "65d13d6340a1ce4dc5f9e16a",
      "title": "My Title",
      "description": "Hello, here I am trying to setup add notes router",
      "tag": "General",
      "date": "2024-02-18T02:37:22.874Z",
      "__v": 0
    },
    {
      "_id": "65d16d63f0017dd4f901d68f",
      "user": "65d13d6340a1ce4dc5f9e16a",
      "title": "My Title",
      "description": "Hello, here I am trying to setup add notes router",
      "tag": "General",
      "date": "2024-02-18T02:37:23.618Z",
      "__v": 0
    }
  ]
  const [notes, setNotes]= useState(notesinitial)

  //ADD a note
  const addNote =()=>{

    //TODO API call
    const note= {
      "_id": "65d16d63f0017dd4f901d68f",
      "user": "65d13d6340a1ce4dc5f9e16a",
      "title": "My Title[Added]",
      "description": "Hello, here I am trying to setup add notes router[Added]",
      "tag": "General[Added]",
      "date": "2024-02-18T02:37:23.618Z",
      "__v": 0
    };
    setNotes(notes.push(note))
  }

  // Delete a note
const deleteNote =()=>{
    
  }

  //Edit a note
  const editNote =()=>{
    
  }

    return(
        <NoteContext.Provider value={{notes, addNote,deleteNote ,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;