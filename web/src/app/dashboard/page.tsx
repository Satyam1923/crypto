"use client";

import { pdfjs } from "react-pdf";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../redux/slices/firestoreSlice";
import { RootState } from "../../redux/store";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MyApp: React.FC = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const [backendResponse, setBackendResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      await extractTextFromPDF(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const extractTextFromPDF = async (file: File) => {
    const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      fullText += pageText + " ";
    }

    const response = await sendPdfToBackend(fullText.trim());
    await uploadResponseToFirestore(response);
  };

  const sendPdfToBackend = async (text: string) => {
    try {
      const response = await fetch("http://localhost:8000/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: text }),
      });

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

  const uploadResponseToFirestore = async (response: any) => {
    if (!userEmail) {
      setError("User is not authenticated.");
      return;
    }

    try {
      // Sanitize the email and create document and collection paths
      const sanitizedEmail = userEmail.replace(/[@.]/g, "_");
      const uploadId = new Date().toISOString();
      console.log(response);
      // Upload to Firestore with the updated structure
      await dispatch(
        addData({
          collectionPath: `users/${sanitizedEmail}/uploads`,
          documentId: uploadId,
          response,
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
    <div>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{backendResponse}</p>}
      {backendResponse && !success && (
        <div>
          <h2>Backend Response:</h2>
          <pre>{JSON.stringify(backendResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyApp;
