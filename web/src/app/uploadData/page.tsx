// app/upload/page.tsx
'use client'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../redux/slices/firestoreSlice"; // Adjust the path as necessary
import { useRouter } from "next/router";
import { RootState } from "../../redux/store"; // Adjust the path as necessary

const UploadData: React.FC = () => {
  const dispatch = useDispatch();
  //const router = useRouter(); // Use Next.js router
  const userId = useSelector((state: RootState) => state.auth.user?.uid); // Get user ID from Redux state
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    // Ensure userId is available before dispatching
    if (!userId) {
      setError("User is not authenticated.");
      return;
    }

    try {
      await dispatch(
        addData({
          userId, // Use the user ID from Redux state
          name,
          value,
        })
      ).unwrap(); // Use unwrap to handle promise rejection

      setSuccess(true); // Set success message
      setTimeout(() => {
        router.push("/"); // Navigate to home or another page after successful upload
      }, 2000);
    } catch (err) {
      setError("Failed to upload data."); // Set error message
    }
  };

  return (
    <div>
      <h1>Upload Data to Firestore</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Data uploaded successfully!</p>}
    </div>
  );
};

export default UploadData;
