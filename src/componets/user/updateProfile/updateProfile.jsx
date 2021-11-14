import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import uplod from "../../../svg/upload.svg";
import userImage from "../../../image/user.png";
import {
  newFile,
  updateprofile,
} from "../../../redux/actions/updateUserProfile";
import "./updateProfile";

const UpdateProfile = (props) => {
  const { register, handleSubmit } = useForm();

  const {
    Name,
    Surname,
    ImageSrc,
    Occupation,
    ImageName,
    Email,
    MobileNumber,
    Id,
  } = props.user;

  const { fileSrc, message, file } = props;
  useEffect(() => fileSrc);

  const onFileChanges = (file) => {
    props.dispatch(newFile(file));
  };

  const onSubmit = (data) => {
    const { dispatch } = props;
    data = { ...data, ...{ file }, ...{Id} };
    dispatch(updateprofile(data));
  };

  return (
    <div className="form-group">
      <header className="jumbotron">
        <h3>
          <strong>Update Profile</strong>
          <div>{Name}</div>
        </h3>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img
          src={
            ImageSrc !== null
              ? ImageSrc
              : fileSrc !== null
              ? fileSrc
              : userImage
          }
          alt={ImageName}
        />
        <input type="file" onChange={(e) => onFileChanges(e.target.files[0])} />
        <input {...register("Name")} defaultValue={Name} />
        <input {...register("Surname")} defaultValue={Surname} />
        <input {...register("Occupation")} defaultValue={Occupation} />
        <input {...register("MobileNumber")} defaultValue={MobileNumber} />
        <input {...register("Email")} defaultValue={Email} />
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  const { data, file, message, userIsLoadied, fileSrc } = state.updateUser;
  const { user } = state.auth;
  return {
    data,
    file,
    message,
    userIsLoadied,
    fileSrc,
    user,
  };
}

export default connect(mapStateToProps)(UpdateProfile);
