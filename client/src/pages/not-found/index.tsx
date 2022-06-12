import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as styled from './styled.css';
import notFoundImage from '../../assets/404.png';

const { Text } = Typography;

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className={styled.notFound}>
      <div className={styled.notFoundImage}>
        <img src={notFoundImage} alt="Not Found" />
      </div>
      <div className={styled.info}>
        <h2>404</h2>
        <p>
          <Text type="secondary">{t('notFound.description')}</Text>
        </p>
        <Button type="primary">
          <Link to="/">{t('notFound.backHome')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
