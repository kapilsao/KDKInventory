


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const InventoryTable = ({products}) => {
//   // const [products, setProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(null);

//   const toggleModal = (product = null) => {
//     setSelectedProduct(product);
//     setIsModalOpen(!isModalOpen);
//   };

//   const toggleDeleteModal = (product = null) => {
//     setSelectedProduct(product);
//     setIsDeleteModalOpen(!isDeleteModalOpen);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     // Handle the product update logic here (e.g., API call to update product)
//     console.log("Product updated:", selectedProduct);
//     setIsModalOpen(false);
//   };

//   const handleDelete = () => {
//     // Handle the product delete logic here (e.g., API call to delete product)
//     console.log("Product deleted:", selectedProduct);
//     setIsDeleteModalOpen(false);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse border border-gray-200">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 border-b text-left">
//               <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
//             </th>
//             <th className="p-3 border-b text-left">Product Name</th>
//             <th className="p-3 border-b text-left">Category</th>
//             {/* <th className="p-3 border-b text-left">SKU</th> */}
//             <th className="p-3 border-b text-left">Unit Price</th>
//             <th className="p-3 border-b text-left">In-Stock</th>
//             <th className="p-3 border-b text-left">Total Value</th>
//             <th className="p-3 border-b text-left">Status</th>
//             <th className="p-3 border-b text-left">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.length > 0 ? (
//             products.map((row) => (
//               <tr key={row.unique_id} className="hover:bg-gray-50">
//                 <td className="p-3 border-b">
//                   <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
//                 </td>
//                 <td className="p-3 border-b font-medium">{row.product_name}</td>
//                 <td className="p-3 border-b">{row.category}</td>
//                 {/* <td className="p-3 border-b">{row.sku}</td> */}
//                 <td className="p-3 border-b">{row.unit_price}</td>
//                 <td className="p-3 border-b">{row.in_stock}</td>
//                 <td className="p-3 border-b">{row.total_value}</td>
//                 <td className="p-3 border-b"> 
//                   <span
//                     className={`px-2 py-1 rounded-full text-sm 
//                     ${(row.status === "Available" && row.in_stock>10) ? "bg-green-300" : "bg-red-300"} 
//                       border-black border-2
//                     `}
//                   >
//                  { (row.in_stock<10 && row.in_stock != 0)?"Low Stock":
//                     row.status}
//                   </span>
//                 </td>
//                 <td className="p-3 border-b relative">
//                   {/* Action Button Dropdown */}
//                   <button
//                     onClick={() => setDropdownOpen(dropdownOpen === row.unique_id ? null : row.unique_id)}
//                     className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
//                   >
//                     Actions
//                   </button>

//                   {dropdownOpen === row.unique_id && (
//                     <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                       <button
//                         onClick={() => toggleModal(row)}
//                         className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={() => toggleDeleteModal(row)}
//                         className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-100"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9" className="p-3 text-center text-gray-500">No products available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Update Product Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Update Product</h2>
//             <form onSubmit={handleUpdate}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Product Name</label>
//                 <input
//                   type="text"
//                   value={selectedProduct?.product_name || ""}
//                   onChange={(e) => setSelectedProduct({ ...selectedProduct, product_name: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Category</label>
//                 <input
//                   type="text"
//                   value={selectedProduct?.category || ""}
//                   onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">SKU</label>
//                 <input
//                   type="text"
//                   value={selectedProduct?.sku || ""}
//                   onChange={(e) => setSelectedProduct({ ...selectedProduct, sku: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Unit Price</label>
//                 <input
//                   type="text"
//                   value={selectedProduct?.unit_price || ""}
//                   onChange={(e) => setSelectedProduct({ ...selectedProduct, unit_price: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="flex items-center justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={toggleModal}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Update Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Product Modal */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Delete Product</h2>
//             <p>Are you sure you want to delete the product: {selectedProduct?.product_name}?</p>
//             <div className="flex items-center justify-end gap-2 mt-4">
//               <button
//                 type="button"
//                 onClick={toggleDeleteModal}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg"
//               >
//                 Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InventoryTable;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const InventoryTable = ({ products }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(null); // Track the currently open dropdown

//   const toggleModal = (product = null) => {
//     setSelectedProduct(product);
//     setIsModalOpen(!isModalOpen);
//   };

//   const toggleDeleteModal = (product = null) => {
//     setSelectedProduct(product);
//     setIsDeleteModalOpen(!isDeleteModalOpen);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     console.log("Product updated:", selectedProduct);
//     setIsModalOpen(false);
//   };

//   const handleDelete = () => {
//     console.log("Product deleted:", selectedProduct);
//     setIsDeleteModalOpen(false);
//   };

//   const handleDropdownToggle = (productId) => {
//     setDropdownOpen(dropdownOpen === productId ? null : productId);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse border border-gray-200">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 border-b text-left">
//               <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
//             </th>
//             <th className="p-3 border-b text-left">Product Name</th>
//             <th className="p-3 border-b text-left">Category</th>
//             <th className="p-3 border-b text-left">Unit Price</th>
//             <th className="p-3 border-b text-left">In-Stock</th>
//             <th className="p-3 border-b text-left">Total Value</th>
//             <th className="p-3 border-b text-left">Status</th>
//             <th className="p-3 border-b text-left">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.length > 0 ? (
//             products.map((row,key) => (
//               <tr key={key} className="hover:bg-gray-50">
//                 <td className="p-3 border-b">
//                   <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
//                 </td>
//                 <td className="p-3 border-b font-medium">{row.product_name}</td>
//                 <td className="p-3 border-b">{row.category}</td>
//                 <td className="p-3 border-b">{row.unit_price}</td>
//                 <td className="p-3 border-b">{row.in_stock}</td>
//                 <td className="p-3 border-b">{row.total_value}</td>
//                 <td className="p-3 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-sm 
//                     ${(row.status === "Available" && row.in_stock > 10) ? "bg-green-300" : "bg-red-300"} 
//                     border-black border-2
//                     `}
//                   >
//                     {row.in_stock < 10 && row.in_stock !== 0 ? "Low Stock" : row.status}
//                   </span>
//                 </td>
//                 <td className="p-3 border-b relative">
//                   {/* Action Button Dropdown */}
//                   <button
//                     onClick={() => handleDropdownToggle(key)} // Toggle based on unique_id
//                     className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
//                   >
//                     Actions
//                   </button>

//                   {dropdownOpen === key && ( // Show dropdown only for active row
//                     <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                       <button
//                         onClick={() => toggleModal(row)}
//                         className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={() => toggleDeleteModal(row)}
//                         className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-100"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9" className="p-3 text-center text-gray-500">No products available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Update Product Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Update Product</h2>
//             <form onSubmit={handleUpdate}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Product Name</label>
//                 <input
//                   type="text"
//                   value={selectedProduct?.product_name || ""}
//                   onChange={(e) => setSelectedProduct({ ...selectedProduct, product_name: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Category</label>
//                 <input
//                   type="text"
//                   value={selectedProduct?.category || ""}
//                   onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">SKU</label>
//                 <input
//                   type="text"
//                   value={selectedProduct?.sku || ""}
//                   onChange={(e) => setSelectedProduct({ ...selectedProduct, sku: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Unit Price</label>
//                 <input
//                   type="text"
//                   value={selectedProduct?.unit_price || ""}
//                   onChange={(e) => setSelectedProduct({ ...selectedProduct, unit_price: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="flex items-center justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={toggleModal}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Update Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Product Modal */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Delete Product</h2>
//             <p>Are you sure you want to delete the product: {selectedProduct?.product_name}?</p>
//             <div className="flex items-center justify-end gap-2 mt-4">
//               <button
//                 type="button"
//                 onClick={toggleDeleteModal}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg"
//               >
//                 Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InventoryTable;



import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryTable = ({ products ,searchQuery}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track the currently open dropdown

  const [item_id,setItemid] = useState(0);

  const toggleModal = (product,id) => {
    setSelectedProduct(product);
    setItemid(id);
    setIsModalOpen(!isModalOpen);
  };

  console.log(searchQuery);

  const filteredRows = products.filter((row) =>
   
  row.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
// var item_id=0;
  const toggleDeleteModal = (product,id) => {
    console.log(`id=${id}`);
  
    setItemid(id);
    console.log(` test item_id=${item_id}`);
    setSelectedProduct(product);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleUpdate = async (e) => {
    const userid=localStorage.getItem('userid')
    e.preventDefault();
    try {
      // Make the API call to update the product
      const response = await axios.post(
        `http://127.0.0.1:5000/product/update/${item_id}`, // Replace with your actual API endpoint
        {selectedProduct,userid}
      );
      console.log("Product updated:", response.data);
      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    const userid=localStorage.getItem('userid')
    try {
      // Make the API call to delete the product
      console.log(`item_id=${item_id}`);
      const response = await axios.delete(
        `http://127.0.0.1:5000/product/delete/${item_id}/${userid}` // Replace with your actual API endpoint
      );
      console.log("Product deleted:", response.data);
      setIsDeleteModalOpen(false);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDropdownToggle = (productId) => {
    setDropdownOpen(dropdownOpen === productId ? null : productId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b text-left">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            </th>
            <th className="p-3 border-b text-left">Product Name</th>
            <th className="p-3 border-b text-left">Category</th>
            <th className="p-3 border-b text-left">Unit Price</th>
            <th className="p-3 border-b text-left">In-Stock</th>
            <th className="p-3 border-b text-left">Total Value</th>
            <th className="p-3 border-b text-left">Status</th>
            <th className="p-3 border-b text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            filteredRows.map((row) => (
              <tr key={row.product_id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </td>
                <td className="p-3 border-b font-medium">{row.product_name}</td>
                <td className="p-3 border-b">{row.category}</td>
                <td className="p-3 border-b">{row.unit_price}</td>
                <td className="p-3 border-b">{row.in_stock}</td>
                <td className="p-3 border-b">{row.total_value}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-sm 
                    ${(row.status === "Available" && row.in_stock > 10) ? "bg-green-300" : "bg-red-300"} 
                    border-black border-2
                    `}
                  >
                    {row.in_stock < 10 && row.in_stock !== 0 ? "Low Stock" : row.status}
                  </span>
                </td>
                <td className="p-3 border-b relative">
                  {/* Action Button Dropdown */}
                  <button
                    onClick={() => handleDropdownToggle(row.product_id)} // Toggle based on unique_id
                    className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    Actions
                  </button>

                  {dropdownOpen === row.product_id && ( // Show dropdown only for active row
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => toggleModal(row,row.product_id)}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => toggleDeleteModal(row,row.product_id)}
                        className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="p-3 text-center text-gray-500">No products available</td>
            </tr>
          )}
        </tbody>
        {filteredRows.length === 0 && (
        <p className="text-center py-4 text-gray-500">No products match your search.</p>
      )}
      </table>

      {/* Update Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={selectedProduct?.product_name || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={selectedProduct?.category || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={selectedProduct?.quantity || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Unit Price</label>
                <input
                  type="text"
                  value={selectedProduct?.unit_price || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, unitPrice: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Product Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Delete Product</h2>
            <p>Are you sure you want to delete the product: {selectedProduct?.product_name}?</p>
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
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
