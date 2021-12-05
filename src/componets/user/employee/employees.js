import userImage from "../../../image/user.png";
import { NavLink } from "react-router-dom";

const Employees = (props) => {

  var users = Object.keys(props).map((key) => {
    return props[key];
  });

  return (
    <div>
      {users.map((user, k) => {
        return (
          <div key={k}>
            <NavLink to={"/employee-profile/" + user.id}>
              <img
                src={user.imageName === null ? userImage : user.imageSrc}
                alt={user.imageName}
              />
            </NavLink>
            <div>
              {user.name} {user.surname}
            </div>
            <div>Occupation: {user.occupation}</div>
            <div>Mobile Number: {user.phoneNumber}</div>
            <div>Email: {user.email}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Employees;
