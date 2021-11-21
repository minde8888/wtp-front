import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
// import uplod from "../../../svg/upload.svg";
import userImage from "../../../image/user.png";
import {
  newFile,
  updateprofile,
} from "../../../redux/actions/updateUserProfile";
import "./updateProfile";
import Image from "react-bootstrap/Image";

const UpdateProfile = (props) => {
  const { register, handleSubmit } = useForm();

  const {
    name,
    surname,
    imageSrc,
    occupation,
    imageName,
    email,
    mobileNumber,
    id,
  } = props.user;

  const { fileSrc, message, ImageFile, token } = props;
  useEffect(() => fileSrc);

  const onFileChange = (e) => {
    console.log(e.target.offsetLeft);
    console.log(e.target.offsetLeft);
    var ImageFile = e.target.files[0];
    props.dispatch(newFile(ImageFile));
  };

  const onSubmit = (managerUpdate) => {
    const { dispatch } = props;
    managerUpdate = {
      ...managerUpdate,
      ...{ ImageFile },
      ...{ ImageName: ImageFile.name },
    };
    dispatch(updateprofile(id, managerUpdate, token));
  };

  return (
    <div className="form-group">
      <header className="jumbotron">
        <h3>
          <strong>Update Profile</strong>
          <div>{name}</div>
        </h3>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Image
          src={
            !fileSrc.lenght ? fileSrc : !imageSrc.lenght ? imageSrc : userImage
          }
          alt={imageName}
          width="193"
          height="130"
        />
        <input type="file" onChange={(e) => onFileChange(e)} />
        <input {...register("Name")} defaultValue={name} />
        <input {...register("Surname")} defaultValue={surname} />
        <input {...register("Occupation")} defaultValue={occupation} />
        <input {...register("PhoneNumber")} defaultValue={mobileNumber} />
        <input {...register("Email")} defaultValue={email} />
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
  const { updateManager, imageFile, message, userIsLoadied, fileSrc } =
    state.updateUser;
  const { user, token } = state.auth;
  return {
    updateManager,
    imageFile,
    message,
    userIsLoadied,
    fileSrc,
    user,
    token,
  };
}

export default connect(mapStateToProps)(UpdateProfile);
