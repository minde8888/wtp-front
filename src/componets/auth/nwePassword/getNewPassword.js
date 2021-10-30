import React, { Component } from "react";
import GetNewPasswordContainer from "./getNewPasswordContainer"


class GetNewPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: "",
            email: "",
        };
    };

    componentDidMount() {
        var search = window.location.search;
        var params = new URLSearchParams(search)

        this.setState({
            token: params.get("token"),
            email: params.get("email")
        });
    }

    componentDidUpdate(prevProps, prevState) {
        var search = window.location.search;
        var params = new URLSearchParams(search)

        const { token, email } = this.state;
        if (token != params.get("token") &&
            email != params.get("email")) {
            this.setState({
                token: null,
                email: null
            });
        }
    }

    render = () => {
        const { token, email } = this.state;
        return (
            <div>
                {email && token ? (<div>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <GetNewPasswordContainer {...this.state} />
                            </div>
                        </div>
                    </div>

                </div>) : (null)}
            </div>
        )
    }
}


export default GetNewPassword;
