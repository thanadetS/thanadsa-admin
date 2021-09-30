import { Col, Divider, Row, Switch } from 'antd';
import styles from './index.less';
import { useEffect, useState } from 'react';
import type { Clock } from './index.interface';
import DeviceCard from './DeviceCard';
import DeviceChart from './DeviceChart';

const DashBoard = () => {
  const [dateTime, setDateTime] = useState<Clock>({
    hours: '',
    minutes: '',
    seconds: '',
  });
  const [isChartTab, setIsChartTab] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours().toString();
      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes().toString();
      const seconds =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds().toString();

      setDateTime({
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onChangeTab = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setIsChartTab(checked);
  };

  return (
    <>
      <div>
        <Row gutter={16}>
          <Col span={20}>
            <Divider orientation="left">Dash Board</Divider>
          </Col>
          <Col span={4}>
            {dateTime.hours && (
              <div className={styles.clock}>
                {dateTime.hours}:{dateTime.minutes}:{dateTime.seconds}
              </div>
            )}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>{isChartTab ? <DeviceChart /> : <DeviceCard />}</Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={24} className={styles.textRight}>
            <Switch defaultChecked={false} onChange={onChangeTab} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashBoard;
