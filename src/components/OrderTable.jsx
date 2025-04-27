

import React, { useState, useEffect } from "react";
import axios from 'axios'

const OrderTable = ({ searchQuery ,orders,totalOrders,isLoading,setchangebool}) => {

//   const [isLoading, setIsLoading] = useState(true);
//   const [totalOrders, setTotalOrders] = useState(0);

//     const [pending,setPendingOrders] = useState(0);
//     const [completed,setCompletedOrders] = useState(0);
//     const [orders, setOrders] = useState([]);


const [dropdownOpen, setDropdownOpen] = useState(null);
const [iscompleteModalOpen, setIscompleteModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const handleDropdownToggle = (productId) => {
  setDropdownOpen(dropdownOpen === productId ? null : productId);
};

// const [changeBool,setchngeBool]=useState();

const [item_id,setItemid] = useState(0);

  const toggleModal = (product,id) => {
    setSelectedProduct(product);
    setItemid(id);
    setIscompleteModalOpen(!iscompleteModalOpen);
  };


  const toggleDeleteModal = (product,id) => {
    console.log(`id=${id}`);
  
    setItemid(id);
    console.log(` test item_id=${item_id}`);
    setSelectedProduct(product);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handlecomplete = async() =>{
    try {
      // Make the API call to delete the product
      const userid=localStorage.getItem('userid')
      console.log(`item_id=${item_id}`);
      const response = await axios.post(
        `http://127.0.0.1:5000/order/complete/${item_id}/${userid}` // Replace with your actual API endpoint
      );
      console.log("Product deleted:", response.data);
      setIscompleteModalOpen(false);
      setchangebool(true);
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  
  const handleCancel = async () => {
    const userid=localStorage.getItem('userid')
    try {
      // Make the API call to delete the product
      console.log(`item_id=${item_id}`);
      const response = await axios.post(
        `http://127.0.0.1:5000/order/cancel/${item_id}/${userid}` // Replace with your actual API endpoint
      );
      console.log("Product deleted:", response.data);
      setIsDeleteModalOpen(false);

      setchangebool(true);
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
// const fetchOrders = async () => {
//     try {
//       setIsLoading(true); // Start loading
//       const response = await fetch("http://127.0.0.1:5000/order/getorders");
//       if (!response.ok) {
//         throw new Error("Failed to fetch orders");
//       }
//       const data = await response.json();
  
//       // Count total, pending, and completed orders
//       const totalOrders = data.length;
//       const pendingOrders = data.filter((order) => order.status === "pending").length;
//       const completedOrders = data.filter((order) => order.status === "completed").length;
  
//       // Update state
//       setOrders(data);
//       setTotalOrders(totalOrders);
//       setPendingOrders(pendingOrders);
//       setCompletedOrders(completedOrders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setIsLoading(false); // End loading
//     }
//   };


//   useEffect(() => {
//     fetchOrders();
//   }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div className="overflow-x-auto">
      {/* <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Orders</h1>
        <p className="text-gray-600">Total Orders: {totalOrders}</p>
      </div> */}
      {isLoading ? (
        <p className="text-center py-4 text-gray-500">Loading orders...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              </th>
              <th className="p-3 border-b text-left">Name</th>
              <th className="p-3 border-b text-left">Product Name</th>
              <th className="p-3 border-b text-left">Category</th>
              <th className="p-3 border-b text-left">Quantity</th>
              <th className="p-3 border-b text-left">Unit Price</th>
              <th className="p-3 border-b text-left">Total Value</th>
              <th className="p-3 border-b text-left">Date</th>
              <th className="p-3 border-b text-left">Status</th>
              <th className="p-3 border-b text-left">Action</th>

            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </td>
                <td className="p-3 border-b font-medium">{order.customer_name}</td>
                <td className="p-3 border-b font-medium">{order.product_name}</td>
                <td className="p-3 border-b">{order.category}</td>
                <td className="p-3 border-b">{order.quantity}</td>
                <td className="p-3 border-b">{order.unitPrice}</td>
                <td className="p-3 border-b">{order.totalValue}</td>
                <td className="p-3 border-b">{order.date}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      (order.status === "Pending" || order.status === "cancelled") 
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 border-b relative">
                  {/* Action Button Dropdown */}
                  <button
                    onClick={() => handleDropdownToggle(order.id)} // Toggle based on unique_id
                    className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    Actions
                  </button>

                  {dropdownOpen === order.id && ( // Show dropdown only for active row
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => toggleModal(order,order.id)}
                        className="block w-full px-4 py-2 text-left text-sm text-green-800 hover:bg-gray-100"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => toggleDeleteModal(order,order.id)}
                        className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Cancel Product</h2>
            <p>Are you sure you want to cancel the order: {selectedProduct?.product_name}?</p>
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={toggleDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
      {iscompleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Complete Order</h2>
            <p>Are you sure you want to mark this order completed: {selectedProduct?.product_name}?</p>
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlecomplete}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      )}
      {filteredOrders.length === 0 && !isLoading && (
        <p className="text-center py-4 text-gray-500">No products match your search.</p>
      )}
    </div>
  );
};

export default OrderTable;
