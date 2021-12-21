import { connect } from "react-redux";

const DeleteProject = (props) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        // onClick={() => handleClick()}
      >
        Delete
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  const {} = state.user;

  return {};
}

export default connect(mapStateToProps)(DeleteProject);
