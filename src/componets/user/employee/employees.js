import userImage from "../../../image/user.png";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUser } from "../../../redux/actions/deleteUser"

const Employees = (props) => {

  var users = Object.keys(props).map((key) => {
    let employee = Number.isInteger(parseInt(key)) ? props[key] : null
    return employee;
  });
  console.log(props);
  Object.keys(users).forEach((k) => users[k] == null && delete users[k]);
  var handleClick = (id, role) => {
    props.dispatch(deleteUser(id, role))
  }

   
  return (
    <div>
      {users.map((u, k) => {
        return (
          <div key={k}>
            <NavLink to={"/employee-profile/" + u.id}>
              <img
                src={u.imageName === null ? userImage : u.imageSrc}
                alt={u.imageName}
              />
            </NavLink>
            <div>
              {u.name} {u.surname}
            </div>
            <div>Occupation: {u.occupation}</div>
            <div>Mobile Number: {u.phoneNumber}</div>
            <div>Email: {u.email}</div>
            <button type="button" className="btn btn-danger" onClick={() => handleClick(u.id, u.role)}>Delete</button>
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

