import Preloader from "../preloader/preloader";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { getEmploeeProfile } from "../../redux/actions/getEmploeeProfile";
import { isEmpty } from "../../hjelpers/isEmpty";
import userImage from "../../image/user.png";

const EmployeeProfile = (props) => {
  const [id] = useState(props.match.params.userId);
  const { dispatch } = props;

  useEffect(() => dispatch(getEmploeeProfile(id)), [id, dispatch]);

  if (isEmpty(props.data) && !props.userIsLoadied) {
    return (
      <div>
        <strong>{props.message}</strong>
      </div>
    );
  }


  const {
    email,
    imageName,
    imageSrc,
    isActive,
    name,
    occupation,
    phoneNumber,
    surname,
  } = props.data;

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>
            {name} {surname}
          </strong>
          <div>Profile</div>
        </h3>
      </header>
      {isActive ? (
        <>
          <img src={imageSrc != null ? imageSrc : userImage} alt={imageName} />
          <p>
            <strong>email:</strong> {email}
          </p>
          <p>
            <strong>Occupation:</strong> {occupation}
          </p>
          <p>
            <strong>Phone Number:</strong> {phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </>
      ) : (
        <div>
          <strong>
            {name} {surname}
          </strong>
          <div>This user was removed</div>
        </div>
      )}
    </div>
  );
};

let profileContainerWithRaout = withRouter(EmployeeProfile);

function mapStateToProps(state) {
  // console.log(state);
  const { data, message, userIsLoadied } = state.employee;
  return {
    message,
    data,
    userIsLoadied,
  };
}

export default connect(mapStateToProps)(profileContainerWithRaout);
