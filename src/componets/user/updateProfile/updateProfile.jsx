import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  newFile,
  updateprofile,
} from "../../../redux/actions/updateUserProfile";
import { getImageSize } from "../../../hjelpers/getImageSize";
import "./updateProfile";
import userImage from "../../../image/user.png";
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
    role,
    id,
  } = props.user;

  const { fileSrc, message, ImageFile } = props;
  useEffect(() => fileSrc);

  const onFileChange = async (e) => {
    var file = e.target.files[0];
    props.dispatch(newFile(file));
  };

  const onSubmit = async (managerUpdate) => {
    const { dispatch } = props;

    let obj = {
      phoneNumber: mobileNumber,
      email: email,
      role: role,
    };

    if (ImageFile) {
      const profile = "Profile_image";
      var imageSize = await getImageSize(ImageFile, profile);
      managerUpdate = {
        ...managerUpdate,
        ...obj,
        ...{ ImageFile },
        ...{ ImageName: ImageFile.name },
        ...imageSize,
      };

      dispatch(updateprofile(id, managerUpdate));
    } else {
      var imgName = document.querySelector("#getValue").getAttribute("alt");

      managerUpdate = {
        ...managerUpdate,
        ...{ ImageName: imgName },
        ...obj,
      };
      dispatch(updateprofile(id, managerUpdate));
    }
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
          id="getValue"
          src={
            typeof fileSrc === "string"
              ? fileSrc
              : typeof imageSrc === "string"
              ? imageSrc
              : userImage
          }
          alt={imageName}
          width="193"
          height="130"
        />
        <input type="file" onChange={(e) => onFileChange(e)} />
        <input {...register("Name")} defaultValue={name} />
        <input {...register("Surname")} defaultValue={surname} />
        <input {...register("Occupation")} defaultValue={occupation} />
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
  const { updateManager, ImageFile, message, userIsLoadied, fileSrc } =
    state.updateUser;
  const { user } = state.auth.data;

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
