import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import dayjs from 'dayjs';

import http, { baseURL } from './http';
import {
  TChunkCheck,
  TChunkUploadOptions,
  TChunkMerge,
} from '../types/request';
import {
  TChunkCheckData,
  TChunkMergeData,
  TChunkUploadData,
} from '../types/response';

export const chunkCheckApi = (data: TChunkCheck) =>
  http<TChunkCheckData>({
    url: '/files/chunk/check',
    method: 'POST',
    data,
  });

export const chunkUploadApi = (
  data: FormData,
  { onUploadProgress, cancelToken }: TChunkUploadOptions
) =>
  http<TChunkUploadData>({
    url: '/files/chunk/upload',
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
    cancelToken,
  });

export const chunkMergeApi = (data: TChunkMerge) =>
  http<TChunkMergeData>({
    url: '/files/chunk/mergeCompress',
    method: 'POST',
    data,
  });

export const deleteFilesApi = (filenames: string[]) =>
  http<null>({
    url: '/files',
    method: 'DELETE',
    data: {
      filenames,
    },
  });

export const downloadApi = (fileHashName: string) =>
  saveAs(`${baseURL}/files/download/${fileHashName}`, fileHashName);

const getFile = (filename: string) =>
  http<null>({
    url: `/files/download/${filename}`,
    responseType: 'blob',
  });

export const patchDownloadApi = async (filenames: string[]) => {
  const compressPackageName = `${filenames[0]
    .split('.')
    .pop()
    ?.toLocaleUpperCase()}-Compressed-${dayjs().format('YYYY-MM-DD')}`;
  const zip = new JSZip();
  const files = zip.folder(compressPackageName);
  const promises: Promise<void>[] = [];
  filenames.forEach((filename) => {
    const promise = getFile(filename).then((data: any) => {
      files?.file(filename, data, { binary: true });
    });
    promises.push(promise);
  });

  await Promise.all(promises);
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${compressPackageName}.zip`);
};
