import { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // เก็บไฟล์รูปที่เลือก

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setSelectedImage(null); // เคลียร์ไฟล์ก่อน
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editProduct.name);
      formData.append("description", editProduct.description);
      formData.append("price", editProduct.price);
      formData.append("category", editProduct.category);

      if (selectedImage) {
        formData.append("file", selectedImage);
      }

      await ProductService.updateProduct(editProduct._id, formData);
      fetchProducts();
      setIsModalOpen(false);
      Swal.fire(
        "Updated!",
        "Product has been updated successfully.",
        "success"
      );
    } catch (error) {
      Swal.fire("Error!", "Failed to update the product.", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full table-zebra">
          <thead>
            <tr className="bg-base-200 text-base font-semibold text-center">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price} THB</td>
                <td>{product.category}</td>
                <td>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="btn btn-warning btn-sm w-24"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-sm w-24"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>

            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              className="input input-bordered w-full mb-2"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />

            <label className="block text-sm font-semibold">Description</label>
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
            />

            <label className="block text-sm font-semibold">Price (THB)</label>
            <input
              type="number"
              className="input input-bordered w-full mb-2"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />

            <label className="block text-sm font-semibold">Category</label>
            <input
              type="text"
              className="input input-bordered w-full mb-2"
              value={editProduct.category}
              onChange={(e) =>
                setEditProduct({ ...editProduct, category: e.target.value })
              }
            />

            <label className="block text-sm font-semibold">Image</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full mb-2"
              onChange={handleFileChange}
            />

            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
            ) : (
              <img
                src={editProduct.image}
                alt={editProduct.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
            )}

            <div className="flex justify-end mt-4">
              <button
                className="btn btn-error mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
