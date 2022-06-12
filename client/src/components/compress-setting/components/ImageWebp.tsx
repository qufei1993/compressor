import { Form, Slider, Typography, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../hooks';

const { Paragraph } = Typography;
const { Option } = Select;

const Webp = () => {
  const { t } = useTranslation();
  const { webp } = useAppSelector((store) => store.compressOptions);

  return (
    <div>
      <Form.Item label={t('compressOptions.webp.preset')}>
        <Form.Item name="preset" noStyle>
          <Select defaultValue={webp.preset}>
            {['default', 'photo', 'picture', 'drawing', 'icon'].map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.webp.presetDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.webp.quality')}>
        <Form.Item name="quality" noStyle>
          <Slider
            defaultValue={webp.quality}
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
          {t('compressOptions.webp.qualityDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.webp.alphaQuality')}>
        <Form.Item name="alphaQuality" noStyle>
          <Slider
            defaultValue={webp.alphaQuality}
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
          {t('compressOptions.webp.alphaQualityDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.webp.method')}>
        <Form.Item name="method" noStyle>
          <Select defaultValue={webp.method}>
            {[0, 1, 2, 3, 4, 5, 6].map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.webp.methodDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.webp.sharpness')}>
        <Form.Item name="sharpness" noStyle>
          <Slider
            defaultValue={webp.sharpness}
            max={7}
            min={0}
            marks={{
              0: '0',
              1: '1',
              2: '2',
              3: '3',
              4: '4',
              5: '5',
              6: '6',
              7: '7',
            }}
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.webp.sharpnessDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.webp.lossless')}>
        <Form.Item name="lossless" noStyle>
          <Switch
            defaultChecked={webp.lossless}
            checkedChildren={t('common.no')}
            unCheckedChildren={t('common.yes')}
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.webp.losslessDesc')}
        </Paragraph>
      </Form.Item>
    </div>
  );
};

export default Webp;
