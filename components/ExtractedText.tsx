
import React from 'react';

interface ExtractedTextProps {
  text: string;
}

const ExtractedText: React.FC<ExtractedTextProps> = ({ text }) => {
  return (
    <div className="w-full h-96 bg-slate-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-sky-400 mb-2">Extracted Text</h3>
      <div className="h-[calc(100%-2.5rem)] overflow-y-auto pr-2">
        <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
          {text || "No text could be extracted from the PDF."}
        </p>
      </div>
    </div>
  );
};

export default ExtractedText;
