"use client";
import { pdfjs } from "react-pdf";
import { AppDispatch} from '../../../redux/store'
import { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../../redux/slices/firestoreSlice"; // Fetch data action
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload"; // Import upload icon

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Verify() {
  const dispatch = useDispatch<AppDispatch>();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [backendResponse, setBackendResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFileData, setSelectedFileData] = useState<any>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      if (userEmail) {
        setLoading(true);
        try {
          // Construct the collection path dynamically, for example:
          const collectionPath = `users/${userEmail.replace(
            /[@.]/g,
            "_"
          )}/uploads`;

          // Pass the collectionPath as the argument
          const files = await dispatch(fetchData(collectionPath)).unwrap();
          setFiles(files);
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


  const handleFileSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fileId = event.target.value;
    const fileData = files.find((file) => file.id === fileId);
    setSelectedFileData(fileData);
  };

  const verifyFile = async () => {
    if (selectedFileData && selectedFile) {
      try {
        const text = await extractTextFromPDF(selectedFile);
        const response = await sendPdfToBackend(
          text,
          selectedFileData.public_key,
          selectedFileData.signature
        );

        if (response) {
          setBackendResponse(
            response.result === 1
              ? "Verification successful"
              : "Verification failed"
          );
          setError(null); 
        }
      } catch (err) {
        console.error("Error during verification:", err);
        setError("An error occurred during verification.");
      }
    } else {
      alert("Please select a PDF file and a record to verify.");
    }
  };

  const extractTextFromPDF = async (file: File) => {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "http://localhost:8000/extract-text-from-pdf/",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to extract text: ${response.status}`);
      }
      const { text } = await response.json();
      return text.trim(); 
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      return "";
    }
  };


  const sendPdfToBackend = async (
    text: string,
    publicKey: string,
    signature: string
  ) => {
    try {
      const response = await fetch(
        "https://crypto-kappa-snowy.vercel.app/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ msg: text, public_key: publicKey, signature }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error verifying PDF with backend:", error);
      setError("Failed to get a response from the server.");
      return null;
    }
  };

  return (
    <Container className="w-full  sm:w-56 min-w-40 mx-auto">
      <Card
        sx={{
          maxWidth: 320,
          minWidth: 320,
          bgcolor: "rgba(0 0 0 / 0.5)",
          backdropFilter: "blur(5px)",
          borderRadius: "12px",
          padding: 2,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" color="white" align="center" gutterBottom>
            Verify PDF
          </Typography>
          {/* Custom file input button */}
          <input
            type="file"
            accept="application/pdf"
            id="file-upload"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            style={{ display: "none" }} // Hide the default file input
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
              fullWidth
              sx={{
                mb: 2,
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Browse PDF
            </Button>
          </label>

          {/* Display the selected file name */}
          {selectedFile && (
            <Typography
              variant="body1"
              color="white"
              align="center"
              sx={{ mb: 2 }}
            >
              Selected File: {selectedFile.name}
            </Typography>
          )}

          {/* Dropdown with blur effect */}
          <select
            onChange={handleFileSelect}
            style={{
              width: "100%",
              marginBottom: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker semi-transparent background
              color: "white", // Ensure the font color is white
              padding: "8px",
              borderRadius: "4px",
              backdropFilter: "blur(10px)", // Apply blur effect
              border: "1px solid rgba(255, 255, 255, 0.3)", // Optional: border to enhance visibility
              appearance: "none", // Remove default styles in some browsers
              WebkitAppearance: "none", // Safari fix
              MozAppearance: "none", // Firefox fix
            }}
          >
            <option
              value=""
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }}
            >
              Select a file to verify
            </option>
            {loading ? (
              <option
                disabled
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              >
                Loading...
              </option>
            ) : (
              files.map((file) => (
                <option
                  key={file.id}
                  value={file.id}
                  style={{
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  }}
                >
                  {file.fileName || "Unnamed file"}
                </option>
              ))
            )}
          </select>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={verifyFile}
          >
            Verify
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {backendResponse && (
            <Alert
              severity={
                backendResponse === "Verification successful"
                  ? "success"
                  : "error"
              }
              sx={{ mt: 2 }}
            >
              {backendResponse}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
