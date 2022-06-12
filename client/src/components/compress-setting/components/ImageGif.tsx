import {
  Form,
  Switch,
  Slider,
  InputNumber,
  Row,
  Col,
  Typography,
  Select,
} from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../hooks';

const { Paragraph } = Typography;
const { Option } = Select;

const Png = () => {
  const { t } = useTranslation();
  const { gif } = useAppSelector((store) => store.compressOptions);
  const [color, setColor] = useState(gif.colors);

  return (
    <div>
      <Form.Item label={t('compressOptions.gif.colors')}>
        <Row>
          <Col span={20}>
            <Form.Item name="colors" noStyle>
              <Slider
                min={2}
                max={256}
                defaultValue={color}
                onChange={(value: number) => setColor(value)}
                value={color}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <InputNumber
              min={2}
              max={256}
              style={{ margin: '0 16px' }}
              value={color}
              onChange={(value: number) => setColor(value)}
            />
          </Col>
        </Row>

        <Paragraph type="secondary">
          {t('compressOptions.gif.colorsDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.gif.optimizationLevel')}>
        <Form.Item name="optimizationLevel" noStyle>
          <Select defaultValue={gif.optimizationLevel}>
            {[
              {
                id: 1,
                desc: t('compressOptions.gif.optimizationLevelValues.one'),
              },
              {
                id: 2,
                desc: t('compressOptions.gif.optimizationLevelValues.two'),
              },
              {
                id: 3,
                desc: t('compressOptions.gif.optimizationLevelValues.three'),
              },
            ].map((item) => (
              <Option value={item.id}>{item.desc}</Option>
            ))}
          </Select>
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.gif.optimizationLevelDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.gif.interlaced')}>
        <Form.Item name="interlaced" noStyle>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.gif.interlacedDesc')}
        </Paragraph>
      </Form.Item>
    </div>
  );
};

export default Png;
