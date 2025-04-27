// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   AreaChart,
//   Area,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
// } from "@mui/material";

// // Sample Data
// const inventoryData = [
//   { name: "Classroom Supplies", value: 400 },
//   { name: "Lab Equipment", value: 300 },
//   { name: "Library Items", value: 200 },
//   { name: "Sports Equipment", value: 100 },
// ];

// const orderTrackingData = [
//   { date: "2023-10-01", orders: 20 },
//   { date: "2023-10-02", orders: 35 },
//   { date: "2023-10-03", orders: 40 },
//   { date: "2023-10-04", orders: 30 },
//   { date: "2023-10-05", orders: 50 },
// ];

// const supplyStatusData = [
//   { status: "Pending", count: 12 },
//   { status: "Completed", count: 25 },
//   { status: "Cancelled", count: 5 },
// ];

// const salesPerformanceData = [
//   { date: "2023-10-01", sales: 1000 },
//   { date: "2023-10-02", sales: 1500 },
//   { date: "2023-10-03", sales: 2000 },
//   { date: "2023-10-04", sales: 1800 },
//   { date: "2023-10-05", sales: 2500 },
// ];

// const recentOrders = [
//   { id: 1, product: "Notebooks", customer: "John Doe", status: "Completed" },
//   { id: 2, product: "Lab Goggles", customer: "Jane Smith", status: "Pending" },
//   { id: 3, product: "Basketballs", customer: "Alice Johnson", status: "Cancelled" },
// ];

// // Colors for Pie Chart
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const Dashboard = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         Inventory and Order Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Inventory Overview */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} style={{ padding: "20px" }}>
//             <Typography variant="h6" gutterBottom>
//               Inventory Distribution
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={inventoryData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {inventoryData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         {/* Order Tracking */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} style={{ padding: "20px" }}>
//             <Typography variant="h6" gutterBottom>
//               Order Trends
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={orderTrackingData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         {/* Supply Status */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} style={{ padding: "20px" }}>
//             <Typography variant="h6" gutterBottom>
//               Supply Status
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={supplyStatusData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="status" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="count" fill="#82ca9d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         {/* Sales Performance */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} style={{ padding: "20px" }}>
//             <Typography variant="h6" gutterBottom>
//               Sales Performance
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={salesPerformanceData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         {/* Recent Orders Table */}
//         <Grid item xs={12}>
//           <Paper elevation={3} style={{ padding: "20px" }}>
//             <Typography variant="h6" gutterBottom>
//               Recent Orders
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Order ID</TableCell>
//                     <TableCell>Product</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell>Status</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {recentOrders.map((order) => (
//                     <TableRow key={order.id}>
//                       <TableCell>{order.id}</TableCell>
//                       <TableCell>{order.product}</TableCell>
//                       <TableCell>{order.customer}</TableCell>
//                       <TableCell>{order.status}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";

// Colors for Pie Chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [orderTrackingData, setOrderTrackingData] = useState([]);
  const [supplyStatusData, setSupplyStatusData] = useState([]);
  const [salesPerformanceData, setSalesPerformanceData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    // Fetch inventory data
    fetch("http://127.0.0.1:5000/dashboard/api/inventory")
      .then((response) => response.json())
      .then((data) => setInventoryData(data))
      .catch((error) => console.error("Error fetching inventory data:", error));

    // Fetch order tracking data
    fetch("http://127.0.0.1:5000/dashboard/api/order-tracking")
      .then((response) => response.json())
      .then((data) => setOrderTrackingData(data))
      .catch((error) => console.error("Error fetching order tracking data:", error));

    // Fetch supply status data
    fetch("http://127.0.0.1:5000/dashboard/api/supply-status")
      .then((response) => response.json())
      .then((data) => setSupplyStatusData(data))
      .catch((error) => console.error("Error fetching supply status data:", error));

    // Fetch sales performance data
    fetch("http://127.0.0.1:5000/dashboard/api/sales-performance")
      .then((response) => response.json())
      .then((data) => setSalesPerformanceData(data))
      .catch((error) => console.error("Error fetching sales performance data:", error));

    // Fetch recent orders
    fetch("http://127.0.0.1:5000/dashboard/api/recent-orders")
      .then((response) => response.json())
      .then((data) => setRecentOrders(data))
      .catch((error) => console.error("Error fetching recent orders:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Inventory and Order Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Inventory Overview */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Inventory Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Order Tracking */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Order Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderTrackingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Supply Status */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Supply Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supplyStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Sales Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Order Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Orders Table */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;