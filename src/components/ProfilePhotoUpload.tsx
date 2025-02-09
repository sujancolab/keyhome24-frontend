import React, { useRef, useState } from "react";
import { Camera, Loader } from "lucide-react";

interface ProfilePhotoUploadProps {
    currentPhotoUrl: string;
    onPhotoChange: (file: File) => Promise<void>;
    name: string;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
    currentPhotoUrl,
    onPhotoChange,
    name,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Veuillez sélectionner une image");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("L'image ne doit pas dépasser 5MB");
            return;
        }

        try {
            setIsUploading(true);
            await onPhotoChange(file);
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert("Une erreur est survenue lors du téléchargement de la photo");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-6">
            <div className="relative group">
                <img
                    /*src={currentPhotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}*/
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        name
                    )}&background=random`}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover"
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    {isUploading ? (
                        <Loader className="h-6 w-6 text-white animate-spin" />
                    ) : (
                        <Camera className="h-6 w-6 text-white" />
                    )}
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
            <div>
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-sm text-red-600 hover:text-red-700 font-medium mt-1"
                >
                    Changer la photo
                </button>
            </div>
        </div>
    );
};

export default ProfilePhotoUpload;
