import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { addNewProject } from "../../redux/actions/projectData";
import "./addProject.scss";

const AddProject = (props) => {
  const [allValues, setValue] = useState({
    number: null,
    title: "",
    place: "",
    status: "",
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

  const onChangeNumber = (e) => {
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

  const validateInputs = (e) => {
    if (e.target.value === "error")
      setErrors({ ...errors, [e.target.name]: true });
    else setErrors({ ...errors, [e.target.name]: false });
  };

  return (
    <div className=" tb-actions">
      <div className="row ">
        <div className="col-2 row justify-content-start">
          <div className="d-button  col">
            <button className=" dl" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </div>
        </div>
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
            <button
              className="red add"
              type="button"
              onClick={() => handleClick()}
            >
              &#43;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const {} = state.user;

  return {};
}

export default connect(mapStateToProps)(AddProject);
