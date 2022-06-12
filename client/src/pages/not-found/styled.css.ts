import { style, globalStyle } from '@vanilla-extract/css';

export const notFound = style({
  width: '100%',
  minHeight: '100vh',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

export const notFoundImage = style({
  width: '50%',
  textAlign: 'right',
});

export const info = style({
  width: '50%',
  textAlign: 'left',
  paddingLeft: '50px',
});

globalStyle(`${notFoundImage} img`, {
  width: '50%',
});
