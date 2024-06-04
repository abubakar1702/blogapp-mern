import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import logo from "../assets/newlogo2.png";
import hand from "../assets/hand.jpg";
import { AuthContext } from "../store/auth.jsx";
import {jwtDecode} from "jwt-decode";


const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { storeTokenInCookies  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.username || !inputs.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", inputs);
      console.log(response);
      if (response.data.token) {
        const token = response.data.token.split(' ')[1];
        const user = jwtDecode(token);
        console.log(user)
        storeTokenInCookies(token, { name: user.name, username: user.username, email: user.email });
        navigate("/");
      } else {
        console.log("error")
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 flex flex-col justify-center m-4 items-center">
          <img src={logo} alt="Tech Geek Logo" className="w-36 mb-4" />
          <h2 className="text-2xl mb-6 text-center">Log in</h2>
          {errorMessage && (
            <div className="mb-4 text-red-500">
              {errorMessage}
            </div>
          )}
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xl mb-2" htmlFor="username">Username</label>
              <input
                className="w-full rounded-md p-2 border"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full border bg-teal-700 text-white rounded-md py-3 hover:bg-teal-600 mt-2"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-lg">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-teal-700 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="h-full hidden md:block">
          <img className="object-cover w-full h-full" src={hand} alt="Hand" />
        </div>
      </div>
    </div>
  );
};

export default Login;
