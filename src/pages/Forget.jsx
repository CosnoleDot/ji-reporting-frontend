import { useState } from "react";
import instance from "../api/instrance";
import { toJson } from "../utils";
export const Forget = () => {
  const handleForget = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      instance
        .post("/user/forget-password", { email: formData.get("email") })
        .then((res) => {
          alert("successful");
        });
      e.target.reset();
    } catch (error) {
      alert("error");
    }
  };
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <div className="w-full flex items-center justify-center">
          <img src="/logo.png" className="text-center" alt="LOGO" />
        </div>
        <form className="space-y-4" onSubmit={handleForget}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <a
            href="/login"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Back to login
          </a>
          <div>
            <button className="btn btn-primary" type="submit">
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
