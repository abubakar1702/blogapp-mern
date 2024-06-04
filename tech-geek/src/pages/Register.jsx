import { Link, useNavigate } from "react-router-dom";
import image from "../assets/gadget.jpg";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.name || !inputs.username || !inputs.email || !inputs.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/user/register", inputs);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 flex flex-col justify-center">
          <h1 className="text-2xl mb-4">Tech Geek</h1>
          <h2 className="text-4xl mb-6">Register</h2>
          {errorMessage && (
            <div className="mb-4 text-red-500">
              {errorMessage}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xl mb-2" htmlFor="name">Name</label>
              <input
                className="w-full rounded-md p-2 border"
                type="text"
                id="name"
                name="name"
                placeholder="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xl mb-2" htmlFor="username">Username</label>
              <input
                className="w-full rounded-md p-2 border"
                type="text"
                id="username"
                name="username"
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xl mb-2" htmlFor="email">Email</label>
              <input
                className="w-full rounded-md p-2 border"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xl mb-2" htmlFor="password">Password</label>
              <input
                className="w-full rounded-md p-2 border"
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                className="w-full border bg-teal-700 text-white rounded-md py-3 hover:bg-teal-600 mt-2"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-lg">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-700 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <img className="object-cover w-full h-full" src={image} alt="Gadget" />
        </div>
      </div>
    </div>
  );
};

export default Register;
