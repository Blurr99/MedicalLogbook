import React, { useState } from "react";
import upload from "../../Components/Assets/icons/upload.png";
import axios from "axios";

const Createannouncement = () => {

  const [adminData, setAdminData] = useState({
    announcementTitle: "",
    scheduleDate: "",
    uploadFile: "",
    scheduleTime: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const [errors, setErrors] = useState({});

  

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePreview = () => {
    if (uploadedImage) {
      const pdfWindow = window.open("");
      pdfWindow.document.write(
        "<html><head><title>PDF Preview</title></head><body>"
      );
      pdfWindow.document.write(
        `<embed width="100%" height="100%" src="${uploadedImage}" type="application/pdf">`
      );
      pdfWindow.document.write("</body></html>");
    } else {
      alert("Please upload a PDF file first.");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior


  try {
    alert("Data saved");
    const announcementResponse = await axios.post(
      "http://localhost:8000/admin/announcement",
      adminData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

     // Reset the adminData state after the request is processed
     setAdminData({
      announcementTitle: "",
      scheduleDate: "",
      uploadFile: "",
      scheduleTime: "",
    });
  
    if (announcementResponse.status >= 200 && announcementResponse.status < 300) {
      console.log(announcementResponse.data);
      // Successful response handling
    } else {
      // Handle errors from the backend
      const responseData = announcementResponse.data;
      console.error("Backend Error:", responseData.error || "Unknown error");
      // Assuming setErrors is a state updater function
      setErrors(responseData.errors || {});
    }
  
   
  
  } catch (error) {
    console.error("Error:", error);
  }
  };
  


  

  return (
    <section className="relative top-0 m-0 left-40 overflow-hidden">
      <div className="relative flex left-7 top-7 w-auto mb-10 z-10">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Create Announcements
        </button>
      </div>

      <div className="border-2 md:h-3/4 w-65vw rounded-md border-sky-500 relative flex flex-col justify-center items-center m-5 sm:mt-10 sm:h-auto md:mt-20 z-10">
        <div className="p-5 gap-2 grid-flow-row grid w-full md:w-3/4 lg:w-1/2 mx-auto">
          <form action="" className="relative" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-start">
              <label htmlFor="announcementTitle" className="text-lg">
                Announcement Title :{" "}
                <input
                  type="text"
                  id="announcementTitle"
                  className="px-4 border-1 border-black w-full h-10 rounded-md mt-1"
                  placeholder="Enter the Announcement"
                  name="announcementTitle"
                  value={adminData.announcementTitle}
                  onChange={handleChange}
                  required
                />
              </label>

              <label htmlFor="scheduleDate" className="text-lg ml-30">
                Schedule date :{" "}
                <input
                  type="date"
                  id="scheduleDate"
                  className="border-1 px-4 border-black w-full h-10 rounded-md mt-1"
                  name="scheduleDate"
                  value={adminData.scheduleDate}
                  onChange={handleChange}
                  placeholder="Enter the Schedule date "
                  required
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 text-start w-auto mt-4">
              <label htmlFor="uploadedFileName" className="text-lg">
                Uploaded File:{" "}
                <input
                  type="text"
                  id="uploadedFileName"
                  className="border-1 px-4 w-full h-10 rounded-md mt-1"
                  name="uploadedFileName"
                  onChange={handleChange}
                  value={uploadedFileName}
                  readOnly // Make the input read-only to prevent manual changes
                />
              </label>

              <label htmlFor="scheduleTime" className="text-lg">
                Schedule Time :{" "}
                <input
                  type="text"
                  id="scheduleTime"
                  className="border-1 px-4 border-black w-full h-10 rounded-md mt-1"
                  name="scheduleTime"
                  value={adminData.scheduleTime}
                  onChange={handleChange}
                  placeholder="Enter the Schedule Time"
                  required
                />
              </label>
            </div>

            <div className="flex justify-center items-center mt-4">
              <label htmlFor="fileInput" className="text-lg">
                Upload PDF File :{" "}
              </label>
              <img
                width="45"
                height="45"
                src={uploadedImage || upload}
                alt="Uploaded File"
                onClick={() => document.getElementById("fileInput").click()}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                id="fileInput"
                className="border-2 px-4 w-full h-10 rounded-md mt-1"
                placeholder="Upload the file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="flex justify-center items-center mt-4 space-x-4">
              <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg">
                Create
              </button>
              <button
                onClick={handlePreview}
                className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
              >
                Preview
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Createannouncement;
