import { CompressOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CHUNK_SIZE,
  FileHashStage,
  FileStage,
  FileUploadStatus,
} from '../../../constants/compress';
import { socket } from '../../../contexts/Socket';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { chunkCheckApi } from '../../../services';
import {
  updateCompression,
  updateCompressStatus,
  updateFile,
  updateFilePercent,
  updatePartialChunkFilePercent,
} from '../../../store/features/compress.slice';
import { TFile, TFileExtra } from '../../../types/compress';
import ChunkConcurrentRequest from '../../../utils/ChunkConcurrentRequest';

const chunkConcurrentReqInstance = new ChunkConcurrentRequest(3);

const StartCompress: FC<{
  compressFileExtraType: TFileExtra;
  fileList: TFile[];
  isCompressCompleted: boolean;
  compression: boolean;
}> = (props) => {
  const { t } = useTranslation();
  const { compressFileExtraType, fileList, isCompressCompleted, compression } =
    props;
  const compressOptions = useAppSelector((store) => store.compressOptions);
  const dispatch = useAppDispatch();

  const createProgressFunc =
    (uid: string, index: number) => (progressEvent: ProgressEvent) => {
      const percent = (progressEvent.loaded / progressEvent.total) * 100;
      dispatch(updateFilePercent({ uid, index, percent }));
    };

  const calculateFileHashWithWorker = (
    file: File,
    uid: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      const worker = new Worker(
        new URL('../../../utils/worker/file-hash.ts', import.meta.url),
        {
          // Uncaught SyntaxError: Cannot use import statement outside a module
          // issue: https://github.com/vitejs/vite/issues/7019
          type: 'module',
        }
      );

      worker.onmessage = (e) => {
        const { data } = e;
        const { status } = data;
        if (status === FileHashStage.Pending) {
          dispatch(
            updateFile({
              uid,
              data: {
                hashPercent: data.hashPercent,
              },
            })
          );
        }
        if (status === FileHashStage.Completed) {
          dispatch(
            updateFile({
              uid,
              data: {
                hash: data.hash,
                stage: FileStage.UploadChunk,
              },
            })
          );
          resolve(data.hash);
        }
      };
      worker.onerror = (e) => {
        reject(e.message);
      };
      worker.postMessage(file);
    });

  const handleCompress = async () => {
    dispatch(
      updateCompression({
        compressFileExtraType,
        compression: true,
      })
    );

    await Promise.all(
      fileList.map(async ({ hash: lastHash, file, uid }) => {
        dispatch(
          updateFile({
            uid,
            data: {
              stage: FileStage.CalculateHash,
            },
          })
        );

        try {
          const hash =
            lastHash || (await calculateFileHashWithWorker(file, uid));
          // Check if the file has been uploaded
          const checkResult = await chunkCheckApi({
            name: file.name,
            hash,
            chunkSize: CHUNK_SIZE,
          });
          const { status, partialChunkIndexs } = checkResult.payload || {};
          const isUploaded = status === FileUploadStatus.Uploaded;
          if (isUploaded) {
            dispatch(
              updateFile({
                uid,
                data: {
                  hashPercent: 100,
                  percent: 100,
                  stage: FileStage.Compress,
                },
              })
            );
          } else {
            if (partialChunkIndexs?.length) {
              dispatch(
                updatePartialChunkFilePercent({
                  partialChunkIndexs,
                  uid,
                })
              );
            }

            await chunkConcurrentReqInstance.run({
              file,
              hash,
              chunkSize: CHUNK_SIZE,
              uid,
              partialChunkIndexs,
              createProgressFunc,
            });
          }

          dispatch(
            updateFile({
              uid,
              data: {
                stage: FileStage.Compress,
              },
            })
          );

          socket.emit('compress', {
            uid,
            name: file.name,
            hash,
            chunkSize: CHUNK_SIZE,
            chunkTotalPageSize: Math.ceil(file.size / CHUNK_SIZE),
            compressOptions: compressOptions[compressFileExtraType],
            compressFileExtraType,
          });
        } catch (error) {
          dispatch(
            updateCompressStatus({
              uid,
              compressFileExtraType,
              data: {
                stage: FileStage.Error,
                errMsg: error as Error,
              },
            })
          );
        }
      })
    );
  };

  const getCompressStatusDisplayName = () => {
    if (compression) {
      return 'compression';
    }

    if (isCompressCompleted) {
      return 'recompress';
    }

    return 'startCompress';
  };

  return (
    <div>
      <Button
        onClick={() => handleCompress()}
        type="primary"
        shape="round"
        icon={<CompressOutlined />}
        loading={compression}
        disabled={!fileList.length}
      >
        {t(`compress.${getCompressStatusDisplayName()}`)}
      </Button>
    </div>
  );
};

export default StartCompress;
