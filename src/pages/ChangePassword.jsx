import { useNavigate } from "react-router-dom";
import instance from "../api/instrance";
import { GeneralLayout } from "../components";
import { useToastState } from "../context";

export const ChangePassword = () => {
  const { dispatch } = useToastState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const req = await instance.put(
        "/user/change-password",
        {
          password0: formData.get("password0"),
          password1: formData.get("password1"),
          password2: formData.get("password2"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      e.target.reset();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
  };
  return (
    <GeneralLayout active={'changePassword'}>
      <div className=" flex flex-col  justify-center  overflow-hidden h-[calc(100vh-65.6px)] overflow-y-scroll">
        <div className="flex md:flex-row flex-col w-full items-center justify-between px-8 mb-4 border-b border-inputBorder">
          <div className="flex flex-col justify-start w-full p-4 md:mb-0 mb-4">
            <h1 class="font-inter text-heading text-[18px] font-medium leading-[28px] text-left">
              Change Password
            </h1>
            <p class="font-inter text-[14px] font-normal leading-[20px] text-left text-secondaryText">
              Change password to amke it secure
            </p>
          </div>
        </div>
        <div className="w-full bg-white p-4 rounded-md lg:max-w-lg">
          <form className="flex flex-col px-8" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span class="font-inter text-[14px] font-medium leading-[20px] text-left text-heading">
                  Current Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Current Password"
                className="w-full text-secondaryText border outline-none border-inputBorder rounded p-2 text-[14px] leading-6 font-inter"
                name="password0"
                minLength={4}
                required
              />
            </div>
            <div>
              <label className="label">
                <span class="font-inter text-[14px] font-medium leading-[20px] text-left text-heading">
                  New Password
                </span>
              </label>
              <input
                type="password"
                placeholder="New Passowrd"
                className="w-full text-secondaryText border outline-none border-inputBorder rounded p-2 text-[14px] leading-6 font-inter"
                name="password1"
                minLength={4}
                required
              />
            </div>
            <div>
              <label className="label">
                <span class="font-inter text-[14px] font-medium leading-[20px] text-left text-heading">
                  Confirm New Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full text-secondaryText border outline-none border-inputBorder rounded p-2 text-[14px] leading-6 font-inter"
                minLength={4}
                name="password2"
                required
              />
            </div>
            <div className="flex w-[50%] items-center gap-2 mt-4">
              <button className="text-[14px] leading-6 font-medium font-inter w-full text-white bg-primary py-2 border rounded">Save</button>
              <button onClick={()=> navigate('/profile')} className="text-[14px] leading-6 font-medium font-inter w-full text-heading bg-white py-2 border border-inputBorder rounded">Go Back</button>

            </div>
          </form>
        </div>
      </div>
    </GeneralLayout>
  );
};
