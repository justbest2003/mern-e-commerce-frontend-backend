import api from "./api";
const API_URL = "/order";

const getAllOrders = async () => {
  return await api.get(`${API_URL}`);
};

const getOrderById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const deleteOrder = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const updateDeliveryStatus = async (id, status) => {
  return await api.put(`${API_URL}/${id}`, { delivery_status: status });
};

const OrderService = {
  getAllOrders,
  updateDeliveryStatus,
  getOrderById,
  deleteOrder,
};

export default OrderService;
