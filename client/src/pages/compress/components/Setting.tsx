import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CompressSetting from '../../../components/compress-setting';
import { TFile, TFileExtra } from '../../../types/compress';

type TSetting = {
  compressFileExtraType: TFileExtra;
  compression: boolean;
  fileList: TFile[];
};

const Setting: FC<TSetting> = ({
  compressFileExtraType,
  compression,
  fileList,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <Button
        onClick={() => setIsModalVisible(true)}
        type="primary"
        shape="round"
        icon={<SettingOutlined />}
        disabled={compression || !fileList.length}
      >
        {t('compress.setting.advancedSettings')}
      </Button>
      <Modal
        title={t('compress.setting.advancedSettings')}
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        bodyStyle={{
          height: '500px',
          overflowY: 'auto',
        }}
        footer={null}
        getContainer={false}
      >
        <CompressSetting
          type={compressFileExtraType}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </div>
  );
};

export default Setting;
