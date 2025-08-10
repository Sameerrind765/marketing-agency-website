import React, { useEffect, useRef, useState } from 'react';

type Props = {
    fileName?: string | null;
    startUpload: boolean;
    onUploadComplete: (result: { fileName: string; url: string } | null) => void;
    onFileSelected: (hasFile: boolean) => void; // ✅ new
    onStarting?: (fileName: string) => void;
};

const FileUploadDiv: React.FC<Props> = ({ fileName, startUpload, onUploadComplete, onFileSelected, onStarting }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [localFileName, setLocalFileName] = useState<string | null>(fileName || null);
    const [uploading, setUploading] = useState(false);

    const UploadIcon = ({ className }: { className?: string }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,5 17,10"></polyline>
            <line x1="12" y1="5" x2="12" y2="15"></line>
        </svg>
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) {
            setFile(null);
            setLocalFileName(null);
            onFileSelected(false); // tell parent no file
            return;
        }
        setFile(selectedFile);
        setLocalFileName(selectedFile.name);
        onFileSelected(true); // tell parent file exists
    };

    useEffect(() => {
        const triggerUpload = async () => {
            if (!startUpload || !file) return;

            if (onStarting) onStarting(file.name);

            setUploading(true);

            const formData = new FormData();
            const publicId = `payment-confirmation-${Date.now()}`;
            formData.append('file', file);
            formData.append('upload_preset', 'ml_default');
            formData.append('public_id', publicId);

            try {
                const res = await fetch('https://api.cloudinary.com/v1_1/dzqtygtxd/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data?.error?.message || 'Upload failed');

                onUploadComplete({
                    fileName: data.public_id,
                    url: data.secure_url
                });
            } catch (err: any) {
                onUploadComplete(null);
            } finally {
                setUploading(false);
            }
        };

        triggerUpload();
    }, [startUpload]);

    return (
        <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition"
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
                accept="image/*"
            />
            <div className="text-gray-600">
                {localFileName ? (
                    <>
                        <p className="text-green-600 font-semibold">{localFileName}</p>
                        <p className="text-sm text-gray-500">
                            {uploading ? '⏳ Uploading...' : '✅ File selected, ready to upload'}
                        </p>
                    </>
                ) : (
                    <>
                        <UploadIcon className="h-8 w-8 text-gray-400 mx-auto" />
                        <span className='flex gap-1 justify-center flex-col lg:flex-row'>
                            <p className="text-blue-600 hover:text-blue-700">Click to upload</p>
                            <p className="mb-2">or drag and drop</p>
                        </span>
                        <p className="text-sm">PNG, JPG up to 10MB</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default FileUploadDiv;
