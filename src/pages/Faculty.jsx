// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [activeTab, setActiveTab] = useState("addOrder");

//   let name= localStorage.getItem("userName");

//   // formData["customer_name"]=name;

//   name = name ? name.replace(/^"(.*)"$/, '$1') : "";


//   const [formData, setFormData] = useState({
//     customer_name: name,
//     product_name: "",
//     date: "",
//     category: "",
//     quantity: "",
//     unitPrice: "",
//     totalValue: "",
//     status: ""
//   });
//   const [customerName, setCustomerName] = useState("");
//   const [orders, setOrders] = useState([]);

 
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:5000/order/faculty/add_order", formData);
//       alert("Order added successfully");
//       setFormData({
//         customer_name: "",
//         product_name: "",
//         date: "",
//         category: "",
//         quantity: "",
//         unitPrice: "",
//         totalValue: "",
//         status: ""
//       });
//     } catch (error) {
//       alert("Error adding order");
//     }
//   };

//   const fetchOrders = async () => {
    

//     console.log(name);
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/order/faculty/orders", {
//         customer_name:name
//       });

//       console.log(response.data.orders);
//       setOrders(response.data.orders);
//     } catch (error) {
//       alert("Error fetching orders");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="flex justify-center mb-4">
//         <button
//           className={`px-4 py-2 mx-2 rounded-md ${activeTab === "addOrder" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           onClick={() => setActiveTab("addOrder")}
//         >
//           Add Order
//         </button>
//         <button
//           className={`px-4 py-2 mx-2 rounded-md ${activeTab === "viewOrders" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           onClick={() => setActiveTab("viewOrders")}
//         >
//           View Orders
//         </button>
//       </div>

//       {activeTab === "addOrder" ? (
//         <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-lg mx-auto">
//           <input type="text" name="customer_name" placeholder="Customer Name" value={formData.customer_name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
//           <input type="text" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
//           <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
//           <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
//           <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
//           <input type="number" name="unitPrice" placeholder="Unit Price" value={formData.unitPrice} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
//           <input type="number" name="totalValue" placeholder="Total Value" value={formData.totalValue} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
//           <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
//         </form>
//       ) : (
//         <div className="bg-white p-4 rounded shadow-md max-w-lg mx-auto">
//           <input
//             type="text"
//             placeholder="Enter Customer Name"
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             className="w-full p-2 mb-2 border rounded"
//           />
//           <button onClick={fetchOrders} className="w-full bg-green-500 text-white p-2 rounded mb-4">Fetch Orders</button>
//           {orders.length > 0 ? (
//             <ul>
//               {orders.map((order) => (
//                 <li key={order.id} className="p-2 border-b">
//                   <strong>{order.product_name}</strong> - {order.status} {order.date} 
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No orders found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [activeTab, setActiveTab] = useState("addOrder");

  let name = localStorage.getItem("userName");
  name = name ? name.replace(/^"(.*)"$/, '$1') : "";

  const [formData, setFormData] = useState({
    customer_name: name,
    product_name: "",
    date: "",
    category: "Classroom Supplies", // Default category
    quantity: "",
    unitPrice: "",
    totalValue: "",
    status: "Pending" // Default status
  });

  const [customerName, setCustomerName] = useState("");
  const [orders, setOrders] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/order/faculty/add_order", formData);
      alert("Order added successfully");
      setFormData({
        customer_name: name,
        product_name: "",
        date: "",
        category: "Classroom Supplies",
        quantity: "",
        unitPrice: "",
        totalValue: "",
        status: "Pending"
      });
    } catch (error) {
      alert("Error adding order");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/order/faculty/orders", {
        customer_name: name
      });
      setOrders(response.data.orders);
    } catch (error) {
      alert("Error fetching orders");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 rounded-md ${activeTab === "addOrder" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("addOrder")}
        >
          Add Order
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-md ${activeTab === "viewOrders" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("viewOrders")}
        >
          View Orders
        </button>
      </div>

      {activeTab === "addOrder" ? (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-lg mx-auto">
          <input type="text" name="customer_name" placeholder="Customer Name" value={formData.customer_name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
          <input type="text" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
          
          {/* Dropdown for Category */}
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required>
            <option value="Classroom Supplies">Classroom Supplies</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Library Items">Library Items</option>
            <option value="Sports Equipment">Sports Equipment</option>
            <option value="Furniture and Fixtures">Furniture and Fixtures</option>
            <option value="IT and Networking Equipment">IT and Networking Equipment</option>
            <option value="Administrative Supplies">Administrative Supplies</option>
            <option value="Student Supplies">Student Supplies</option>
          </select>

          <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
          <input type="number" name="unitPrice" placeholder="Unit Price" value={formData.unitPrice} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
          <input type="number" name="totalValue" placeholder="Total Value" value={formData.totalValue} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
          
          {/* Status defaulted to "Pending" */}
          <input type="text" name="status" value="Pending" className="w-full p-2 mb-2 border rounded bg-gray-200" readOnly />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      ) : (
        <div className="bg-white p-4 rounded shadow-md max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Enter Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button onClick={fetchOrders} className="w-full bg-green-500 text-white p-2 rounded mb-4">Fetch Orders</button>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="p-2 border-b">
                {order.date}  <strong>{order.product_name}</strong> - {order.status}  
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
