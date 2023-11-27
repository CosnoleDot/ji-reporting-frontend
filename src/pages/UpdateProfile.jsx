import React, { useState } from "react";
import { Layout } from "../theme/Layout";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Profile update logic here
    console.log("Profile updated successfully:", {
      name,
      age,
      email,
      password,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-4 font-notoUrdu" dir="rtl">
        <h2 className="text-2xl">پروفائل اپ ڈیٹ کریں</h2>
        <div className="w-full p-4">
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            <div className="w-full md:pr-0 mb-2">
              <label htmlFor="" className="mb-2 text-lg">
                نام:
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg mt-3"
                placeholder="آپ کا نام"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ color: 'black' }}
              />
            </div>
            <div className="w-full mb-2">
              <label htmlFor="" className="mb-2 text-lg">
                عمر:
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg mt-3"
                placeholder="آپ کی عمر"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{ color: 'black' }}
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              ای میل:
            </label>
            <input
              type="email"
              className="w-full border p-2 rounded-lg mt-3"
              placeholder="نیا ای میل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: 'black' }}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              پاس ورڈ:
            </label>
            <input
              type="password"
              className="w-full border p-2 rounded-lg mt-3"
              placeholder="نیا پاس ورڈ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: 'black' }}
            />
          </div>
          
          <button type="button" className="btn btn-cyan btn-block" onClick={handleSubmit}>
            پروفائل اپ ڈیٹ کریں
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
