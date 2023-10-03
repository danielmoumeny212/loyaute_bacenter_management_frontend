import merge from 'lodash/merge';
import { useTheme, alpha } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

type LabelOptions = {
  show: boolean;
  label: string;
  color: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
};

type ChartOptions = {
  // Define your custom options here
  // For example:
  customOption?: string;
};

export default function useChart(options?: ChartOptions) {
  const theme = useTheme();

  // ... Rest of the code ...

  const baseOptions: any = { // Use "any" here to handle the merge with the custom options
    // ... Rest of the base options ...

    // Legend
    legend: {
      show: true,
      fontSize: String(13),
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: theme.palette.text.primary,
      },
    },

    // plotOptions
    plotOptions: {
      // ... Rest of the plotOptions ...

      // You can define the custom options here, for example:
      // Custom Bar Options
      customBarOptions: {
        borderRadius: 4,
        columnWidth: '28%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },

    // ... Rest of the responsive options ...
  };

  // Merge the base options with the custom options
  return merge(baseOptions, options) as any; // Use "any" here as the return type since the merged type may be complex
}
