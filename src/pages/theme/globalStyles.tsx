import { GlobalStyles as MUIGlobalStyles, useTheme } from '@mui/material';


export default function GlobalStyles() {
  const theme = useTheme()
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
          fontFamily: 'Roboto'
        },
        html: {
          margin: 0,
          fontSize: "16px",
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        '::selection': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
        '::-webkit-scrollbar': {
          height: '.2rem',
          width: '.3rem',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main,
        },
        
      }}
    />
  );

  return inputGlobalStyles;
}
