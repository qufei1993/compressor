import { Form, Slider, Typography, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../hooks';

const { Paragraph } = Typography;
const { Option } = Select;

const Png = () => {
  const { t } = useTranslation();
  const { png } = useAppSelector((store) => store.compressOptions);

  return (
    <div>
      <Form.Item label={t('compressOptions.png.quality')}>
        <Form.Item name="quality" noStyle>
          <Slider
            range={{ draggableTrack: true }}
            defaultValue={png.quality as [number, number]}
            marks={{
              0: '0',
              20: '10',
              40: '20',
              60: '60',
              80: '80',
              100: '100',
            }}
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.png.qualityDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.png.speed')}>
        <Form.Item name="speed" noStyle>
          <Slider
            defaultValue={png.speed}
            min={1}
            max={11}
            marks={{
              1: '1',
              3: '3',
              5: '5',
              7: '7',
              9: '9',
              11: '11',
            }}
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.png.speedDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.png.dithering')}>
        <Form.Item name="dithering" noStyle>
          <Select defaultValue={png.dithering}>
            {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.png.ditheringDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.png.posterrize')}>
        <Form.Item name="posterrize" noStyle>
          <Select defaultValue={png.posterrize}>
            {[8, 16, 32, 64, 128, 256].map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.png.posterrizeDesc')}
        </Paragraph>
      </Form.Item>
    </div>
  );
};

export default Png;
