import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';
import NotFound from '../pages/not-found';
import Home from '../pages/home';
import Compress from '../pages/compress';

const withRoute = (Component: FC) => (
  <>
    <Header />
    <Component />
    <Footer />
  </>
);

const RouterComponent: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={withRoute(Home)} />
      <Route path="/compress/:type" element={withRoute(Compress)} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default RouterComponent;
