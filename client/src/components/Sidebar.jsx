import { Link, useNavigate } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/");

    };

    return (
        <div className="sidebar">

            <h4 className="text-center text-white py-3">
                MENU
            </h4>

            <Link to="/dashboard">Dashboard</Link>

            <Link to="/products">Products</Link>

            <Link to="/categories">Categories</Link>

            {user?.role === "Admin" && (
                <Link to="/users">Users</Link>
            )}
            <Link to="/about">About</Link>

            <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>
    );
}

export default Sidebar;