import { Form, Button, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../hooks';
import { update } from '../../store/features/compress-options.slice';
import { TFileExtra } from '../../types/compress';
import Png from './components/ImagePng';
import Jpg from './components/ImageJpg';
import Gif from './components/ImageGif';
import Webp from './components/ImageWebp';

import { FileExTra } from '../../constants/compress';
import defaultCompressOptions from '../../config/compress-options.json';

import * as styled from './styled.css';

const { Text } = Typography;

const FormItemComponent:FC<{ type: TFileExtra }> = ({ type }) => {
  switch (type) {
    case FileExTra.png:
      return <Png />;
    case FileExTra.jpg:
      return <Jpg />;
    case FileExTra.gif:
      return <Gif />;
    case FileExTra.webp:
      return <Webp />;
    default:
      return <Png />;
  }
};

const CompressSetting: FC<{
  type: TFileExtra;
  setIsModalVisible: (value: boolean) => void;
}> = ({ type, setIsModalVisible }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(update(values, type));
    setIsModalVisible(false);
  };

  const onReset = () => {
    form.setFieldsValue(defaultCompressOptions[type]);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.debug('Failed:', errorInfo);
  };

  return (
    <div>
      <div className={styled.text}>
        <Text>{t('compressSetting.desc')}</Text>
      </div>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styled.form}
      >
        <FormItemComponent type={type} />
        <div className={styled.bottom}>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button onClick={() => onReset()}>{t('common.reset')}</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '20px' }}
            >
              {t('common.apply')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CompressSetting;
