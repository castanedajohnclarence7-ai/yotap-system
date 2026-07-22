import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";
import api from "../services/api";
import "../css/Users.css";

function Users() {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || currentUser.role !== "Admin") {
        return <Navigate to="/dashboard" replace />;
    }

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        role: "Staff"
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const res = await api.get("users.php");

            if (Array.isArray(res.data)) {
                setUsers(res.data);
            } else {
                setUsers([]);
            }

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const addUser = async () => {
        

    if (
        form.fullname.trim() === "" ||
        form.username.trim() === "" ||
        form.email.trim() === "" ||
        form.password.trim() === "" ||
        form.role.trim() === ""
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    try {

        const res = await api.post("addUser.php", form);

        if (res.data.success) {

            alert("User Added Successfully!");

            resetForm();
            loadUsers();

        } else {

            alert(res.data.message);

        }

    } catch {

        alert("Unable to connect to server.");

    }

};

    const editUser = (user) => {

        setEditId(user.id);

        setForm({
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            password: "",
            role: user.role
        });

    };

    const updateUser = async () => {

        try {

            
            const res = await api.post("updateUser.php", {
                id: editId,
                ...form
            });

            if (res.data.success) {

                alert("User Updated Successfully!");

                setEditId(null);

                resetForm();

                loadUsers();
                

            } else {

                alert(res.data.message);

            }

        } catch {

            alert("Unable to connect to server.");

        }

    };

    const deleteUser = async (id) => {

        if (id === currentUser.id) {

            alert("You cannot delete your own account.");

            return;

        }

        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {

            const res = await api.post("deleteUser.php", {
                id
            });

            if (res.data.success) {

                alert("User Deleted Successfully!");

                loadUsers();

            } else {

                alert(res.data.message);

            }

        } catch {

            alert("Unable to connect to server.");

        }

    };

    const resetForm = () => {

        setForm({
            fullname: "",
            username: "",
            email: "",
            password: "",
            role: "Staff"
        });

        setShowPassword(false);

    };

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">Users Management</h2>

                    <div className="card shadow mb-4">

                        <div className="card-header bg-primary text-white">
                            {editId ? "Update User" : "Add User"}
                        </div>

                        <div className="card-body">

                            <div className="row g-3">

                                <div className="col-md-3">

                                    <label>Full Name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullname"
                                        value={form.fullname}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-2">

                                    <label>Username</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-2">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-2">

                                    <label>Password</label>

                                    <div className="input-group">

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder={editId ? "Leave blank to keep current password" : ""}
                                            required={!editId}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>

                                    </div>

                                </div>

                                <div className="col-md-2">

                                    <label>Role</label>

                                    <select
                                        className="form-select"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Staff">Staff</option>
                                        <option value="Admin">Admin</option>
                                    </select>

                                </div>

                                <div className="col-md-1 d-grid">

                                    <label>&nbsp;</label>

                                    <button
                                        className={editId ? "btn btn-warning" : "btn btn-success"}
                                        onClick={editId ? updateUser : addUser}
                                    >
                                        {editId ? "Update" : "Add"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-4">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search user..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="card shadow">

                        <div className="card-header bg-dark text-white">
                            User List
                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-hover">

                                <thead className="table-primary">

                                    <tr>

                                        <th>ID</th>
                                        <th>Full Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th width="170">Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {users
                                    .filter((user) =>
                                        user.fullname.toLowerCase().includes(search.toLowerCase()) ||
                                        user.username.toLowerCase().includes(search.toLowerCase()) ||
                                        (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
                                        user.role.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((user) => (

                                        <tr key={user.id}>

                                            <td>{user.id}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => editUser(user)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteUser(user.id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Users;