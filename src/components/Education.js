import React, { useState,useEffect } from 'react';
import axios from 'axios';
// import Navbar from "../components/Navbar"
function Education() {
  
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    educationLevel: '',
    institutionName: '',
    universityName: '',
    degree: '',
    majors: '',
    yearOfPassing: '',
    certificateIssueDate: '',
    percentage: '',
    state: '',
    country: '',
    attachment: null,
  });

  const [errors, setErrors] = useState({});
 // Fetch data from the API when the component mounts
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.16:8080/employeeservice/education/HRMS1');
        const data = response.data[0]; // Assuming you want to fetch the first object

        setFormData({
          educationLevel: data.education,
          institutionName: data.institutionName,
          universityName: data.universityName,
          degree: data.degree,
          majors: data.majors,
          yearOfPassing: data.yearOfPass,
          certificateIssueDate: data.certificationDate,
          percentage: data.percentage,
          state: data.state,
          country: data.country,
          attachment: null, // Attachment will not come from backend
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      educationLevel: '',
      institutionName: '',
      universityName: '',
      degree: '',
      majors: '',
      yearOfPassing: '',
      certificateIssueDate: '',
      percentage: '',
      state: '',
      country: '',
      attachment: null,
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const preventManualInput = (e) => {
    e.preventDefault();
  };

  const validateForm = () => {
    const newErrors = {};

    const institutionLabel =
    formData.educationLevel === 'Inter' || formData.educationLevel === 'Degree' || formData.educationLevel === 'Post Graduation'
      ? 'College Name'
      : 'School Name';

  if (!formData.institutionName || formData.institutionName.length < 5 || formData.institutionName.length > 50) {
    newErrors.institutionName = `${institutionLabel} must be between 5 and 50 characters`;
  }

  const boardOrUniversityLabel =
    formData.educationLevel === 'Degree' || formData.educationLevel === 'PG' ? 'University' : 'Board';

  if (!formData.universityName || formData.universityName.length < 5 || formData.universityName.length > 50) {
    newErrors.universityName = `${boardOrUniversityLabel} must be between 5 and 50 characters`;
  }
    if (!formData.degree || formData.degree.length < 5 || formData.degree.length > 50)
      newErrors.degree = 'Degree must be between 5 and 50 characters';
    if (!formData.majors || formData.majors.length < 3   || formData.majors.length > 50)
      newErrors.majors = 'Majors must be between 5 and 50 characters';
    if (!formData.yearOfPassing || formData.yearOfPassing.length !== 4)
      newErrors.yearOfPassing = 'Year of Passing must be between  4 and 4  digits';
    if (!formData.certificateIssueDate || formData.certificateIssueDate.length !== 10)
      newErrors.certificateIssueDate = 'Certificate Issue Date must be between 10 and 10';
    if (!formData.percentage || isNaN(formData.percentage) || formData.percentage < 0 || formData.percentage > 100)
      newErrors.percentage = 'Percentage must be for integers 3 and 3 for decimal 3 and 3';
    if (!formData.state || formData.state.length < 5 || formData.state.length > 50)
      newErrors.state = 'State must be between 5 and 50 characters';
    if (!formData.country || formData.country.length < 5 || formData.country.length > 50)
      newErrors.country = 'Country must be between 5 and 50 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Add the form data to the tableData array
      setTableData([...tableData, formData]);

      // Reset formData
      setFormData({
        educationLevel: '',
        institutionName: '',
        universityName: '',
        degree: '',
        majors: '',
        yearOfPassing: '',
        certificateIssueDate: '',
        percentage: '',
        state: '',
        country: '',
        attachment: null,
      });

      setIsEditing(false); // Close the modal after submission
    }
  };

  const handleNameChar = (e)=>{
    const key = e.key
    if(!/[a-zA-Z]/.test(key)){
      e.preventDefault()

    }
  }

//   const handleNum = (e)=>{
//     const key = e.key
    
//   }

  return (
    <div>
      {/* <div><Navbar/></div> */}
      
  

    <div className='border-2 border-solid border-black'>
      <h1 className='bg-orange-400 font-bold text-left p-2'>Singanamala Lakshman</h1>
      <div className='flex flex-row justify-between border-2 border-solid border-black p-2'>
        <h1 className='text-2xl'>Education</h1>
        <button className="bg-green-500 px-4" type='button' onClick={handleEditClick}> Add</button>
      </div>
      
      <table className='border-2 border-solid border-black'>
        <thead>
          <tr>
            <th className='border-2 border-solid border-black p-3'>Education</th>
            <th className='border-2 border-solid border-black p-3'>
              {formData.educationLevel === 'Inter' || formData.educationLevel === 'Degree' || formData.educationLevel === 'Post Graduation' ? 'College Name' : 'School Name'}
            </th>
            <th className='border-2 border-solid border-black p-4'>
              {formData.educationLevel === 'Degree' || formData.educationLevel === 'PG' ? 'University' : 'Board'}
            </th>
            <th className='border-2 border-solid border-black p-3'>Degree</th>
            <th className='border-2 border-solid border-black p-4'>Majors</th>
            <th className='border-2 border-solid border-black p-3'>Year Of Passing</th>
            <th className='border-2 border-solid border-black p-3'>Certificate Issue</th>
            <th className='border-2 border-solid border-black p-4'>Percentage/Grade</th>
            <th className='border-2 border-solid border-black p-4'>State</th>
            <th className='border-2 border-solid border-black p-4'>Country</th>
            <th className='border-2 border-solid border-black p-4'>Attachments</th>
          </tr>
        </thead>
        <tbody>

         {tableData.map((data, index) => (
            <tr key={index}>
              <td className='border-2 border-solid border-black p-3'>{data.educationLevel}</td>
              <td className='border-2 border-solid border-black p-3'>{data.institutionName}</td>
              <td className='border-2 border-solid border-black p-3'>{data.universityName}</td>
              <td className='border-2 border-solid border-black p-3'>{data.degree}</td>
              <td className='border-2 border-solid border-black p-3'>{data.majors}</td>
              <td className='border-2 border-solid border-black p-3'>{data.yearOfPassing}</td>
              <td className='border-2 border-solid border-black p-3'>{data.certificateIssueDate}</td>
              <td className='border-2 border-solid border-black p-3'>{data.percentage}</td>
              <td className='border-2 border-solid border-black p-3'>{data.state}</td>
              <td className='border-2 border-solid border-black p-3'>{data.country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-gray-200 p-6 w-3/4 h-auto border-2 border-black'>
            <h1 className='bg-orange-400 text-white text-left p-2'>Edit Education details</h1>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-4 gap-4 p-4 ">



                <div className='text-left'>
                  <label>Education</label>
                  <select
                    name="educationLevel"
                    className="border w-full p-1"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Education Level</option>
                    <option value="SSC">SSC</option>
                    <option value="Inter">Inter</option>
                    <option value="Degree">Degree</option>
                    <option value="Post Graduation">Post Graduation</option>
                  </select>
                  {errors.educationLevel && <p className='text-red-500'>{errors.educationLevel}</p>}
                </div>
               
                <div className='text-left'>
                  <label>
                    {formData.educationLevel === 'Inter' || formData.educationLevel === 'Degree' || formData.educationLevel === 'PG' ? 'College Name' : 'School Name'}
                  </label>
                  <input
                    type="text"
                    name='institutionName'
                    className="border w-full p-1"
                    value={formData.institutionName}
                    onKeyDown={handleNameChar}
                    onChange={handleInputChange}

                  />
                  {errors.institutionName && <p className='text-red-500'>{errors.institutionName}</p>}
                </div>

                <div className='text-left'>
                  <label>
                    {formData.educationLevel === 'Degree' || formData.educationLevel === 'PG' ? 'University' : 'Board'}
                  </label>
                  <input
                    type="text"
                    name="universityName"
                    className="border w-full p-1"
                    value={formData.universityName}
                    onKeyDown={handleNameChar}
                    onChange={handleInputChange}
                  />
                  {errors.universityName && <p className='text-red-500'>{errors.universityName}</p>}
                </div>

                <div className='text-left'>
                  <label>Degree</label>
                  <input
                    type="text"
                    name="degree"
                    className="border w-full p-1"
                    value={formData.degree}
                    onKeyDown={handleNameChar}
                    onChange={handleInputChange}
                  />
                  {errors.degree && <p className='text-red-500'>{errors.degree}</p>}
                </div>

                <div className='text-left'>
                  <label>Majors</label>
                  <input
                    type="text"
                    name="majors"
                    className="border w-full p-1"
                    value={formData.majors}
                    onKeyDown={handleNameChar}
                    onChange={handleInputChange}
                  />
                  {errors.majors && <p className='text-red-500'>{errors.majors}</p>}
                </div>

                <div className='text-left'>
                  <label>Year Of Passing</label>
                  <input
                    type="text"
                    name="yearOfPassing"
                    maxLength={4}
                    className="border w-full p-1"
                    value={formData.yearOfPassing}
                    
                    onChange={handleInputChange}
                  />
                  {errors.yearOfPassing && <p className='text-red-500'>{errors.yearOfPassing}</p>}
                </div>

                <div className='text-left'>
                  <label>Certificate Issue Date</label>
                  <input
                    type="date"
                    name='certificateIssueDate'
                    className="border w-full p-1"
                    value={formData.certificateIssueDate}
                    onChange={handleInputChange}
                    onKeyDown={preventManualInput}
                  />
                  {errors.certificateIssueDate && <p className='text-red-500'>{errors.certificateIssueDate}</p>}
                </div>

                <div className='text-left'>
                  <label>Percentage/Grade</label>
                  <input
                    type="text"
                    name="percentage"
                    className="border w-full p-1"
                    value={formData.percentage}
                    onChange={handleInputChange}
                  />
                  {errors.percentage && <p className='text-red-500'>{errors.percentage}</p>}
                </div>

                <div className='text-left'>
                  <label>State</label>
                  <input
                    type="text"
                    name='state'
                    className="border w-full p-1"
                    value={formData.state}
                    onKeyDown={handleNameChar}
                    onChange={handleInputChange}
                  />
                  {errors.state && <p className='text-red-500'>{errors.state}</p>}
                </div>

                <div className='text-left'>
                  <label>Country</label>
                  <input
                    type="text"
                    name='country'
                    className="border w-full p-1"
                    value={formData.country}
                    onKeyDown={handleNameChar}
                    onChange={handleInputChange}
                  />
                  {errors.country && <p className='text-red-500'>{errors.country}</p>}
                </div>

                <div className='text-left'>
                  <label>Attachment</label>
                  <input
                    type="file"
                    name="attachment"
                    onChange={(e) => setFormData({ ...formData, attachment: e.target.files[0] })}
                  />
                </div>
              </div>

              <div className="flex justify-end p-4">
                <button type="button" className="bg-red-500 px-4 py-2 text-white mr-4" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="bg-green-500 px-4 py-2 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Education;
