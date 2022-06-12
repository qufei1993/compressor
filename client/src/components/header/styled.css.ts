import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const header = style({
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 999,
  height: '64px',
  lineHeight: '64px',
  padding: '0 58px',
  borderBottom: vars.colors.header.border,
  backgroundColor: vars.colors.header.backgroundColor,
  width: '100%',
  boxShadow: '0 8px 24px -2px rgb(0 0 0 / 5%)',
});

globalStyle(`${header} a`, {
  color: `${vars.colors.color}`,
});

globalStyle(`${header} button`, {
  color: `${vars.colors.color} !important`,
});

export const logoWrapper = style({
  display: 'flex',
});

export const logoImg = style({
  verticalAlign: 'middle',
  borderStyle: 'none',
  width: '40px',
  marginRight: '8px',
});

export const logoName = style({
  margin: 0,
  paddingLeft: '5px',
});

export const menu = style({
  lineHeight: '64px !important',
  borderBottom: '0px',
});

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const headerRightItem = style({
  marginLeft: '10px',
});

export const themeSwitch = style([
  headerRightItem,
  {
    // backgroundColor: '#ffffff',
  },
]);

export const nullHeight = style({
  height: '64px',
  width: '100%',
});
