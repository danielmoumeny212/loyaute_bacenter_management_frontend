import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader } from '@mui/material';
import { useChart } from '../chart';
import { fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

interface AppConversionRatesProps {
  title?: string;
  subheader?: string;
  chartData: { label: string; value: number }[];
}

export default function AppConversionRates({
  title,
  subheader,
  chartData,
  ...other
}: AppConversionRatesProps) {
  const chartLabels = chartData.map((i) => i.label);
  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    // @ts-ignore
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName:any) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
