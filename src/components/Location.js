
import { useState } from "react";
import {  MdCancelPresentation } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import React from "react";
import { FaLessThan } from "react-icons/fa";

function Location() {
  const [formData, setFormData] = useState({
    PresentAddress: {
      hno: "",
      street: "",
      village: "",
      town: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
    PermanentAddress: {
      hno: "",
      street: "",
      village: "",
      town: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
    OfficeAddress: {
      hno: "",
      street: "",
      village: "",
      town: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const [save, setSave] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentAddressType, setCurrentAddressType] = useState("");
  const [presentAddressData, setPresentAddressData] = useState({});
  const [permanentAddressData, setPermanentAddressData] = useState({});
  const [officeAddressData, setOfficeAddressData] = useState({});
  // const [isSameAddress, setIsSameAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    hno: "",
    street: "",
    village: "",
    town: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
  });

  
  const togglePopup = (addressType = "") => {
    setShowPopup(!showPopup);
  
    if (addressType) {
      setCurrentAddressType(addressType);
      setAddressData(formData[addressType]); 
  
      
      setSave(false);
      setSecond(false);
      setThird(false);
    }
  
    
    if (addressType && addressData.hno && addressData.street && addressData.village && addressData.town && addressData.district && addressData.state && addressData.country && addressData.pincode) {
      if (addressType === "PresentAddress") {
        setSave(true); 
      }
      
      if (addressType === "PermanentAddress") {
        setSave(true); 
        setSecond(true);   
      } else if (addressType === "OfficeAddress") {
        setThird(true);
      }
    }
  
  
    if (addressType === "PermanentAddress" && save) {
      const updatedAddress = formData["PermanentAddress"]; 
      formData["PresentAddress"] = updatedAddress; 
    }
  };
  
  
  
  const validate = () => {
    let errors = {};

    if (!addressData.hno.trim()) {
      errors.hno = "House number is required";
    }

    if (!addressData.street.trim()) {
      errors.street = "Street is required";
    }

    if (!addressData.village.trim()) {
      errors.village = "Village is required";
    }

    if (!addressData.town.trim()) {
      errors.town = "Town is required";
    }

    if (!addressData.district.trim()) {
      errors.district = "District is required";
    }

    if (!addressData.state.trim()) {
      errors.state = "State is required";
    }

    if (!addressData.country.trim()) {
      errors.country = "Country is required";
    }

    if (!/^\d{6}$/.test(addressData.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setFormData({
        ...formData,
        [currentAddressType]: addressData,
      });
      setShowPopup(false);
    } else {
      console.log("Validation Errors:", validationErrors);
    }
  };

  const handleEdit = (addressType) => {
    setCurrentAddressType(addressType);
    setShowPopup(true);

    switch (addressType) {
      case "PresentAddress":
        setPresentAddressData(formData.PresentAddress);
        break;
      case "PermanentAddress":
        setPermanentAddressData(formData.PermanentAddress);
        break;
      case "OfficeAddress":
        setOfficeAddressData(formData.OfficeAddress);
        break;
      default:
        break;
    }
    togglePopup(addressType); // Assuming this function opens the popup for editing
  };

  const handleSave = () => {
    setSave(true);
   

  };
  const handleSecond = () => {
    setSecond(true);
  };
  const handleThird = () => {
    setThird(true);
  };

  const handleForm = () => {
    if (currentAddressType === "PresentAddress") {
      handleSave();
    } else if (currentAddressType === "PermanentAddress") {
      handleSecond();
    } else if (currentAddressType === "OfficeAddress") {
      handleThird();
    }
  };

  
    const changeaddress = (e) => {
      if (e.target.checked) {
        setFormData({
          ...formData,
          PermanentAddress: { ...formData.PresentAddress },
        });
        setSecond(true);
      } else {
       setSecond(false);
      }
    };
  
return (
     
    <>
   <div className="col-span-11">
    <div className="flex items-center justify-start px-1 py-1 overflow-x-auto border-2 border-gray-800 rounded-md w-32 mb-3 mt-5 ml-5 w-[150px]">
        <FaLessThan className="text-orange-500 mr-2" />
        <button><span className="text font-semibold text-orange-500">Previous Page</span></button>
    </div>
    </div> 
     <form onSubmit={(e) => e.preventDefault()} className="p-4 border-black">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-600 relative   border-black border-2 border-solid">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 border-b border-gray-600 text-left bg-orange-500 text-white"
                  colSpan="8"
                >
                  Anil Kumar
                </th>
              </tr>
                <tr className="relative  border-black border-2 border-solid bg-gray-400">
                  <th
                    className="py-2 px-4 border-b border-gray-600 text-left"
                    colSpan="8"
                  >
                    Present Address
                    <span
            className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-black/10 p-1 rounded"
            onClick={() => handleEdit("PresentAddress")}
          >
            <BsPencilSquare />
          </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="py-2 px-4 border-gray-600 border-black border-2 border-solid">
                    H.No
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Street
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Village
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Town
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    District
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    State
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Country
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Pincode
                  </th>
                </tr>
                {save && (
                  <tr>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PresentAddress.hno}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PresentAddress.street}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PresentAddress.village}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PresentAddress.town}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PresentAddress.district}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PresentAddress.state}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PresentAddress.country}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PresentAddress.pincode}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div>
              <input type="radio" onChange={changeaddress} />
              <label className="text-1xl ml-1">
                Permanent Address same as Present Address
              </label>
            </div>
            <table className="min-w-full bg-white border-collapse border border-gray-600 relative mt-4 overflow-x-auto  border-black border-2 border-solid">
              <thead>
                <tr className="relative  border-black border-2 border-solid bg-gray-400">
                  <th
                    className="py-2 px-4 border-b border-gray-600 text-left"
                    colSpan="8"
                  >
                    Permanent Address
                    <span
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-black/10 p-1 rounded"
                      onClick={() => handleEdit("PermanentAddress")}
                    >
                      <BsPencilSquare />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    H.No
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Street
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Village
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Town
                  </th>
                  <th className="py-2 px-4 border-gray-600 border-black border-2 border-solid">
                    District
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    State
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Country
                  </th>
                  <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                    Pincode
                  </th>
                </tr>
                {second && (
                  <tr>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PermanentAddress.hno}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PermanentAddress.street}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PermanentAddress.village}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PermanentAddress.town}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PermanentAddress.district}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PermanentAddress.state}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PermanentAddress.country}
                    </td>
                    <td className="py-2 px-4 border-gray-600 border text-center  border-black border-2 border-solid">
                      {formData.PermanentAddress.pincode}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <table className="min-w-full bg-white border-collapse border border-gray-600 relative mt-4  border-black b  order-2 border-solid">
            <thead>
              <tr className="relative  border-black border-2 border-solid bg-gray-400">
                <th
                  className="py-2 px-4 border-b border-gray-600 text-left"
                  colSpan="8"
                >
                  Office Address
                  <span
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-black/10 p-1 rounded "
                    onClick={() => handleEdit("OfficeAddress")}
                  >
                    <BsPencilSquare />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="py-2 px-4 border-gray-600 border  border-black border-2 border-solid">
                  H.No
                </th>
                <th className="py-2 px-4 border-gray-600 border  border-black border-2 border-solid">
                  Street
                </th>
                <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                  Village
                </th>
                <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                  Town
                </th>
                <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                  District
                </th>
                <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                  State
                </th>
                <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                  Country
                </th>
                <th className="py-2 px-4 border-gray-600  border-black border-2 border-solid">
                  Pincode
                </th>
              </tr>
              {third && (
                <tr>
                  <td className="border-2 border-solid border-black p-3">
                    {formData.OfficeAddress.hno}
                  </td>
                  <td className="border-2 border-solid border-black p-3">
                    {formData.OfficeAddress.street}
                  </td>
                  <td className="border-2 border-solid border-black p-3">
                    {formData.OfficeAddress.village}
                  </td>
                  <td className="border-2 border-solid border-black p-3">
                    {formData.OfficeAddress.town}
                  </td>
                  <td className="border-2 border-solid border-black p-3">
                    {formData.OfficeAddress.district}
                  </td>
                  <td className="border-2 border-solid border-black p-3">
                    {formData.OfficeAddress.state}
                  </td>
                  <td className="border-2 border-solid border-black p-3">
                    {formData.OfficeAddress.country}
                  </td>
                  <td className="border-2 border-solid border-black p-3">
                    {formData.OfficeAddress.pincode}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>

      {showPopup && (
        <div className=" bg-gray-200 fixed inset-0 flex items-center justify-center bg-opacity-90">
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
            <div className="flex justify-between items-center mb-8 bg-orange-500 rounded-lg pl-2 pr-2 w-full p-2">
              <h2 className="text-2xl font-semibold w-full">
                Edit {currentAddressType.replace("Address", "")} Address
              </h2>
              <button
                onClick={togglePopup}
                className="text-black  rounded-full p-1 ml-2"
              >
                <MdCancelPresentation size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4">
                <div className="col-span-1">
                  <label className="block mb-1 font-medium" htmlFor="hno">
                    H.NO
                  </label>
                  <input
                    type="text"
                    id="hno"
                    name="hno"
                    value={addressData.hno}
                    onChange={handleChange}
                    minLength={1}
                    maxLength={10}
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.hno && (
                    <p className="text-red-500 mt-1">{errors.hno}</p>
                  )}
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 font-medium" htmlFor="street">
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={addressData.street}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={40}
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.street && (
                    <p className="text-red-500 mt-1">{errors.street}</p>
                  )}
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 font-medium" htmlFor="village">
                    Village
                  </label>
                  <input
                    type="text"
                    id="village"
                    name="village"
                    value={addressData.village}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={40}
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.village && (
                    <p className="text-red-500 mt-1">{errors.village}</p>
                  )}
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 font-medium" htmlFor="town">
                    Town
                  </label>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    value={addressData.town}
                    onChange={handleChange}
                    minLength={1}
                    maxLength={20}
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.town && (
                    <p className="text-red-500 mt-1">{errors.town}</p>
                  )}
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 font-medium" htmlFor="district">
                    District
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={addressData.district}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={40}
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.district && (
                    <p className="text-red-500 mt-1">{errors.district}</p>
                  )}
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 font-medium" htmlFor="state">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={addressData.state}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={40}
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
                  />
                  {errors.state && (
                    <p className="text-red-500 mt-1">{errors.state}</p>
                  )}
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 font-medium" htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={addressData.country}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={40}
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.country && (
                    <p className="text-red-500 mt-1">{errors.country}</p>
                  )}
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 font-medium" htmlFor="pincode">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={addressData.pincode}
                    onChange={handleChange}
                    minLength={6}
                    maxLength={6}
                    className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 mt-1">{errors.pincode}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleForm}
                  type="submit"
                  className="bg-gray-200 text-black px-6 py-2 rounded-lg rounded-lg focus:outline-none focus:ring-2  focus:ring-orange-500"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={togglePopup}
                  className="bg-gray-200 text-black px-6 py-2 rounded-lg focus:outline-none focus:ring-2  focus:ring-orange-500 "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Location;