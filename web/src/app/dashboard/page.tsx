"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addData, fetchData } from "../../redux/slices/firestoreSlice";
import { RootState } from "../../redux/store";
import Verify from "./ui/verify";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { UploadFile as UploadIcon } from "@mui/icons-material";


const MyApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const [backendResponse, setBackendResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

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
          setUploadedFiles(files);
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


  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await extractTextFromPDF(selectedFile);
      setSelectedFile(null);
      setFileName(null);
    } else {
      alert("Please select a PDF file to upload.");
    }
  };

  const extractTextFromPDF = async (file: File) => {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);

      // Make a POST request to the backend
      const response = await fetch(
        "https://crypto-fe3z-backend.vercel.app/extract-text-from-pdf/",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to extract text: ${response.status}`);
      }
      const { text } = await response.json();
      const verificationResponse = await sendPdfToBackend(text.trim());
      await uploadResponseToFirestore(verificationResponse, file.name);
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
    }
  };

  const sendPdfToBackend = async (text: string) => {
    try {
      const response = await fetch(
        "https://crypto-fe3z-backend.vercel.app/sign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ msg: text }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
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

      const { msg, ...restOfResponse } = response;
      const uploadData = {
        ...restOfResponse,
        fileName,
      };

      await dispatch(
        addData({
          collectionPath: `users/${sanitizedEmail}/uploads`,
          documentId: uploadId,
          response: uploadData,
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
    <Container
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 5,
      }}
    >
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={4}>
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
              Uploaded Files
            </Typography>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <List>
                {uploadedFiles.length > 0 ? (
                  uploadedFiles.map((file) => (
                    <ListItem key={file.id}>
                      <ListItemIcon>
                        <DescriptionIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography color="white">
                          {file.fileName || "No File Name"}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <Typography style={{ padding: 20 }} color="white">
                    No files uploaded yet.
                  </Typography>
                )}
              </List>
            )}
          </CardContent>
        </Card>

        {/* Upload PDF Card */}
        <Card
          sx={{
            maxWidth: 320,
            minWidth: 320,
            maxHeight: 260,
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
          <CardContent
            style={{ color: "white", minHeight: 100, marginBottom: "16px" }}
          >
            <Typography variant="h5" color="white" align="center" gutterBottom>
              Upload PDF
            </Typography>

            {/* Hidden file input */}
            <input
              type="file"
              accept="application/pdf"
              onChange={onFileChange}
              style={{ display: "none" }}
              id="pdf-upload-input"
            />

            {/* Styled Browse Button */}
            <label htmlFor="pdf-upload-input">
              <Button
                variant="outlined"
                color="secondary"
                component="span"
                startIcon={<UploadIcon />}
                fullWidth
                sx={{ marginBottom: 2, color: "white", borderColor: "white" }}
              >
                Browse PDF
              </Button>
            </label>

            {/* Display the selected file name */}
            {fileName && (
              <Typography color="white" sx={{ mt: 1, mb: 2 }}>
                Selected file: {fileName}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpload}
              sx={{ marginBottom: 2 }}
            >
              Upload
            </Button>

            {loading && <CircularProgress color="primary" />}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {backendResponse}
              </Alert>
            )}
          </CardContent>
        </Card>
        <Verify />
      </Box>
    </Container>
  );
};

export default MyApp;
