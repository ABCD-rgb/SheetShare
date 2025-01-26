import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/sheet");
        }
    }, []); 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") { 
            setPassword(value);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Please fill out all fields.");
            return;
        }

        // Send POST request to backend
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/validateUser`, {
                username,
                password
            });

            if (res.data.success) {
                localStorage.setItem("username", username);
                localStorage.setItem("token", res.data.token);
                // Redirect to sheets page
                navigate("/sheet");
            } else {
                alert(res.data.message);
            }

        } catch (error) {
            alert("Login failed.");
        }
    };

    return (
        <div className="flex justify-around h-screen">
            <div className="card w-full h-96">
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="pl-6 text-center lg:text-left">
                        <h1 className="text-6xl font-bold">SheetShare</h1>
                        <p className="py-6">
                            Simple collaborative spreadsheet. 
                        </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input name="username" type="text" placeholder="username" onChange={handleChange} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" onChange={handleChange} className="input input-bordered" required />
                            <label className="label">
                                <a href="/signup" className="label-text-alt link link-hover">No account yet?</a>
                            </label>
                            </div>
                            <div className="form-control pt-6">
                            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;