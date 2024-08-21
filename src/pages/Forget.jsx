import { useContext } from "react";
import instance from "../api/instrance";
import { useToastState } from "../context";
import { Link } from "react-router-dom";
import { Loader } from "../components";
import { UIContext } from "../context/ui";

export const Forget = () => {
  const { dispatch } = useToastState();
  const { loading, setLoading } = useContext(UIContext);
  const handleForget = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await instance.post("/user/forget-password", {
        email: formData.get("email"),
      });
      dispatch({ type: "SUCCESS", payload: res.data?.message });
      e.target.reset();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response?.data?.message });
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div className="relative flex  justify-center min-h-screen overflow-hidden">
      <div className=" w-[40%] bg-secondary h-screen p-[40px] flex flex-col justify-between">
        <div></div>
        <div className="flex flex-col gap-4">
          <h2 class="text-white font-inter text-2xl font-bold leading-7 text-left">
            Welcome to IJT Reporting
          </h2>
          <p class="text-white font-inter text-base font-normal leading-7 text-left">
            Get better view of your activities and manage your nazims in an easy
            way. Report your activities here.
          </p>
        </div>
      </div>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <div className="w-full flex items-center justify-center">
          <img src="/logo.png" className="h-[104px] w-[142px]" alt="LOGO" />
        </div>
        <form className="space-y-4" onSubmit={handleForget}>
          <div>
            <label className="label">
              <span className="text-heading font-inter text-[14px] leading-5">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full text-secondaryText border outline-none border-inputBorder rounded p-2 text-[16px] leading-6 font-inter"
            />
          </div>
          <div className="flex items-center w-full">
            <Link
              to="/login"
              className="w-[40%] font-inter text-sm font-medium leading-6 text-center"
            >
              Back to login
            </Link>
            <div className="w-[60%]">
              <button
                disabled={loading}
                className="bg-primary text-white py-2 rounded w-full"
                type="submit"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};
