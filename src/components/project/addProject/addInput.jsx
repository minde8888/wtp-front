import React, { useRef, useState } from "react";
import { setMessage, clearMessage } from "../../../redux/actions/message";
import { addNewProject } from "../../../redux/actions/projectData";
import store from "../../../redux/store";
import plus from "../../../svg/plus.svg";

const AddInput = ({ id }) => {
  const [allValues, setValue] = useState({
    number: null,
    title: "",
    place: "",
    status: "",
    managerId: id,
    date: new Date(),
    color: '{ "r":10,"g":170,"b":179,"a":0.29}',
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
    store.dispatch(clearMessage());
    if (allValues.number === null)
      return store.dispatch(setMessage("Project number can not by empty !"));
    if (allValues.title === "")
      return store.dispatch(setMessage("Project name can not by empty !"));
    if (allValues.place === "")
      return store.dispatch(setMessage("Project place can not by empty !"));
    if (allValues.status === "")
      return store.dispatch(setMessage("Project status can not by empty !"));

    store.dispatch(addNewProject(allValues)).then(() => {
      numberRef.current.value = null;
      titleRef.current.value = "";
      placeRef.current.value = "";
      statusRef.current.value = "";
    });
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
        />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={titleRef}
          placeholder="Project Name"
          onChange={onChangeTitle}
        />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={placeRef}
          placeholder="Address"
          onChange={onChangePlace}
        />
      </div>
      <div className="col">
        <input
          className="input-box"
          type="text"
          ref={statusRef}
          placeholder="Status"
          onChange={onChangeStatus}
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

export default AddInput;
