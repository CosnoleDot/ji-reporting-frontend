import { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../components";
import instance from "../api/instrance";
import { MeContext, useToastState } from "../context";
import { UIContext } from "../context/ui";
import { decryptData } from "../utils";
import logo from "../assets/jpgs/profile.jpg";
import { IoCameraOutline } from "react-icons/io5";
export const EditProfile = () => {
  const me = useContext(MeContext);
  const { getMe } = useContext(UIContext);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const { dispatch } = useToastState();
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

  // FETCH ALL SUBJECTS

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
  // ADD NEW SUBJECT CALL
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
    <GeneralLayout active={'profile'}>
      <div className="flex flex-col justify-start h-[calc(100vh-64px-64px)] overflow-hidden overflow-y-scroll">
        <div className="w-full flex   justify-between  items-center p-4">
          <div className="w-full  flex flex-col">
            <h1 className="text-2xl font-bold text-start ">Edit Profile</h1>
            <p className="text-gray-500">Edit Your Profile</p>
          </div>
          <div className="flex md:flex-row flex-col w-full items-center justify-start md:justify-end gap-2 p-2 overflow-hidden overflow-x-scroll">
            <button className="py-1 px-4 rounded-md bg-primary text-white border-none capitalize">
              Change Password
            </button>
          </div>
        </div>
        <div className="divider mt-0 mb-0"></div>
        <div className="w-full flex  md:flex-row flex-col-reverse justify-start items-center gap-3">
          <div className="w-full md:w-[65%]  p-6 m-auto bg-white rounded-md  ">
            {me && (
              <form className="space-y-4 mb-12" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-start items-center w-full">
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          Full Name
                        </span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        className="w-full input input-bordered input-sm "
                        defaultValue={me?.name}
                      />
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          Father Name
                        </span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="No data"
                        name="fatherName"
                        className="w-full input input-bordered input-sm "
                        defaultValue={me?.fatherName}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-[50%]">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          Date of birth
                        </span>
                      </label>
                      <input
                        required
                        type="month"
                        placeholder="No data"
                        name="dob"
                        className="w-full input input-bordered input-sm  "
                        defaultValue={me?.dob?.split("-").slice(0, 2).join("-")}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          Qualifications
                        </span>
                      </label>
                      <select
                        required
                        defaultValue={me?.qualification}
                        name="qualification"
                        className="select select-bordered select-sm w-full"
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
                        <span className="text-base label-text font-semibold">
                          Subject
                        </span>
                      </label>

                      <select
                        required
                        name="subject"
                        id="subject"
                        className="select select-bordered select-sm w-full capitalize"
                        onChange={handleSubjectChange}
                        defaultValue={selectedSubject}
                      >
                        {me?.subject ? (
                          <option className="capitalize" value={me?.subject}>
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
                        className="text-sm absolute top-1 p-1 right-0 text-slate-500 cursor-pointer hover:text-primary hover:font-semibold"
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
                        <span className="text-base label-text font-semibold">
                          Semester/Year
                        </span>
                      </label>
                      <select
                        required
                        defaultValue={me?.semester}
                        name="semester"
                        className="select select-bordered select-sm w-full "
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
                        <span className="text-base label-text font-semibold">
                          Institution
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={me?.institution}
                        type="text"
                        placeholder="No data"
                        name="institution"
                        className="w-full input input-bordered input-sm "
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          Email
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={me?.email}
                        type="email"
                        placeholder="No data"
                        name="email"
                        className="w-full input input-bordered input-sm "
                      />
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          Age
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={me?.age}
                        type="number"
                        placeholder="No data"
                        name="age"
                        className="w-full input input-bordered input-sm "
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 lg:flex-row md:flex-row sm:flex-col ">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          Phone Number
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={decryptData(me?.phoneNumber)}
                        type="text"
                        placeholder="No data"
                        name="phoneNumber"
                        className="w-full input input-bordered input-sm "
                      />
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          WhatsApp Number
                        </span>
                      </label>
                      <input
                        required
                        defaultValue={decryptData(me?.whatsAppNumber)}
                        type="text"
                        placeholder="No data "
                        name="whatsAppNumber"
                        className="w-full input input-bordered input-sm "
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-start">
                    <div className="w-full">
                      <label className="label">
                        <span className="text-base label-text font-semibold">
                          Home address
                        </span>
                      </label>
                      <textarea
                        placeholder="No data"
                        name="address"
                        className="w-full input input-bordered  "
                        required
                        defaultValue={decryptData(me?.address)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <button className=" px-4 py-2 rounded-md text-white bg-primary">
                    Update Account
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="w-full md:w-[30%]  bg-white md:h-full flex justify-center items-start mt-[5rem]">
            <div className=" border border-[#ccc] w-[90%] md:w-[80%] p-6  bg-white rounded-2xl space-y-4  flex justify-start items-center flex-col">
              <div className="w-[140px] h-[140px] flex justify-center items-center relative border border-dashed border-secondaryText rounded-full">
                <div
                  className="rounded-full w-[130px] h-[130px] bg-contain"
                  style={{ backgroundImage: `url(${logo})` }}
                ></div>
                <button className="absolute bg-[#f1f1f6] w-8 h-8 flex justify-center items-center rounded-full top-[80%] right-[18%]">
                  <IoCameraOutline className="text-lg" />
                </button>
              </div>
              <p className="text-center text-secondaryText">
                Allowed *.jpeg, *.jpg , *.png max size of 5 Mb
              </p>
              <div>
                <button className="px-4 py-2 rounded-md bg-primary text-white capitalize">
                  Upload Profile Picture
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id="add_subject_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Subject</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text font-semibold">
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
                className="w-full input input-bordered input-sm "
              />
            </div>
          </div>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              <div className=" w-full flex justify-end gap-3 items-center">
                <button
                  id="close-division-modal"
                  className="p-5 py-3 rounded-md bg-slate-400 text-white font-semibold border ms-3"
                >
                  Cancel
                </button>
                <button
                  id="close-division-modal"
                  className="btn ms-3 capitalize"
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
