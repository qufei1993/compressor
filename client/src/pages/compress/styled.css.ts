import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const container = style({
  width: '100%',
  backgroundColor: vars.colors.compress.container.backgroundColor,
  backgroundImage: vars.colors.compress.container.backgroundImage,
  paddingBottom: '30px',
  flex: 1,
});

export const title = style({
  paddingTop: '30px',
  fontSize: '30px',
  marginTop: 0,
  textAlign: 'center',
});

export const intro = style({
  fontSize: '20px',
  textAlign: 'center',
});

export const dragger = style({
  width: '820px !important',
  height: '200px !important',
  margin: '0 auto',
  marginTop: '50px',
});

export const form = style({
  width: '820px',
  margin: '20px auto',
});

export const pngSlider = style({});

export const listWrapper = style({
  width: '820px',
  margin: '0 auto',
  marginTop: '30px',
  background: vars.colors.background,
  border: vars.colors.header.border,
  paddingTop: '20px',
});

export const compressBotttom = style({
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
});

export const compressCompleteWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const deleteCompressFile = style({
  marginRight: '8px',
});

export const downloadAllCompressFile = style({
  marginRight: '8px',
});

export const compressBtnWrapper = style({
  display: 'flex',
});

globalStyle(`${compressBtnWrapper} > div`, {
  marginLeft: '10px',
});

export const list = style({
  fontSize: '14px',
});

export const listItem = style({
  padding: '12px 0',
  borderBottom: '1px solid rgba(0,0,0,.06)',
  paddingRight: '24px',
  paddingLeft: '24px',
});

export const filename = style({
  width: '200px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
});

export const fileSizeText = style({
  textAlign: 'right',
  fontSize: '13px',
});

export const progress = style({
  paddingLeft: '10px',
});

globalStyle(`${progress} .ant-progress-text`, {
  fontSize: '13px',
  marginLeft: '10px',
});

export const listItemRight = style({
  textAlign: 'right',
});

const listItemRightIcon = style({
  color: 'grey !important',
  cursor: 'pointer',
});

export const compressionRatio = style({
  fontSize: '13px',
});

export const removeFile = style([
  listItemRightIcon,
  {
    ':hover': {
      color: 'red !important',
    },
  },
]);

export const download = style({
  padding: '0px !important',
});

export const downloadIcon = style([
  listItemRightIcon,
  {
    textDecoration: 'underline',
    paddingLeft: '10px',
    ':hover': {
      color: '#1890ff !important',
    },
  },
]);

export const compressInfo = style({
  textAlign: 'left',
  fontSize: '12px',
});
