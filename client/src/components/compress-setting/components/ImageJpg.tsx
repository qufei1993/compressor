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

const { Paragraph, Link } = Typography;
const { Option } = Select;

const Jpg = () => {
  const { t } = useTranslation();
  const { jpg } = useAppSelector((store) => store.compressOptions);
  const [quality, setQuality] = useState(jpg.quality);

  return (
    <div>
      <Form.Item label={t('compressOptions.jpg.quality')}>
        <Row>
          <Col span={20}>
            <Form.Item name="quality" noStyle>
              <Slider
                min={0}
                max={100}
                defaultValue={quality}
                onChange={(value: number) => setQuality(value)}
                value={quality}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={100}
              style={{ margin: '0 16px' }}
              value={quality}
              onChange={(value: number) => setQuality(value)}
            />
          </Col>
        </Row>
        <Paragraph type="secondary">
          {t('compressOptions.jpg.qualityDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.jpg.progressive')}>
        <Form.Item name="progressive" noStyle>
          <Switch
            defaultChecked={jpg.progressive}
            checkedChildren="开启"
            unCheckedChildren="禁用"
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.jpg.progressiveDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.jpg.targa')}>
        <Form.Item name="targa" noStyle>
          <Switch
            defaultChecked={jpg.targa}
            checkedChildren="开启"
            unCheckedChildren="禁用"
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.jpg.targaDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.jpg.fastCrush')}>
        <Form.Item name="fastCrush" noStyle>
          <Switch
            defaultChecked={jpg.fastCrush}
            checkedChildren="开启"
            unCheckedChildren="禁用"
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.jpg.fastCrushDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.jpg.revert')}>
        <Form.Item name="revert" noStyle>
          <Switch
            defaultChecked={jpg.revert}
            checkedChildren="开启"
            unCheckedChildren="禁用"
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.jpg.revertDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.jpg.fastCrush')}>
        <Form.Item name="fastCrush" noStyle>
          <Switch
            defaultChecked={jpg.fastCrush}
            checkedChildren="开启"
            unCheckedChildren="禁用"
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.jpg.fastCrushDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.jpg.dcScanOpt')}>
        <Form.Item name="dcScanOpt" noStyle>
          <Select defaultValue={jpg.dcScanOpt}>
            {[
              { id: 1, desc: t('compressOptions.jpg.dcScanOptValues.one') },
              { id: 2, desc: t('compressOptions.jpg.dcScanOptValues.two') },
              { id: 3, desc: t('compressOptions.jpg.dcScanOptValues.three') },
            ].map((item) => (
              <Option value={item.id}>{item.desc}</Option>
            ))}
          </Select>
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.jpg.dcScanOptDesc')}
        </Paragraph>
      </Form.Item>

      <Form.Item label={t('compressOptions.jpg.trellis')}>
        <Form.Item name="trellis" noStyle>
          <Switch
            defaultChecked={jpg.trellis}
            checkedChildren="开启"
            unCheckedChildren="禁用"
          />
        </Form.Item>
        <Paragraph type="secondary">
          {t('compressOptions.jpg.trellisDesc')}
          &nbsp;
          <Link href={t('compressOptions.jpg.trellisLink')} target="_blank">
            {t('compressOptions.jpg.trellis')}
          </Link>
        </Paragraph>
      </Form.Item>
    </div>
  );
};

export default Jpg;
