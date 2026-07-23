// Categories page
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../css/Categories.css";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        category_name: "",
        description: ""
    });

    useEffect(() => {
    loadCategories();
    }, []);

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

    const addCategory = async () => {

    const data = {
        category_name: form.category_name.trim(),
        description: form.description.trim()
    };

    if (!data.category_name || !data.description) {
        alert("Please fill in all fields.");
        return;
    }

    const res = await api.post("addCategory.php", data);

    if (res.data.success) {
        alert("Category Added!");
        resetForm();
        loadCategories();
    } else {
        alert(res.data.message);
    }

};

const updateCategory = async () => {

    const res = await api.post("updateCategory.php", {
        id: editId,
        ...form
    });

    if (res.data.success) {
        alert("Category Updated!");
        setEditId(null);
        resetForm();
        loadCategories();
    }

};

const deleteCategory = async (id) => {

    if (!window.confirm("Delete this category?"))
        return;

    const res = await api.post("deleteCategory.php", { id });

    if (res.data.success) {
        alert("Deleted!");
        loadCategories();
    }

};

const resetForm = () => {

    setForm({
        category_name: "",
        description: ""
    });

};
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Category Management</h2>

          {/* Add Category */}

          <div className="card shadow mb-4">

            <div className="card-header bg-success text-white">
              Add Category
            </div>

            <div className="card-body">

              <div className="row">

                <div className="col-md-5">
                  <label>Category Name</label>

                  <input
                        type="text"
                        className="form-control"
                        name="category_name"
                        value={form.category_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-5">
                  <label>Description</label>

                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
                </div>

                <div className="col-md-2 d-grid align-self-end">
                  <button
                    className={editId ? "btn btn-warning" : "btn btn-success"}
                    onClick={editId ? updateCategory : addCategory}
                >
                    {editId ? "Update" : "Add"}
                </button>
                </div>

              </div>

            </div>

          </div>

          <div className="mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

          {/* Category Table */}

          <div className="card shadow">

            <div className="card-header bg-dark text-white">
              Category List
            </div>

            <div className="card-body">

              <table className="table table-hover table-striped">

                <thead className="table-success">

                  <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                    {categories
                        .filter((category) =>
                            category.category_name
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            category.description
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((category) => (

                            <tr key={category.id}>

                                <td>{category.id}</td>
                                <td>{category.category_name}</td>
                                <td>{category.description}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editCategory(category)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteCategory(category.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    {categories.filter((category) =>
                        category.category_name.toLowerCase().includes(search.toLowerCase()) ||
                        category.description.toLowerCase().includes(search.toLowerCase())
                    ).length === 0 && (

                        <tr>

                            <td colSpan="4" className="text-center">
                                No categories found.
                            </td>

                        </tr>

                    )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Categories;