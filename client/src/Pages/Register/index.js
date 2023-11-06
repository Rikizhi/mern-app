import React from "react";
import './register.scss';
import { registerbg } from "../../Assets";
import { Input, Button, Gap, Link } from "../../Components";

const Register = () => {
  return (
    <div className="main-page">
      <div className="left">
        <img src={registerbg} className="bg-image" alt="imagebg"/>
      </div>
      <div className="right">
        <p className="title">Sign Up</p>
        <Input label= "" placeholder="Username" />
        <Gap height={18} />
        <Input label="" placeholder="Email" />
        <Gap height={18} />
        <Input label="" placeholder="password" />
        <Gap height={18} />
        <Gap height={50} />
        <Button title="Sign Up" />
        <Gap height={50} />
        <div className="account-link">
        <span>Already have an account?</span>
        <Link title="Log in" />
        </div>
      </div>
    </div>
  );
};

export default Register;
