import { Link, BrowserRouter as Router } from "react-router-dom";

import React, { useState ,useEffect} from "react";
import {
  FaBell,
  FaBoxOpen,
  FaChevronDown,
  FaHome,
  FaSignOutAlt,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCogs,
} from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
// import InventoryTable from "../components/InventoryTable";
import OrderTable from "../components/OrderTable";
import axios from 'axios'

function Order() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const totalPages = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [isaddModalOpen, setIsaddModalOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    "customer_name": "",
    "product_name": "",
    "category": "",
    "quantity": "",
    "unitPrice": "",
   
  });


  const [totalOrders, setTotalOrders] = useState(0);

  const [pending,setPendingOrders] = useState(0);
  const [completed,setCompletedOrders] = useState(0);
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const[changebool,setchangebool] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };
  const addtoggleModal = () => {
    setIsaddModalOpen(!isaddModalOpen); // Toggle modal visibility
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };


  const fetchOrders = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch("http://127.0.0.1:5000/order/getorders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      
      // Count total, pending, and completed orders
      const totalOrders = data.length;
      const pendingOrders = data.filter((order) => order.status === "Pending").length;
      const completedOrders = data.filter((order) => order.status === "completed").length;
  
      // Update state
      setOrders(data);
      setTotalOrders(totalOrders);
      setPendingOrders(pendingOrders);
      setCompletedOrders(completedOrders);
      setchangebool(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };


  useEffect(() => {
    fetchOrders();
    // handleOrders();
  }, [changebool]);

  const handleOrders = async (e) => {
    e.preventDefault();
    console.log(orderData);
    try {
      const userid=localStorage.getItem('userid')
      const response = await axios.post(" http://127.0.0.1:5000/order/postorders", {orderData,userid});
      console.log("Product added:", response.data);
      setchangebool(true);
      addtoggleModal(); // Close modal after adding the product

      // total=  localStorage.getItem("TOTAL_ITEMS");
      // cat= localStorage.getItem("TOTAL_CATEGORY");
      // low= localStorage.getItem("LOW_STOCK_ITEMS"); 

      // window.location.reload();
  
      // Optionally refresh data or show success notification
    } catch (error) {
      console.error("Error adding product:", error);
      // Show error notification if needed
    }
  };


  return (
 
        


 <div className="flex flex-col min-h-screen w-full">
  <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6">
    <div className="flex items-center gap-2">
      <FaHome className="h-4 w-4" />
      <span className="text-sm text-gray-600">/</span>
      <span className="text-sm font-medium">Orders</span>
    </div>
  </header>

  <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-semibold">Order Tracking Summary</h1>
    </div>
    <button
              onClick={addtoggleModal}
              className="ml-auto px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FaBoxOpen className="h-4 w-4" />
              Add Product
            </button>

    {/* Cards Section */}
    <div className="grid gap-4 md:grid-cols-3">
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-sm font-medium text-gray-600">Total Orders</h2>
        <div className="text-2xl font-bold mt-2">{totalOrders} Orders</div>
      </div>
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-sm font-medium text-gray-600">Pending</h2>
        <div className="text-2xl font-bold mt-2">{pending} orders </div>
      </div>
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-sm font-medium text-gray-600">Completed</h2>
        <div className="text-2xl font-bold mt-2">{completed} orders</div>
      </div>
    </div>

    {/* Orders Table */}
    <div className="border rounded-lg bg-white shadow-sm">
      <div className="flex items-center gap-4 p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold">Orders Table</h2>
        <div className="ml-auto flex items-center gap-2">
          <input
            className="w-[300px] p-2 border rounded-lg"
            placeholder="Search"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Export
          </button>
        </div>
      </div>
      <OrderTable searchQuery={searchQuery} orders={orders}  totalOrders={totalOrders} isLoading={isLoading} setchangebool={setchangebool}/>
    </div>

    {/* Pagination */}
    {/* <div className="flex items-center justify-between p-4 border-t">
      <button
        className="px-4 py-2 border rounded-lg"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        Previous
      </button>
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
      <button
        className="px-4 py-2 border rounded-lg"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </button>
    </div> */}
    {isaddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[500px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleOrders}>
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Person Name</label>
                <input
                  type="text"
                  name="customer_name"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter customer_name"
                  value={orderData.customer_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter customer_name"
                  value={orderData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter quantity"
                  value={orderData.quantity}
                  onChange={handleInputChange}
                />
              </div>

              {/* Unit Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Unit Price</label>
                <input
                  type="number"
                  name="unitPrice"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter unit price"
                  value={orderData.unitPrice}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={orderData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  <option value="Classroom Supplies">Classroom Supplies</option>
                  <option value="Lab Equipment">Lab Equipment</option>
                  <option value="Library Items">Library Items</option>
                  <option value="Sports Equipment">Sports Equipment</option>
                  <option value="Furniture and Fixtures">Furniture and Fixtures</option>
                  <option value="IT and Networking Equipment">IT and Networking Equipment</option>
                  <option value="Administrative Supplies">Administrative Supplies</option>
                  <option value="Student Supplies">Student Supplies</option>
                </select>
              </div>

              

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={addtoggleModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
  </main>
</div>

   
      
  );
}

export default Order;