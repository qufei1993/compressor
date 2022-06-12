import { Link } from 'react-router-dom';
import { Menu, Row, Col, Switch, Dropdown, Button } from 'antd';
import { GithubOutlined, DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import * as styled from './styled.css';
import { FileExtraIconNameMapping } from '../../constants/compress';
import { TFileExtra } from '../../types/compress';
import { useAppDispatch, useSystemTheme } from '../../hooks';
import { update, updateByThemeName } from '../../store/features/theme.slice';
import logo from '../../assets/logo.png';

const { SubMenu } = Menu;

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

const Header = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const { name: systemThemeName } = useSystemTheme();

  const changeLanguage = (key: string) => {
    i18n.changeLanguage(key);
  };
  const handleThemeSwitch = () => dispatch(update());

  useEffect(() => {
    dispatch(updateByThemeName(systemThemeName));
  }, [systemThemeName]);

  return (
    <header>
      <Row className={styled.header}>
        <Col lg={4} md={3} sm={3} xs={3}>
          <Link to="/compress/png" className={styled.logoWrapper}>
            <div className={styled.logoImg}>
              <img width="100%" alt="logo" src={logo} />
            </div>
            <h2 className={styled.logoName}>{t('title')}</h2>
          </Link>
        </Col>
        <Col lg={14} md={13} sm={19} xs={19}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['image']}
            id="nav"
            key="nav"
            className={styled.menu}
            builtinPlacements={{
              bottomLeft: {
                points: ['tc', 'bc'],
                overflow: {
                  adjustX: 1,
                  adjustY: 1,
                },
                offset: [0, 5],
              },
            }}
          >
            <SubMenu key="image" title={t('header.compressImages')}>
              {imageMenuDataList.map(({ type, link }) => (
                <Menu.Item key={type}>
                  <Link to={link}>
                    <svg
                      className="icon"
                      style={{ paddingRight: '5px', fontSize: '20px' }}
                      aria-hidden="true"
                    >
                      <use xlinkHref={FileExtraIconNameMapping[type]} />
                    </svg>
                    {t(`common.fileExtraTypeDisplayName.${type}`)}
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </Col>
        <Col lg={6} md={8} sm={0} xs={0} className={styled.headerRight}>
          <Link
            to="https://www.github.com/qufei1993"
            className={styled.headerRightItem}
          >
            <GithubOutlined /> Github
          </Link>
          <Dropdown
            className={styled.headerRightItem}
            overlay={
              <Menu onClick={({ key }) => changeLanguage(key)}>
                <Menu.Item key="zh">简体中文</Menu.Item>
                <Menu.Item key="en">English</Menu.Item>
              </Menu>
            }
          >
            <Button
              type="link"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {t('language')} <DownOutlined />
            </Button>
          </Dropdown>
          <Switch
            className={styled.themeSwitch}
            onClick={() => handleThemeSwitch()}
            checkedChildren={
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-baitianmoshi" />
              </svg>
            }
            unCheckedChildren={
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-yejianmoshi" />
              </svg>
            }
            defaultChecked={false}
          />
        </Col>
      </Row>
      <div className={styled.nullHeight} />
    </header>
  );
};

export default Header;
