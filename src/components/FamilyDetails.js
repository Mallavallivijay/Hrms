import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPen, FaTrash, FaPlus, FaLessThan, FaRegWindowClose,  } from 'react-icons/fa';
import Navbar from "../components/FamilyNav"
// import * as XLSX from 'xlsx';

const FamilyDetails = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({ Name: "", Relation: "", Phonenumber: "" });
    const [formErrors, setFormErrors] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios.get("http://192.168.1.19:8080/employeeservice/family/familydetails/EMP001")
            .then((response) => {
                setTableData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching family details:", error);
            });
    }, []); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "Phonenumber" && !/^\d*$/.test(value)) {
            return;
        }
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.Name) errors.Name = "Name is required.";
        if (!formData.Relation) errors.Relation = "Relation is required.";
        if (!formData.Phonenumber || formData.Phonenumber.length !== 10) {
            errors.Phonenumber = "Phone number must be exactly 10 digits.";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            if (isEditMode) {
                const updatedTableData = tableData.map((item, index) =>
                    index === formData.index ? { ...formData } : item
                );
                setTableData(updatedTableData);
            } else {
                setTableData([...tableData, formData]);
            }
            setIsPopupOpen(false);
            setIsEditMode(false);
            setFormData({ Name: "", Relation: "", Phonenumber: "" });
            setFormErrors({});
        } else {
            setFormErrors(errors);
        }
    };

    const handleDelete = (index) => {
        const updatedTableData = tableData.filter((_, i) => i !== index);
        setTableData(updatedTableData);
    };

    const handleEdit = (index) => {
        setFormData({ ...tableData[index], index });
        setIsPopupOpen(true);
        setIsEditMode(true);
    };

    const handleAdd = () => {
        setIsPopupOpen(true);
        setIsEditMode(false);
        setFormData({ Name: "", Relation: "", Phonenumber: "" });
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
        setIsEditMode(false);
        setFormData({ Name: "", Relation: "", Phonenumber: "" });
    };

    // const handleExportToExcel = () => {
    //     const ws = XLSX.utils.json_to_sheet(tableData); // Convert the table data to a worksheet
    //     const wb = XLSX.utils.book_new(); // Create a new workbook
    //     XLSX.utils.book_append_sheet(wb, ws, "FamilyDetails"); // Append the worksheet to the workbook
    //     XLSX.writeFile(wb, "FamilyDetails.xlsx"); // Trigger a download of the Excel file
    // };

    return (
       
        <div className="mr-48 ml-48">
          <div>
          <Navbar/> </div>  
           <div className="flex justify-between items-center mb-5 mt-5">

                <div>
                    <div className="flex items-center justify-start px-1 py-1 overflow-x-auto border-2 border-gray-800 rounded-md w-40 mb-5 mt-5">
                        <FaLessThan className="text-orange-500 mr-2" />
                        <button><span className="font-semibold text-orange-500">Previous Page</span></button>
                    </div>
                </div>

                
                {/* <div>
                    <div className="flex items-center justify-start px-1 py-1 overflow-x-auto border-2 border-gray-800 rounded-md w-32 mb-5 mt-5">
                        <button onClick={handleExportToExcel} className="flex items-center text-orange-500">
                            <span className="font-semibold">Export to Excel</span>
                            <FaFileExcel className="ml-2" />
                        </button>
                    </div>
                </div> */}
            </div>
            <div>
                <div className="bg-orange-500 text-white p-2 rounded-t-md flex justify-between items-center">
                    <h2 className="font-semibold">Family Details</h2>
                    <button className="flex items-center bg-gray-300 p-1 rounded" onClick={handleAdd}>
                        Add <FaPlus className="ml-2" />
                    </button>
                </div>
                <div className="bg-white p-2 border-t border-gray-400">
                    <span className="font-semibold">Family Details</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-300">
                                <th className="border border-gray-400 px-4 py-2 w-1/3">Name</th>
                                <th className="border border-gray-400 px-4 py-2 w-1/3">Relation</th>
                                <th className="border border-gray-400 px-4 py-2 w-1/3">Phonenumber</th>
                                <th className="border border-gray-400 px-4 py-2 w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-400 px-4 py-2">{data.Name}</td>
                                        <td className="border border-gray-400 px-4 py-2">{data.Relation}</td>
                                        <td className="border border-gray-400 px-4 py-2">{data.Phonenumber}</td>
                                        <td className="border border-gray-400 px-4 py-2 flex justify-center items-center space-x-4">
                                            <FaPen className="text-black cursor-pointer" onClick={() => handleEdit(index)} />
                                            {index > 0 && (
                                                <FaTrash className="text-black cursor-pointer" onClick={() => handleDelete(index)} />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No Family Details Added</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isPopupOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 w-100 flex justify-center items-center">
                        <div className="bg-white rounded-lg w-full max-w-xl">
                            <div className="flex justify-between items-center bg-orange-500 border-2 border-black p-2 rounded-t-lg">
                                <h3 className="semibold">{isEditMode ? "Edit Family Details" : "Enter Family Details"}</h3>
                                <FaRegWindowClose className="text-black text-xl cursor-pointer" onClick={handleCancel} />
                            </div>
                            <form onSubmit={handleSubmit} className="bg-gray-300 p-4 rounded-b-lg">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                                    <div>
                                        <label className="block">Name:</label>
                                        <input
                                            type="text"
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleInputChange}
                                            minLength={4}
                                            maxLength={40}
                                            required
                                            className="w-full border border-gray-300 rounded"
                                        />
                                        {formErrors.Name && <p className="text-red-600 text-sm">{formErrors.Name}</p>}
                                    </div>
                                    <div>
                                        <label className="block">Relation:</label>
                                        <input
                                            type="text"
                                            name="Relation"
                                            value={formData.Relation}
                                            onChange={handleInputChange}
                                            minLength={4}
                                            maxLength={40}
                                            required
                                            className="w-full border border-gray-300 rounded"
                                        />
                                        {formErrors.Relation && <p className="text-red-600 text-sm">{formErrors.Relation}</p>}
                                    </div>
                                    <div>
                                        <label className="block">Phonenumber:</label>
                                        <input
                                            type="text"
                                            name="Phonenumber"
                                            value={formData.Phonenumber}
                                            onChange={handleInputChange}
                                            minLength={10}
                                            maxLength={10}
                                            required
                                            className="w-full border border-gray-300 rounded"
                                        />
                                        {formErrors.Phonenumber && <p className="text-red-600 text-sm">{formErrors.Phonenumber}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
                                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{isEditMode ? "Update" : "Submit"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FamilyDetails;

