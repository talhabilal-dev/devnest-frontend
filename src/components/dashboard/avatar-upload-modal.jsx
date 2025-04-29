"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X, Camera, ImageIcon, Check } from "lucide-react"

export function AvatarUploadModal({ isOpen, onClose, onSave, currentAvatar, initials }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result)
          setActiveTab("preview")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result)
          setActiveTab("preview")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (selectedImage) {
      onSave(selectedImage)
    }
    handleClose()
  }

  const handleClose = () => {
    setSelectedImage(null)
    setActiveTab("upload")
    onClose()
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveSelected = () => {
    setSelectedImage(null)
    setActiveTab("upload")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription className="text-gray-400">
            Upload a new profile picture or choose from the options below.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="preview" disabled={!selectedImage}>
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4 space-y-4">
            <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />

            <div
              className={`flex flex-col items-center justify-center h-48 rounded-md border-2 border-dashed transition-colors cursor-pointer ${
                isDragging ? "border-purple-500 bg-purple-500/10" : "border-gray-700 bg-gray-800/50"
              }`}
              onClick={triggerFileInput}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-400">Drag and drop an image, or click to browse</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF, max 5MB</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center justify-center"
                onClick={triggerFileInput}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center justify-center"
                onClick={() => {
                  // In a real app, this would open the device camera
                  alert("Camera functionality would be implemented here")
                }}
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
            </div>

            {currentAvatar && (
              <div className="flex items-center justify-center mt-4">
                <p className="text-sm text-gray-400 mr-2">Current avatar:</p>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentAvatar || "/placeholder.svg"} alt="Current avatar" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="mt-4 space-y-4">
            {selectedImage && (
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-400 mb-2">Preview:</p>
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={selectedImage || "/placeholder.svg"} alt="Preview" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={handleRemoveSelected}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center space-x-2">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Small</p>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedImage || "/placeholder.svg"} alt="Small preview" />
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Medium</p>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedImage || "/placeholder.svg"} alt="Medium preview" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Large</p>
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedImage || "/placeholder.svg"} alt="Large preview" />
                      <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">How your avatar will look:</h4>
                  <div className="flex items-center space-x-3 p-2 rounded-md bg-gray-900">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedImage || "/placeholder.svg"} alt="Avatar in context" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-gray-400">john@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={!selectedImage}>
            <Check className="mr-2 h-4 w-4" />
            Save Avatar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
