import { connect } from "react-redux";



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