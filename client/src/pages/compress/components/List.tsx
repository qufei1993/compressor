import { List, Row, Col, Progress, Spin, Button } from 'antd';
import {
  CloseCircleOutlined,
  DownloadOutlined,
  Loading3QuartersOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

import { TFile } from '../../../types/compress';
import { useAppDispatch } from '../../../hooks';
import { removeFile } from '../../../store/features/compress.slice';
import * as styled from '../styled.css';
import { renderSize, calculateFilePercent } from '../../../utils/compress';
import { FileStage } from '../../../constants/compress';
import { downloadApi } from '../../../services';

const RenderProgress = ({ file }: { file: TFile }) => {
  const { t } = useTranslation();

  switch (file.stage) {
    case FileStage.Wait:
      return (
        <Progress
          percent={0}
          format={() => `${t(`compress.list.fileStage.${file.stage}`)}`}
        />
      );
    case FileStage.CalculateHash:
      return (
        <Progress
          strokeColor={{
            '0%': '#ffc107',
            '100%': '#ffc107',
          }}
          percent={file.hashPercent}
          format={(percent) =>
            `${t(`compress.list.fileStage.${file.stage}`)} ${percent}%`
          }
        />
      );
    case FileStage.UploadChunk:
      return (
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={calculateFilePercent(file)}
          format={(percent) =>
            `${t(`compress.list.fileStage.${file.stage}`)} ${percent}%`
          }
        />
      );
    case FileStage.Compress:
      return (
        <div>
          <Progress
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            strokeLinecap="square"
            percent={100}
            style={{ animation: 'circular-rotate 1.4s linear infinite' }}
            // eslint-disable-next-line react/no-unstable-nested-components
            format={() => (
              <div>
                {t(`compress.list.fileStage.${file.stage}`)}
                <Spin
                  indicator={
                    <Loading3QuartersOutlined
                      style={{ color: 'green', marginLeft: '5px' }}
                      spin
                    />
                  }
                />
              </div>
            )}
          />
        </div>
      );
    case FileStage.Done:
      return (
        <Progress
          percent={100}
          // eslint-disable-next-line react/no-unstable-nested-components
          format={() => (
            <div style={{ color: 'green' }}>
              {renderSize(file.compressSize || 0)}
            </div>
          )}
        />
      );
    case FileStage.Error:
      return <Progress percent={100} status="exception" />;
    default:
      return <div />;
  }
};

const ListComponent: FC<{ fileList: TFile[] }> = ({ fileList }) => {
  const dispatch = useAppDispatch();
  const calculateCompressionRatio = (
    size: number,
    compressSize = 0
  ): string => {
    const num = ((size - compressSize) / size) * 100 * -1;
    const str = `${num.toFixed(2)}%`;
    if (num > 0) {
      return `+${str}`;
    }

    return str;
  };

  return (
    <List
      className={styled.list}
      dataSource={fileList}
      renderItem={(file) => (
        <Row className={styled.listItem}>
          <Col span={6} className={styled.filename}>
            {file.name}
          </Col>
          <Col span={3} className={styled.fileSizeText}>
            {renderSize(file.size)}
          </Col>
          <Col span={8} className={styled.progress}>
            <RenderProgress file={file} />
          </Col>
          {file.stage === FileStage.Wait && (
            <Col span={7} className={styled.listItemRight}>
              <CloseCircleOutlined
                className={styled.removeFile}
                onClick={() => dispatch(removeFile(file.uid))}
              />
            </Col>
          )}
          {file.stage === FileStage.Done && (
            <Col span={7} className={styled.listItemRight}>
              <span className={styled.compressionRatio}>
                {calculateCompressionRatio(file.size, file.compressSize)}
              </span>

              <Button
                type="link"
                className={styled.download}
                onClick={() => downloadApi(file.compressFileName as string)}
              >
                <DownloadOutlined className={styled.downloadIcon} />
              </Button>
            </Col>
          )}
        </Row>
      )}
    />
  );
};

export default ListComponent;
