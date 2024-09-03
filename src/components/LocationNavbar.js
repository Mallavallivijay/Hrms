// import React from "react";
// import { IoPersonSharp } from "react-icons/io5";

// function Navbar() {
//   return (
//     <nav className="flex justify-between bg-orange-500 px-4 h-16 items-center">


//       <div className=" h-32 w-32">  
//         <img
//           src="/Rfchh logo"
//           alt="Logo"
//           className="h-full w-full object-cove "
//         />
//       </div>

//       {/* Centered person icon and name */}
//       <div className="flex  flex-growitems-center justify-center text-black-500">
//         <IoPersonSharp className="text-2xl mr-2" />
//         <h1 className="text-xl font-bold">Person</h1>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { SlEnvolope } from "react-icons/sl";
import { IoNotifications } from "react-icons/io5";

function Navbar() {
  return (
  //  MainContainer
    <nav className="flex items-center justify-between bg-orange-500 px-6 h-18 z-10 border-b border-gray-300">


      {/* Left side (Logo) */}
      <div className="h-12  w-12 border rounded-md">
        <img
          src="/Rfchh logo"
          alt="Logo"
          className="h-full w-full object-contain"
        />
      </div>


      {/* Centered icon and label */}
     
 <div className="flex items-center ml-44 text-black">
        <IoPersonSharp className="text-2xl mr-2" />
        <h1 className="text-xl font-semibold">Personal</h1>
      </div>

      {/* Right side (Profile-related icons) */}
      <div className="flex items-center space-x-4">
        <SlEnvolope  className="text-black text-xl" />
        <IoNotifications className="text-black text-xl" />

        <div className="flex items-center space-x-2  p-2 rounded">
          <div className="h-8 w-8 bg-gray-300 rounded-full" />

          <div className="flex flex-col">
            <span className="text-black font-semibold">Vijay</span>
            <span className="text-sm text-black-600">Front-end Developer</span>
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
