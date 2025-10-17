
import { LetterFrequency } from '../types';

// Since pdf.js is loaded from a CDN, we declare its global object.
// The mjs build exports a default object.
declare const pdfjsLib: any;

// Configure the worker source for pdf.js
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs`;
} else {
    console.error("pdf.js library not loaded. Ensure the CDN link is correct in index.html.");
}

export const extractTextFromPdf = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;
  let fullText = '';

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};

export const analyzeLetterFrequency = (text: string): LetterFrequency[] => {
  const frequency: { [key: string]: number } = {};
  const lowercasedText = text.toLowerCase();

  for (const char of lowercasedText) {
    if (char >= 'a' && char <= 'z') {
      frequency[char] = (frequency[char] || 0) + 1;
    }
  }

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const result: LetterFrequency[] = alphabet.map(letter => ({
    letter: letter.toUpperCase(),
    count: frequency[letter] || 0,
  }));

  return result;
};
