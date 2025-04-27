import React, { useState,useEffect } from 'react';
import { Download } from 'lucide-react';
import axios from 'axios';

// Mock data for demonstration
// const mockTrackingEvents = [
//   {
//     id: '1',
//     productName: 'Laptop',
//     personName: 'John Doe',
//     role: 'admin',
//     action: 'add',
//     details: {
//       quantityChanged: 10,
//       currentUnitPrice: 999.99,
//     },
//     timestamp: new Date('2023-06-01T10:00:00'),
//     section: 'Inventory',
//   },
//   {
//     id: '2',
//     productName: 'Mouse',
//     personName: 'Jane Smith',
//     role: 'manager',
//     action: 'update',
//     details: {
//       quantityChanged: -5,
//       currentUnitPrice: 29.99,
//     },
//     timestamp: new Date('2023-06-02T14:30:00'),
//     section: 'Orders',
//   },
//   {
//     id: '3',
//     productName: 'Keyboard',
//     personName: 'Bob Johnson',
//     role: 'faculty',
//     action: 'delete',
//     details: {
//       quantityChanged: -20,
//       currentUnitPrice: 0,
//     },
//     timestamp: new Date('2023-06-03T09:15:00'),
//     section: 'Inventory',
//   },
// ];

// Custom UI components
const Input = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border border-gray-300 rounded p-2 w-full"
  />
);

const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    {children}
  </button>
);

const Badge = ({ children, className }) => (
  <span className={`inline-block px-2 py-1 text-sm rounded ${className}`}>{children}</span>
);

const Select = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded p-2"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export  default function InventoryTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState('All');
  const [trackingEvents, setTrackingEvents] = useState([]);

useEffect(() => {
    fetchTrackingEvents();
  }, []);

  const fetchTrackingEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/auth/getAuditTrail');
      setTrackingEvents(response.data.audit_trails);
    } catch (error) {
      console.error('Error fetching tracking events:', error);
    }
  };

  const filteredEvents = trackingEvents.filter(
    (event) =>
      (event.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.personName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterSection === 'All' || event.section === filterSection)
  );

  const getActionColor = (action) => {
    switch (action) {
      case 'Added a new order':
        return 'bg-green-500 text-white';
     case 'Completed order':
        return 'bg-green-500 text-white';
      case 'Deleted the Product':
        return 'bg-red-500 text-white';
    case 'cancel order':
        return 'bg-red-500 text-white';
      case 'Update the Product':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

//   const handleExport = () => {
//     const csvContent = [
//       ['Product Name', 'Person Name', 'Role', 'Action', 'Details', 'Timestamp', 'Section'],
//       ...filteredEvents.map((event) => [
//         event.productName,
//         event.name,
//         event.role,
//         event.action,
//         event.details,
//         // `${event.details.quantityChanged}`, `$${event.details.currentUnitPrice.toFixed(2)}`,
//         event.timestamp,
//         event.section,
//       ]),
//     ]
//       .map((row) => row.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'inventory_tracking_export.csv');
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

const handleExport = () => {
    const csvContent = [
      ['Product Name', 'Person Name', 'Role', 'Action', 'Details', 'Timestamp', 'Section'],
      ...filteredEvents.map((event) => [
        event.productName,
        event.name,  // Ensure consistent field naming
        event.role,
        event.action,
        JSON.stringify(event.details),  // Convert details object to a JSON string
        new Date(event.timestamp).toLocaleString(),  // Format timestamp as a readable string
        event.section,
      ]),
    ]
      .map((row) => row.map((item) => `"${item}"`).join(',')) // Wrap each item in quotes for CSV formatting
      .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'inventory_tracking_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory Tracking</h1>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
      <div className="flex gap-4 mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by product or person name"
        />
        <Select
          value={filterSection}
          onChange={setFilterSection}
          options={[
            { value: 'All', label: 'All Sections' },
            { value: 'Inventory', label: 'Inventory' },
            { value: 'Orders', label: 'Orders' },
          ]}
        />
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left">Product Name</th>
            <th className="p-2 text-left">Person Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Action</th>
            <th className="p-2 text-left">Details</th>
            <th className="p-2 text-left">Timestamp</th>
            <th className="p-2 text-left">Section</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td className="p-2">{event.productName}</td>
              <td className="p-2">{event.name}</td>
              <td className="p-2">
                <Badge className="bg-gray-200">{event.role}</Badge>
              </td>
              <td className="p-2">
                <Badge className={getActionColor(event.action)}>{event.action}</Badge>
              </td>
              <td className="p-2">
              <div>{event.details}</div>
                {/* <div>Qty: {event.details.quantityChanged}</div> */}
                {/* <div>Price: ${event.details.currentUnitPrice.toFixed(2)}</div> */}
              </td>
              <td className="p-2">{event.timestamp}</td>
              <td className="p-2">{event.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}