import  SignupContainer  from './singupContainer';

const Signup = () => {
    return (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <SignupContainer />
            </div>
            <div className="col-md-7 my-auto">
              <img className="img-fluid w-100" alt=""/>
            </div>
          </div>
        </div>
      );
};

export default Signup;
