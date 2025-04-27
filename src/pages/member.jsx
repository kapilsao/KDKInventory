// import React, { useState, useEffect } from 'react';
// // import male from '../assets/gender/male.png';
// // import female from '../assets/gender/female.png';
// // import Admin from '../assets/section/Admin.png';

// function User_Management() {
   
//     const [memberData, setMemberData] = useState([
//         {
//             "Name":"Vedant Patel",
//             "Gender":"Male",
//             "Role":"Admin",
//             "Phone":"9324195020"
//         },
//         {
//             "Name":"Jyoti Rangu",
//             "Gender":"Female",
//             "Role":"Manager",
//             "Phone":"9874563210"
//         },
//         {
//             "Name":"Ritik",
//             "Gender":"Male",
//             "Role":"Client",
//             "Phone":"9324195020"
//         },
//         {
//             "Name":"Sakshi",
//             "Gender":"Female",
//             "Role":"Employee",
//             "Phone":"9874563210"
//         },
//         {
//             "Name":"Kapil Sao",
//             "Gender":"Male",
//             "Role":"Admin",
//             "Phone":"9324195020"
//         },
//         {
//             "Name":"Yuga",
//             "Gender":"Female",
//             "Role":"Manager",
//             "Phone":"9874563210"
//         },
//     ]);

//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedRole, setSelectedRole] = useState('');
//     const [showAddPopup, setShowAddPopup] = useState(false);
//     const [showEditPopup, setShowEditPopup] = useState(false);
//     const [newMember, setNewMember] = useState({ Name: '', Gender: 'Male', Role: '', Phone: '' });
//     const [roles, setRoles] = useState(['Role','Admin', 'Manager', 'Employee', 'Client']);
//     const [selectedUser, setSelectedUser] = useState('');

//     useEffect(() => {
//         const storedMembers = JSON.parse(localStorage.getItem('members'));
//         if (storedMembers) {
//             setMemberData(storedMembers);
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('members', JSON.stringify(memberData));
//     }, [memberData]);

//     const handleAddMember = () => {
//         setMemberData([...memberData, newMember]);
//         setNewMember({ Name: '', Gender: 'Male', Role: 'Client', Phone: '' });
//         setShowAddPopup(false);
//     };

//     const handleEditRole = () => {
//         const updatedData = memberData.map((member) =>
//             member.Name === selectedUser ? { ...member, Role: newMember.Role } : member
//         );
//         setMemberData(updatedData);
//         setShowEditPopup(false);
//     };

//     const handleDeleteMember = (name) => {
//         const updatedData = memberData.filter((member) => member.Name !== name);
//         setMemberData(updatedData);
//     };

//     const filteredMembers = memberData.filter(
//         (member) =>
//             member.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//             (selectedRole === '' || member.Role === selectedRole)
//     );

//     return (

//         <>
//     <div className="bg-white p-10 w-full rounded-lg h-auto flex flex-col lg:flex-row justify-around mb-5">
//         <div className="Text mb-5 lg:mb-0 text-center lg:text-left">
//             <h1 className="text-2xl lg:text-[40px] font-bold font-serif">
//                 This Section Will be Accessed by Admin Only
//             </h1>
//         </div>
//         {/* <img
//             src={Admin}
//             alt="Admin Section"
//             width={300}
//             height={200}
//             className="mx-auto lg:mx-0"
//         /> */}
//     </div>

//     <div className="flex flex-col md:flex-row justify-between items-center">
//         <h1 className="font-bold text-lg md:text-2xl">
//             Member({filteredMembers.length})
//         </h1>
//         <div className="mt-4 md:mt-0">
//             <button
//                 className="p-2 pr-5 pl-5 bg-primary text-white rounded-lg font-bold hover:bg-accent hover:text-button"
//                 onClick={() => setShowAddPopup(true)}
//             >
//                 Add Member
//             </button>
//             <button
//                 className="p-2 pr-5 pl-5 ml-4 bg-slate-400 text-white rounded-lg font-bold hover:bg-accent hover:text-button"
//                 onClick={() => setShowEditPopup(true)}
//             >
//                 Edit Role
//             </button>
//         </div>
//     </div>

