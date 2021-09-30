import { Card, Col, Row } from 'antd';
import styles from './DeviceCard.less';

const DeviceCard = () => {
  return (
    <>
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Temperature & Humidity">
              <Row gutter={16}>
                <Col span={6}>
                  <Card title="Temperature" className={styles.mb5}>
                    <div className={styles.textCenter}>25.0 Celsius</div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Humidity" className={styles.mb5}>
                    <div className={styles.textCenter}>40 %</div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Energy Meter">
              <Row gutter={16}>
                <Col span={6}>
                  <Card title="Active energy" className={styles.mb5}>
                    <div className={styles.textCenter}>381600.44 kWh</div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Reactive energy" className={styles.mb5}>
                    <div className={styles.textCenter}>140507.28 kVAR</div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Current A" className={styles.mb5}>
                    <div className={styles.textCenter}>35.45 A</div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Current A" className={styles.mb5}>
                    <div className={styles.textCenter}>29.63A</div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Current A" className={styles.mb5}>
                    <div className={styles.textCenter}>37.12A</div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DeviceCard;
