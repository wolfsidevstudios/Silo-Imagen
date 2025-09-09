import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImage as generateImageFromApi, editImage as editImageFromApi } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ data: string; mimeType: string; } | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (uploadedImage && !prompt.trim()) {
      setError('Please enter a prompt describing the changes to make.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      let base64Image: string;
      if (uploadedImage) {
        base64Image = await editImageFromApi(prompt, uploadedImage.data, uploadedImage.mimeType);
      } else {
        base64Image = await generateImageFromApi(prompt);
      }
      setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate image. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, uploadedImage]);

  return (
    <main className="bg-black min-h-screen w-screen flex flex-col font-sans text-gray-300 overflow-hidden">
        <div 
            className="fixed inset-0 z-0" 
            style={{
                background: 'radial-gradient(circle at bottom, rgba(30,30,40,0.8) 0%, rgba(0,0,0,1) 60%)'
            }}
        />
        <div className="relative flex-grow flex flex-col items-center justify-center p-4 sm:p-8 z-10">
            <ImageDisplay 
                isLoading={isLoading} 
                error={error} 
                generatedImage={generatedImage} 
            />
        </div>
        <div className="relative p-4 sm:p-6 w-full max-w-4xl mx-auto z-10">
            <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
                isLoading={isLoading}
                onSubmit={handleGenerateImage}
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
            />
        </div>
    </main>
  );
};

export default App;
