import Preloader from "../../preloader/preloader";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import {getEmployeeProfile  } from "../../../redux/actions/getEmployeeProfile";
import EmptyObject from "../../../helpers/isEmpty";
import userImage from "../../../image/user.png";

const EmployeeProfile = (props) => {

  const [id] = useState(props.match.params.userId);
  const { dispatch } = props;

  useEffect(() => dispatch(getEmployeeProfile(id)), [id, dispatch]);

  if (!EmptyObject.isEmpty(props.profile)) {
    return (
      <div>
        <strong>{props.message}</strong>
      </div>
    );
  }

  if (!props.userIsLoaded) {
    return <Preloader />;
  }

  const {
    email,
    imageName,
    imageSrc,
    isDeleted,
    name,
    occupation,
    phoneNumber,
    surname,
  } = props.profile;

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
      {!isDeleted ? (
        <>
          <img
            src={imageName === null ? userImage : imageSrc}
            alt={imageName}
          />
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
  const { profile, userIsLoaded } = state.employee;
  return {
    profile,
    userIsLoaded,
  };
}

export default connect(mapStateToProps)(profileContainerWithRaout);