//     <div className="bg-white p-5 md:p-10 w-full mt-10 rounded-lg h-auto">
//         <div className="flex flex-col md:flex-row items-center md:justify-between">
//             <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
//                 <input
//                     type="search"
//                     placeholder="Search"
//                     className="rounded-lg bg-gray-100 p-2 pl-10 w-full"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-xl text-gray-500"></i>
//             </div>
//             <select
//     className="bg-gray-100 text-gray-800 rounded-lg pr-4 pl-4 py-2 w-full md:w-1/4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//     value={selectedRole}
//     onChange={(e) => setSelectedRole(e.target.value)}
// >
//     <option value="" className="p-3 text-gray-500">Role</option>
//     {roles.map((role) => (
//         <option key={role} value={role}>
//             {role}
//         </option>
//     ))}
// </select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10 font-bold text-sm md:text-base">
//             <h2>Name</h2>
//             <h2>Gender</h2>
//             <h2>Role</h2>
//             <h2>Phone Number</h2>
//             <h2>Actions</h2>
//         </div>

//         <div className="membersData">
//             {filteredMembers.map((member) => (
//                 <div
//                     className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-5 items-center text-sm md:text-base"
//                     key={member.Name}
//                 >
//                     <div className="flex items-center">
//                         {/* <img
//                             src={member.Gender === "Male" ? male : female}
//                             alt="Gender Icon"
//                             width={30}
//                             height={30}
//                         /> */}
//                         <h2 className="ml-2">{member.Name}</h2>
//                     </div>
//                     <h2>{member.Gender}</h2>
//                     <h2>{member.Role}</h2>
//                     <h2>{member.Phone}</h2>
//                     <button
//                         className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
//                         onClick={() => handleDeleteMember(member.Name)}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ))}
//         </div>
//     </div>

//     {showAddPopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//             <div className="bg-white p-8 rounded-lg w-full max-w-md">
//                 <h2 className="text-xl font-bold mb-4">Add Member</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     className="w-full mb-4 p-2 border rounded-lg"
//                     value={newMember.Name}
//                     onChange={(e) => setNewMember({ ...newMember, Name: e.target.value })}
//                 />
//                 <select
//                     className="w-full mb-4 p-2 border rounded-lg"
//                     value={newMember.Gender}
//                     onChange={(e) => setNewMember({ ...newMember, Gender: e.target.value })}
//                 >
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                 </select>
//                 <select
//                     className="w-full mb-4 p-2 border rounded-lg"
//                     value={newMember.Role}
//                     onChange={(e) => setNewMember({ ...newMember, Role: e.target.value })}
//                 >
//                     {roles.map((role) => (
//                         <option key={role} value={role}>
//                             {role}
//                         </option>
//                     ))}
//                 </select>
//                 <input
//                     type="text"
//                     placeholder="Phone"
//                     className="w-full mb-4 p-2 border rounded-lg"
//                     value={newMember.Phone}
//                     onChange={(e) => setNewMember({ ...newMember, Phone: e.target.value })}
//                 />
//                 <div className="flex justify-end">
//                     <button
//                         className="p-2 pr-5 pl-5 bg-primary text-white rounded-lg font-bold hover:bg-accent hover:text-button mr-4"
//                         onClick={handleAddMember}
//                     >
//                         Add
//                     </button>
//                     <button
//                         className="p-2 pr-5 pl-5 bg-gray-400 text-white rounded-lg font-bold hover:bg-red-500"
//                         onClick={() => setShowAddPopup(false)}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )}


//     {/* Similar logic applies for the Edit Popup */}

