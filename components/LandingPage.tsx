import React from 'react';

// --- SVG Icons ---
const ArrowRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const TextIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>
);
const EditIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 5-3-3-6 6 3 3Z"/><path d="m2 22 3-3"/><path d="m5 19 3 3"/><path d="m12.5 15.5 1-1-3-3-1 1a2 2 0 0 0 0 3l2 2h0a2 2 0 0 0 3 0Z"/></svg>
);
const LogoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
);

interface LandingPageProps {
  onStart: () => void;
}

const Taskbar: React.FC<{onStart: () => void}> = ({ onStart }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10 animate-fade-in-slow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2 font-bold text-lg">
                            <LogoIcon />
                            <span>AI Image Studio</span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
                            <a href="#how-it-works" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">How It Works</a>
                            <a href="#gallery" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={onStart} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full text-sm transition-colors duration-300">
                            Start Creating
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};


const Section: React.FC<{id?: string, children: React.ReactNode, className?: string}> = ({ id, children, className }) => (
    <section id={id} className={`w-full max-w-5xl px-4 py-16 sm:py-24 animate-fade-in-slow ${className || ''}`}>
        {children}
    </section>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="w-full h-full flex flex-col items-center overflow-y-auto">
       <style>{`
        html {
            scroll-behavior: smooth;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-slow {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
      
      <Taskbar onStart={onStart} />
      
      {/* --- Hero Section --- */}
      <header className="text-center flex flex-col items-center gap-8 pt-32 pb-16 sm:pt-40 sm:pb-24 min-h-[80vh] justify-center">
        <div className="flex flex-col gap-2">
            <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-500 py-2">
                AI Image Studio
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Create stunning visuals from text, or bring your ideas to life by editing your own images with the power of generative AI.
            </p>
        </div>
        <button 
            onClick={onStart} 
            className="bg-purple-600/50 hover:bg-purple-500/60 border border-purple-500/50 text-white font-semibold text-lg py-3 px-8 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/10"
        >
            Start Creating
            <ArrowRightIcon />
        </button>
      </header>
      
      {/* --- Features Section --- */}
      <Section id="features">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-full border border-purple-500/50"><TextIcon/></div>
                <h3 className="text-2xl font-bold">Text to Image</h3>
                <p className="text-gray-400">Simply describe your vision in words, and watch as our advanced AI model crafts a beautiful, high-quality image from your prompt.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-full border border-blue-500/50"><EditIcon/></div>
                <h3 className="text-2xl font-bold">Image to Image</h3>
                <p className="text-gray-400">Upload your own photo and use text prompts to make edits, add elements, or completely transform the scene.</p>
            </div>
        </div>
      </Section>

      {/* --- How It Works Section --- */}
       <Section id="how-it-works">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Simple & Intuitive</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-4">
                <div className="text-2xl font-bold text-purple-400 border-2 border-purple-400 w-12 h-12 flex items-center justify-center rounded-full">1</div>
                <h3 className="text-xl font-semibold mt-2">Describe or Upload</h3>
                <p className="text-gray-400">Type a prompt for a new creation or upload an image you want to modify.</p>
            </div>
             <div className="flex flex-col items-center gap-4">
                <div className="text-2xl font-bold text-purple-400 border-2 border-purple-400 w-12 h-12 flex items-center justify-center rounded-full">2</div>
                <h3 className="text-xl font-semibold mt-2">Generate</h3>
                <p className="text-gray-400">Our AI gets to work, interpreting your request to generate a unique visual.</p>
            </div>
             <div className="flex flex-col items-center gap-4">
                <div className="text-2xl font-bold text-purple-400 border-2 border-purple-400 w-12 h-12 flex items-center justify-center rounded-full">3</div>
                <h3 className="text-xl font-semibold mt-2">Download & Share</h3>
                <p className="text-gray-400">Save your high-resolution masterpiece and share it with the world.</p>
            </div>
        </div>
      </Section>

      {/* --- Inspiration Gallery Section --- */}
      <Section id="gallery" className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Powered by Imagination</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img src="https://images.pexels.com/photos/163872/siberian-tiger-big-cat-carnivore-closely-163872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="AI generated tiger" className="rounded-lg aspect-square object-cover hover:scale-105 transition-transform duration-300"/>
              <img src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="AI generated northern lights" className="rounded-lg aspect-square object-cover hover:scale-105 transition-transform duration-300"/>
              <img src="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="AI generated landscape" className="rounded-lg aspect-square object-cover hover:scale-105 transition-transform duration-300"/>
              <img src="https://images.pexels.com/photos/208821/pexels-photo-208821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="AI generated fox" className="rounded-lg aspect-square object-cover hover:scale-105 transition-transform duration-300"/>
          </div>
      </Section>

      {/* --- Footer --- */}
      <footer className="w-full text-center py-8 border-t border-white/10 mt-16">
          <p className="text-gray-500">&copy; 2024 AI Image Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};