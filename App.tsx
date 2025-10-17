
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { LetterFrequency } from './types';
import { extractTextFromPdf } from './services/pdfProcessor';
import { analyzeLetterFrequency } from './services/pdfProcessor';
import FileUpload from './components/FileUpload';
import LetterFrequencyChart from './components/LetterFrequencyChart';
import ExtractedText from './components/ExtractedText';
import LoadingSpinner from './components/LoadingSpinner';

const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);


const App: React.FC = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [frequencyData, setFrequencyData] = useState<LetterFrequency[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const processPdf = useCallback(async (selectedFile: File) => {
        setIsLoading(true);
        setError(null);
        setFileName(selectedFile.name);
        setExtractedText('');
        setFrequencyData([]);

        try {
            const text = await extractTextFromPdf(selectedFile);
            setExtractedText(text);

            const analysisResult = analyzeLetterFrequency(text);
            setFrequencyData(analysisResult);
        } catch (err) {
            console.error("Failed to process PDF:", err);
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during PDF processing.";
            setError(`Error processing PDF: ${errorMessage}. Please try another file.`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            processPdf(selectedFile);
        } else if (selectedFile) {
            setError("Invalid file type. Please upload a PDF file.");
        }
    };

    const handleReset = () => {
        setFileName(null);
        setExtractedText('');
        setFrequencyData([]);
        setError(null);
        setIsLoading(false);
    };

    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner />;
        }
        if (fileName) {
            return (
                <div className="w-full animate-fade-in">
                    <div className="flex justify-between items-center mb-6">
                        <div className="bg-slate-800 px-4 py-2 rounded-md">
                            <p className="text-sm text-slate-300 truncate">
                                <span className="font-semibold text-sky-400">File:</span> {fileName}
                            </p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-600 transition-colors duration-300"
                        >
                            Analyze Another
                        </button>
                    </div>
                     {error ? (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center">
                            <p>{error}</p>
                        </div>
                    ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                           <h2 className="text-xl font-bold text-slate-200 mb-2">Letter Frequency</h2>
                           <LetterFrequencyChart data={frequencyData} />
                        </div>
                        <div className="flex flex-col gap-2">
                           <h2 className="text-xl font-bold text-slate-200 mb-2">Extracted Content</h2>
                           <ExtractedText text={extractedText} />
                        </div>
                    </div>
                    )}
                </div>
            );
        }
        
        return (
            <div className="w-full text-center">
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-6 max-w-lg mx-auto">
                        <p>{error}</p>
                    </div>
                )}
                <FileUpload onFileChange={handleFileChange} isLoading={isLoading} />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
            <header className="py-6 px-8 border-b border-slate-700">
                <div className="container mx-auto flex items-center gap-4">
                    <AnalyticsIcon className="w-10 h-10 text-sky-400" />
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">PDF-Alytics</h1>
                        <p className="text-slate-400">Your Personal PDF Text Analyzer</p>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-8 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 120px)'}}>
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
