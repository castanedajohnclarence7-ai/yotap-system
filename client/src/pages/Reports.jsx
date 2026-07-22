import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Reports() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const res = await api.get("products.php");
        setProducts(res.data);
    };

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">Inventory Report</h2>

                    <div className="card shadow">

                        <div className="card-body">

                            <table className="table table-bordered">

                                <thead className="table-dark">

                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Supplier</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {products.map(product => (

                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.product_name}</td>
                                            <td>{product.category_name}</td>
                                            <td>{product.quantity}</td>
                                            <td>₱{product.price}</td>
                                            <td>{product.supplier}</td>
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

export default Reports;