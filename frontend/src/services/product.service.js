import api from "./api";
const API_URL = "";

const getAllProducts = async () => {
  //http://localhost:5173/products.json
  return await api.get(`${API_URL}/products.json`);
};

const ProductService = {
  getAllProducts,
};

export default ProductService;