//     {showEditPopup && (
//         <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-8 rounded-lg w-11/12 sm:w-3/5 lg:w-1/3">
//                 <h2 className="text-xl font-bold mb-4 text-center">Edit Role</h2>
//                 <select
//                     className="w-full mb-4 p-2 border rounded-lg"
//                     onChange={(e) => setSelectedUser(e.target.value)}
//                 >
//                     <option value="">Select User</option>
//                     {memberData.map((member) => (
//                         <option key={member.Name} value={member.Name}>
//                             {member.Name}
//                         </option>
//                     ))}
//                 </select>
//                 <select
//                             className="w-full mb-4 p-2 border rounded-lg"
//                             onChange={(e) => setNewMember({ ...newMember, Role: e.target.value })}
//                         >
//                             <option value="">Select Role</option>
//                             {roles.map((role) => (
//                                 <option key={role} value={role}>
//                                     {role}
//                                 </option>
//                             ))}
//                         </select>
//                 <div className="flex justify-end mt-4">
//                     <button
//                         className="p-2 pr-5 pl-5 bg-primary text-white rounded-lg font-bold hover:bg-accent hover:text-button mr-4"
//                         onClick={handleEditRole}
//                     >
//                         Save
//                     </button>
//                     <button
//                         className="p-2 pr-5 pl-5 bg-gray-400 text-white rounded-lg font-bold hover:bg-red-500"
//                         onClick={() => setShowEditPopup(false)}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )}
// </>


       
//     );
// }

// export default User_Management;


import React, { useState, useEffect } from "react";

function User_Management() {
  const [memberData, setMemberData] = useState([
    { Name: "Vedant Patel", Gender: "Male", Role: "Admin", Phone: "9324195020" },
    { Name: "Jyoti Rangu", Gender: "Female", Role: "Manager", Phone: "9874563210" },
    { Name: "Ritik", Gender: "Male", Role: "Client", Phone: "9324195020" },
    { Name: "Sakshi", Gender: "Female", Role: "Employee", Phone: "9874563210" },
    { Name: "Kapil Sao", Gender: "Male", Role: "Admin", Phone: "9324195020" },
    { Name: "Yuga", Gender: "Female", Role: "Manager", Phone: "9874563210" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newMember, setNewMember] = useState({ Name: "", Gender: "Male", Role: "Client", Phone: "" });
  const [roles] = useState(["Role", "Admin", "Manager", "Employee", "Client"]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("members"));
    if (storedMembers) setMemberData(storedMembers);
  }, []);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(memberData));
  }, [memberData]);

  const handleAddMember = () => {
    setMemberData([...memberData, newMember]);
    setNewMember({ Name: "", Gender: "Male", Role: "Client", Phone: "" });
    setShowAddPopup(false);
  };

  const handleEditRole = () => {
    const updatedData = memberData.map((member) =>
      member.Name === selectedUser ? { ...member, Role: newMember.Role } : member
    );
    setMemberData(updatedData);
    setShowEditPopup(false);
  };

  const handleDeleteMember = (name) => {
    const updatedData = memberData.filter((member) => member.Name !== name);
    setMemberData(updatedData);
  };

  const filteredMembers = memberData.filter(
    (member) =>
      member.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "" || member.Role === selectedRole)
  );

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white p-5 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Access: User Management
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-700">
          Members ({filteredMembers.length})
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddPopup(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Member
          </button>
          <button
            onClick={() => setShowEditPopup(true)}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Edit Role
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5">
        <input
          type="text"
          placeholder="Search Member"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/2 bg-white shadow"
        />
        <select
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole}
          className="p-2 border rounded-lg bg-white shadow"
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Member Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Gender</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr
                key={index}
                className="even:bg-gray-100 hover:bg-blue-50 transition"
              >
                <td className="p-2">{member.Name}</td>
                <td className="p-2">{member.Gender}</td>
                <td className="p-2">{member.Role}</td>
                <td className="p-2">{member.Phone}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDeleteMember(member.Name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Member Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add New Member</h2>
            <input
              type="text"
              placeholder="Name"
              value={newMember.Name}
              onChange={(e) =>
                setNewMember({ ...newMember, Name: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-3"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newMember.Phone}
              onChange={(e) =>
                setNewMember({ ...newMember, Phone: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-3"
            />
            <select
              value={newMember.Role}
              onChange={(e) =>
                setNewMember({ ...newMember, Role: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-3"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User_Management;

