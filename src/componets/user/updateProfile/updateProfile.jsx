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
    phoneNumber,
    name,
    surname,
    imageSrc,
    occupation,
    imageName,
    email,
    role,
    id,
  } = props.user;
  const { city, country, street, zip } = props.user.address;

  const { fileSrc, message, ImageFile } = props;
  useEffect(() => fileSrc);

  const onFileChange = async (e) => {
    var file = e.target.files[0];
    props.dispatch(newFile(file));
  };

  const onSubmit = async (managerUpdate) => {
    const { dispatch } = props;

    let obj = {
      phoneNumber:phoneNumber,
      email: email,
      role: role,
      name: managerUpdate.Name,
      surname: managerUpdate.Surname,
      occupation: managerUpdate.Occupation,
      address: {
        city: managerUpdate.City,
        country: managerUpdate.Country,
        street: managerUpdate.Street,
        zip: managerUpdate.Zip,
      }      
    };
    console.log(obj);
    if (ImageFile) {
      const profile = "Profile_image";
      var imageSize = await getImageSize(ImageFile, profile);
      managerUpdate = {
        ...obj,
        ...{ ImageFile },
        ...{ ImageName: ImageFile.name },
        ...imageSize,
      };

      dispatch(updateprofile(id, managerUpdate));
    } else {
      var imgName = document.querySelector("#getValue").getAttribute("alt");

      managerUpdate = {
        ...{ ImageName: imgName },
        ...obj,
      };
      dispatch(updateprofile(id, managerUpdate))
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
              : imageSrc !== "https://localhost:44395/Images/"
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
        <input {...register("Street")} defaultValue={street} />
        <input {...register("City")} defaultValue={city} />
        <input {...register("Country")} defaultValue={country} />
        <input {...register("Zip")} defaultValue={zip} />
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
