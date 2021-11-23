import React, { useState, useEffect } from "react";
import { newFile } from "../../redux/actions/updateUserProfile";
import { connect } from "react-redux";

const ProfileImage = (props) => {

  const [img, setImg] = useState(null);

  useEffect(() => {
    props.dispatch(newFile(img));
  });

  const sendImage = () => {

  }

  async function getImageSize(file) {
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();
      reader.onload = () => {
        var image = new Image();
        image.onload = () => {
          setImg({ width: image.width, height: image.height, image :file });
          image.onload = null;
        };
        image.src = reader.result;
        reader.onload = null;
      };
      reader.readAsDataURL(file);
    }
  }
  const onFileChange = async (e) => {
    var ImageFile = e.target.files[0];
    getImageSize(ImageFile);
  };
  return <input type="file" onChange={(e) => onFileChange(e)} />;
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

export default connect(mapStateToProps)(ProfileImage);
