import { useState, useEffect } from "react";
import OrderService from "../services/order.service";

const formatPrice = (price) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(price);
};

const ModelOrderDetails = ({ name, orderId }) => {
  const [order, setOrder] = useState();

  const fetchOrderDetails = async () => {
    try {
      const response = await OrderService.getOrderById(orderId);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <dialog id={name} className="modal">
      <div className="modal-box max-w-5xl w-full">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order Details</h2>
            {order && (
              <h3 className="text-xl font-semibold">
                Total: {formatPrice(order.total)}
              </h3>
            )}
          </div>

          
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
                {order && order.products.length > 0 ? (
                  order.products.map((item, index) => (
                    <tr key={item._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.name}
                          className="w-16 h-16 object-cover rounded-lg mx-auto"
                        />
                      </td>
                      <td className="text-center">{item.productId?.name}</td>
                      <td className="text-center">
                        {formatPrice(item.productId?.price)}
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">
                        {formatPrice(item.productId?.price * item.quantity)}
                      </td>
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

          
          <h2 className="text-2xl font-bold my-4">Shipping Details</h2>
          {order && order.shipping ? (
            <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg">
              <div>
                <p>
                  <strong>Name:</strong> {order.shipping.name}
                </p>
                <p>
                  <strong>Phone:</strong> {order.shipping.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.shipping.address.line1},{" "}
                  {order.shipping.address.line2}
                </p>
              </div>
              <div>
                <p>
                  <strong>City:</strong> {order.shipping.address.city}
                </p>
                <p>
                  <strong>Country:</strong> {order.shipping.address.country}
                </p>
                <p>
                  <strong>Postal Code:</strong>{" "}
                  {order.shipping.address.postal_code}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No shipping details available.
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ModelOrderDetails;
