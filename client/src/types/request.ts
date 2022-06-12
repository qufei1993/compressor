import { CancelToken } from 'axios';

export type TChunkCheck = {
  name: string;
  hash: string;
  chunkSize: number;
};

export type TChunkUploadOptions = {
  cancelToken: CancelToken;
  onUploadProgress: (progressEvent: any) => void;
};

export type TChunkMerge = {
  name: string;
  hash: string;
  chunkSize: number;
  chunkTotalPageSize: number;
  onlyCompress?: boolean;
};
