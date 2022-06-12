import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks';
import { deleteFiles } from '../../../store/features/compress.slice';
import { TFile } from '../../../types/compress';
import * as styled from '../styled.css';

const DeleteFiles: FC<{
  compression: boolean;
  fileList: TFile[];
}> = ({ compression, fileList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(deleteFiles(fileList));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        type="default"
        shape="circle"
        icon={<DeleteOutlined />}
        danger
        className={styled.deleteCompressFile}
        disabled={compression}
        onClick={showModal}
      />
      <Modal
        title={t('compress.deleteFile.title')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={t('common.cancel')}
        okText={t('common.confirm')}
        okType="danger"
      >
        {t('compress.deleteFile.content')}
      </Modal>
    </div>
  );
};

export default DeleteFiles;
