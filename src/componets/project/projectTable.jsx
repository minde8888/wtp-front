import { useState, useEffect, useRef, useCallback  } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProjects } from "../../redux/actions/projectData";

const  ProjectTable = (props) => {
  const [action, setClickedOutside] = useState(false);

  const ref = useRef(null);
  const { id, name, project, address, status } = props.item;



  useEffect(() => {
    console.log(111);
    props.dispatch(getAllProjects())
    // window.addEventListener('click', handleOutsideClick);
    // return () => window.removeEventListener('click', handleOutsideClick);
  });

  const onChange = (e) => {
    console.log(e.target);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className !== "tb ") {
      setClickedOutside(false);
    } else {
      if (ref.current.attributes[1].value === e.target.attributes[1].value) {
        setClickedOutside(ref.current !== e.target);
      } else {
        setClickedOutside(false);
      }
    }
  };

  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = (e) => {
        //   console.log(!ref.current.contains(e.target));
          console.log(ref.current);
        if (!ref.current || ref.current.contains(e.target)) {
          return;
        }

        handler(e);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  };

  const handler = useCallback(() => console.log(`Click Outside`), []);
  useOnClickOutside(ref, handler);

  return (
    <>
      <tr>
        <td className="btn btn-outline-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <NavLink className="detail-icon" to="#"></NavLink>
        </td>
        <td className="bs-checkbox">
          <label>
            <input
              data-index="0"
              name="btSelectItem"
              type="checkbox"
              value="0"
            />
          </label>
        </td>
        <td
          ref={ref}
          className={`tb ${action ? "d-none" : ""}`}
          onDoubleClick={handleOutsideClick}
          value={id}
        >
          {project}
        </td>
        <td onChange={onChange} className={action ? "" : "d-none"}>
          <input type="text" value={1} />
        </td>
        <td
          ref={ref}
          className={`tb ${action ? "d-none" : ""}`}
          onDoubleClick={handleOutsideClick}
          value={id}
        >
          {name}
        </td>
        <td onChange={onChange} className={action ? "" : "d-none"}>
          <input type="text" value={2} />
        </td>
        <td
          ref={ref}
          className={`tb ${action ? "d-none" : ""}`}
          onDoubleClick={handleOutsideClick}
          value={id}
        >
          {address}
        </td>
        <td onChange={onChange} className={action ? "" : "d-none"}>
          <input type="text" value={3} />
        </td>
        <td
          ref={ref}
          className={`tb ${action ? "d-none" : ""}`}
          onDoubleClick={handleOutsideClick}
          value={id}
        >
          {status}
        </td>
        <td onChange={onChange} className={action ? "" : "d-none"}>
          <input type="text" value={4} />
        </td>
      </tr>
    </>
  );
};

function mapStateToProps(state) {
  const {} = state.user;

  return {};
}

export default connect(mapStateToProps)(ProjectTable);
