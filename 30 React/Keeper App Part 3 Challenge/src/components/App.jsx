import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([])

  function addNote(titleValue, contentValue) {
    setNotes((prevNotes) => {
      return [...prevNotes, ...[{title: titleValue, content: contentValue}]];
    });
  }

	function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea buttonHundle={addNote}/>
      <Note key={100} title="Note title" content="Note content"/>
			{notes.map((note, index) => (
				<Note key={index} id={index} title={note.title} content={note.content} buttonHundle={deleteNote}/>
			))}
      <Footer />
    </div>
  );
}

export default App;
