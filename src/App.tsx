import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

// Components
import Layout from './components/Layout/Layout';
import PartIdentificationPage from './components/PartIdentification/PartIdentificationPage';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';

// Theme
import { theme } from './theme/theme';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename="/part-identifier-frontend">
          <Layout>
            <Routes>
              <Route path="/" element={<PartIdentificationPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;