import { GeneralLayout } from "../components";

export const ChangePassword = () => {
  return (
    <GeneralLayout>
      <div className="relative flex flex-col justify-center h-[calc(100vh-65.6px-64px)]">
        <div className="w-full p-6 m-auto bg-white rounded-md lg:max-w-lg">
          <h3 className="font-bold text-2xl">Change Password</h3>
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Current Password</span>
              </label>
              <input
                type="password"
                placeholder="Current Password"
                className="w-full input input-bordered input-primary"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">New Password</span>
              </label>
              <input
                type="password"
                placeholder="New Passowrd"
                className="w-full input input-bordered input-primary"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">
                  Confirm New Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full input input-bordered input-primary"
              />
            </div>
            <div>
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </GeneralLayout>
  );
};
