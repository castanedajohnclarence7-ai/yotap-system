import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../css/Dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        users: 0,
        lowStock: 0
    });

    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        const res = await api.get("dashboard.php");

        setStats({
            products: res.data.products,
            categories: res.data.categories,
            users: res.data.users,
            lowStock: res.data.lowStock
        });

        setRecentProducts(res.data.recentProducts);

    };

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">Dashboard</h2>

                    <div className="row">

                        <div className="col-md-3 mb-3">
                            <div className="card bg-primary text-white shadow">
                                <div className="card-body">
                                    <h5>Total Products</h5>
                                    <h2>{stats.products}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card bg-success text-white shadow">
                                <div className="card-body">
                                    <h5>Categories</h5>
                                    <h2>{stats.categories}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card bg-warning text-dark shadow">
                                <div className="card-body">
                                    <h5>Low Stock</h5>
                                    <h2>{stats.lowStock}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card bg-danger text-white shadow">
                                <div className="card-body">
                                    <h5>Users</h5>
                                    <h2>{stats.users}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="card shadow mt-4">

                        <div className="card-header bg-dark text-white">
                            Recent Products
                        </div>

                        <div className="card-body">

                            <table className="table table-hover">

                                <thead className="table-primary">

                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Stock</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {recentProducts.map(product => (

                                        <tr key={product.id}>

                                            <td>{product.id}</td>
                                            <td>{product.product_name}</td>
                                            <td>{product.category_name}</td>
                                            <td>{product.quantity}</td>

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

export default Dashboard;