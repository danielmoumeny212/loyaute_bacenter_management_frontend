import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Palette } from "@mui/material";
import Iconify from "../iconify/iconify";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "10px",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));
interface AppWidgetSummaryProps {
  color?: string;
  icon?: string;
  title: string;
  total: string;
  sx?: object;
}

const AppWidgetSummary = ({
  title,
  total,
  icon,
  color = "primary",
  sx,
}: AppWidgetSummaryProps): JSX.Element => {
  let colorKey: keyof Palette;
  
 

  return (
    <Card
     // @ts-ignore
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
     // @ts-ignore
        bgcolor: (theme) => theme.palette[color as keyof Palette].lighter,
        ...sx,
      }}
    >
      {/* Ajoutez ici le contenu du composant */}
      <StyledIcon
        sx={{
          color: (theme) => theme.palette.primary.dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette.primary.dark,
              0
            )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">{total}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
};
export default AppWidgetSummary;
