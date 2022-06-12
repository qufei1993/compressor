/* eslint-disable no-restricted-globals */
// this.importScripts('../../node_modules/spark-md5/spark-md5.min.js');
import SparkMD5 from 'spark-md5';
import { FileHashStage, CHUNK_SIZE } from '../../constants/compress';

self.onmessage = async (e) => {
  const file = e.data;
  const { size } = file;
  const chunkTotalPageSize = Math.ceil(size / CHUNK_SIZE);

  const spark = new SparkMD5.ArrayBuffer();
  const reader = new FileReader();
  let currentChunkPageSize = 0;

  const readNextChunk = () => {
    const start = currentChunkPageSize * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, size);

    reader.readAsArrayBuffer(file.slice(start, end));
  };
  const handleOnload = () => {
    spark.append(reader.result as ArrayBuffer);
    currentChunkPageSize += 1;

    if (currentChunkPageSize < chunkTotalPageSize) {
      self.postMessage({
        status: FileHashStage.Pending,
        hashPercent: (
          ((currentChunkPageSize + 1) / chunkTotalPageSize) *
          100
        ).toFixed(2),
      });
      readNextChunk();
    } else {
      self.postMessage({
        status: FileHashStage.Completed,
        hash: spark.end(),
      });
    }
  };
  reader.onload = handleOnload;
  readNextChunk();
};
