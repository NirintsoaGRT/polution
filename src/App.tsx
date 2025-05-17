import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './lib/les_page/Home';



import Layout from './Layout';
import { ThemeProvider } from './ThemeContext';
import { CherchProvider } from './ChercheContext';
import { NotifProvider } from './NotificationContext';
import { ProdProvider } from './ProduitContext';
import { SelectProvider } from './SelectContext';

import Air from './lib/les_page/Air';

import Eau from './lib/les_page/Eau';
import Terre from './lib/les_page/Terre';


export default function App(){
  return (
    <ThemeProvider>
      <SelectProvider>
      <ProdProvider>
      <NotifProvider>
      <CherchProvider>
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Eau" element={<Eau />} />
          <Route path="/Air" element={<Air />} />
          <Route path="/Terre" element={<Terre />} />
         
        </Routes>
        </Layout>
      </Router>
      </CherchProvider>
      </NotifProvider>
      </ProdProvider>
      </SelectProvider>
      </ThemeProvider>
  );
}

