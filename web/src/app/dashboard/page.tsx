"use client";

import { pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, fetchData } from "../../redux/slices/firestoreSlice"; // Import fetchData
import { RootState } from "../../redux/store";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MyApp: React.FC = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const [backendResponse, setBackendResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFiles = async () => {
      if (userEmail) {
        setLoading(true);
        try {
          const files = await dispatch(fetchData()).unwrap();
          setUploadedFiles(files); // Set the fetched files to state
        } catch (err) {
          console.error("Error fetching files:", err);
          setError("Failed to fetch files.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchFiles();
  }, [dispatch, userEmail]);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      await extractTextFromPDF(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const extractTextFromPDF = async (file: File) => {
    const fileName = file.name; // Extract the file name
    const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      fullText += pageText + " ";
    }

    const response = await sendPdfToBackend(fullText.trim());
    await uploadResponseToFirestore(response, fileName); // Pass the file name
  };

  const sendPdfToBackend = async (text: string) => {
    try {
      const response = await fetch("http://localhost:8000/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: text }), // Sending full text
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json(); // Return the entire response object
    } catch (error) {
      console.error("Error sending PDF to backend:", error);
      setError("Failed to get a response from the server.");
      return null;
    }
  };

  const uploadResponseToFirestore = async (response: any, fileName: string) => {
    if (!userEmail) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const sanitizedEmail = userEmail.replace(/[@.]/g, "_");
      const uploadId = new Date().toISOString();
      console.log(response);

      // Create a new object excluding the `msg` field and adding `fileName`
      const { msg, ...restOfResponse } = response; // Destructure to remove `msg`
      const uploadData = {
        ...restOfResponse, // Include all other response properties
        fileName, // Add the file name
      };

      // Upload to Firestore with the updated structure
      await dispatch(
        addData({
          collectionPath: `users/${sanitizedEmail}/uploads`,
          documentId: uploadId,
          response: uploadData, // Send the modified response
        })
      ).unwrap();

      setSuccess(true);
      setBackendResponse("Response uploaded successfully to Firestore.");
    } catch (err) {
      console.error("Error uploading response to Firestore:", err);
      setError("Failed to upload response to Firestore.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#000000", // Black background
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* Upload Card */}
        <div
          style={{
            border: "1px solid #ccc",
            backgroundColor: "#202020", // Gray background for the card
            padding: "20px",
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#fff" }}>Upload PDF</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={onFileChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{backendResponse}</p>}
          {backendResponse && !success && (
            <div>
              <h3 style={{ color: "#fff" }}>Backend Response:</h3>
              <pre style={{ color: "#fff" }}>
                {JSON.stringify(backendResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Fetch Card */}
        <div
          style={{
            border: "1px solid #ccc",
            backgroundColor: "#202020", // Gray background for the card
            padding: "20px",
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#fff" }}>Uploaded Files</h2>
          {loading ? (
            <p style={{ color: "#fff" }}>Loading...</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {uploadedFiles.length > 0 ? (
                uploadedFiles.map((file) => (
                  <li key={file.id} style={{ margin: "10px 0" }}>
                    <h4 style={{ margin: 0, color: "#fff" }}>
                      {file.response.fileName || "No File Name"}
                    </h4>
                  </li>
                ))
              ) : (
                <p style={{ color: "#fff" }}>No files uploaded yet.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApp;
