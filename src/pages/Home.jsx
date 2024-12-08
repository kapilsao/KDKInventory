import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { FaBell, FaBoxOpen, FaChevronDown, FaHome, FaSignOutAlt, FaSlidersH, FaShoppingCart, FaUsers, FaChartBar, FaCogs, FaEllipsisV } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import  InventoryTable  from "../components/InventoryTable";
function InventoryDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Router>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="hidden border-r bg-gray-100/40 lg:block">
          <div className="flex h-full flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-bold" to="#">
                <FaBoxOpen className="h-6 w-6" />
                <span className="text-xl">Investo</span>
              </Link>
            </div>
            <div className="flex-1 px-4">
              <nav className="grid gap-1 py-2">
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900" to="#">
                  <FaHome className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-primary transition-all" to="#">
                  <FaBoxOpen className="h-4 w-4" />
                  Inventory
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900" to="#">
                  <FaChartBar className="h-4 w-4" />
                  Tracking
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900" to="#">
                  <FaShoppingCart className="h-4 w-4" />
                  Orders
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900" to="#">
                  <FaChartBar className="h-4 w-4" />
                  Report Analytics
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900" to="#">
                  <FaUsers className="h-4 w-4" />
                  User Authentication
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900" to="#">
                  <FaCogs className="h-4 w-4" />
                  Setting
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <button className="w-full flex items-center justify-start gap-2 border rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-200">
                <FaSignOutAlt className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6">
            <div className="flex items-center gap-2">
              <FaHome className="h-4 w-4" />
              <span className="text-sm text-gray-600">/</span>
              <span className="text-sm font-medium">Inventory</span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <FaBell className="h-4 w-4" />
              </button>
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-200">
                  Bravaa shop
                  <FaChevronDown className="h-4 w-4" />
                </button>
                {/* Dropdown content */}
              </div>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">Inventory Summary</h1>
              <button className="ml-auto px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <FaBoxOpen className="h-4 w-4" />
                Add Product
              </button>
            </div>

            {/* Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4">
                <h2 className="text-sm font-medium">Categories</h2>
                <div className="text-2xl font-bold mt-2">Total (17 items)</div>
              </div>
              <div className="border rounded-lg p-4">
                <h2 className="text-sm font-medium">Total Product</h2>
                <div className="text-2xl font-bold mt-2">Total 230</div>
              </div>
              <div className="border rounded-lg p-4">
                <h2 className="text-sm font-medium">Low Stock</h2>
                <div className="text-2xl font-bold mt-2">Total (12 items)</div>
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <div className="flex items-center gap-4 p-4 border-b">
                <h2 className="text-lg font-semibold">Inventory Items</h2>
                <div className="ml-auto flex items-center gap-2">
                  <input className="w-[300px] p-2 border rounded-lg" placeholder="Search" type="search" />
                  <button className="p-2 border rounded-lg">
                    <FiFilter className="h-4 w-4" />
                  </button>
                  <button className="px-4 py-2 border rounded-lg">Date</button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Export</button>
                </div>
              </div>
              {/* Table structure */}
              <InventoryTable/>
              
            </div>

            <div className="flex items-center justify-between p-4 border-t">
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
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default InventoryDashboard;
