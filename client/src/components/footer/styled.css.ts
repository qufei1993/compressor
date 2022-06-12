import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const footerWrapper = style({
  borderTop: vars.colors.header.border,
  boxShadow: '0 8px 24px -2px rgb(0 0 0 / 5%)',
  background: vars.colors.footer.backgroundColor,
  color: '#999999',
});

globalStyle(`${footerWrapper} a`, {
  color: '#999999',
});

export const container = style({
  maxWidth: '1000px',
  margin: 'auto',
  padding: '30px',
});

globalStyle(`${container} h2`, {
  color: '#ffffff',
});

export const logo = style({
  display: 'flex',
  alignItems: 'center',
});

export const logoImg = style({
  maxWidth: '40px',
});

export const logoName = style({
  paddingLeft: '10px',
});

export const copyright = style({
  padding: '20px 0',
  textAlign: 'center',
  borderTop: '1px solid rgba(233,233,233,.1)',
});
