import { Upload as UploadAntd } from 'antd';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { addFile } from '../../../store/features/compress.slice';
import { useAppDispatch } from '../../../hooks';
import {
  FileExtraIconNameMapping,
  FileExtraMapping,
  FileStage,
} from '../../../constants/compress';
import * as styled from '../styled.css';
import { TFileExtra } from '../../../types/compress';

const { Dragger } = UploadAntd;

const Upload: FC<{
  compressFileExtraType: TFileExtra;
  compression: boolean;
}> = ({ compressFileExtraType, compression }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const beforeUpload = async (file: File & { uid: string }) => {
    dispatch(
      addFile({
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        uid: file.uid,
        stage: FileStage.Wait,
        compressFileExtraType,
        percent: 0,
        hashPercent: 0,
        chunkPercent: {},
      })
    );

    return false;
  };

  return (
    <div className={styled.dragger}>
      <Dragger
        accept={FileExtraMapping[compressFileExtraType]}
        multiple
        showUploadList={false}
        beforeUpload={beforeUpload}
        disabled={compression}
      >
        <p className="ant-upload-drag-icon">
          <svg className="icon" style={{ fontSize: '60px' }} aria-hidden="true">
            <use xlinkHref={FileExtraIconNameMapping[compressFileExtraType]} />
          </svg>
        </p>
        <p className="ant-upload-text" style={{ paddingTop: '10px' }}>
          {t('compress.upload.text')}
        </p>
        <p className="ant-upload-hint">{t('compress.upload.hint')}</p>
      </Dragger>
    </div>
  );
};

export default Upload;
