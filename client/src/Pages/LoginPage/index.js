import React from "react";
import '../Register/register.scss'
import { loginbg } from "../../Assets";
import { Gap, Input, Button, Link } from "../../Components";

const LoginPage = () => {
  return (
    <div className="main-page">
      <div className="left">
        <img src={loginbg} className="bg-image" alt="imagebg" />
      </div>
      <div className="right">
        <p className="title">Login</p>
        <Input label="" placeholder="Email" />
        <Gap height={18} />
        <Input label="" placeholder="Password" />
        <Gap height={18} />
        <Gap height={50} />
        <Button title="Login" />
        <Gap height={50} />
        <div className="account-link">
        <span>Don't have an account?</span>
        <Link title="Signup" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
