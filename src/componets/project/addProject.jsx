import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { addNewProject } from "../../redux/actions/projectData";

const AddProject = (props) => {
  const [allValues, setValue] = useState({
    number: null,
    title: "",
    place: "",
    status: "",
  });

  let numberRef = useRef();
  let titleRef = useRef();
  let placeRef = useRef();
  let statusRef = useRef();

  const onChangeNumber = () => {
    let number = numberRef.current.value;
    setValue({ ...allValues, number });
  };

  const onChangeTitle = () => {
    let title = titleRef.current.value;
    setValue({ ...allValues, title });
  };

  const onChangePlace = () => {
    let place = placeRef.current.value;
    setValue({ ...allValues, place });
  };

  const onChangeStatus = () => {
    let status = statusRef.current.value;
    setValue({ ...allValues, status });
  };

  const handleClick = () => {
    props.dispatch(addNewProject(allValues));
    numberRef.current.value = null;
    titleRef.current.value = "";
    placeRef.current.value = "";
    statusRef.current.value = "";
  };

  return (
    <div>
      <input
        type="number"
        pattern="^-?[0-9]\d*\.?\d*$"
        ref={numberRef}
        placeholder="Project nr"
        onChange={onChangeNumber}
      />
      <input
        type="text"
        ref={titleRef}
        placeholder="Project Name"
        onChange={onChangeTitle}
      />
      <input
        type="text"
        ref={placeRef}
        placeholder="Address"
        onChange={onChangePlace}
      />
      <input
        type="text"
        ref={statusRef}
        placeholder="Status"
        onChange={onChangeStatus}
      />
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
