// Products page
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../css/Products.css";

function Products() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);

    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        product_name: "",
        category_id: "",
        quantity: "",
        price: "",
        supplier: ""
    });

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const loadProducts = async () => {
        const res = await api.get("products.php");
        setProducts(res.data);
    };

    const loadCategories = async () => {
        const res = await api.get("categories.php");
        setCategories(res.data);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const clearForm = () => {
        setForm({
            product_name: "",
            category_id: "",
            quantity: "",
            price: "",
            supplier: ""
        });

        setEditing(false);
        setEditId(null);
    };

    const addProduct = async () => {

        const res = await api.post("addProduct.php", form);

        if (res.data.success) {

            alert("Product Added Successfully!");

            clearForm();

            loadProducts();

        } else {

            alert(res.data.message);

        }

    };

    const editProduct = (product) => {

        setEditing(true);
        setEditId(product.id);

        setForm({
            product_name: product.product_name,
            category_id: product.category_id,
            quantity: product.quantity,
            price: product.price,
            supplier: product.supplier
        });

    };

    const updateProduct = async () => {

        const res = await api.post("updateProduct.php", {
            id: editId,
            ...form
        });

        if (res.data.success) {

            alert("Product Updated Successfully!");

            clearForm();

            loadProducts();

        } else {

            alert(res.data.message);

        }

    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete this product?")) return;

        const res = await api.post("deleteProduct.php", {
            id
        });

        if (res.data.success) {

            alert("Product Deleted Successfully!");

            loadProducts();

        } else {

            alert(res.data.message);

        }

    };

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h2 className="mb-4">
                        Products Management
                    </h2>

                    <div className="card shadow mb-4">

                        <div className="card-header bg-primary text-white">

                            {editing ? "Update Product" : "Add Product"}

                        </div>

                        <div className="card-body">

                            <div className="row g-3">

                                <div className="col-md-3">

                                    <label>Product</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="product_name"
                                        value={form.product_name}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-2">

                                    <label>Category</label>

                                    <select
                                        className="form-select"
                                        name="category_id"
                                        value={form.category_id}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            Select Category
                                        </option>

                                        {categories.map(category => (

                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.category_name}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="col-md-2">

                                    <label>Quantity</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-2">

                                    <label>Price</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-2">

                                    <label>Supplier</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="supplier"
                                        value={form.supplier}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-1 d-grid">

                                    <label>&nbsp;</label>

                                    <button
                                        className={`btn ${editing ? "btn-warning" : "btn-success"}`}
                                        onClick={editing ? updateProduct : addProduct}
                                    >
                                        {editing ? "Update" : "Add"}
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
                                placeholder="Search product..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="card shadow">

                        <div className="card-header bg-dark text-white">
                            Product List
                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-hover">

                                <thead className="table-primary">

                                    <tr>

                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Supplier</th>
                                        <th width="180">Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {products
                                    .filter((product) =>
                                        product.product_name.toLowerCase().includes(search.toLowerCase()) ||
                                        product.category_name.toLowerCase().includes(search.toLowerCase()) ||
                                        (product.supplier || "").toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((product) => (

                                        <tr key={product.id}>

                                            <td>{product.id}</td>
                                            <td>{product.product_name}</td>
                                            <td>{product.category_name}</td>
                                            <td>{product.quantity}</td>
                                            <td>₱{product.price}</td>
                                            <td>{product.supplier}</td>

                                            <td>

                                                <button
                                                     className="btn btn-warning btn-sm me-2"
                                                    onClick={() => editProduct(product)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteProduct(product.id)}
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

export default Products;