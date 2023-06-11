import React, { useEffect, useState } from "react";
import supabase from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await supabase.auth.signUp({ email, password });

      if (user.error) {
        console.log("Error registering user:", user.error.message);
      } else {
        console.log("User registered successfully:", user);
        //storing user into users table
        var email1 = user.data.user.email;
        var id1 = user.data.user.id;
        setUserId(id1);
        const data = await supabase
          .from("users")
          .insert([{ id: user.data.user.id, email: email1 }]);
        sessionStorage.setItem(
          "user_session",
          JSON.stringify(user.data.session)
        );
        navigate(`/${user.data.user.id}`);
      }
    } catch (err) {
      console.log("Error registering user:", err.message);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user_session")) {
      // navigate(`/${userId}`);
      var session = sessionStorage.getItem("user_session");
      console.log(session);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 h-screen">
      <div className="xl:col-span-1 sm:col-span-2 bg-gradient-to-r from-cyan-500 to-blue-500 hidden sm:block">
        some animation
      </div>
      <div className="xl:col-span-1 sm:col-span-2">
        <div
          className="px-8 flex flex-col justify-center items-start h-screen"
          id="form"
        >
          <h1 className="text-5xl font-bold tracking-wider">Hello there</h1>
          <h2 className="text-3xl py-4">Welcome! Please Register.</h2>
          <h2 className="text-2xl py-4">Email</h2>
          <input
            required
            type="text"
            placeholder="example@example.com"
            className="input input-bordered w-full max-w-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h2 className="text-2xl py-4">Password</h2>
          <input
            type="text"
            placeholder="8 characters long"
            className="input input-bordered w-full max-w-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary btn-wide my-5"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
