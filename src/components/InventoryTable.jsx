// import React from "react";

// const InventoryTable = () => {
//   const rows = Array.from({ length: 5 }).map((_, i) => ({
//     id: i,
//     productName: "Wool Felt Sheets",
//     category: "Texture",
//     sku: "TS121321",
    
//     unitPrice: "$15",
//     stock: 32,
//     totalValue: "$200.00",
//     status: i % 2 === 0 ? "In-Stock" : "Out of stock",
//     statusVariant: i % 2 === 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
//   }));

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse border border-gray-200">
//         {/* Table Header */}
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 border-b text-left">
//               <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
//             </th>
//             <th className="p-3 border-b text-left">Product Name</th>
//             <th className="p-3 border-b text-left">Category</th>
//             <th className="p-3 border-b text-left">SKU</th>
//             {/* <th className="p-3 border-b text-left">Incoming</th> */}
//             <th className="p-3 border-b text-left">Unit Price</th>
//             <th className="p-3 border-b text-left">In-Stock</th>
//             <th className="p-3 border-b text-left">Total Value</th>
//             <th className="p-3 border-b text-left">Status</th>
//             <th className="p-3 border-b text-left"></th>
//           </tr>
//         </thead>

//         {/* Table Body */}
//         <tbody>
//           {rows.map((row) => (
//             <tr key={row.id} className="hover:bg-gray-50">
//               <td className="p-3 border-b">
//                 <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
//               </td>
//               <td className="p-3 border-b font-medium">
//                 <div className="flex items-center gap-2">
//                   <div className="w-10 h-10 bg-gray-100 rounded"></div>
//                   {row.productName}
//                 </div>
//               </td>
//               <td className="p-3 border-b">{row.category}</td>
//               <td className="p-3 border-b">{row.sku}</td>
//               {/* <td className="p-3 border-b">{row.incoming}</td> */}
//               <td className="p-3 border-b">{row.unitPrice}</td>
//               <td className="p-3 border-b">{row.stock}</td>
//               <td className="p-3 border-b">{row.totalValue}</td>
//               <td className="p-3 border-b">
//                 <span
//                   className={`px-2 py-1 rounded-full text-sm ${row.statusVariant}`}
//                 >
//                   {row.status}
//                 </span>
//               </td>
//               <td className="p-3 border-b">
//                 <button
//                   className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
//                   aria-label="Actions"
//                 >
//                   Actions
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InventoryTable;





import React, { useState } from "react";

const InventoryTable = () => {
  const rows = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    productName: "Wool Felt Sheets",
    category: "Texture",
    sku: "TS121321",
    unitPrice: "$15",
    stock: 32,
    totalValue: "$200.00",
    status: i % 2 === 0 ? "In-Stock" : "Out of stock",
    statusVariant: i % 2 === 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(!isModalOpen);
  };

  const toggleDeleteModal = (product = null) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle the product update logic here (e.g., API call to update product)
    console.log("Product updated:", selectedProduct);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Handle the product delete logic here (e.g., API call to delete product)
    console.log("Product deleted:", selectedProduct);
    setIsDeleteModalOpen(false);
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
            <th className="p-3 border-b text-left">SKU</th>
            <th className="p-3 border-b text-left">Unit Price</th>
            <th className="p-3 border-b text-left">In-Stock</th>
            <th className="p-3 border-b text-left">Total Value</th>
            <th className="p-3 border-b text-left">Status</th>
            <th className="p-3 border-b text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              </td>
              <td className="p-3 border-b font-medium">{row.productName}</td>
              <td className="p-3 border-b">{row.category}</td>
              <td className="p-3 border-b">{row.sku}</td>
              <td className="p-3 border-b">{row.unitPrice}</td>
              <td className="p-3 border-b">{row.stock}</td>
              <td className="p-3 border-b">{row.totalValue}</td>
              <td className="p-3 border-b"> 
              <span
                 className={`px-2 py-1 rounded-full text-sm ${row.statusVariant}`}
                 >
                   {row.status}
                 </span>
              </td>
             
              <td className="p-3 border-b relative">
                {/* Action Button Dropdown */}
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === row.id ? null : row.id)}
                  className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                >
                  Actions
                </button>

                {dropdownOpen === row.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => toggleModal(row)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => toggleDeleteModal(row)}
                      className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
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
                  value={selectedProduct?.productName || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
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
                <label className="block text-sm font-medium mb-1">SKU</label>
                <input
                  type="text"
                  value={selectedProduct?.sku || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, sku: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Unit Price</label>
                <input
                  type="text"
                  value={selectedProduct?.unitPrice || ""}
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
            <p>Are you sure you want to delete the product: {selectedProduct?.productName}?</p>
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
