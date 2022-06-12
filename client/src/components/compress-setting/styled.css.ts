import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const text = style({
  backgroundColor: vars.colors.advanceSetting.form.text.backgroundColor,
  marginBottom: '20px',
  padding: '12px 20px',
  textAlign: 'center',
});

export const form = style({
  background: 'rgba(0,0,0,.0)',
  width: '90%',
  margin: '0 auto !important',
  paddingBottom: '20px !important',
});

globalStyle(`${form} .ant-form-item-label`, {
  wordWrap: 'break-word',
});

export const bottom = style({
  position: 'absolute',
  bottom: '-5px',
  right: '0',
  width: '100%',
  background: vars.colors.advanceSetting.form.bottomBox.backgroundColor,
  textAlign: 'right',
  paddingTop: '20px',
  borderTop: `1px solid ${vars.colors.advanceSetting.form.bottomBox.borderTopCorlor}`,
  borderRadius: '2px 2px 0 0',
});
