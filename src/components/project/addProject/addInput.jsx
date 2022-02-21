import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { setMessage, clearMessage } from "../../../redux/actions/message";
import { addNewProject } from "../../../redux/actions/projectData";
import plus from "../../../svg/plus.svg";

const AddInput = (props) => {
  const [allValues, setValue] = useState({
    number: null,
    title: "",
    place: "",
    status: "",
    managerId: props.data.id,
  });

  const [errors, setErrors] = useState({
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
    props.dispatch(clearMessage());
    if (allValues.number === null)
      return props.dispatch(setMessage("Project number can not by empty !"));
    if (allValues.title === "")
      return props.dispatch(setMessage("Project name can not by empty !"));
    if (allValues.place === "")
      return props.dispatch(setMessage("Project place can not by empty !"));
    if (allValues.status === "")
      return props.dispatch(setMessage("Project status can not by empty !"));

    props.dispatch(addNewProject(allValues)).then(() => {
      numberRef.current.value = null;
      titleRef.current.value = "";
      placeRef.current.value = "";
      statusRef.current.value = "";
    });
  };

  const validateInputs = (e) => {
    if (e.target.value === "error")
      setErrors({ ...errors, [e.target.name]: true });
    else setErrors({ ...errors, [e.target.name]: false });
  };

  return (
    <div className="col-10 td-input row justify-content-end">
      <div className="col">
        <input
          className="input-box"
          type="number"
          pattern="^-?[0-9]\d*\.?\d*$"
          ref={numberRef}
          placeholder="Project nr"
          onChange={onChangeNumber}
          onBlur={validateInputs}
        />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={titleRef}
          placeholder="Project Name"
          onChange={onChangeTitle}
          onBlur={validateInputs}
        />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={placeRef}
          placeholder="Address"
          onChange={onChangePlace}
          onBlur={validateInputs}
        />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={statusRef}
          placeholder="Status"
          onChange={onChangeStatus}
          onBlur={validateInputs}
        />
      </div>
      <div className="col-1">
        <button className="red add" type="button" onClick={() => handleClick()}>
          <img src={plus} alt="" />
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { data } = state.user;
  return { data };
}
export default connect(mapStateToProps)(AddInput);
