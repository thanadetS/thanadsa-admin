import { Card, Col, Row } from 'antd';
import styles from './DeviceCard.less';
import { Line } from 'react-chartjs-2';

const DeviceChart = () => {
  const temperatureData = {
    labels: ['07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: 'Celsius',
        data: [25, 30, 27, 32, 23, 28],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const humidityData = {
    labels: ['07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: 'Percent',
        data: [44, 48, 57, 34, 63, 51],
        fill: false,
        backgroundColor: 'rgb(10, 33, 10)',
        borderColor: 'rgba(10, 33, 10, 0.2)',
      },
    ],
  };

  const options: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Temperature & Humidity">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Temperature" className={styles.mb5}>
                    <Line data={temperatureData} options={options} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Humidity" className={styles.mb5}>
                    <Line data={humidityData} options={options} />
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

export default DeviceChart;
