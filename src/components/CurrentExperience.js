import React, { useEffect, useState } from "react";
import { FaPen, FaTrash , FaRegWindowClose,FaLessThan} from "react-icons/fa";
import Nav from "../components/CurrentNav";
import axios from 'axios';


const ExperienceCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    empName: "",
    empId: "",
    designation: "",
    doj: "",
    manager: "",
    pay: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [tableData, setTableData] = useState(null);
  const designationOptions = ["Backend Developer","Bussiness Analyst","Data Analyst","Digital Marketing"," Frontend Developer", "Tester"];

  useEffect(()=>{
    const fetchCurrentDetails=async()=>{
      try{
        const response=await axios.get('http://192.168.1.16:8080/employeeservice/currentexperience/E001')
        const data=response.data;
        setFormData({
          orgName: data.organisationName,
          empName: data.employeeName,
          empId: data.employeeId,
          designation: data.designation,
          doj: data.doj,
          manager: data.reportingManager,
          pay: data.pay,
        })
        console.log("Feteched data:",response.data);
      } catch(error){
        console.error('Error fetching Current Experience Details:',error)
      }
    };
    fetchCurrentDetails();
  },[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); 
  };
  const handleDesignationChange = (e) => {
    setFormData({ ...formData, designation: e.target.value });
    setFormErrors({ ...formErrors, designation: "" });
  };
  const handleAlphaInputChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setFormData({ ...formData, [name]: value });
      setFormErrors({ ...formErrors, [name]: "" }); 
    } else {
      setFormErrors({ ...formErrors, [name]: "Only letters are allowed." });
    }
  };
  const preventManualInput = (e) => {
    e.preventDefault();
  };
  const handleDateChange = (e) => {
    setFormData({ ...formData, doj: e.target.value });
    setFormErrors({ ...formErrors, doj: "" });
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.empName) {
      errors.empName = "Employee Name is required.";
    } else if (formData.empName.length < 4 || formData.empName.length > 40) {
      errors.empName = "Employee Name should be between 4 and 40 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.empName)) {
      errors.empName = "Employee Name should contain only alphabets and spaces.";
    }

    if (!formData.orgName) {
      errors.orgName = "Organization Name is required.";
    }else if (formData.orgName.length < 4 || formData.orgName.length > 40) {
      errors.orgName = "Employee Name should be between 4 and 40 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.orgName)) {
      errors.orgName = "Employee Name should contain only alphabets and spaces.";
    }

    if (!formData.empId) {
      errors.empId = "Employee ID is required.";
    }else if (formData.empId.length < 4 || formData.empId.length > 40) {
      errors.empId = "Employee Name should be between 4 and 40 characters.";
    } 

    if (!formData.designation) {
      errors.designation = "Designation is required.";
    }

    if (!formData.doj) {
      errors.doj = "Date of Joining is required.";
    }else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.doj)) {
      errors.doj = "Date must be in the format YYYY-MM-DD.";
    }

    if (!formData.manager) {
      errors.manager = "Reporting Manager is required.";
    }else if (formData.manager.length < 4 || formData.manager.length > 40) {
      errors.manager = "Employee Name should be between 4 and 40 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.manager)) {
      errors.manager = "Employee Name should contain only alphabets and spaces.";
    }

    if (!formData.pay) {
      errors.pay = "Pay is required.";
    }else if (!/^\d+$/.test(formData.pay)) {
      errors.pay = "Pay  should contain only numbers.";
    } else if (formData.pay < 0 || formData.pay > 9999999) {
      errors.pay = "Pay should be between 0 and 9,999,999.";
    }
    

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();


    if (Object.keys(errors).length === 0) {
      setTableData(formData);
      setIsPopupOpen(false);
      setIsEditMode(false);
      setFormData({
        orgName: "",
        empName: "",
        empId: "",
        designation: "",
        doj: "",
        manager: "",
        pay: "",
      });
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };
  const handleDelete = () => {
    setTableData(null); 
  };

  const handleEdit = () => {
    setIsPopupOpen(true);
    setIsEditMode(true);
  };
 

  const handleCancel = () => {
    setIsPopupOpen(false);
    setIsEditMode(false);
    setFormData({
      orgName: "",
      empName: "",
      empId: "",
      designation: "",
      doj: "",
      manager: "",
      pay: "",
    });
  };

  return (
    <>
    <Nav/>
    <div className="mr-48 ml-48">
        <div className="flex items-center justify-center px-2 py-2  overflow-x-auto border-2 border-gray-800 rounded-md  w-fit  mb-5 mt-5  ">
         <FaLessThan  className="text-orange-500  mr-2"/>
         <button className="text font-semibold text-orange-500" > Previous Page </button>
        </div>
    
     
      <div className="bg-orange-500  text-white p-4 rounded-t-md">
         <h2 className="font-semibold">BA</h2>
      </div>

      <div className="bg-white p-2 border-t border-1 border-black flex justify-between items-center">
        <span className="font-semibold">Current Experience</span>
        <div className="flex space-x-4 ">
          <FaPen className="text-black cursor-pointer" onClick={handleEdit} />
          <FaTrash className="text-black cursor-pointer"  onClick={handleDelete}/>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 px-4 py-2">Org Name</th>
              <th className="border border-gray-400 px-4 py-2">Emp Name</th>
              <th className="border border-gray-400 px-4 py-2">Emp ID</th>
              <th className="border border-gray-400 px-4 py-2">Designation</th>
              <th className="border border-gray-400 px-4 py-2">Date Of Joining</th>
              <th className="border border-gray-400 px-4 py-2">Reporting Manager</th>
              <th className="border border-gray-400 px-4 py-2">Pay</th>
            </tr>
          </thead>
          <tbody>
            {tableData && (
              <tr>
                <td className="border border-gray-400 px-4 py-2">{tableData.orgName}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.empName}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.empId}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.designation}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.doj}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.manager}</td>
                <td className="border border-gray-400 px-4 py-2">{tableData.pay}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isPopupOpen && (
        
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex  flex-wrap justify-center items-center ">
          <div className="  rounded-lg max-w-max  ">
            <div className="flex justify-between items-center bg-orange-500   border-2   border-black p-2 rounded-t-lg">
              <h3 className="semibold ">{isEditMode ? "Edit Current Experience Details" : "Enter Details"}</h3>
               <button ><FaRegWindowClose  className="text-black  text-xl cursor-pointer" onClick={handleCancel}/></button>
            </div>
            <form    className="bg-gray-300 p-4 rounded-b-lg">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-16 p-10" >
              <div className="ml-10 ">
                <label  className="block">Emp Name:</label>
                <input
                  type="text"
                  name="empName"
                  value={formData.empName}
                  onChange={handleAlphaInputChange}
                  minLength={4}
                  maxLength={40}
              
                  className="w-full border border-gray-300   rounded"
                />
                {formErrors.empName && <p className=" text-red-600 text-sm">{formErrors.empName}</p>}
               </div>
               <div className="ml-10 ">
                <label className="block">Org Name:</label>
                <input
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleAlphaInputChange}
                  minLength={4}
                  maxLength={40}
                  
                  className="w-full border border-gray-300 rounded"
                />
                {formErrors.orgName && <p className="text-red-600 text-sm">{formErrors.orgName}</p>}
                </div>
                
               <div className="ml-10 ">
                <label className="block">Emp ID:</label>
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  minLength={4}
                  maxLength={20}
                 
                  className="w-full border border-gray-300 rounded"
                />
                {formErrors.empId && <p className="text-red-600 text-sm">{formErrors.empId}</p>}
                </div>
                <div className="ml-10 ">
                <label className="block">Designation:</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleDesignationChange}
                  className="w-full border border-gray-300  rounded"
                 
                >
                  <option value="">Select Designation</option>
                  {designationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {formErrors.designation && <p className="text-red-600 text-sm">{formErrors.designation}</p>}
               </div>
               <div className="ml-10 ">
                <label className="block">Date Of Joining:</label>
                <input
                  type="date"
                  id="doj"
                  value={formData.doj}
                  onChange={handleDateChange}
                  className="w-full border border-gray-300  rounded"
                  onKeyDown={preventManualInput}
                  onClick={(e) => e.target.readOnly = false}  
                  
                />
                {formErrors.doj && <p className="text-red-600 text-sm">{formErrors.doj}</p>}
                </div>
                <div className="ml-10">
                <label className="block">Reporting Manager:</label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleAlphaInputChange}
                  minLength={4}
                  maxLength={40}
                  
                  className="w-full border border-gray-300  rounded"
                />
                {formErrors.manager && <p className="text-red-600 text-sm">{formErrors.manager}</p>}
                </div>
                <div className="ml-10">
                  <label className="block">Pay:</label>
                  <input
                    type="text"
                    name="pay"
                    value={formData.pay}
                    onChange={handleInputChange}
                    minLength={4}
                    maxLength={40}
                    className="w-full border border-gray-300 rounded"
                  />
                  {formErrors.pay && <p className="text-red-600 text-sm">{formErrors.pay}</p>}
               </div>
              </div>
              <div className=" mt-4 flex justify-end space-x-2">
              <button type="button"  onClick={handleSubmit} className="border border-black text-black px-4 py-2 rounded">
               {isEditMode ? "Save " : "Submit"}
              </button>
              <button
                onClick={handleCancel}
                className=" border border-black text-black px-4 py-2 rounded">Cancel
              </button>
            </div>
            </form>

          </div>
        </div>
       )}
     </div>
    </>
  );
};

export default ExperienceCard;
