import { useState, useEffect } from "react";
import OrderService from "../services/order.service";

const ModelOrderDetails = ({ name, orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await OrderService.getOrderById(orderId);
      setOrder(response.data); // สมมติว่า API ดึงออเดอร์เดียวมา
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <dialog id={name} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <div className="overflow-x-auto border rounded-lg">
            <table className="table w-full table-zebra">
              <thead>
                <tr className="bg-base-200 text-base font-semibold text-center">
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.length > 0 ? (
                  order.products.map((item, index) => (
                    <tr key={item._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        <img
                          src={item.productId?.image || "/placeholder.png"}
                          alt={item.productId?.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="text-center">{item.productId?.name}</td>
                      <td className="text-center">{item.unit_price}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{item.subtotal}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModelOrderDetails;
