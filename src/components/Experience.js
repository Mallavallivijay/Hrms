// import './App.css';
import { TiPencil } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import { FaLessThan } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import axios from "axios"
import Navbar from "../components/ExperienceNav"
function App() {
  const initialData = {
    Organizationname: "",
    EmployeeId: "",
    Designation: "",
    DateofJoining: "",
    DateofExit: "",
    Experience: "",
    State: "",
    Country: "",
    Attachment: "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  
  const nameRegex = /^[a-zA-Z\s]+$/;
  const employRegex = /^[a-zA-Z0-9]+$/;
  // const employeNumberRegex=/^\d*$/;
  
  useEffect(()=>{
    const fetchCurrentDetails=async()=>{
      try{
        const response=await axios.get('http://192.168.1.16:8080/employeeservice/experience/HRMS1')
        const data=response.data;
        setFormData({
          Organizationname: data.organisationName,
          EmployeeId:data.id,
          Designation:data.designation,
          DateofJoining:data.doj,
          DateofExit:data.doe,
          Experience:data.experience,
          State:data.state,
          Country:data.country,
          Attachment: "",
          
        })
        console.log("Feteched data:",response.data);
      }catch(error){
        console.error('Error fetching Current Experience Details:',error)
      }
    };
    fetchCurrentDetails();
  },[]);


  const validateForm = () => {
    let newError = {};

    if (formData.Organizationname === "" ) {
      newError.Organizationname = 'Required Org.name';
    }
    if (formData.Organizationname.length < 4){
      newError.Organizationname="Min 4 Characters"
    }
    if (formData.Organizationname.length > 40){
      newError.Organizationname="Max 40 Characters"

    }
    if(!nameRegex.test(formData.Organizationname)){
      newError.Organizationname = "Enter only Characters"
    }
   

    if (formData.EmployeeId === "") {
      newError.EmployeeId = "Required EmployeeId";
    }
    if (formData.EmployeeId.length < 4){
      newError.EmployeeId="Min 4 Characters"
    }
    if (formData.EmployeeId.length > 20){
      newError.EmployeeId="Max 20 Characters"

    }
    if(!employRegex.test(formData.EmployeeId )){
      newError.EmployeeId="Enter Valid Emp.Id"
    }
    // if((!employeNumberRegex.test(formData.EmployeeId)) ){
    //   newError.EmployeeId="Enter Valid Emp.Id"
    // }

    // if (formData.Designation === '') {
    //   newError.Designation = "Designation is required";
    // }
    // if (formData.Designation.length < 4){
    //   newError.Designation="Min 4 Characters"
    // }
    // if (formData.Designation.length > 40){
    //   newError.Designation="Max 40 Characters"
    //  }
    //  if(!nameRegex.test(formData.Designation)){
    //   newError.Designation="Enter Only Charecters"
    //  }
    if (formData.DateofJoining === '') {
      newError.DateofJoining = "Date of Joining is required";
    }
    if (formData.DateofExit === '') {
      newError.DateofExit = "Date of Exit is required";
    }
    if (formData.Experience === '') {
      newError.Experience = "Experience is required";
    }
    if (formData.State === '') {
      newError.State = "Required State";
    }
    if (formData.State.length < 4){
      newError.State="Min 4 Characters"
    }
    if (formData.State.length > 40){
      newError.State="Max 40 Characters"

    }
    if(!nameRegex.test(formData.State)){
      newError.State="Enter only in Characters"
    }

    if (formData.Country === '') {
      newError.Country = "Country is required";
    }
    if (formData.Country.length < 4){
      newError.Country="Min 4 Characters"
    }
    if (formData.Country.length > 40){
      newError.Organizationname="Max 40 Characters"

    }



    if(!nameRegex.test(formData.Country)){
      newError.Country="Enter Only Characters"
    }


    setErrors(newError);
    return Object.keys(newError).length === 0;
  };



  const calculateExperience = (dateOfJoining, dateOfExit) => {
    const joinDate = new Date(dateOfJoining);
    const exitDate = new Date(dateOfExit);
  
    if (exitDate <= joinDate) {
      return "Invalid dates";
    }
    const diffTime = exitDate - joinDate;
  
  
    const diffYears = Math.floor(diffTime / (1000  *60 * 60*  24 * 365));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 *  24 *  365)) / (1000 * 60 * 60 * 24 * 30));
    const diffDays = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  
    return `${diffYears} years, ${diffMonths} months, ${diffDays} days`;
  };



  const handleOpenPopup = (index = null) => {
    if (index !== null) {
      setFormData({ ...tableData[index] });
      setEditIndex(index);
    } else {
      setFormData({ ...initialData });
      setEditIndex(null);
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditIndex(null); 
  };

  const preventManualInput = (e) => {
    e.preventDefault();
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (editIndex !== null) {
        // Edit existing row
        const updatedTableData = tableData.map((row, index) =>
          index === editIndex ? formData : row
        );
        setTableData(updatedTableData);
      } else {
        
        setTableData([...tableData, formData]);
      }
      handleClosePopup(); 
    } else {
      console.log('Failed to submit');
    }
  };

  const handleChange = (e) => {
    //  setFormData({ ...formData, [e.target.name]: e.target.value });



    const { name, value } = e.target;
     
       setFormData(prevData => {
           const updatedData = { ...prevData, [name]: value };

    
    if (updatedData.DateofJoining && updatedData.DateofExit) {
      const joinDate = new Date(updatedData.DateofJoining);
      const exitDate = new Date(updatedData.DateofExit);

      
      if (joinDate < exitDate) {
        updatedData.Experience = calculateExperience(updatedData.DateofJoining, updatedData.DateofExit);
        
        setErrors(prevErrors => ({
          ...prevErrors,
          DateofExit: joinDate >= exitDate ? "Date of Exit must be after Date of Joining" : "",
        }));
      } else {
        updatedData.Experience = "";
        
        setErrors(prevErrors => ({
          ...prevErrors,
          DateofExit: "Date of Exit must be after Date of Joining",
        }));
      }
    } else {
      updatedData.Experience = "";
    }

    return updatedData;
  });
};


