import React, { useEffect } from "react";
import { connect } from "react-redux";
import MultipleDragList from "../../hjelpers/multipleDragList";


const Home = (props) => {


  return (    
    <div>
        <MultipleDragList {...props}/>
    </div>
  );
};

function mapStateToProps(state) {
  
  const { } = state.user;

  return {

  };
}

export default connect(mapStateToProps)(Home);