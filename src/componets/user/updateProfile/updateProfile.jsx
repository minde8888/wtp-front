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
    PhoneNumber,
    Id,
  } = props.user;

  const { fileSrc, message, ImageFile } = props;
  useEffect(() => fileSrc);

  const onFileChanges = (e) => {
    console.log(e.target.offsetWidth, e.target.offsetHeight, e);
    var ImageFile = e.target.files[0];
    props.dispatch(newFile(ImageFile));
  };

  const onSubmit = (managerUpdate) => {
    const { dispatch } = props;
    managerUpdate = { ...managerUpdate, ...{ ImageFile }, ...{ImageName : ImageFile.name} };
    dispatch(updateprofile(Id, managerUpdate));
  };
console.log(props);
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
        <input type="file" onChange={(e) => onFileChanges(e)} />
        <input {...register("Name")} defaultValue={Name} />
        <input {...register("Surname")} defaultValue={Surname} />
        <input {...register("Occupation")} defaultValue={Occupation} />
        <input {...register("PhoneNumber")} defaultValue={PhoneNumber} />
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
  const { updateManager, ImageFile, message, userIsLoadied, fileSrc } = state.updateUser;
  const { user } = state.auth;
  return {
    updateManager,
    ImageFile,
    message,
    userIsLoadied,
    fileSrc,
    user,
  };
}

export default connect(mapStateToProps)(UpdateProfile);
