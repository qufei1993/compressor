import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { FileStage } from '../../../constants/compress';
import { patchDownloadApi } from '../../../services';
import { TFile } from '../../../types/compress';
import * as styled from '../styled.css';

const PatchDownload: FC<{
  fileList: TFile[];
  compression: boolean;
}> = ({ fileList, compression }) => {
  const compressSuccessFilenames = fileList
    .filter((file) => file.stage === FileStage.Done && file.compressFileName)
    .map((file) => file.compressFileName) as string[];

  return (
    <div>
      {compressSuccessFilenames.length > 1 && (
        <Button
          type="primary"
          shape="circle"
          ghost
          icon={<DownloadOutlined />}
          className={styled.downloadAllCompressFile}
          disabled={compression}
          onClick={() => patchDownloadApi(compressSuccessFilenames)}
        />
      )}
    </div>
  );
};

export default PatchDownload;
