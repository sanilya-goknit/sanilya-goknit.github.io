import React from "react";
import { Auth } from "aws-amplify";

const Login = () => {
  const handleSignin = async () => {
      await Auth.federatedSignIn({ provider: 'Google' });
  };

  return (
    <div className={"container pt-5"}>
      {/*<input className={'form-control mt-2 mb-2'}/>*/}
      {/*<input className={'form-control mt-2 mb-2'} type={"password"} />*/}
      <button className={"form-control mt-2 mb-2"} onClick={handleSignin}>
        Google Login
      </button>
    </div>
  );
};

export default Login