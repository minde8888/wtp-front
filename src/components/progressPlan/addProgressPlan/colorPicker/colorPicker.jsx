import React, { Component, createRef } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import { addColor } from "../../../../redux/actions/progressPlan";
import store from "../../../../redux/store";

class SketchColor extends Component {
  constructor(props) {
    super(props);
    this.colorRef = createRef();
    this.defaultObj = {
      r: "74",
      g: "144",
      b: "226",
      a: "1",
    };
    store.dispatch(addColor(this.defaultObj, this.colorRef));
  }

  state = {
    displayColorPicker: false,
    color: this.defaultObj,
  };


  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    let obj = {
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
      a: color.rgb.a,
    };
    store.dispatch(addColor(obj, this.colorRef));
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        popover: {
          display: "none",
          zIndex: "3",
          position: "fixed",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div ref={this.colorRef} style={styles.popover} >
        <div onClick={this.handleClose} />
        <SketchPicker
          color={this.state.color}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SketchColor;
