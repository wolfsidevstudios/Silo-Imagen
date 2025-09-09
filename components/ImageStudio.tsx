import React, { useState, useEffect, useRef } from 'react';
import { PromptInput } from './PromptInput';
import { ImageDisplay } from './ImageDisplay';
import { generateImage, editImage } from '../services/geminiService';
import { UserProfile } from '../App'; // Import UserProfile type

// --- User Menu Component ---
interface UserMenuProps {
  user: UserProfile;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 rounded-full hover:bg-white/10 p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="User menu"
      >
        <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-[#2c2c2e] border border-gray-700/50 rounded-lg shadow-2xl z-50 py-1 animate-fade-in">
          <div className="px-4 py-2 border-b border-gray-700/50">
            <p className="text-sm font-semibold text-white truncate" title={user.name}>{user.name}</p>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};


interface ImageStudioProps {
    user: UserProfile;
    onLogout: () => void;
}

export const ImageStudio: React.FC<ImageStudioProps> = ({ user, onLogout }) => {
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
            <header className="w-full max-w-5xl pt-4 pb-2 sm:pt-6 sm:pb-4 shrink-0 relative">
                 <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-500 py-2">
                        AI Image Studio
                    </h1>
                    <p className="text-center text-gray-400 mt-2">Powered by Gemini & Imagen</p>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 pr-4 sm:pr-0">
                    <UserMenu user={user} onLogout={onLogout} />
                </div>
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