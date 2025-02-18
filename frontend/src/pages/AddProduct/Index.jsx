import React, { useState } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";

const Index = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("file", product.image);
    formData.append("price", product.price);
    formData.append("category", product.category);

    ProductService.createProduct(formData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product has been added successfully!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error adding the product. Please try again.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center">Add Product</h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Product Description"
                className="textarea textarea-bordered"
                required
                onChange={handleChange}
              ></textarea>
            </div>
            {/* Image File */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image File</span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
