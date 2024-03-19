import { useContext, useEffect, useState } from "react";
import instance from "../api/instrance";
import { useToastState } from "../context";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../components";
import { UIContext } from "../context/ui";

export const ResetPassword = () => {
  const { dispatch } = useToastState();
  const { loading, setLoading } = useContext(UIContext);
  const [key, setKey] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    if (queryParams.get("key")) {
      setKey(queryParams.get("key"));
    }
  }, []);
  const handleReset = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await instance.post("/user/reset", {
        password1: formData.get("passwrod1"),
        password2: formData.get("passwrod1"),
        key: key,
      });
      dispatch({ type: "SUCCESS", payload: res.data?.message });
      e.target.reset();
      navigate("/login");
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <div className="w-full flex items-center justify-center">
          <img src="/logo.png" className="text-center" alt="LOGO" />
        </div>
        <form className="space-y-4" onSubmit={handleReset}>
          <div>
            <label className="label">
              <span className="text-base label-text">Passwrod</span>
            </label>
            <input
              type="passwrod1"
              name="passwrod1"
              placeholder="Passwrod"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="passwrod2"
              name="passwrod2"
              placeholder="Passwrod2"
              className="w-full input input-bordered input-primary"
            />
          </div>

          <div>
            <button
              disabled={loading}
              className="btn btn-primary"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};
