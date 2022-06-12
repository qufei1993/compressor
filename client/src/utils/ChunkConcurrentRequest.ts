/* eslint-disable no-loop-func */
import axios, { CancelTokenSource } from 'axios';

import { chunkUploadApi } from '../services';
import { RequestStatus } from '../constants/compress';
import { CancelReqError } from './Error';

const { CancelToken } = axios;

class ChunkConcurrentRequest {
  private limit: number;

  private requestObj: {
    [hash: string]: {
      [index: string]: {
        retryCount?: number | undefined;
        cancelTokenSource?: CancelTokenSource;
        status?:
          | RequestStatus.Retry
          | RequestStatus.Uploading
          | RequestStatus.Completed
          | undefined;
      };
    };
  };

  constructor(limit: number) {
    this.limit = limit || 2;
    this.requestObj = {};
  }

  // eslint-disable-next-line class-methods-use-this
  private readChunk(
    file: File,
    currentChunkPageSize: number,
    chunkSize: number
  ) {
    const { size } = file;
    const start = currentChunkPageSize * chunkSize;
    const end = Math.min(start + chunkSize, size);

    return file.slice(start, end);
  }

  private getCurrentChunkPageSize(hash: string, chunkTotalPageSize: number) {
    let index = -1;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < chunkTotalPageSize; i++) {
      if (
        this.requestObj[hash]?.[i] === undefined ||
        this.requestObj[hash]?.[i].status === RequestStatus.Retry
      ) {
        index = i;
        break;
      }
    }

    return index;
  }

  public async run(
    params: {
      file: File;
      hash: string;
      chunkSize: number;
      uid: string;
      partialChunkIndexs?: number[];
      createProgressFunc: (
        uid: string,
        index: number
      ) => (e: ProgressEvent) => void;
    },
    options: {
      limit?: number;
    } = {}
  ) {
    const {
      hash,
      file,
      chunkSize,
      uid,
      partialChunkIndexs,
      createProgressFunc,
    } = params;
    const { size: fileTotalSize, name } = file;
    const chunkTotalPageSize = Math.ceil(fileTotalSize / chunkSize);

    if (!chunkTotalPageSize) {
      return Promise.resolve();
    }

    const limit = Math.min(options.limit || this.limit, chunkTotalPageSize);

    let isAbortReq = false;
    let currentReqCount = 0;
    let completedReqCount = 0;
    const promise = new Promise((resolve, reject) => {
      if (!this.requestObj[hash]) {
        this.requestObj[hash] = {};
      }

      // eslint-disable-next-line no-underscore-dangle
      const _sendRequest = async () => {
        if (isAbortReq) {
          return;
        }

        while (
          completedReqCount + currentReqCount < chunkTotalPageSize &&
          currentReqCount < limit
        ) {
          const index = this.getCurrentChunkPageSize(hash, chunkTotalPageSize);

          if (index === -1) {
            resolve(1);
            return;
          }
          if (!this.requestObj[hash]?.[index]) {
            this.requestObj[hash][index] = {};
          }

          if (partialChunkIndexs?.includes(index)) {
            completedReqCount += 1;
            this.requestObj[hash][index].status = RequestStatus.Completed;
            if (completedReqCount >= chunkTotalPageSize) {
              resolve(1);
              return;
            }

            // eslint-disable-next-line no-continue
            continue;
          }

          currentReqCount += 1;
          const chunk = this.readChunk(file, index, chunkSize);
          this.requestObj[hash][index].status = RequestStatus.Uploading;

          console.debug(
            `chunk ${hash}-${index} request, completedReqCount ${completedReqCount}, chunkTotalPageSize: ${chunkTotalPageSize}, currentReqCount: ${currentReqCount}`
          );
          if (this.requestObj[hash][index]?.status === RequestStatus.Retry) {
            console.debug(`${index} on retrying.`);
          }

          const cancelTokenSource = CancelToken.source();
          const form = new FormData();
          form.append('file', chunk);
          form.append('name', name);
          form.append('chunkTotalPageSize', String(chunkTotalPageSize));
          form.append('chunkSize', String(chunkSize));
          form.append('index', String(index));
          form.append('size', String(fileTotalSize));
          form.append('hash', hash);

          chunkUploadApi(form, {
            cancelToken: cancelTokenSource.token,
            onUploadProgress: createProgressFunc(uid, index),
          })
            .then(async (res) => {
              console.debug(`chunk ${hash}-${index} response success`);
              currentReqCount -= 1;
              completedReqCount += 1;
              this.requestObj[hash][index].status = RequestStatus.Completed;
              if (completedReqCount === chunkTotalPageSize) {
                return resolve(1);
              }
              _sendRequest();
              return res;
            })
            // eslint-disable-next-line consistent-return
            .catch((err) => {
              if (axios.isCancel(err)) {
                console.debug(`chunk ${hash}-${index} request canceled`);
                isAbortReq = true;
                return reject(new CancelReqError(err));
              }

              const response = err.response || {};
              console.debug(
                `chunk ${hash}-${index} response error with message: ${response.statusText}`
              );
              const retryCount =
                this.requestObj[hash][index].retryCount === undefined
                  ? 0
                  : (this.requestObj[hash][index].retryCount as number);
              if (retryCount >= 2) {
                isAbortReq = true;
                return reject(response.statusText);
              }

              this.requestObj[hash][index].retryCount = retryCount + 1;
              this.requestObj[hash][index].status = RequestStatus.Retry;

              currentReqCount -= 1;
              _sendRequest();
            });

          this.requestObj[hash][index].cancelTokenSource = cancelTokenSource;
        }
      };

      _sendRequest();
    }).then(() => {
      delete this.requestObj[hash];
      return 1;
    });

    return promise;
  }

  cancelUploadingReq() {
    const hashKeys: string[] = Object.keys(this.requestObj);
    // eslint-disable-next-line no-restricted-syntax
    for (const hashKey of hashKeys) {
      const keys = Object.keys(this.requestObj[hashKey]);
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        if (this.requestObj[hashKey][key].status === 'UPLOADING') {
          this.requestObj[hashKey][key].cancelTokenSource?.cancel(
            `cancel chunk request index: ${key}`
          );
        }
      }
    }
  }
}

export default ChunkConcurrentRequest;
