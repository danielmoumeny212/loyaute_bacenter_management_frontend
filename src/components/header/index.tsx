import { CSSProperties, FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography , useTheme} from '@mui/material';
import { Theme } from '@mui/material/styles';
import AccountPopover from './AccountPopover';
import { bgBlur } from '../../utils/cssStyles';
import Iconify from '../iconify/iconify';
import { getChurchInfo } from "../../utils/utilsFn"; 

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  ...(bgBlur({ color: theme.palette.background.default }) as CSSProperties),
  boxShadow: 'none',

  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));


const StyledToolbar = styled(Toolbar)(({ theme }: { theme: Theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

type HeaderProps = {
  onOpenNav?: () => void;
};

const Header: FC<HeaderProps> = ({ onOpenNav }) => {
  const { name: churchName } = getChurchInfo();
  const theme = useTheme()

  return (
    <StyledRoot>
      <StyledToolbar>


        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Typography color={"primary"}  fontSize={20}>{churchName}</Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
     </StyledRoot>
  );
};



export default Header;
