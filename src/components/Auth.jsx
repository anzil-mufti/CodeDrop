import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../helpers/appwrite";

/* eslint-disable react/prop-types */
const Auth = ({
  title,
  description,
  button,
  bottomQuestion,
  bottomLabel,
  bottomLink,
  email,
  name,
  password,
  setEmail,
  setPassword,
  setName,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    //if a person is logged in and he is still trying to access login and sign up pages, then navigate him to dashboard
    const user = account.get();
    user.then(() => {
      navigate("/");
    });
  }, [navigate]);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* for hello, ---name */}
            {setName && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password (Min. 8 characters)</span>
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {button}
            <span className="text-center">
              {bottomQuestion}
              <br />
              <Link to={bottomLink} className="link">
                {bottomLabel}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;