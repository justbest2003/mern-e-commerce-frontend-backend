import { useState, useEffect } from "react";
import OrderService from "../../services/order.service";
import ModelOrderDetails from "../../components/ModelOrderDetails";
import Swal from "sweetalert2";
import { TbListDetails } from "react-icons/tb";
import { FiDelete } from "react-icons/fi";

const formatPrice = (price) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(price);
};

const Index = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await OrderService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderService.deleteOrder(orderId);
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
          Swal.fire("Deleted!", "The order has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the order.", "error");
        }
      }
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the order status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // เรียก API อัปเดตสถานะ
          await OrderService.updateDeliveryStatus(orderId, newStatus);

          // อัปเดตค่า orders โดยใช้ setOrders
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...order, delivery_status: newStatus }
                : order
            )
          );
          Swal.fire("Updated!", "Order status has been updated.", "success");
        } catch (error) {
          console.error("Error updating status:", error);
          Swal.fire("Error!", "Failed to update status.", "error");
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full table-zebra">
          <thead>
            <tr className="bg-base-200 text-base font-semibold text-center">
              <th>Order ID</th>
              <th>Email</th>
              <th>Total</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="text-center">{`${order._id.slice(
                  0,
                  3
                )}...${order._id.slice(-3)}`}</td>
                <td className="text-center">{order.email}</td>
                <td className="text-center">{formatPrice(order.total)}</td>
                <td className="text-center capitalize">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      order.payment_status?.toLowerCase() === "paid"
                        ? "bg-green-600 text-black"
                        : order.payment_status?.toLowerCase() === "pending"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-black"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </td>

                <td className="text-center">
                  <select
                    key={order._id} // ให้ React รู้ว่ามีการเปลี่ยนค่า
                    value={order.delivery_status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="select select-bordered select-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => {
                        setSelectedOrderId(order._id);
                        document.getElementById("orderModal").showModal();
                      }}
                    >
                      <TbListDetails />
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <FiDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModelOrderDetails name="orderModal" orderId={selectedOrderId} />
    </div>
  );
};

export default Index;
