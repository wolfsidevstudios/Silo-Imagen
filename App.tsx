import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ImageStudio } from './components/ImageStudio';

const Taskbar: React.FC = () => {
    return (
        <div className="h-10 bg-black/30 border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0">
            {/* Left side: Menu items */}
            <div className="flex items-center gap-x-5 text-sm text-gray-400">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span className="hover:text-white transition-colors cursor-pointer">File</span>
                <span className="hover:text-white transition-colors cursor-pointer">Edit</span>
                <span className="hover:text-white transition-colors cursor-pointer">View</span>
                <span className="hover:text-white transition-colors cursor-pointer">Help</span>
            </div>

            {/* Right side: Window controls */}
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <main className={`bg-[#131314] min-h-screen flex flex-col items-center justify-center text-white relative font-sans p-4`}>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.03] -z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
      
       <div className="relative z-10 w-full max-w-7xl h-full max-h-[90vh] flex flex-col bg-[#1c1c1e]/70 border border-white/10 rounded-xl shadow-2xl shadow-black/50 animate-fade-in-slow overflow-hidden">
         <style>{`
            @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in-slow {
                animation: fadeIn 0.5s ease-out forwards;
            }
        `}</style>

        <Taskbar />
        
        <div className="flex-grow overflow-y-auto">
           {showLanding ? (
            <LandingPage onStart={() => setShowLanding(false)} />
          ) : (
            <ImageStudio />
          )}
        </div>

      </div>
    </main>
  );
}

export default App;