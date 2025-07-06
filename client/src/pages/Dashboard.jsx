import { Paper } from '@mui/material';
import RecentUpdates from '../components/RecentUpdates';
import MySwiper from '../components/swiper/MySwiper';

export default function Dashboard() {
  return (
    <>
      <Paper sx={{ p: 2 , mt: 10,}}>
      <MySwiper />
      </Paper>
      <RecentUpdates />
    </>
  );
}
