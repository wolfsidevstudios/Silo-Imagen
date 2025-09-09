import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ImageStudio } from './components/ImageStudio';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// Define a type for the user profile data
export interface UserProfile {
  name: string;
  picture: string;
}

const GOOGLE_CLIENT_ID = "247415100231-otncl0mkpeu6mp5k2lbfljulvckq7jhe.apps.googleusercontent.com";

const MainApp: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        if (!userInfoResponse.ok) {
            throw new Error('Failed to fetch user info');
        }
        const userInfo = await userInfoResponse.json();
        setUser({ name: userInfo.name, picture: userInfo.picture });
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  const handleLogout = () => {
    setUser(null);
    // For a full sign-out, google.accounts.id.revoke is needed, but this is sufficient for app state.
  };

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
           {user ? (
            <ImageStudio user={user} onLogout={handleLogout} />
          ) : (
            <LandingPage onStart={handleLogin} />
          )}
        </div>

      </div>
    </main>
  );
};

const App: React.FC = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <MainApp />
  </GoogleOAuthProvider>
);

export default App;