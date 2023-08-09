import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import { HashRouter } from 'react-router-dom';
import firebase from 'firebase';
import { AuthProvider } from './hooks/useAuth';
import { ApiProvider } from './hooks/useApi';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyB9531A_AndyENUqgnVhxOqcUx3UjKHnXw',
    authDomain: 'poki-by-heyaibek.firebaseapp.com',
    projectId: 'poki-by-heyaibek',
    storageBucket: 'poki-by-heyaibek.appspot.com',
    messagingSenderId: '989351343093',
    appId: '1:989351343093:web:6e74fbb83679fbf21566bc',
  });
}

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html, body, #root {
		height: 100vh;
	}

	.blacked-image {
		pointer-events: none;
		filter: brightness(0%);
	}
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <HashRouter>
    <GlobalStyles />
    <ApiProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApiProvider>
  </HashRouter>,
);
