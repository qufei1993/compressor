import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  margin: 0,
  fontSize: '14px',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
});

globalStyle('.icon', {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.15em',
  fill: 'currentColor',
  overflow: 'hidden',
});

globalStyle('#root', {
  height: '100%',
});

globalStyle('#app', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});
