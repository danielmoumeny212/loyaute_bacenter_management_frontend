import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';

interface IconifyProps extends Omit<BoxProps, 'icon'> {
  icon: string | React.ReactNode;
  width?: number | string;
}

const Iconify: ForwardRefRenderFunction<HTMLDivElement, IconifyProps> = (
  { icon, width = 20, sx, ...other },
  ref
) => (
  <Box
    ref={ref}
    component={Icon}
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
);

export default forwardRef(Iconify);
