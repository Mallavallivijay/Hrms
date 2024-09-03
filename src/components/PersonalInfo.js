// middlename, lastname, maritalStatus, gender, bloodGroup were removed since they are not present in the API data.
// Data Initialization: Updated the useState initialization with default values that are relevant to the fields you expect from the API.
// Data Fetching and Parsing: Adjusted fetchData to correctly parse and map fields from the API response to the component's state.



import React, { useState, useEffect } from "react";
import axios from "axios";
import EditFamilyDetails from"./EditPersonalDetails";
import {FaEdit,FaLessThan } from 'react-icons/fa'
import Navbar from "./LocationNavbar";

const PersonalInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    prefix: "",
    firstname: "",
    middlename: "",
    lastname: "",
    countryCode: '',
    phoneNumber: "",
    maritalStatus: "",
    dob: "",
    gender: "",
    fatherName: "",
    dateOfJoining: "",
    bloodGroup: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.16:8080/employeeservice/employee/getEmployeeProfile/E001');
        const data = response.data;

        setPersonalDetails({
          firstname: data.firstname,
          lastname: data.lastname,
          phoneNumber: data.phoneNumber,
          maritalStatus: data.maritialStatus,
          dob: new Date(data.dob).toISOString().split('T')[0], // Converting ISO to YYYY-MM-DD4
          Gender: data.gender,
         
          fatherName: data.fatherName,
          dateOfJoining: new Date(data.doj).toISOString().split('T')[0],
          bloodGroup:data.bloodGroup,
          
      } ) } catch (error) {
        console.error('Error fetching data in url :', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedDetails) => {
    setPersonalDetails(updatedDetails);
    setIsModalOpen(false);
  };

  return (
    <div> 
      <Navbar/>
      <button className="bg-gray-500 p-2 mt-8 ml-10 px-5 rounded-md">Previous</button>
        <div className="flex  justify-center  items-start p-5 mt-16 "> 
        {/*   <div className="absolute top-17 left-4  mb-11 bg-gray-300 border-orange-700 text-black py-1 px-3 rounded shadow-md">
            <button className="font-bold">Previous</button>
          </div> */}
          
      {/* p-36 */}
      
      <div className="w-2/3 mt-5 bg-white shadow-lg rounded-lg relative">
        {/* w-2/3 */}
      
        <div className="bg-orange-500 text-white p-4 rounded-t-lg">
          <h1 className="text-base sm:text-lg font-bold">{personalDetails.firstname} {personalDetails.lastname}</h1>
        </div>
        <div className="p-8 border border-gray-300 rounded-b-lg relative">
          {/* <div className="absolute top-9 right-8 flex space-x-2"> */}
          <div className="absolute top-9   right-9 flex space-x-2">

            <button className="text-black-500 hover:text-orange-700" onClick={handleEditClick}>
              <FaEdit size={20} />
            </button>
          </div>
          <div className="bg-gray-100 p-5 rounded-md border border-gray-300">
            {/* <div className="grid grid-cols-4 gap-4"> */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="font-bold">Prefix</p>
                <p>{personalDetails.prefix}</p>
              </div>
              <div>
                <p className="font-bold">First Name</p>
                <p>{personalDetails.firstname}</p>
              </div>
              <div>
                <p className="font-bold">Last Name</p>
                <p>{personalDetails.lastname}</p>
              </div>
              <div>
                <p className="font-bold">Middle Name</p>
                <p>{personalDetails.middlename}</p>
              </div>
              <div>
                <p className="font-bold">Phone Number</p>
                <p>{personalDetails.countryCode} {personalDetails.phoneNumber}</p>
              </div>
              <div>
                <p className="font-bold">Martial Status</p>
                <p>{personalDetails.maritalStatus}</p>
              </div>
              <div>
                <p className="font-bold">Date of Birth</p>
                <p>{personalDetails.dob}</p>
              </div>
              <div>
                <p className="font-bold">Gender</p>
                <p>{personalDetails.gender}</p>
              </div>
              <div>
                <p className="font-bold">Date of Joining</p>
                <p>{personalDetails.dateOfJoining}</p>
              </div>
              <div>
                <p className="font-bold">Father's Name</p>
                <p>{personalDetails.fatherName}</p>
              </div>
              <div>
                <p className="font-bold">Blood Group</p>
                <p>{personalDetails.bloodGroup}</p>
              </div>
              {/* Add other fields as necessary */}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditFamilyDetails
          member={personalDetails}
          onSave={handleSave}
          onCancel={handleModalClose}
        />
      )}
    </div>
    </div>
  );
};

export default PersonalInfo;
