"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";

export function ImageUpload({ initialImage }) {
  const [image, setImage] =
    (useState(initialImage || null));
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result);
      };
      reader.readAsDataURL(file);
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
        setImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
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

      {image ? (
        <div className="relative rounded-md overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
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
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
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
