import React, { useEffect } from "react";
import { connect } from "react-redux";
import userImage from "../../image/user.png";
import Employees from "./employee/employees";
import Image from "react-bootstrap/Image";

const Profile = (props) => {
  const { data, employees, width, height } = props;

  useEffect(() => employees);
  var id = { id: data.id };
  console.log(data.imageSrc);
  return (
    <div className="container">
      {data.role === "Manager" && (
        <>
          <header className="jumbotron">
            <h3>
              <strong>{data.name}</strong> Profile
            </h3>
          </header>
          <Image
            width={width !== 0 ? width : null}
            height={height !== 0 ? height : null}
            src={data.imageName === null ? userImage : data.imageSrc}
            alt={data.imageName}
          />
          <p>
            <strong>Id:</strong> {data.id}
          </p>
          <p>
            <strong>Mobile Numbe:</strong> {data.mobileNumber}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Role:</strong> {data.role}
          </p>
          <div>
            <Employees {...employees} {...id} />
          </div>
        </>
      )}

      {data.role === "Employee" && (
        <>
          <header className="jumbotron">
            <h3>
              <strong>{data.name}</strong> Profile
            </h3>
          </header>
          <Image
            width={width !== 0 ? width : null}
            height={height !== 0 ? height : null}
            src={data.imageName === null ? userImage : data.imageSrc}
            alt={data.imageName}
          />
          <p>
            <strong>Id:</strong> {data.id}
          </p>
          <p>
            <strong>Mobile Numbe:</strong> {data.mobileNumber}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Role:</strong> {data.role}
          </p>
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state);
  const { data } = state.user;
  const { employees, width, height } = state.user;

  return {
    data,
    employees,
    width,
    height,
  };
}

export default connect(mapStateToProps)(Profile);
