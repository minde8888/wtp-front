import React, { useEffect } from "react";
import { connect } from "react-redux";
import MultipleDragList from "../../helpers/multipleDragList";


const Home = (props) => {


  return (    
    <div className="">
        {/* <MultipleDragList {...props}/> */}
    </div>
  );
};

function mapStateToProps(state) {
  
  const { } = state.user;

  return {

  };
}

export default connect(mapStateToProps)(Home);