import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, Box } from "@mui/material";
import Cookies from "js-cookie";
import { use } from "react";

function DownloadPdf({ data, authHeader }) {
  // const [authHeader, setAuthHeader] = useState("");
  // useEffect(() => {
  //   setAuthHeader(Cookies.get("user"));
  //   console.log("Auth Header:", authHeader);
  // }, []);

  useEffect(() => {
    console.log("Auth Header:", authHeader);
    console.log("Amortization Data:", data);
  }, [authHeader, data]);

  const handleDownloadPdf = async () => {

    if (!authHeader) {
      console.error("Authentication token is missing");
      return;
    }
    try {
      console.log("Downloading PDF...");
      const response = await axios.post(
        "http://localhost:8080/api/v1/generate-amortization-pdf",
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
