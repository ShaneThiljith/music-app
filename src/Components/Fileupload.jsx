import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const Fileupload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.includes("audio")) {
      setFile(selectedFile);

      // New song entry for db.json
      const newSong = {
        id: Date.now(),
        title: selectedFile.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        singer: "Unknown",
        genre: "Unknown",
        imgUrl: "https://via.placeholder.com/150", // Default image
        songUrl: `Songs/${selectedFile.name}`,
      };

      // Send song details to json-server
      await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSong),
      });

      alert("Song uploaded successfully!");
      if (onUpload) onUpload(newSong);
    } else {
      alert("Please upload an audio file!");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-xl text-center">
      <UploadCloud size={40} className="text-gray-500 mb-2" />
      <p className="text-gray-600">Drag & drop a song or click to upload</p>
      <input type="file" className="hidden" id="fileInput" onChange={handleFileChange} accept="audio/*" />
      <label htmlFor="fileInput" className="cursor-pointer">
        <Button className="mt-2">Choose Song</Button>
      </label>
      {file && <p className="mt-2 text-sm text-gray-700">Uploading: {file.name}</p>}
    </div>
  );
};

export default Fileupload;
