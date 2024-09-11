import { useContext, useEffect, useState, useRef } from "react";
import { GeneralLayout } from "../components";
import instance from "../api/instrance";
import { MeContext, useToastState } from "../context";
import { UIContext } from "../context/ui";
import { decryptData } from "../utils";
import logo from "../assets/jpgs/profile.png";
import { IoCameraOutline } from "react-icons/io5";
import axios from "axios";

import { useNavigate } from "react-router-dom";
export const EditProfile = () => {
  const me = useContext(MeContext);
  const { setLoading } = useContext(UIContext);
  const { getMe } = useContext(UIContext);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [file, setFile] = useState();
  const { dispatch } = useToastState(); 
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return; // Do nothing if no image
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      const response = await axios.post(
        `http://localhost:5000/api/v1/user/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        }
      );
      return dispatch({ type: "SUCCESS", payload: response?.data?.message });
    } catch (error) {
      console.log("Error occurred", error);
      throw error;
    }
    setLoading(false);

  };
  const updateImage = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      const response = await axios.put(
        `http://localhost:5000/api/v1/user/upload/${me?.profileImage}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        }
      );
      dispatch({ type: "SUCCESS", payload: response?.data?.message });
      return  window.location.reload(); 
    } catch (error) {
      console.log("Error occurred", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const req = await instance.put(
        `/user`,
        {
          email: formData.get("email"),
          name: formData.get("name"),
          age: formData.get("age"),
          fatherName: formData.get("fatherName"),
          dob: formData.get("dob"),
          address: formData.get("address"),
          qualification: formData.get("qualification"),
          subject: formData.get("subject"),
          semester: formData.get("semester"),
          institution: formData.get("institution"),
          phoneNumber: formData.get("phoneNumber"),
          whatsAppNumber: formData.get("whatsAppNumber"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      await getMe();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
  };

  const getSubjects = async () => {
    try {
      const request = await instance.get("/subjects", {
        headers: { "Content-Type": "application/json" },
      });
      if (request.status === 200) {
        setSubjects([...request.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSelectedSubject(value);
  };

  const addNewSubjectCall = async () => {
    document.getElementById("subject").setAttribute("disabled", true);
    try {
      const request = await instance.post("/subjects", {
        headers: { "Content-Type": "application/json" },
        title: subject,
      });

      if (request.status === 201) {
        await getSubjects();
        document.getElementById("subject").removeAttribute("disabled");
      }
    } catch (error) {
      console.log(error);
      document.getElementById("subject").removeAttribute("disabled");
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    const sub = subjects.find((f) => f?._id === me?.subject);
    setSubject(sub?.title);
  }, [me?.subject, subjects]);

  useEffect(() => {
    setSelectedSubject(me?.subject);
  }, [me]);

  return (
    <GeneralLayout active={"profile"}>
      <div className="flex flex-col justify-start  overflow-hidden overflow-y-scroll">
        <div className="w-full flex   justify-between  items-center p-4">
          <div className="w-full  flex flex-col">
            <h1 className="text-2xl font-bold text-start ">Edit Profile</h1>
            <p className="text-gray-500">Edit Your Profile</p>
          </div>
          <div className="flex justify-end w-full  overflow-hidden overflow-x-scroll">
            <button onClick={()=> navigate("/change-password")} className="py-1 px-4 rounded-md bg-primary text-white border-none capitalize md:text-[16px] text-[12px]">
              Change Password
            </button>
          </div>
        </div>
        <div className="divider mt-0 mb-0"></div>
        <div className="w-full flex  md:flex-row flex-col-reverse justify-start gap-3">
          <div className="w-full md:w-[65%]  p-6 m-auto bg-white rounded-md  ">
            {me && (
              <form className="space-y-4 mb-12" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-start items-center w-full">
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Full Name
                        </span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        className="w-full input input-bordered input-sm font-inter"
                        defaultValue={me?.name}
                      />
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Father Name
                        </span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="No data"
                        name="fatherName"
                        className="w-full input input-bordered input-sm font-inter"
                        defaultValue={me?.fatherName}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-[50%]">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Date of birth
                        </span>
                      </label>
                      <input
                        required
                        type="month"
                        placeholder="No data"
                        name="dob"
                        className="w-full input input-bordered input-sm font-inter "
                        defaultValue={me?.dob?.split("-").slice(0, 2).join("-")}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Qualifications
                        </span>
                      </label>
                      <select
                        required
                        defaultValue={me?.qualification}
                        name="qualification"
                        className="select select-bordered select-sm w-full font-inter"
                      >
                        <option value={""}>Qualification</option>
                        <option value={"matric"}>Matric</option>
                        <option value={"intermediate"}>Intermediate</option>
                        <option value={"bachelors"}>Bachelors</option>
                        <option value={"masters"}>Masters</option>
                        <option value={"phd"}>PHD</option>
                      </select>
                    </div>
                    <div className="w-full relative">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Subject
                        </span>
                      </label>

                      <select
                        required
                        name="subject"
                        id="subject"
                        className="select select-bordered select-sm w-full capitalize font-inter"
                        onChange={handleSubjectChange}
                        defaultValue={selectedSubject}
                      >
                        {me?.subject ? (
                          <option
                            className="capitalize font-inter"
                            value={me?.subject}
                          >
                            {subjects
                              ?.find((i) => i?._id === me?.subject)
                              ?.title.split("_")
                              ?.join(" ")}
                          </option>
                        ) : (
                          <option value={""}>Select Subject</option>
                        )}
                        {subjects
                          ?.filter((i) => i?._id !== me?.subject)
                          ?.map((sub, index) => (
                            <option
                              value={sub?._id}
                              key={index}
                              className="capitalize"
                            >
                              {sub?.title.split("_").join(" ")}
                            </option>
                          ))}
                      </select>
                      <span
                        className="text-sm font-inter absolute top-1 p-1 right-0 text-slate-500 cursor-pointer hover:text-primary hover:font-semibold"
                        onClick={() =>
                          document
                            .getElementById("add_subject_modal")
                            .showModal()
                        }
                      >
                        + Add New
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Semester/Year
                        </span>
                      </label>
                      <select
                        required
                        defaultValue={me?.semester}
                        name="semester"
                        className="select select-bordered select-sm w-full font-inter"
                      >
                        <option value={""}>Semester/Year</option>
                        <option value={"semester 1"}>Semester 1</option>
                        <option value={"semester 2"}>Semester 2</option>
                        <option value={"semester 3"}>Semester 3</option>
                        <option value={"semester 4"}>Semester 4</option>
                        <option value={"semester 5"}>Semester 5</option>
                        <option value={"semester 6"}>Semester 6</option>
                        <option value={"semester 7"}>Semester 7</option>
                        <option value={"semester 8"}>Semester 8</option>
                        <option value={"semester 9"}>Semester 9</option>
                        <option value={"semester 10"}>Semester 10</option>
                        <option value={"semester 11"}>Semester 11</option>
                        <option value={"semester 12"}>Semester 12</option>
                        <option value={"1st year"}>1st Year</option>
                        <option value={"2nd year"}>2nd Year</option>
                        <option value={"3rd year"}>3rd Year</option>
                        <option value={"4th year"}>4th Year</option>
                        <option value={"5th year"}>5th Year</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Institution
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={me?.institution}
                        type="text"
                        placeholder="No data"
                        name="institution"
                        className="w-full input input-bordered input-sm font-inter"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Email
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={me?.email}
                        type="email"
                        placeholder="No data"
                        name="email"
                        className="w-full input input-bordered input-sm font-inter"
                      />
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Age
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={me?.age}
                        type="number"
                        placeholder="No data"
                        name="age"
                        className="w-full input input-bordered input-sm font-inter"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Phone Number
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={decryptData(me?.phoneNumber)}
                        type="text"
                        placeholder="No data"
                        name="phoneNumber"
                        className="w-full input input-bordered input-sm font-inter"
                      />
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          WhatsApp Number
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={decryptData(me?.whatsAppNumber)}
                        type="text"
                        placeholder="No data "
                        name="whatsAppNumber"
                        className="w-full input input-bordered input-sm font-inter"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-start">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold font-inter">
                          Home address
                        </span>
                      </label>
                      <textarea
                        placeholder="No data"
                        name="address"
                        className="w-full input input-bordered font-inter"
                        required
                        defaultValue={decryptData(me?.address)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <button className=" px-4 py-2 rounded-md text-white bg-primary font-inter">
                    Update Account
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="w-full md:w-[30%] bg-white md:h-full flex justify-center items-start mt-[5rem]">
            <div className="border border-[#ccc] w-[90%] md:w-[80%] p-6 bg-white rounded-2xl space-y-4 flex justify-start items-center flex-col">
              <div className="w-[140px] h-[140px] flex justify-center items-center relative border border-dashed border-secondaryText rounded-full">
                <div
                  className="rounded-full w-[130px] h-[130px] bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: image
                      ? `url(${image})` // Display the selected file if available
                      : me?.profileImage
                      ? `url(http://localhost:5000/api/v1/user/upload/${me?.profileImage})` // Display profileImage if available
                      : `url(${logo})`, // Fallback to the logo
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
                <button
                  className="absolute bg-[#f1f1f6] w-8 h-8 flex justify-center items-center rounded-full top-[80%] right-[18%]"
                  onClick={() => fileInputRef.current.click()}
                >
                  <IoCameraOutline className="text-lg" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/jpeg, image/png"
                  onChange={handleImage}
                />
              </div>
              <p className="text-center text-secondaryText">
                Allowed *.jpeg, *.jpg, *.png max size of 5 MB
              </p>
              <div>
                <button
                  onClick={me?.profileImage ? updateImage : uploadImage}
                  className="px-4 py-2 rounded-md bg-primary text-white capitalize"
                >
                  { me?.profileImage
                    ? "Change Profile Picture"
                    : "Upload Profile Picture"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id="add_subject_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg font-inter">Add Subject</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text font-semibold font-inter">
                  Subject
                </span>
              </label>
              <input
                required
                name="subject"
                type="text"
                placeholder="Enter Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full input input-bordered input-sm font-inter"
              />
            </div>
          </div>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              <div className=" w-full flex justify-end gap-3 items-center">
                <button
                  id="close-division-modal"
                  className="p-5 py-3 rounded-md bg-slate-400 font-inter text-white font-semibold border ms-3"
                >
                  Cancel
                </button>
                <button
                  id="close-division-modal"
                  className="btn ms-3 capitalize font-inter"
                  onClick={addNewSubjectCall}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </GeneralLayout>
  );
};
