import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ImageStudio } from './components/ImageStudio';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <main className={`bg-[#131314] min-h-screen text-white relative font-sans`}>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.03] -z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>
      
       <div className="relative z-10 w-full h-screen">
         <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
                animation: fadeIn 0.5s ease-out forwards;
            }
        `}</style>
        
        <div className="w-full h-full animate-fade-in">
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