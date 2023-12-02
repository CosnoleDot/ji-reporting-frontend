import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useToastState } from "../context";
import instance from "../api/instrance";
import { Loader } from "../components";

export const Reset = () => {
  const { dispatch } = useToastState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState({
    password1: "",
    password2: "",
    key: "",
  });
  const navigate = useNavigate();
  const handleReset = async () => {
    setLoading(true);

    try {
      if (!resetPassword.key) {
        setLoading(false);
        dispatch({ type: "ERROR", payload: "Recheck The Link In Your Email" });
      }

      const resetRes = await instance.post(
        "/user/reset-password",
        resetPassword
      );

      if (resetRes.status === 200) {
        const email = resetRes?.data?.data?.email;

        const loginRes = await instance.post(
          "/user/login",
          {
            email,
            password: resetPassword.password1,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const { token, type } = loginRes?.data?.data;

        localStorage.setItem("@token", token);
        localStorage.setItem("@type", type);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      const message = error?.response?.data?.message || error.message;
      dispatch({ type: "ERROR", payload: message });
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const key = queryParams.get("key");
    if (!key) {
      navigate("/login");
    }
    setResetPassword({ ...resetPassword, key: key });
  }, []);

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <div className="w-full flex items-center justify-center">
          <img src="/logo.png" className="text-center" alt="LOGO" />
        </div>
        <div>
          <div>
            <label className="label">
              <span className="text-base label-text">New Password</span>
            </label>
            <input
              type="text"
              name="password1"
              id="password1"
              placeholder="New Password"
              className="w-full input input-bordered input-primary"
              onChange={(e) => {
                setResetPassword({
                  ...resetPassword,
                  password1: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm New Password</span>
            </label>
            <input
              type="text"
              name="password2"
              id="password2"
              placeholder="Confirm New Password"
              className="w-full input input-bordered input-primary"
              onChange={(e) => {
                setResetPassword({
                  ...resetPassword,
                  password2: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={handleReset}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};
