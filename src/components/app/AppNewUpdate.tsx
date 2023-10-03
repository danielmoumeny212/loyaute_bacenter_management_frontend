import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
import Scrollbar from '../scrollbar/Scrollbar';
import Iconify from "../iconify/iconify"; 
import { fToNow} from "../../utils/formatTime"

// ----------------------------------------------------------------------

interface News {
  id: string;
  image: string;
  date: string;
  title: string;
  email: string;
}

interface AppNewsUpdateProps {
  title?: string;
  subheader?: string;
  list: News[];
  other?: any;

}

function NewsItem({ news }: { news: News }) {
  const { image, title, email, date} = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {email}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(date)}
      </Typography>
    </Stack>
  );
}

export default function AppNewsUpdate({ title, subheader, list, ...other }: AppNewsUpdateProps) {
  return (
    <Card {...other} >
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar sx={{ height: 400}}>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}  >
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}
