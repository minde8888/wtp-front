import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  newFile,
  updateProfile,
} from "../../../redux/actions/updateUserProfile";
import { getImageSize } from "../../../helpers/getImageSize";
import { clearMessage, setMessage } from "../../../redux/actions/message";
import "./updateProfile";
import userImage from "../../../image/user.png";
import Image from "react-bootstrap/Image";
import "./updateProfile.scss";

const UpdateProfile = (props) => {
  const { register, handleSubmit } = useForm();

  const {
    mobileNumber,
    name,
    surname,
    imageSrc,
    occupation,
    imageName,
    email,
    role,
    id,
  } = props.data;

  useEffect(() => props.data, [props.data]);

  const { city, country, street, zip } = props.data.address;
  const { fileSrc, imageFile, width, height, userIsLoaded } = props;
  const { message } = props.message;

  const onFileChange = async (e) => {
    var file = e.target.files[0];
    const profile = "Profile_image";
    var imageSize = await getImageSize(file, profile);
    props.dispatch(newFile(file, imageSize.Width, imageSize.Height));
  };

  const onSubmit = async (managerUpdate) => {
    const { dispatch } = props;

    let obj = {
      phoneNumber: mobileNumber,
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
      },
    };

    if (imageFile) {
      managerUpdate = {
        ...obj,
        ...{ imageFile },
        ...{ ImageName: imageFile.name },
        ...{ width: width, height: height },
      };

      dispatch(updateProfile(id, managerUpdate));
      dispatch(setMessage("Profile updated successfully !"));
    } else {
      var imgName = document.querySelector("#getValue").getAttribute("alt");
      managerUpdate = {
        ...{ ImageName: imgName },
        ...obj,
      };
      dispatch(updateProfile(id, managerUpdate));
      dispatch(setMessage("Profile updated successfully !"));
    }
    setTimeout(() => dispatch(clearMessage()), 1000);
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <Image
                className="rounded-circle mt-5"
                width={width !== 0 ? width : null}
                height={height !== 0 ? height : null}
                id="getValue"
                src={
                  typeof fileSrc === "string"
                    ? fileSrc
                    : imageSrc !== "https://localhost:44395/Images/"
                    ? imageSrc
                    : userImage
                }
                alt={imageName}
              />
              <span className="font-weight-bold">
                {name} {surname}
              </span>
              <span className="text-black-50">{email}</span>
              <label htmlFor="file-upload" className="custom-file-upload">
                Change profile image
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={(e) => onFileChange(e)}
              />
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    {...register("Name")}
                    defaultValue={name}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="surname"
                    {...register("Surname")}
                    defaultValue={surname}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Occupation</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter occupation"
                    {...register("Occupation")}
                    defaultValue={occupation}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Street</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter street"
                    {...register("Street")}
                    defaultValue={street}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter city"
                    {...register("City")}
                    defaultValue={city}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter country"
                    {...register("Country")}
                    defaultValue={country}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Postcode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter postcode"
                    {...register("Zip")}
                    defaultValue={zip}
                  />
                </div>
              </div>
              {message && (
                <div className="form-group">
                  <div
                    className={
                      userIsLoaded ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <div className="mt-5 text-center">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  const { imageFile, userIsLoaded, data, width, height} = state.user;
  const { message } = state;
  return {
    width,
    height,
    imageFile,
    message,
    userIsLoaded,
    data,
  };
}

export default connect(mapStateToProps, null)(UpdateProfile);
