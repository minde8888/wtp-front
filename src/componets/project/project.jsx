import React, { useEffect } from "react";
import { connect } from "react-redux";
import MultipleDragList from "../../hjelpers/multipleDragList";
import AddProject from "./addProject";
import DeleteProject from "./deleteProject";

const Project = (props) => {


  return (    
    <div>
        <MultipleDragList {...props}/>
        <AddProject/>
        <DeleteProject/>
    </div>
  );
};

function mapStateToProps(state) {
  
  const { } = state.user;

  return {

  };
}

export default connect(mapStateToProps)(Project);