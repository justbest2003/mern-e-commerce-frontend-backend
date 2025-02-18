import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductService from "../../services/product.service"; // สมมติว่า ProductService มีฟังก์ชันสำหรับดึงข้อมูลและลบสินค้า

const Index = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    image: "", // เพิ่มฟิลด์สำหรับเก็บ URL ของรูปภาพ
  });

  // ฟังก์ชันดึงข้อมูลสินค้า
  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts(); // สมมติว่า getProducts จะดึงข้อมูลสินค้าจาก API
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // ฟังก์ชันสำหรับการลบสินค้า
  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ProductService.deleteProduct(productId); // ลบสินค้าจาก API
          Swal.fire("Deleted!", "The product has been deleted.", "success");
          fetchProducts(); // รีเฟรชข้อมูลหลังจากลบสินค้า
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was an error deleting the product.",
            "error"
          );
        }
      }
    });
  };

  // ฟังก์ชันสำหรับการแก้ไขสินค้า
  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setEditProduct({
      _id: productToEdit._id,
      name: productToEdit.name,
      description: productToEdit.description,
      price: productToEdit.price,
      category: productToEdit.category,
      image: productToEdit.image, // เก็บ URL ของรูปภาพใน editProduct
    });
    setShowModal(true); // เปิด modal เมื่อคลิกปุ่ม Edit
  };

  // ฟังก์ชันสำหรับบันทึกการแก้ไขสินค้า
  const handleSaveChanges = async () => {
    try {
      await ProductService.updateProduct(editProduct._id, editProduct); // อัปเดตสินค้าผ่าน API
      Swal.fire("Updated!", "The product has been updated.", "success");
      fetchProducts(); // รีเฟรชข้อมูลหลังจากบันทึกการเปลี่ยนแปลง
      setShowModal(false); // ปิด modal
    } catch (error) {
      Swal.fire("Error!", "There was an error updating the product.", "error");
    }
  };

  // ฟังก์ชันสำหรับการเลือกไฟล์และอัปโหลดรูปภาพ
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // อัปโหลดไฟล์และรับ URL ของไฟล์ที่อัปโหลด
        const imageUrl = await ProductService.updateImage(file);
        setEditProduct({ ...editProduct, image: imageUrl }); // อัปเดต URL รูปภาพใน editProduct
      } catch (error) {
        Swal.fire("Error!", "There was an error uploading the image.", "error");
        console.error("Image upload error:", error);
      }
    }
  };

  // ใช้ useEffect เพื่อดึงข้อมูลสินค้าเมื่อ component โหลด
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        Manage Products
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        {products.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No products available
          </p>
        ) : (
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  {/* แสดงรูปภาพในตาราง */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md" // ปรับขนาดของภาพ
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.price} ฿
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Edit Product */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4">Edit Product</h3>
            <form>
              {/* Image Upload */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  id="image"
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  onChange={handleImageChange}
                />
                {editProduct.image && (
                  <div className="mt-2">
                    <img
                      src={editProduct.image}
                      alt="Product"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, category: e.target.value })
                  }
                />
              </div>

              {/* Save & Cancel Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
