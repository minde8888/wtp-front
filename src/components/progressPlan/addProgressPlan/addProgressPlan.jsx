import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { setMessage, clearMessage } from "../../../redux/actions/message";
import { addNewProgressPlan } from "../../../redux/actions/progressPlan";
import plus from "../../../svg/plus.svg";
import GetDatePicker from "./datePicker/getDatePicker";
import SketchColor from "./colorPicker/colorPicker";
import "./addProgressPlan.scss";

const AddProgressPlan = (props) => {
  const [value, setValue] = useState({
    name: "",
    index: 2,
    employees: null,
  });
  console.log(props);
  const [errors, setErrors] = useState({
    name: "",
  });

  let nameRef = useRef();

  const onChangeName = () => {
    let name = nameRef.current.value;
    setValue({ ...value, name });
  };

  const handleClick = () => {
    props.dispatch(clearMessage());
    if (value.name === null)
      return props.dispatch(setMessage("Project Name can not by empty !"));
      let obj = { ...props.date, ...value, color: JSON.stringify(props.color) };
      props.dispatch(addNewProgressPlan(obj)).then(() => {
        nameRef.current.value = null;
      });
  };

  const validInputs = (e) => {
    if (e.target.value === "error")
      setErrors({ ...errors, [e.target.name]: true });
    else setErrors({ ...errors, [e.target.name]: false });
  };

  return (
    <div className="col-10 td-input row justify-content-end addPlan">
      <div className="col">
        <SketchColor {...props} />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={nameRef}
          placeholder="Plan name"
          onChange={onChangeName}
          onBlur={validInputs}
        />
      </div>
      <div className="col">
        <GetDatePicker {...props} />
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
  const { date, color } = state.progressPlan;
  return { date, color };
}
export default connect(mapStateToProps)(AddProgressPlan);
