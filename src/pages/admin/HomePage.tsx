import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import AppWidgetSummary from "../../components/app/AppWidgetSummary";
import AppWebsiteVisits from "../../components/app/AppWebsiteVisits";
import AppCurrentVisits from "../../components/app/AppCurrentVisits";
import AppConversionRates from "../../components/app/AppConversionRate";
import AppCurrentSubject from "../../components/app/AppCurrentSubject";
import AppNewsUpdate from "../../components/app/AppNewUpdate";
import AppOrderTimeline from "../../components/app/AppOrderTimeline";
import { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { churchStats, getChurchStats } from "../../features/churchSlice";
import { fullName } from "../../utils/utilsFn";
import { getCurrentUser, loggedUser } from "../../features/userSlice";

const HomePage = () => {
  const theme = useTheme();
  const asyncDispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const user = useSelector(loggedUser);

  const {bacenterLeaderCount, bacentersCount, lastFiveBacenterLeaderAdded,lastFiveBacenterLeaderLoggedIn, bacentersServicesCount, newComerPerBacenter} = useSelector(churchStats);
  const newUpdated =  lastFiveBacenterLeaderAdded.map((source) => ({
    id: fullName(source.email, fullName(source.first_name, source.last_name)),
    image: "https://picsum.photos/200/300",
    email: source.email ,
    title: fullName(source.first_name, source.last_name),
    date: source.date_joined

  }))
  const lastLoggedIn = lastFiveBacenterLeaderLoggedIn.map((source) => ({
    id: fullName(source.email, fullName(source.first_name, source.last_name)),
    image: "https://picsum.photos/200/300",
    email: source.email ,
    title: fullName(source.first_name, source.last_name),
    date: source.last_login
  }))
  const newComers = newComerPerBacenter.map((source) => ({label: source.name, value: source.newcomer_count}))

  
  useEffect(() =>{
    async function fetchChurchStats (){
      await asyncDispatch(getChurchStats())

     }
     fetchChurchStats();

  }, [asyncDispatch])

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back {fullName(user?.first_name!, user?.last_name!)}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bacenter Leaders"
            total={`${bacenterLeaderCount}`}
            icon={"ant-design:android-filled"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bacenters"
            total={`${bacentersCount}`}
            icon={"ant-design:android-filled"}
            color="info" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Services Total Tous les Bacenters"
            total={`${bacentersServicesCount}`}
            icon={"ant-design:android-filled"}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={"714000"}
            icon={"ant-design:android-filled"}
            color="warning" 
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Recent bacenter leader added"
              list={newUpdated}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Last Bacenter's Leader logged "
              list={lastLoggedIn}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

       
       
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Nouveau Venu par Bacenter (mois courant)"
              subheader="(Bacenter) new comer "
              chartData={newComers}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  //@ts-ignore
                  fill: 'solid', 
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  //@ts-ignore
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  //@ts-ignore
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
          

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={lastFiveBacenterLeaderLoggedIn.map((source, index) => ({
                id: fullName(source.last_name, source.last_login),
                title: fullName(source.first_name, source.last_name),
                time: false,
              }))}
            />
          </Grid> */}

      </Grid>
    </Container>
  );
};

export default HomePage;

