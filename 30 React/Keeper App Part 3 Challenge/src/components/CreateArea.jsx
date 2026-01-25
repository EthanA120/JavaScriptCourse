import React, { useState } from "react";

function CreateArea(props) {
  const [{title, content}, changeNoteContent] = useState({ title: "", content: "" });

  function handleChange(event) {
    let { name, value } = event.target;
    changeNoteContent((prevValue) => {
      if (name === "title") {
        return { ...prevValue, ...{ title: value } };
      } else if (name === "content") {
        return { ...prevValue, ...{ content: value } };
      }
    });
  }

  return (
    <div>
      <form>
        <input name="title" placeholder="Title" value={title} onChange={handleChange}/>
        <textarea name="content" placeholder="Take a note..." value={content} rows="3" onChange={handleChange}/>
        <button onClick={(event) => {
          event.preventDefault();
          props.buttonHundle(title, content);
          changeNoteContent({ title: "", content: "" });
          }}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
