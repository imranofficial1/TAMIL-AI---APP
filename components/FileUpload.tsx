
import React from 'react';

interface FileUploadProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const UploadIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-16 w-16 text-slate-500 mb-4" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
    />
  </svg>
);


const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, isLoading }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        htmlFor="pdf-upload"
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-slate-500 border-dashed rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 transition-colors duration-300 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon />
          <p className="mb-2 text-sm text-slate-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500">PDF files only</p>
        </div>
        <input
          id="pdf-upload"
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={onFileChange}
          disabled={isLoading}
        />
      </label>
    </div>
  );
};

export default FileUpload;
