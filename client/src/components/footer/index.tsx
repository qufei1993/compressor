import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import * as styled from './styled.css';
import { TFileExtra } from '../../types/compress';
import logo from '../../assets/logo.png';
import codeWorld from '../../assets/code-world.jpg';

const imageMenuDataList: { type: TFileExtra; link: string }[] = [
  {
    type: 'jpg',
    link: '/compress/jpg',
  },
  {
    type: 'png',
    link: '/compress/png',
  },
  {
    type: 'gif',
    link: '/compress/gif',
  },
  {
    type: 'webp',
    link: '/compress/webp',
  },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styled.footerWrapper}>
      <Row className={styled.container}>
        <Col span={8} style={{ padding: '0 32px' }}>
          <h2 className={styled.logo}>
            <div className={styled.logoImg}>
              <img src={logo} width="100%" alt={t('title')} />
            </div>
            <span className={styled.logoName}>{t('title')}</span>
          </h2>
          <p>{t('slogan')}</p>
        </Col>
        <Col span={8} style={{ padding: '0 32px' }}>
          <h2>{t('footer.product')}</h2>
          {imageMenuDataList.map(({ type, link }) => (
            <p>
              <Link to={link}>
                {t(`common.fileExtraTypeDisplayName.${type}`)}
              </Link>
            </p>
          ))}
        </Col>
        <Col span={8} style={{ padding: '0 32px' }}>
          <h2>{t('footer.contactUs')}</h2>
          <p style={{ width: '150px' }}>
            <img src={codeWorld} width="100%" alt="Code World" />
          </p>
          <p>{t('footer.contactUsDesc')}</p>
        </Col>
      </Row>
      <div className={styled.copyright}>Copyright © 2022 编程界 - 五月君</div>
    </footer>
  );
};

export default Footer;
