"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, User, X } from "lucide-react";

export default function ProfilePictureUpload({ value, onChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const preview = value ? URL.createObjectURL(value) : "/placeholder.svg";

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <motion.div
        className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border-2 ${
          isDragging
            ? "border-purple-500 bg-purple-500/10"
            : value
            ? "border-purple-600"
            : "border-gray-700 bg-gray-800"
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-full h-full">
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
            <Upload className="h-6 w-6 text-white" />
          </div>
        </div>
      </motion.div>

      {value && (
        <motion.button
          type="button"
          className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 text-white"
          onClick={handleRemove}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
}
