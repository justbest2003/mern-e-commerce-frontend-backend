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
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await OrderService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
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
            {orders.map((orders, index) => (
              <tr key={orders._id}>
                <td className="text-center">{`${orders._id.slice(
                  0,
                  3
                )}...${orders._id.slice(-3)}`}</td>
                <td className="text-center">{orders.email}</td>
                <td className="text-center">{formatPrice(orders.total)}</td>
                <td className="text-center capitalize">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      orders.payment_status?.toLowerCase() === "paid"
                        ? "bg-green-600 text-black"
                        : orders.payment_status?.toLowerCase() === "pending"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-black"
                    }`}
                  >
                    {orders.payment_status}
                  </span>
                </td>

                <td className="text-center">
                  <select
                    key={orders._id} // ให้ React รู้ว่ามีการเปลี่ยนค่า
                    value={orders.delivery_status}
                    onChange={(e) =>
                      handleStatusChange(orders._id, e.target.value)
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
                      className="btn btn-info btn-sm "
                      onClick={() =>
                        document.getElementById("ModalOrderDetails").showModal()
                      }
                    >
                      {" "}
                      <TbListDetails />
                    </button>
                    <button className="btn btn-error btn-sm">
                      <FiDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModelOrderDetails name="ModalOrderDetails" />
    </div>
  );
};

export default Index;
