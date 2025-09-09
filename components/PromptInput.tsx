import React from 'react';

// Define SVG components outside the main component to prevent re-creation on re-renders
const ChevronDownIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const VolumeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
);

const SettingsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.12l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const ArrowRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const ImageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    isLoading: boolean;
    onSubmit: () => void;
    uploadedImage: { data: string; mimeType: string; } | null;
    setUploadedImage: (image: { data: string; mimeType: string; } | null) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, isLoading, onSubmit, uploadedImage, setUploadedImage }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) {
                onSubmit();
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                const result = loadEvent.target?.result as string;
                const mimeType = result.substring(5, result.indexOf(';'));
                const base64Data = result.substring(result.indexOf(',') + 1);
                setUploadedImage({ data: base64Data, mimeType });
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
    };
    
    const handleRemoveImage = () => {
        setUploadedImage(null);
    };

    return (
        <div className="bg-[#1c1c1e] border border-gray-700/50 rounded-3xl p-3 sm:p-4 flex flex-col gap-3 shadow-2xl shadow-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                     <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer">
                        {uploadedImage ? 'Image to Image' : 'Text to Image'}
                        <ChevronDownIcon />
                    </button>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                        <VolumeIcon />
                        {uploadedImage ? 'Gemini 2.5 Flash' : 'Imagen 4.0'}
                    </div>
                    <button className="hover:text-white transition-colors"><SettingsIcon /></button>
                </div>
            </div>
            <div className="flex items-end gap-2">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/webp" 
                    className="hidden"
                    disabled={isLoading}
                />
                 <button
                    onClick={handleUploadClick}
                    disabled={isLoading}
                    className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-2.5 rounded-full"
                    aria-label="Upload an image"
                >
                    <ImageIcon />
                </button>

                {uploadedImage && (
                    <div className="relative shrink-0 group">
                        <img
                            src={`data:${uploadedImage.mimeType};base64,${uploadedImage.data}`}
                            alt="Uploaded preview"
                            className="w-12 h-12 object-cover rounded-lg"
                        />
                        <button
                            onClick={handleRemoveImage}
                            className="absolute -top-1.5 -right-1.5 bg-gray-800/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                            aria-label="Remove uploaded image"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                )}
                
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={uploadedImage ? "Describe the changes..." : "Generate an image with text..."}
                    className="bg-transparent w-full resize-none focus:outline-none text-gray-200 placeholder-gray-500 text-base p-2"
                    rows={1}
                    disabled={isLoading}
                />
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-600 text-white rounded-full p-2.5 transition-all duration-200 shrink-0"
                >
                    <ArrowRightIcon />
                </button>
            </div>
        </div>
    );
};
