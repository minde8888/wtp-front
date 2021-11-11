import userImage from "../../image/user.png";
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
            <NavLink to={"/profile" + "/" + user.Id}>
              <img
                src={user.ImageSrc != null ? user.ImageSrc : userImage}
                alt={user.ImageName}
              />
            </NavLink>
            <div>
              {user.Name} {user.Surname}
            </div>
            <div>Occupation: {user.Occupation}</div>
            <div>Mobile Number: {user.MobileNumber}</div>
            <div>Email: {user.Email}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Employees;
