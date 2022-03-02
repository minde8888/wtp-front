import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { setMessage, clearMessage } from "../../../redux/actions/message";
import { addNewProgressPlan } from "../../../redux/actions/progressPlan";
import plus from "../../../svg/plus.svg";

const AddProgressPlan = (props) => {
  const [allValues, setValue] = useState({
    name: "",
    color: "",
    start: "",
    end: "",
    index: 2,
    employees: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    color: "",
    start: "",
    end: "",
  });

  let nameRef = useRef();
  let colorRef = useRef();
  let startRef = useRef();
  let endRef = useRef();

  const onChangeName = () => {
    let name = nameRef.current.value;
    setValue({ ...allValues, name });
  };

  const onChangeColor = () => {
    let color = colorRef.current.value;
    setValue({ ...allValues, color });
  };

  const onChangeStart = () => {
    let start = startRef.current.value;
    setValue({ ...allValues, start });
  };

  const onChangeEnd = () => {
    let end = endRef.current.value;
    setValue({ ...allValues, end });
  };

  const handleClick = () => {
    props.dispatch(clearMessage());
    if (allValues.name === null)
      return props.dispatch(setMessage("Project Name can not by empty !"));
    if (allValues.color === "")
      return props.dispatch(setMessage("Project color can not by empty !"));
    if (allValues.start === "")
      return props.dispatch(setMessage("Project Start can not by empty !"));
    if (allValues.end === "")
      return props.dispatch(setMessage("Project End can not by empty !"));

    props.dispatch(addNewProgressPlan(allValues)).then(() => {
      nameRef.current.value = null;
      colorRef.current.value = "";
      startRef.current.value = "";
      endRef.current.value = "";
    });
  };

  const validInputs = (e) => {
    if (e.target.value === "error")
      setErrors({ ...errors, [e.target.name]: true });
    else setErrors({ ...errors, [e.target.name]: false });
  };

  return (
    <div className="col-10 td-input row justify-content-end">
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
        <input
          className="input-box"
          type="text"
          ref={colorRef}
          placeholder="Color"
          onChange={onChangeColor}
          onBlur={validInputs}
        />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={startRef}
          placeholder="Start"
          onChange={onChangeStart}
          onBlur={validInputs}
        />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={endRef}
          placeholder="End"
          onChange={onChangeEnd}
          onBlur={validInputs}
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
export default connect(mapStateToProps)(AddProgressPlan);
