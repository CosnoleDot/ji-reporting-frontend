import { useNavigate } from "react-router-dom";
import { Logo } from "../assets/png";
import { useEffect, useState } from "react";
import { toJson } from "../utils";
import instance from "../api/instrance";
import { Layout } from "../theme/Layout";

export const UpdateProfile = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();
  //   const [password, setPassword] = useState("");
  //   const [cPassword, setCPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = toJson(formData);
    const { id } = data;
    delete data.id;

    instance
      .put(`/user/${id}`, data, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const UserData = async () => {
    try {
      instance
        .get("user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        })
        .then((res) => setData(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    UserData();
  });
  return (
    <Layout>
      <div className="w-full h-full flex justify-center items-center xs:overflow-hidden">
        <div className=" bg-white shadow-md rounded-lg w-4/5 xs:w-full">
          <div className="flex bg-blue text-white justify-start gap-4 items-center font-bold  text p-4 text-3xl">
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <svg
                class="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
            </div>
            <h2 className="">Edit Profile</h2>
          </div>
          <div className="p-6">
            {/* <div className="flex flex-col items-center mb-6 ">
          <div class="relative w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              class="absolute w-36 h-36 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold">Profile Photo</h3>
            <p className="text-gray-600 text-sm mb-2">
              <i> Accepted file type: .png. File size: Less than 1MB</i>
            </p>
            <label
              htmlFor="fileInput"
              className="bg-blue text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer"
            >
              Change
            </label>
            <input id="fileInput" className="hidden" type="file" />
          </div>
        </div> */}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-6 mb-4 lg:mb-12">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 px-4 rounded-lg"
                    placeholder="Enter your name"
                    defaultValue={data?.name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 px-4 rounded-lg"
                    placeholder="Enter your email address"
                    defaultValue={data?.email}
                  />
                </div>
              </div>
              <input type="hidden" name="id" value={data?._id} />
              <div className="grid grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 gap-6">
                <div>
                  <label htmlFor="age" className="block font-semibold mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="w-full bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 px-4 rounded-lg"
                    placeholder="Enter your age"
                    defaultValue={data?.age}
                  />
                </div>
              </div>

              {/* <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block font-semibold mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="confirmPassword"
                    id="confirmPassword"
                    className="w-full bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 px-4 rounded-lg"
                    placeholder="Confirm Password"
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                  <label className="label">
                    <span></span>
                    {cPassword == password && password?.split().length > 0 ? (
                      <span className="label-text-alt text-blue">
                        Password matched!
                      </span>
                    ) : (
                      <span className="label-text-alt text-orange">
                        Password not matched!
                      </span>
                    )}
                  </label>
                </div>
              </div> */}

              <div className="flex justify-end">
                <button
                  className="bg-blue text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
                  type="submit"
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray text-gray-700 py-2 px-6 ml-4 rounded-lg hover:bg-gray-300"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
