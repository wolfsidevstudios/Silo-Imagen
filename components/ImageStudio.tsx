import React, { useState } from 'react';
import { PromptInput } from './PromptInput';
import { ImageDisplay } from './ImageDisplay';
import { generateImage, editImage } from '../services/geminiService';

export const ImageStudio: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [uploadedImage, setUploadedImage] = useState<{ data: string; mimeType: string; } | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!prompt.trim() && !uploadedImage) return;
        if (uploadedImage && !prompt.trim()) {
            setError("A prompt is required to edit an image.");
            return;
        }

        setIsLoading(true);
setError(null);
        setGeneratedImage(null);

        try {
            let imageResult: string;
            if (uploadedImage) {
                imageResult = await editImage(prompt, uploadedImage.data, uploadedImage.mimeType);
            } else {
                imageResult = await generateImage(prompt);
            }
            setGeneratedImage(`data:image/jpeg;base64,${imageResult}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadedImageChange = (image: { data: string; mimeType: string; } | null) => {
        setUploadedImage(image);
        setGeneratedImage(null);
        setError(null);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-6">
            <header className="w-full max-w-5xl pt-4 pb-2 sm:pt-6 sm:pb-4 shrink-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-500 py-2">
                    AI Image Studio
                </h1>
                <p className="text-center text-gray-400 mt-2">Powered by Gemini & Imagen</p>
            </header>
            <div className="w-full max-w-5xl flex-grow flex items-center justify-center py-4 sm:py-8">
                <ImageDisplay 
                    isLoading={isLoading} 
                    error={error} 
                    generatedImage={generatedImage} 
                />
            </div>
            <div className="w-full max-w-3xl pt-4 pb-2 sm:pt-8 sm:pb-4 shrink-0">
                <PromptInput 
                    prompt={prompt}
                    setPrompt={setPrompt}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                    uploadedImage={uploadedImage}
                    setUploadedImage={handleUploadedImageChange}
                />
            </div>
        </div>
    );
};