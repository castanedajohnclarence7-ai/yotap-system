// About page
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function About() {
    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2>About Inventory Management System</h2>

                            <hr />

                            <p>
                                This Inventory Management System was developed
                                using React.js, PHP, MySQL, Bootstrap, and Axios.
                            </p>

                            <h5>Features</h5>

                            <ul>
                                <li>Dashboard</li>
                                <li>Products Management</li>
                                <li>Categories Management</li>
                                <li>Users Management</li>
                                <li>Admin Login</li>
                                <li>Search Products</li>
                                <li>Search Users</li>
                                <li>Edit/Delete Records</li>
                            </ul>

                            <hr />

                            <p>
                                Developed by: <strong>Yotap</strong>
                            </p>

                            <p>
                                BSIT - Inventory Management System Project
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default About;