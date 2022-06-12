import { FileExTra } from '../constants/compress';
import compressOptions from '../config/compress-options.json';

export type TFileExtra = keyof typeof FileExTra;

export type TFile = {
  file: File;
  name: string;
  type: string;
  size: number;
  compressSize?: number;
  uid: string;
  stage: string;
  percent: number;
  chunkPercent: {
    [index: string]: number;
  };
  hashPercent: number;
  compressFileExtraType: TFileExtra;
  hash?: string;
  errMsg?: string | object;
  compressFileName?: string;
};

export type TFileInitialState = { [str in TFileExtra]: boolean };

export type TCompress = {
  fileList: TFile[];
  compression: TFileInitialState;
  isCompressCompleted: TFileInitialState;
};

export type TUpdateCompressOptionsPayload =
  | typeof compressOptions.jpg
  | typeof compressOptions.webp
  | typeof compressOptions.png
  | typeof compressOptions.gif;