const handleNameChar = (e)=>{
  const key = e.key
  if(!/[a-zA-Z]/.test(key)){
    e.preventDefault()

  }
} 

  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleAddRow = () => {
    handleOpenPopup(); 
  };


  

  return (
    <div>
         <div><Navbar/></div>
        <div className="mr-10 ml-[55px]">
              <div className="flex flex-row text-left justify-start px-3 py-2  border-2 border-gray-800 rounded-md w-[160px] mb-5 mt-5 ml-10">
                  <FaLessThan className="text-orange-500 mr-1 mt-1" />
                  <button><span className="text font-semibold text-orange-500">Previous Page</span></button>
              </div>
              {/* <div className="flex flex-row text-left justify-start px-3 py-2  border-2 border-gray-800 rounded-md w-[180px] mb-5 mt-5">
                  <FaLessThan className="text-orange-500 mr-1 mt-1" />
                  <button><span className="text font-semibold text-orange-500">Previous Page</span></button>
              </div>
               */}

        </div>
      <div>
          
      <div className="p-4 pt-5 mt-5 ml-20 mr-20">
        <table className="border border-gray-900 w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-black border-solid text-left bg-orange-500 text-white" colSpan="12">
                Vikram
              </th>
            </tr>
          <tr>
            <th className="py-1 px-4 border-b border-l-black text-left" colSpan="9">
              Experience
            </th>
            <th className="inline-block cursor-pointer  mr-2 py-1 px-4  text-right bg-green-600 m-2 text-white border-rounded" onClick={handleAddRow}>
              <button type="button">Add</button>
            </th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-4">Org Name</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-4">Emp Id</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-4">Designation</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-4">Date of Joining</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-4">Date of Exit</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-4">Experience</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-5">State</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-5">Country</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-5">Attachment</th>
            <th className="py-2 px-4 border-b-black border-2 border-solid border-black text-left p-3">Actions</th>
          </tr>

          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.Organizationname}</td>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.EmployeeId}</td>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.Designation}</td>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.DateofJoining}</td>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.DateofExit}</td>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.Experience}</td>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.State}</td>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.Country}</td>
              <td className="py-5 px-4 border-b border-gray-900 border-r">{row.Attachment}</td>
              <td className="py-2 px-4 border-b border-gray-600 text-right">
               <div className='flex flex-row'>
                <TiPencil className="inline-block mr-4 cursor-pointer text-blue-500 size-6" onClick={() => handleOpenPopup(index)} />
                {index !== 0 && (
                    <RiDeleteBin6Line
                      className="inline-block cursor-pointer text-red-500 size-6"
                      onClick={() => handleDelete(index)}
                    />
                  )}
                </div> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleClosePopup}>
          <div className="bg-gray-200 p-1 rounded-lg shadow-lg max-w-[650px] w-full" onClick={(e) => e.stopPropagation()}>
          <div className='flex items-center justify-between mb-4 bg-yellow-500 border border-gray-950 p-2'>
            <h2 className="p-1 m-1">{editIndex !== null ? "Edit Experience Details" : "Add New Experience"}</h2>
            {editIndex === null && <MdCancelPresentation className='text-xl'  onClick={handleClosePopup}/>}
          </div>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 p-4 m-2 ml-2 mr-2">
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Organization Name:</label>
                  <input
                    type="text"
                    name="Organizationname"
                    value={formData.Organizationname}
                    onKeyDown={handleNameChar}
                    onChange={handleChange}
                    className="p-1 border border-gray-300 rounded"
                  />
                  {errors.Organizationname && <p className="text-red-500">{errors.Organizationname}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Employee ID:</label>
                  <input
                    type="text"
                    name="EmployeeId"
                    value={formData.EmployeeId}
                    onChange={handleChange}
                    
                    className="p-1 border border-gray-300 rounded"
                  />
                  {errors.EmployeeId && <p className="text-red-500">{errors.EmployeeId}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Designation:</label>
                  {/* <input
                    type="text"
                    name="Designation"
                    value={formData.Designation}
                    onChange={handleDataList}
                    className="p-1 border border-gray-300 rounded"
                    list='designationOptions'
                  /> */}
                   <select className="p-1 border border-gray-300"
                        name="Designation"
                        value={formData.Designation}
                        onChange={handleChange}>
                       <option value="Select Designation">Select Designation</option>
   
                      <option value="Front-end Developer" >Front-end Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Tester">Tester</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                    </select>
                  {errors.Designation && <p className="text-red-500">{errors.Designation}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Date of Joining:</label>
                  <input
                    type="date"
                    name="DateofJoining"
                    value={formData.DateofJoining}
                    onChange={handleChange}
                    onKeyDown={preventManualInput}
                    className="p-1 border border-gray-300 rounded"
                  />
                  {errors.DateofJoining && <p className="text-red-500">{errors.DateofJoining}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Date of Exit:</label>
                  <input
                    type="date"
                    name="DateofExit"
                    value={formData.DateofExit}
                    onChange={handleChange}
                    onKeyDown={preventManualInput}
                    className="p-1 border border-gray-300 rounded"
                  />
                  {errors.DateofExit && <p className="text-red-500">{errors.DateofExit}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Experience:</label>
                  <input
                    type="text"
                    name="Experience"
                    value={formData.Experience}
                    readOnly
                    className="p-1 border border-gray-300 rounded"
                  />
                  {errors.Experience && <p className="text-red-500">{errors.Experience}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">State:</label>
                  <input
                    type="text"
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    onKeyDown={handleNameChar}
                    className="p-1 border border-gray-300 rounded"
                  />
                  {errors.State && <p className="text-red-500">{errors.State}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Country:</label>
                  <input
                    type="text"
                    name="Country"
                    value={formData.Country}
                    onChange={handleChange}
                    onKeyDown={handleNameChar}
                    className="p-1 border border-gray-300 rounded"
                  />
                  {errors.Country && <p className="text-red-500">{errors.Country}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Attachment:</label>
                  <input
                    type="file"
                    name="Attachment"
                    value={formData.Attachment}
                    onChange={handleChange}
                    className="p-1 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>

    </div>
  );
}

export default App;
