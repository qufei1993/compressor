import { Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FileStage } from '../../../constants/compress';
import { TFile } from '../../../types/compress';
import { renderSize } from '../../../utils/compress';
import * as styled from '../styled.css';

const { Text } = Typography;

const CompressInfo: FC<{ fileList: TFile[] }> = ({ fileList }) => {
  const { t } = useTranslation();

  const fileTotalCount = fileList.length;
  if (!fileTotalCount) {
    return <div />;
  }

  const successFileTotalCount = fileList.filter(
    (file) => file.stage === FileStage.Done
  ).length;

  if (!successFileTotalCount) {
    return (
      <Text className={styled.compressInfo} type="secondary">
        {t('compress.compressInfo.count', {
          fileTotalCount,
          successFileTotalCount,
        })}
      </Text>
    );
  }

  const { totalSize, totalCompressSize } = fileList
    .filter((file) => file.stage === FileStage.Done)
    .reduce(
      (pre, curr) => {
        const newPre = { ...pre };
        newPre.totalCompressSize += curr.compressSize || 0;
        newPre.totalSize += curr.size;
        return newPre;
      },
      {
        totalSize: 0,
        totalCompressSize: 0,
      }
    );

  const successCompressSize = renderSize(totalSize - totalCompressSize);
  const successCompressRatio = (
    ((totalSize - totalCompressSize) / totalSize) *
    100
  ).toFixed(2);

  return (
    <Text className={styled.compressInfo} type="secondary">
      {t('compress.compressInfo.count', {
        fileTotalCount,
        successFileTotalCount,
      })}
      {Number(successCompressRatio) >= 0
        ? t('compress.compressInfo.successRatio', {
            successCompressSize,
            successCompressRatio,
          })
        : null}
    </Text>
  );
};

export default CompressInfo;
