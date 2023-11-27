import React, { useState } from "react";
import { Layout } from "../theme/Layout";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Validation
    if (!name.trim()) {
      alert("نام درست ڈالیں");
      return;
    }

    if (!age.trim()) {
      alert("عمر درست ڈالیں");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("صحیح ای میل ڈالیں (مثال: email@domain.com)");
      return;
    }

    if (!password.trim()) {
      alert("پاس ورڈ درست ڈالیں");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "پاس ورڈ کم سے کم 8 حروف کا ہونا چاہئے، اس میں کم سے کم ایک بڑا حرف، ایک چھوٹا حرف، ایک ڈیجٹ، اور ایک خاص حرف ہونا چاہئے۔ مثال: Abc@1234"
      );
      return;
    }
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
      <div
        className="flex flex-col justify-center items-center p-4 font-notoUrdu"
        dir="rtl"
      >
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
                style={{ color: "black" }}
                required
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
                style={{ color: "black" }}
                required
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
              style={{ color: "black" }}
              required
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
              style={{ color: "black" }}
              required
            />
          </div>

          <button
            type="button"
            className="btn btn-cyan btn-block"
            onClick={handleSubmit}
          >
            پروفائل اپ ڈیٹ کریں
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
