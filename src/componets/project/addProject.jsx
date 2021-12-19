import React, { createRef, useState } from "react";
import { connect } from "react-redux";

const AddProject = (props) => {
  const [allValues, setVallue] = useState({
    title: "",
    content: "",
  });

  let postTitle = createRef();
  let onTitleChange = () => {
    let title = postTitle.current.value;
    setVallue({...allValues, title});
  };

  let postText = createRef();
  let onContentChange = () => {
    let content = postText.current.value;
    setVallue({...allValues, content});
  };

  var handleClick = () => {
    console.log(allValues);
    // props.dispatch(addNewProject(title))
  };

  return (
    <div>
      <input type="text" ref={postTitle} onChange={onTitleChange} />
      <input type="text" ref={postText} onChange={onContentChange} />
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleClick()}
      >
        Add
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  const {} = state.user;

  return {};
}

export default connect(mapStateToProps)(AddProject);
