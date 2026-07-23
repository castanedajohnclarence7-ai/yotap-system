// Login page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Login.css";

function Login() {

    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState("");

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const [register, setRegister] = useState({
        fullname: "",
        username: "",
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {

        e.preventDefault();

        setMessage("");

        try {

            const res = await api.post("login.php", login);

            if (res.data.success) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );

                navigate("/dashboard");

            } else {

                setMessage(res.data.message);

            }

        } catch {

            setMessage("Unable to connect to server.");

        }

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (
            register.fullname.trim() === "" ||
            register.username.trim() === "" ||
            register.email.trim() === "" ||
            register.password.trim() === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }

        try {

            const res = await api.post("register.php", register);

            if (res.data.success) {

                alert("Registration Successful!");

                setRegister({
                    fullname: "",
                    username: "",
                    email: "",
                    password: ""
                });

                setIsRegister(false);

            } else {

                alert(res.data.message);

            }

        } catch {

            alert("Unable to connect to server.");

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <div className="d-flex">

                                <button
                                    type="button"
                                    className={`btn w-50 ${!isRegister ? "btn-light" : "btn-primary text-white"}`}
                                    onClick={() => {
                                        setMessage("");
                                        setIsRegister(false);
                                    }}
                                >
                                    Login
                                </button>

                                <button
                                    type="button"
                                    className={`btn w-50 ${isRegister ? "btn-light" : "btn-primary text-white"}`}
                                    onClick={() => {
                                        setMessage("");
                                        setIsRegister(true);
                                    }}
                                >
                                    Register
                                </button>

                            </div>

                        </div>

                        <div className="card-body">

                            {!isRegister ? (

                                <form onSubmit={handleLogin}>

                                    <div className="mb-3">

                                        <label>Username</label>

                                        <input
                                            className="form-control"
                                            value={login.username}
                                            onChange={(e) =>
                                                setLogin({
                                                    ...login,
                                                    username: e.target.value
                                                })
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Password</label>

                                        <div className="input-group">

                                            <input
                                                type={showLoginPassword ? "text" : "password"}
                                                className="form-control"
                                                value={login.password}
                                                onChange={(e) =>
                                                    setLogin({
                                                        ...login,
                                                        password: e.target.value
                                                    })
                                                }
                                                required
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowLoginPassword(!showLoginPassword)}
                                            >
                                                {showLoginPassword ? "Hide" : "Show"}
                                            </button>

                                        </div>

                                    </div>

                                    {message && (

                                        <div className="alert alert-danger">

                                            {message}

                                        </div>

                                    )}

                                    <button className="btn btn-primary w-100">

                                        Login

                                    </button>

                                </form>

                            ) : (

                                <form onSubmit={handleRegister}>

                                    <div className="mb-3">

                                        <label>Full Name</label>

                                        <input
                                            className="form-control"
                                            value={register.fullname}
                                            onChange={(e) =>
                                                setRegister({
                                                    ...register,
                                                    fullname: e.target.value
                                                })
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Username</label>

                                        <input
                                            className="form-control"
                                            value={register.username}
                                            onChange={(e) =>
                                                setRegister({
                                                    ...register,
                                                    username: e.target.value
                                                })
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Email</label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            value={register.email}
                                            onChange={(e) =>
                                                setRegister({
                                                    ...register,
                                                    email: e.target.value
                                                })
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Password</label>

                                        <div className="input-group">

                                            <input
                                                type={showRegisterPassword ? "text" : "password"}
                                                className="form-control"
                                                value={register.password}
                                                onChange={(e) =>
                                                    setRegister({
                                                        ...register,
                                                        password: e.target.value
                                                    })
                                                }
                                                required
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            >
                                                {showRegisterPassword ? "Hide" : "Show"}
                                            </button>

                                        </div>

                                    </div>

                                    <button className="btn btn-success w-100">

                                        Register

                                    </button>

                                </form>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;