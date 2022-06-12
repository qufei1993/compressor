import { style } from '@vanilla-extract/css';

export const errorBoundary = style({
  textAlign: 'center',
  paddingTop: '50px',
  width: '100%',
  minHeight: '100vh',
});

export const errorMsg = style({
  width: '50%',
  margin: '20px auto',
});
