import { useEffect, useState } from "react";
import logo from "../assets/png/download3.png";
import instance from "../api/instrance";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [keyParam, setKeyParam] = useState(null);
  const [resetPassword, setResetPassword] = useState({
    password1: "",
    password2: "",
    key: "",
  });

  const navigate = useNavigate();
  const handleReset = () => {
    instance
      .post("/user/reset-password",  resetPassword )
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          navigate("/");
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const key = queryParams.get("key");
    setResetPassword({ ...resetPassword, key: key });
  }, []);

  return (
    <div className="w-full h-screen  bg-[#E9EBEF]">
      <div className="w-full  xl:w-1/2 lg:w-1/2  md:w-1/2 h-screen flex flex-col p-3">
        <div className="bg-[#E9EBEF] w-full h-auto mt-10  flex flex-col  items-center  ">
          <img src={logo} alt="" className="w-40 h-32 bg-[#E9EBEF]  " />
          <h1 className="text-2xl font-bold text-center">Login Please</h1>
        </div>
        <div className="mb-6 mt-6 ">
          <label htmlFor="password1" className="opacity-70 font-medium">
            New Password
          </label>
          <input
            type="password"
            className="w-full  p-2 rounded-lg mt-2"
            placeholder="New Password"
            name="password1"
            id="password1"
            value={resetPassword.password1}
            onChange={(e) => {
              setResetPassword({
                ...resetPassword,
                password1: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-6 ">
          <label htmlFor="password2" className="opacity-70 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Confirm Password"
            id="password2"
            name="password2"
            value={resetPassword.password2}
            onChange={(e) => {
              setResetPassword({
                ...resetPassword,
                password2: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col">
          <button
            className="w-full bg-[#049cfc] p-2 text-white font-bold mb-5 rounded-lg"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
