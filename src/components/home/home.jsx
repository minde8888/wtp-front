import React from "react";
import { connect } from "react-redux";

const Home = (props) => {
  return <div className="">1111</div>;
};

function mapStateToProps(state) {
  const {} = state.user;

  return {};
}

export default connect(mapStateToProps)(Home);
