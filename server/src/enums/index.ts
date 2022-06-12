export enum FileUploadStatus {
  Uploaded = 'UPLOADED',
  PartialUploaded = 'PARTIAL_UPLOADED',
  NotUploaded = 'NOT_UPLOADED',
}

export enum ErrorType {
  FileExists = 'FILE_EXISTS',
  IncompleteFileChunk = 'INCOMPLETE_FILE_CHUNK',
}
