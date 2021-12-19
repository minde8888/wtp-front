import React, { useEffect } from "react";
import { connect } from "react-redux";
import MultipleDragList from "../../hjelpers/multipleDragList";


const DeleteProject = (props) => {


  return (    
    <div>
        DeleteProject
    </div>
  );
};

function mapStateToProps(state) {
  
  const { } = state.user;

  return {

  };
}

export default connect(mapStateToProps)(DeleteProject);