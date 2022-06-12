import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import * as styled from './styled.css';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../hooks';
import { TFileExtra } from '../../types/compress';
import { updateCompressStatus } from '../../store/features/compress.slice';
import { FileStage } from '../../constants/compress';
import { useSocket } from '../../contexts/Socket';
import {
  CompressInfo,
  Upload,
  List,
  PatchDownload,
  Setting,
  StartCompress,
  DeleteFiles,
} from './components';

const Compress = () => {
  const { t } = useTranslation();
  const compressFileExtraType = useParams<{ type: TFileExtra }>()
    .type as TFileExtra;
  const compressData = useAppSelector((store) => store.compress);
  const fileList = compressData.fileList.filter(
    (file) => file.compressFileExtraType === compressFileExtraType
  );
  const isExistsFile = !!fileList.length;
  const compression = compressData.compression[compressFileExtraType];
  const isCompressCompleted =
    compressData.isCompressCompleted[compressFileExtraType];
  const socket = useSocket();
  const dispatch = useAppDispatch();

  console.debug(fileList, compression, compressFileExtraType);

  const handleCompressSuccess = (data: {
    uid: string;
    size: number;
    compressFileName: string;
    compressFileExtraType: TFileExtra;
  }) => {
    console.debug('压缩成功：', data);
    dispatch(
      updateCompressStatus({
        compressFileExtraType: data.compressFileExtraType,
        uid: data.uid,
        data: {
          stage: FileStage.Done,
          compressSize: data.size,
          compressFileName: data.compressFileName,
        },
      })
    );
  };
  const handleCompressError = (
    error: Error,
    data: { uid: string; compressFileExtraType: TFileExtra }
  ) => {
    console.debug('压缩失败：', data);

    dispatch(
      updateCompressStatus({
        uid: data.uid,
        compressFileExtraType: data.compressFileExtraType,
        data: {
          stage: FileStage.Error,
          errMsg: error,
        },
      })
    );
  };

  useDocumentTitle(
    t(`common.fileExtraTypeDisplayName.${compressFileExtraType}`)
  );

  // https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
  useEffect(() => {
    socket.on('compress_success', handleCompressSuccess);
    socket.on('compress_error', handleCompressError);
    return () => {
      socket.off('compress_success', handleCompressSuccess);
      socket.off('compress_error', handleCompressError);
    };
  }, [socket]);

  return (
    <div className={styled.container}>
      <h2 className={styled.title}>
        {t(`common.fileExtraTypeDisplayName.${compressFileExtraType}`)}{' '}
      </h2>
      <p className={styled.intro}>
        {t('slogan')}
        <b style={{ padding: '0 5px' }}>{t('title')}</b>
        {t('compress.intro')}
      </p>
      <Upload
        compressFileExtraType={compressFileExtraType}
        compression={compression}
      />
      <div className={styled.listWrapper}>
        <List fileList={fileList} />
        <div className={styled.compressBotttom}>
          <div className={styled.compressCompleteWrapper}>
            {isExistsFile && isCompressCompleted && (
              <DeleteFiles compression={compression} fileList={fileList} />
            )}
            {isExistsFile && isCompressCompleted && (
              <PatchDownload compression={compression} fileList={fileList} />
            )}
            <CompressInfo fileList={fileList} />
          </div>
          <div className={styled.compressBtnWrapper}>
            <Setting
              compression={compression}
              fileList={fileList}
              compressFileExtraType={compressFileExtraType}
            />
            <StartCompress
              compression={compression}
              isCompressCompleted={isCompressCompleted}
              fileList={fileList}
              compressFileExtraType={compressFileExtraType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compress;
