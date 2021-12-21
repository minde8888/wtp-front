import userImage from "../../../image/user.png";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUser } from "../../../redux/actions/deleteUser"
import Image from "react-bootstrap/Image";
import "./employees.scss"

const Employees = (props) => {
  var users = Object.keys(props).map((key) => {
    let employee = Number.isInteger(parseInt(key)) ? props[key] : null
    return employee;
  });

  Object.keys(users).forEach((k) => users[k] == null && delete users[k]);
  var handleClick = (id, role) => {
    props.dispatch(deleteUser(id, role))
  }

  return (
    <div>
      {users.map((u, k) => {
        return (
          <div key={k}>
            <div className="card ">
              <div className="text-center px-2 "> <Image src={u.imageName === null ? userImage : u.imageSrc}
                alt={u.imageName} />
                <h3 className="mt-2"> {u.name} {u.surname}</h3> <span className="mt-1 clearfix">Occupation: {u.occupation}</span>
                <div className="buttons px-2 mt-3">
                  <div className="col-md-4 btn-outline-secondary">
                    <h5>Project</h5>
                  </div>
                  <div className="col-md-4 btn-outline-secondary">
                    <h5>Telf</h5>
                  </div>
                  <div className="col-md-4 btn-outline-secondary">
                    <h5>Email</h5>
                  </div>
                </div>
                <hr className="line" /> <small className="mt-4">I am an android developer working at google Inc at california,USA</small>
                <div className="buttons px-2 ">
                  <button className="btn-outline-danger" onClick={() => handleClick(u.id, u.role)}>Delete</button>
                  <NavLink to={"/employee-profile/" + u.id}>
                    <button className="btn-outline-info">Profile</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {

  const { employees } = state.user;

  return {
    employees
  };
}

export default connect(mapStateToProps, null)(Employees);

