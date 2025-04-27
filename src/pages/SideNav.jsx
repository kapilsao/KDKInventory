


// import React from 'react';
// import { FiFilter } from "react-icons/fi";

// function SideNav({ section, selected, change }) {

//   return (
//     <>
    
//       <div
//         className="sideNav bg-white border-r-2 border-r-border h-auto pt-20 sm:pt-20 px-5 sm:px-10 
//                    w-[100vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] shadow-md"
//       >
//         <div className="flex items-center gap-2 font-bold mt-[-50px]">
//               {/* <FaBoxOpen className="h-6 w-6" /> */}
//               <span className="text-xl">Investo</span>
//             </div>

//         <ul>
        
//           {section.map((part) => (
//             <li
//               key={part}
//               onClick={() => change(part)}
//               className={`flex items-center p-2 rounded-md transition duration-200 ease-in-out
//                           ${selected === part ? 'bg-primary text-red-500' : 'bg-white text-secondary'} 
//                           hover:bg-gray-200 cursor-pointer mb-4`}
//             >
//               <i
//                 className={`fa-solid ${
//                   part === 'Setting'
//                     ? 'fa-gear'
//                     : part === 'Member'
//                     ? 'fa-user-group'
//                     : part === 'Document'
//                     ? 'fa-file'
//                     : part === 'Dashboard'
//                     ? 'fa-box'
//                     : part === 'Road Map'
//                     ? 'fa-road'
//                     : 'fa-home'
//                 } text-lg sm:text-xl ${selected === part ? 'text-white' : 'text-secondary'}`}
//               ></i>
//               <h2
//                 className={`ml-4 font-medium sm:font-semibold text-base sm:text-lg md:text-xl 
//                             ${selected === part ? 'text-red' : 'text-secondary'}`}
//               >
//                 {part}
//               </h2>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

// export default SideNav;


import React from "react";
import {
    FaBell,
    FaBoxOpen,
    FaChevronDown,
    FaHome,
    FaSignOutAlt,
    FaShoppingCart,
    FaUsers,
    FaChartBar,
    FaCogs,
  } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";

function SideNav({ section, selected, change }) {

  var navigate = useNavigate();

  function Logout(){
    localStorage.setItem('userid',null);
    localStorage.setItem("userData",null);
    localStorage.setItem("userName",null);
    console.log('Logout Sucess:');
    navigate('/signin');
  }
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block w-[20%]">
      <div className="flex h-full flex-col gap-2">

        {/* Header Section */}
        <div className="flex h-[60px] items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold">
            <FaBoxOpen className="h-6 w-6" />
            <span className="text-xl">KDK IM</span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4">
          <nav className="grid gap-1 py-2">
            {section.map((part) => (
              <button
                key={part}
                onClick={() => change(part)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                            ${selected === part ? "bg-gray-100 text-primary" : "text-gray-500"} 
                            hover:text-gray-900`}
              >
                {/* Dynamic Icons */}
                {part === "Dashboard" && <FaHome className="h-4 w-4" />}
                {part === "Inventory" && <FaBoxOpen className="h-4 w-4" />}
                {part === "Tracking" && <FaChartBar className="h-4 w-4" />}
                {part === "Order" && <FaShoppingCart className="h-4 w-4" />}
                
                {part === "User Management" && <FaUsers className="h-4 w-4" />}
                
         

                <span>{part}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="mt-auto p-4">
          <button className="w-full flex items-center justify-start gap-2 border rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-200" onClick={Logout}>
            <FaSignOutAlt className="h-4 w-4"  />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
