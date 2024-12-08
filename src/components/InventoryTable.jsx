import React from "react";

const InventoryTable = () => {
  const rows = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    productName: "Wool Felt Sheets",
    category: "Texture",
    sku: "TS121321",
    incoming: 14,
    unitPrice: "$15",
    stock: 32,
    totalValue: "$200.00",
    status: i % 2 === 0 ? "In-Stock" : "Out of stock",
    statusVariant: i % 2 === 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
  }));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        {/* Table Header */}
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b text-left">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            </th>
            <th className="p-3 border-b text-left">Product Name</th>
            <th className="p-3 border-b text-left">Category</th>
            <th className="p-3 border-b text-left">SKU</th>
            <th className="p-3 border-b text-left">Incoming</th>
            <th className="p-3 border-b text-left">Unit Price</th>
            <th className="p-3 border-b text-left">In-Stock</th>
            <th className="p-3 border-b text-left">Total Value</th>
            <th className="p-3 border-b text-left">Status</th>
            <th className="p-3 border-b text-left"></th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              </td>
              <td className="p-3 border-b font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded"></div>
                  {row.productName}
                </div>
              </td>
              <td className="p-3 border-b">{row.category}</td>
              <td className="p-3 border-b">{row.sku}</td>
              <td className="p-3 border-b">{row.incoming}</td>
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
              <td className="p-3 border-b">
                <button
                  className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                  aria-label="Actions"
                >
                  Actions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
