/* eslint-disable no-shadow */
export const CHUNK_SIZE = 1024 * 1024 * 1;

export enum FileExTra {
  png = 'png',
  jpg = 'jpg',
  gif = 'gif',
  webp = 'webp',
}

export const FileExtraMapping = {
  [FileExTra.jpg]: 'image/jpeg',
  [FileExTra.png]: 'image/png',
  [FileExTra.gif]: 'image/gif',
  [FileExTra.webp]: 'image/png,image/jpeg',
};

export enum FileExtraIconNameMapping {
  jpg = '#icon-JPG',
  png = '#icon-PNG',
  gif = '#icon-GIF',
  webp = '#icon-webp1',
}

export enum FileStage {
  Wait = 'wait',
  CalculateHash = 'calculateHash',
  UploadChunk = 'uploadChunk',
  Compress = 'compress',
  Done = 'done',
  Error = 'error',
}

export enum FileHashStage {
  Pending = 'PENDING',
  Completed = 'COMPLETED',
}

export enum FileUploadStatus {
  Uploaded = 'UPLOADED',
  PartialUploaded = 'PARTIAL_UPLOADED',
  NotUploaded = 'NOT_UPLOADED',
}

export enum RequestStatus {
  Uploading = 'UPLOADING',
  Completed = 'COMPLETED',
  Retry = 'RETRY',
}
