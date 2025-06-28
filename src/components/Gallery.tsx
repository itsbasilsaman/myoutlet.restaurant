"use client";

import React, { useEffect, useState } from "react";
import { ImageIcon, X, ClipboardCopy } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuthorizedApi } from "@/hooks/useAuthorizedApi";

interface GalleryImage {
  display_url: string;
  copy_url: string;
  key: string;
  originalname: string;
}


const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);

  const api = useAuthorizedApi();
  const { data } = useSelector((state: RootState) => state.restaurant);
  const storeId = data?.[0]?.id;

  console.log(galleryImages,"galleryimagesssss")

  const fetchImages = async () => {
    if (!storeId) return;
    try {
      const res = await api.get(`/gallery/list/${storeId}`);
      if (res.data.length > 0) {
        setGalleryImages(res.data);
      }
    } catch (error) {
      console.error("Error fetching gallery images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [storeId]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !storeId) return;

    const formData = new FormData();
    for (let file of Array.from(files)) {
      formData.append("file", file);
    }

    setLoading(true);
    try {
      await api.post(`/gallery/upload/${storeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchImages();
    } catch (error) {
      console.error("Error uploading images", error);
    } finally {
      setLoading(false);
    }
  };

 const handleDeleteImage = async (key: string) => {
  const image = galleryImages.find((img) => img.key === key);
  if (!image || !image.key) return;

  const confirmDelete = window.confirm("Are you sure you want to delete this image?");
  if (!confirmDelete) return;

  setLoading(true);
  try {
    await api.delete(`/gallery/delete?key=${encodeURIComponent(image.key)}`);
    setGalleryImages((prev) => prev.filter((img) => img.key !== key));
  } catch (error) {
    console.error("Error deleting image", error);
  } finally {
    setLoading(false);
  }
};

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Image URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold font-['Playfair_Display'] text-[#040919]">
        Gallery
      </h1>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 border-b">
          <div className="flex items-center space-x-2">
            <ImageIcon className="text-[#fe0000]" />
            <span className="font-medium text-lg text-[#040919]">
              Manage your restaurant gallery images
            </span>
          </div>

          <label className="mt-4 sm:mt-0 cursor-pointer bg-[#fe0000] text-white px-4 py-2 rounded hover:bg-red-700 transition font-medium text-sm">
            {loading ? "Uploading..." : "Upload Images"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="p-6">
          {galleryImages.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-10">
              No images uploaded yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {galleryImages.map((img) => (
                <div
                  key={img.key}
                  className="relative group border rounded-lg bg-gray-50 overflow-hidden shadow-sm"
                >
                  <Image
                    src={img.display_url}
                    alt={`Gallery Image ${img.originalname}`}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40"
                  />

                  <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    <button
                      onClick={() => handleDeleteImage(img.key)}
                      title="Delete"
                      className="bg-[#fe0000] text-white p-1 rounded-full text-xs opacity-80 hover:opacity-100 shadow"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyUrl(img.copy_url)}
                      title="Copy URL"
                      className="bg-white text-[#fe0000] p-1 rounded-full text-xs border hover:bg-gray-100 shadow"
                    >
                      <ClipboardCopy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
