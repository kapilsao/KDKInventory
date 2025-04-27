// import React from 'react'
// import SideNav from '../pages/SideNav';
// import { useState } from 'react';
// import Inventory from './Inventory';
// import User_Management from './member';
// import Faculty from './Faculty';
// import Order from './Order';
// import UserManagement from './userManagement'
// import InventoryTracking from './Tracking'
// import Dashboard from './Dashboard';
// const Main = () => {

    
//   const Section = ["Dashboard", "Inventory", "Tracking", "Order", "Report Analytics" , "User Management", "Setting"];

//   var [selectedSection,selectSection]= useState("Inventory");

//   const data = JSON.parse(localStorage.getItem("userData"));
//   console.log(`dt=${data}`);

//   return (
//     <>


// {(data === "faculty")?<Faculty/>:
// (
//     <div className='flex h-[100vh]  '>

//     <SideNav 
//     section={Section}
//     selected={selectedSection}
//     change={selectSection}
//     className=" w-full md:w-[30%] bg-gray-100 shadow-lg h-full"></SideNav>


// <div className='w-[80%]'>

//        { (selectedSection=="Inventory")?<Inventory/>:

//         ((selectedSection=="Order")?<Order />:

//        ((selectedSection=="User Management")?<UserManagement/>:((selectedSection=="Dashboard")?<Dashboard/>:<InventoryTracking/>))
//        )
       
       
//        }

// </div>



//     </div>)
// }



// </>
//   )
// }

// export default Main



import React, { useState } from 'react';
import SideNav from '../pages/SideNav';
import Inventory from './Inventory';
import UserManagement from './userManagement';
import Faculty from './Faculty';
import Order from './Order';
import InventoryTracking from './Tracking';
import Dashboard from './Dashboard';

const Main = () => {
  const Section = [
    "Dashboard",
    "Inventory",
    "Tracking",
    "Order",
    
    "User Management",
   
  ];

  const [selectedSection, selectSection] = useState("Inventory");

  const data = JSON.parse(localStorage.getItem("userData"));
  console.log(`dt=${data}`);

  return (
    <>
      {data === "faculty" ? (
        <Faculty />
      ) : (
        <div className="flex h-screen">
          <SideNav 
            section={Section}
            selected={selectedSection}
            change={selectSection}
            className="w-full md:w-[30%] bg-gray-100 shadow-lg h-full"
          />

          <div className="w-[80%] overflow-y-auto h-screen p-4">
            {selectedSection === "Inventory" ? (
              <Inventory />
            ) : selectedSection === "Order" ? (
              <Order />
            ) : selectedSection === "User Management" ? (
              <UserManagement />
            ) : selectedSection === "Dashboard" ? (
              <Dashboard />
            ) : (
              <InventoryTracking />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
