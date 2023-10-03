// @ts-nocheck
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { useChart } from '../chart';

interface AppWebsiteVisitsProps {
  title: string;
  subheader: string;
  chartLabels: string[];
  chartData: ApexAxisChartSeries[];
  // Autres props optionnelles
}

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,
  ...other
}: AppWebsiteVisitsProps) {
  const chartOptions: ChartOptions = useChart({
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  chartOptions.plotOptions = {
    ...chartOptions.plotOptions,
    bar: {
      columnWidth: '16%',
    },
    fill: {
      type: chartData.map((i) => i.fill) as ApexFill[],
    },
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
