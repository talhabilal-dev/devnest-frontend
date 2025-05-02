"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";

export function ImageUpload({ initialImage, onFileSelect }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialImage || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      onFileSelect?.(selectedFile); // notify parent if needed
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      onFileSelect?.(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileSelect?.(null);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        id="featured-image"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {previewUrl ? (
        <div className="relative rounded-md overflow-hidden">
          <img
            src={previewUrl}
            alt="Featured"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white hover:bg-black/20"
              onClick={() => document.getElementById("featured-image")?.click()}
            >
              <Upload className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white hover:bg-black/20"
              onClick={handleRemove}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center h-48 rounded-md border-2 border-dashed transition-colors cursor-pointer ${
            isDragging
              ? "border-purple-500 bg-purple-500/10"
              : "border-gray-700 bg-gray-800/50"
          }`}
          onClick={() => document.getElementById("featured-image")?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-400">
            Drag and drop an image, or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 1200 x 630 pixels
          </p>
        </div>
      )}
    </div>
  );
}
