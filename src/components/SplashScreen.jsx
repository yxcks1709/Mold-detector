import React from 'react';
import './SplashScreen.css';

const SplashScreen = () => (
  <div className="splash-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="splash-icon">
      <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0L12 2.522l-.016-.352ZM12 11.25a.75.75 0 0 1 .75.75v5.698l2.25 2.25a.75.75 0 0 1-1.06 1.06L12 18.061l-1.94 1.94a.75.75 0 0 1-1.06-1.06l2.25-2.25v-5.698A.75.75 0 0 1 12 11.25ZM3.655 4.794l-2.736 9.851a.75.75 0 0 0 .546.994l15.343 4.267a.75.75 0 0 0 .97-.577l2.848-10.245A4.502 4.502 0 0 0 16.5 4.5h-5.834A1.502 1.502 0 0 1 9.166 3H3.29a.75.75 0 0 0-.256 1.488Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="m.996 15.004 9.851-2.736a.75.75 0 0 0 .584-.972L9.208.995a.75.75 0 0 0-.972-.584L.995 8.169a.75.75 0 0 0 .584.972l2.736.759a.75.75 0 0 1 .546.994l-2.736 9.851a.75.75 0 0 0 .994.546l15.343-4.267a.75.75 0 0 0 .577-.97l-2.848-10.245A4.502 4.502 0 0 0 7.5 4.5h-5.834a1.502 1.502 0 0 1-2.924-.969l.016-.07.008-.035Zm6.391 1.579 2.25 2.25a.75.75 0 0 1-1.06 1.06l-2.25-2.25v-5.698a.75.75 0 0 1 1.5 0v5.698Z" clipRule="evenodd" />
    </svg>
    <h1 className="splash-title">Sensor App</h1>
    <p className="splash-subtitle">Loading...</p>
  </div>
);

export default SplashScreen;
