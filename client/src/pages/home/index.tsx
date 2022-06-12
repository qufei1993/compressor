import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useDocumentTitle(t('home.title'));

  useEffect(() => navigate('/compress/png'), []);

  // TODO: Home page

  return <div>Hello World!</div>;
};

export default Home;
