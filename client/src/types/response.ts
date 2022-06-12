import { FileUploadStatus } from '../constants/compress';

export type TResponseData<T = unknown> = {
  code: string;
  message: string;
  payload?: T;
};

export type TChunkCheckData = {
  status:
    | FileUploadStatus.Uploaded
    | FileUploadStatus.PartialUploaded
    | FileUploadStatus.NotUploaded;
  partialChunkIndexs?: number[];
};

export type TChunkUploadData = {
  hash: string;
  chunkIndex: number;
};

export type TChunkMergeData = {
  filepath?: string;
};
