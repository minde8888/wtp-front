import {  connect } from "react-redux";

const GetToken = (props) => {
    debugger
    return props.state.token
}

function mapStateToProps(state) {
    const {
        token
    } = state.auth;

    return {
        token
    };
}

export default connect(mapStateToProps)(GetToken);