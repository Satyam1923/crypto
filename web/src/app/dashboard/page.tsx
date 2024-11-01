"use client";

import { pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function MyApp() {
  const [textContent, setTextContent] = useState<string>("");
  const [backendResponse, setBackendResponse] = useState<string>(""); // State to hold the backend response

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Get the first selected file
    if (selectedFile && selectedFile.type === "application/pdf") {
      await extractTextFromPDF(selectedFile); // Extract text from the PDF
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  // Function to extract text from the PDF file
  const extractTextFromPDF = async (file: File) => {
    const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" "); // Extracting text
      text += `${pageText}\n`; // Append page text to overall text
    }

    setTextContent(text); // Update state with extracted text
    await sendPdfToBackend(text); // Send extracted text to the backend
  };

  // Function to send extracted text to the backend
 const sendPdfToBackend = async (text:string) => { 

   try {
     const response = await fetch("http://localhost:8000/sign", {
       method: "POST",
       headers: {
         "Content-Type": "application/json", // Set the content type to JSON
       },
       body: JSON.stringify({ msg: text }), // Send the static value as JSON
     });

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`); // Catch non-2xx responses
     }

     const data = await response.json(); // Assuming the response is JSON
     setBackendResponse(data); // Update state with the backend response
   } catch (error) {
     console.error("Error sending PDF to backend:", error);
     setBackendResponse("Failed to get a response from the server.");
   }
 };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      {backendResponse && (
        <div>
          <h2>Backend Response:</h2>
          <pre>{JSON.stringify(backendResponse, null, 2)}</pre>{" "}
          {/* Display the response from the backend */}
        </div>
      )}
    </div>
  );
}

export default MyApp;
