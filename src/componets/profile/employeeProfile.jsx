import Preloader from "../preloader/preloader";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import React, {useEffect } from "react";
import { getEmploeeProfile } from "../../redux/actions/getEmploeeProfile";

const EmployeeProfile = (props) => {
  let userId = props.match.params.userId;

  useEffect(() => {
     if (userId) {
      props.dispatch(getEmploeeProfile(userId));
    }
  }, [userId]);


  // console.log(props);
  // if (props.profile === null || props.profile === undefined) {
  //   return <Preloader />;
  // }
  return <div>22222222222222222</div>;
};

let profileContainerWithRaout = withRouter(EmployeeProfile);

function mapStateToProps(state) {
console.log(state);
  const { data, message} = state.employee;
  return {
    message,
    data,
  };
}

export default connect(mapStateToProps)(profileContainerWithRaout);
