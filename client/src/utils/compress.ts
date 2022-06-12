import { CHUNK_SIZE } from '../constants/compress';
import { TFile } from '../types/compress';

export const renderSize = (value: number): string => {
  if (value === null || value === 0) {
    return '0 Bytes';
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const srcsize = parseFloat(value.toString());
  const index = Math.floor(Math.log(srcsize) / Math.log(1024));
  const size = srcsize / 1024 ** index;
  // const size = srcsize / Math.pow(1024, index);
  return `${size.toFixed(2)}${unitArr[index]}`;
};

export const calculateFilePercent = (file: TFile) => {
  if (file.percent === 100) {
    return file.percent;
  }
  const loaded = Object.values(file.chunkPercent).reduce(
    (pre, cur) => pre + cur,
    0
  );
  return parseInt((loaded / (file.size / CHUNK_SIZE)).toFixed(2), 10);
};

export const fileExtension = (filename: string, symbol = '.') =>
  filename.split(symbol).pop();
