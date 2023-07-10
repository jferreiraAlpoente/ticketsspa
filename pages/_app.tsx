import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { TicketThreadList } from '../components/TicketThreadList';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Other global styles */

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #add8e6; /* Light blue */
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #87cefa; /* Slightly darker light blue */
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #add8e6 #f1f1f1; /* Light blue and light gray */
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
