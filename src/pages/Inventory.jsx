


import { FaBoxOpen, FaHome } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import InventoryTable from "../components/InventoryTable";
import axios from "axios";
import { useState ,useEffect} from "react";

function Inventory() {
  const [products, setProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [totalCategory, setTotalCategory] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);



  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    unitPrice: "",
    category: "",
  });

  // var total=localStorage.getItem("TOTAL_ITEMS")??0 ;
  // var cat= localStorage.getItem("TOTAL_CATEGORY")??0;
  // var low= localStorage.getItem("LOW_STOCK_ITEMS")??0; 
  const totalPages = 10;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log(productData);
    try {
      const userid=localStorage.getItem('userid')
      
      const response = await axios.post("http://127.0.0.1:5000/product/createProduct", {productData,userid});
      console.log("Product added:", response.data);
      toggleModal(); // Close modal after adding the product

      // total=  localStorage.getItem("TOTAL_ITEMS");
      // cat= localStorage.getItem("TOTAL_CATEGORY");
      // low= localStorage.getItem("LOW_STOCK_ITEMS"); 

      window.location.reload();
  
      // Optionally refresh data or show success notification
    } catch (error) {
      console.error("Error adding product:", error);
      // Show error notification if needed
    }
  };

  // ************************************************************
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product/get");
        const fetchedProducts = response.data;

        setProducts(fetchedProducts); // Set the fetched products
        console.log(response.data)

        // Calculate the total number of categories
        const categories = new Set(fetchedProducts.map((product) => product.category));
        setTotalCategory(categories.size); // Number of unique categories
        console.log(categories.size);

        // Calculate the total number of items (sum of in_stock)
        const total = fetchedProducts.reduce((acc, product) => acc + parseInt(product.in_stock, 10), 0);
        setTotalItems(total);
        console.log(total);
        // Find items that are low in stock (less than 10)
        const lowStock = fetchedProducts.filter((product) => parseInt(product.in_stock, 10) < 10);
        setLowStockItems(lowStock.length);
        console.log(lowStock.length);
        // Optionally, store in localStorage
        // localStorage.setItem("TOTAL_CATEGORY", categories.size);
        // localStorage.setItem("TOTAL_ITEMS", total);
        // localStorage.setItem("LOW_STOCK_ITEMS", JSON.stringify(lowStock.length));

        // window.location.reload();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* Main Content */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6">
          <div className="flex items-center gap-2">
            <FaHome className="h-4 w-4" />
            <span className="text-sm text-gray-600">/</span>
            <span className="text-sm font-medium">Inventory</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Inventory Summary</h1>
            <button
              onClick={toggleModal}
              className="ml-auto px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FaBoxOpen className="h-4 w-4" />
              Add Product
            </button>
          </div>

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <h2 className="text-sm font-medium">Categories</h2>
              <div className="text-2xl font-bold mt-2">Total ({totalCategory} items)</div>
            </div>
            <div className="border rounded-lg p-4">
              <h2 className="text-sm font-medium">Total Product</h2>
              <div className="text-2xl font-bold mt-2">Total {totalItems}</div>
            </div>
            <div className="border rounded-lg p-4">
              <h2 className="text-sm font-medium">Low Stock</h2>
              <div className="text-2xl font-bold mt-2">Total ({lowStockItems})</div>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <div className="flex items-center gap-4 p-4 border-b">
              <h2 className="text-lg font-semibold">Inventory Items</h2>
              <div className="ml-auto flex items-center gap-2">
                <input
                  className="w-[300px] p-2 border rounded-lg"
                  placeholder="Search"
                  type="search"
                  value={searchQuery}
                   onChange={handleSearchChange}
                />
                {/* <button className="p-2 border rounded-lg">
                  <FiFilter className="h-4 w-4" />
                </button> */}
                {/* <button className="px-4 py-2 border rounded-lg">Date</button> */}
                {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Export
                </button> */}
              </div>
            </div>

            {/* Inventory Table */}
            <InventoryTable products={products} searchQuery={searchQuery} />
          </div>

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
        </main>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[500px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter product name"
                  value={productData.name}
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
                  value={productData.quantity}
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
                  value={productData.unitPrice}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={productData.category}
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
                  onClick={toggleModal}
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
    </div>
  );
}

export default Inventory;
