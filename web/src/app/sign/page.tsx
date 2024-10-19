'use client'; // Necessary for client-side interactivity in Next.js app directory

import { useState } from 'react';

export default function FileUploader() {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-black">
       <h1 className="text-4xl font-bold text-green-300 mt-10 text-center">Sign a Document</h1>
      <div className="p-6 rounded-lg mt-80 shadow-lg bg-green-900 text-white w-96">
        <h1 className="text-2xl font-bold text-center text-green-400 mb-4">Upload a File</h1>
        
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-green-600 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded block text-center transition duration-300 ease-in-out"
        >
          Choose File
        </label>
        
        {fileName && (
          <p className="mt-4 text-green-300 text-center">
            Selected file: <span className="font-bold">{fileName}</span>
          </p>
        )}
      </div>
    </div>
  );
};

