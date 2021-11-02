import React, { Component } from "react";
import GetNewPasswordContainer from "./getNewPasswordContainer";
import { history } from "../../../hjelpers/history";

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
        var token = params.get("token")

        this.setState({
            token: token ? token.replace(/ /g, "+") : token = null,
            email: params.get("email")
        });

    }

    componentDidUpdate(prevProps, prevState) {

        history.listen((location, action) => {
            var search = window.location.search;
            var params = new URLSearchParams(search)

            const { token, email } = this.state;
            if (token !== params.get("token") &&
                email !== params.get("email")) {
                ;
                this.setState({
                    token: null,
                    email: null
                });
            }
        })
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
