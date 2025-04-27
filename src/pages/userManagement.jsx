// import React, { useState } from "react";
// import { Search, Users } from "lucide-react";

// const membersData = [
//   { name: "Vedant Patel", gender: "Male", role: "Admin" },
//   { name: "Jyoti Rangu", gender: "Female", role: "Manager" },
//   { name: "Ritik", gender: "Male", role: "Client" },
//   { name: "Sakshi", gender: "Female", role: "Employee" },
//   { name: "Kapil Sao", gender: "Male", role: "Admin" },
//   { name: "Yuga", gender: "Female", role: "Manager" },
// ];

// const roles = ["Admin", "Manager", "Employee", "Client"];

// export default function UserManagement() {
//   const [members, setMembers] = useState(membersData);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredMembers = members.filter((member) =>
//     member.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleRoleChange = (name, newRole) => {
//     setMembers((prevMembers) =>
//       prevMembers.map((member) =>
//         member.name === name ? { ...member, role: newRole } : member
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mx-auto max-w-5xl space-y-6">
//         {/* Header */}
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="flex items-center gap-3">
//             <Users className="h-6 w-6 text-blue-600" />
//             <h1 className="text-xl font-semibold text-gray-900">
//               Admin Access: User Management
//             </h1>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-2">
//               <h2 className="text-lg font-medium">Members</h2>
//               <span className="bg-gray-200 text-gray-700 text-sm font-normal px-2 py-1 rounded">
//                 {filteredMembers.length}
//               </span>
//             </div>
//             <div className="relative w-full sm:max-w-[240px]">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search member..."
//                 className="pl-8 w-full border border-gray-300 rounded px-2 py-1"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="rounded-lg bg-white shadow-sm overflow-hidden">
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left font-semibold text-gray-900 p-4">
//                   Name
//                 </th>
//                 <th className="text-left font-semibold text-gray-900 p-4">
//                   Gender
//                 </th>
//                 <th className="text-left font-semibold text-gray-900 p-4">
//                   Role
//                 </th>
//                 <th className="text-right font-semibold text-gray-900 p-4">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMembers.map((member, index) => (
//                 <tr
//                   key={member.name}
//                   className={
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   }
//                 >
//                   <td className="p-4 font-medium text-gray-900">
//                     {member.name}
//                   </td>
//                   <td className="p-4">{member.gender}</td>
//                   <td className="p-4">
//                     <span
//                       className={`px-2 py-1 rounded text-sm ${
//                         member.role === "Admin"
//                           ? "bg-blue-100 text-blue-700"
//                           : member.role === "Manager"
//                           ? "bg-purple-100 text-purple-700"
//                           : member.role === "Employee"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-orange-100 text-orange-700"
//                       }`}
//                     >
//                       {member.role}
//                     </span>
//                   </td>
//                   <td className="p-4 text-right">
//                     <select
//                       className="border border-gray-300 rounded px-2 py-1"
//                       value={member.role}
//                       onChange={(e) =>
//                         handleRoleChange(member.name, e.target.value)
//                       }
//                     //   onClick={handleRoleChange()}
//                     >
//                       {roles.map((role) => (
//                         <option key={role} value={role}>
//                           {role}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Users } from "lucide-react";

const roles = ["Select","Admin", "Manager", "Employee", "Client"];

export default function UserManagement() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[changebool,setChangeBool] = useState("");

  useEffect(() => {
    // Fetch members from backend
    axios.get("http://127.0.0.1:5000/auth/users")
      .then(response => {
        setMembers(response.data);
        setChangeBool(false);
      })
      .catch(error => {
        console.error("Error fetching members:", error);
      });
  }, [changebool]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (id, newRole) => {
    const updatedMembers = members.map((member) =>
      member.name === name ? { ...member, role: newRole } : member
    );
    setMembers(updatedMembers);
    console.log(id);
    console.log(newRole);
    // Update role in backend
    axios.post("http://127.0.0.1:5000/auth/user/change-role", { id, role: newRole })
      .then(response => {
        console.log("Role updated successfully:", response.data);
        setChangeBool(true);

      })
      .catch(error => {
        console.error("Error updating role:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Access: User Management
            </h1>
          </div>
        </div>

        {/* Controls */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Members</h2>
              <span className="bg-gray-200 text-gray-700 text-sm font-normal px-2 py-1 rounded">
                {filteredMembers.length}
              </span>
            </div>
            <div className="relative w-full sm:max-w-[240px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search member..."
                className="pl-8 w-full border border-gray-300 rounded px-2 py-1"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg bg-white shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-semibold text-gray-900 p-4">
                  Name
                </th>
                <th className="text-left font-semibold text-gray-900 p-4">
                  Email
                </th>
                <th className="text-left font-semibold text-gray-900 p-4">
                  Role
                </th>
                <th className="text-right font-semibold text-gray-900 p-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={member.name}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-4 font-medium text-gray-900">{member.name}</td>
                  <td className="p-4">{member.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        member.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : member.role === "manager"
                          ? "bg-purple-100 text-purple-700"
                          : member.role === "faculty"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      className="border border-gray-300 rounded px-2 py-1"
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
