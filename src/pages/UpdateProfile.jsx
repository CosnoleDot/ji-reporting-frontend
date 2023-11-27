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
      alert("Please enter your name");
      return;
    }

    if (!age.trim()) {
      alert("Please enter your age");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email (e.g., email@domain.com)");
      return;
    }

    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character. Example: Abc@1234"
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
        <h2 className="text-2xl text-center font-bold">Update Profile</h2>
      <div
        className="flex flex-col justify-center items-start p-4 font-notoUrdu"
        dir="ltr"
      >
       
        <div className="w-full p-4">
          <div className="lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            <div className="w-full md:pl-0 mb-2">
              <label htmlFor="" className="mb-2 text-lg">
                Name:
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg mt-3"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ color: "black" }}
                required
              />
            </div>
            <div className="w-full mb-2">
              <label htmlFor="" className="mb-2 text-lg">
                Age:
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg mt-3"
                placeholder="Your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{ color: "black" }}
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              Email:
            </label>
            <input
              type="email"
              className="w-full border p-2 rounded-lg mt-3"
              placeholder="New email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "black" }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              Password:
            </label>
            <input
              type="password"
              className="w-full border p-2 rounded-lg mt-3"
              placeholder="New password"
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
            Update Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
