import api from "./api";
const API_URL = "/order";

const getAllOrders = async () => {
  return await api.get(`${API_URL}`);
};

const updateDeliveryStatus = async (id, status) => {
  return await api.put(`${API_URL}/${id}`, { delivery_status: status });
};

const OrderService = {
  getAllOrders,
  updateDeliveryStatus,
};

export default OrderService;
