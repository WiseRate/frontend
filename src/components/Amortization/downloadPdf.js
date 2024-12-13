import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { use } from "react";

function DownloadPdf({ data, authHeader }) {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;
  // const [authHeader, setAuthHeader] = useState("");
  // useEffect(() => {
  //   setAuthHeader(Cookies.get("user"));
  //   console.log("Auth Header:", authHeader);
  // }, []);

  //useeffect to check the authentication Header and data
  useEffect(() => {
    console.log("Auth Header:", authHeader);
    console.log("Amortization Data:", data);
  }, [authHeader, data]);

  //function to handle the download of the pdf
  const handleDownloadPdf = async () => {
    //check if the authentication header is missing
    if (!authHeader) {
      console.error("Authentication token is missing");
      navigate("/login");
      return;
    }
    try {
      console.log("Downloading PDF...");

      // Make an API call to download the PDF
      const response = await axios.post(
        // "http://localhost:8080/api/v1/generate-amortization-pdf",
        `${BASE_URL}/api/v1/generate-amortization-pdf`,
        data, {
        withCredentials: true,
        headers: {
          'Authorization': authHeader,
        },
        responseType: 'arraybuffer',
      });

      console.log("PDF Response:", response);

      // response is the binary data of the PDF file
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Generate a URL for the blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary link to trigger the download
      const link = document.createElement("a");
      link.href = pdfUrl;
      // Set the file name for the download
      link.download = "amortization-schedule.pdf";

      // Trigger the download
      link.click();

      console.log("PDF downloaded successfully.");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadPdf}
        startIcon={<DownloadIcon />}
      ></Button>
    </Box>
  );
}

export default DownloadPdf;
