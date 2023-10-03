import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "../../components/UserInfo";
import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ReactApexChart from "apexcharts";

import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Card, Button, Box, Grid, Stack , Typography,useTheme} from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ChurchIcon from "@mui/icons-material/Church";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SosIcon from "@mui/icons-material/Sos";
import DraftsIcon from "@mui/icons-material/Drafts";
import PeopleIcon from "@mui/icons-material/People";

import Loader from "../../components/Loader";
import CsButton from "../../components/Button";
import Paper from "../../components/Paper";
import SectionDivider from "../../components/SectionDivider";
import StatCounter from "../../components/StatsCounter";
import UserService from "../../Services/userService";
import { Users, updateSelectedUser } from "../../features/userSlice";
import defaultProfile from "../../assets/images/pic-1.jpg";
import {
  Service,
  fetchServices,
  fetchUserStats,
  getServices,
  getUserStats,
  loading,
} from "../../features/serviceSlice";
import { paginateByItem } from "../../utils/paginate";
import Pagination from "../../components/Pagination/Pagination";
import { fullName, handleClose, handleOpen } from "../../utils/utilsFn";
import CsDialog from "../../components/CsDialog";
import SelectField from "../../components/SelectField";
import { pxToRem, remToPx } from "../theme/typography";
import { useChart } from "../../components/chart";
import AppCurrentVisits from "../../components/app/AppCurrentVisits";

// ChartJS.register(ArcElement, Tooltip, Legend);

interface StatCounter {
  count: number;
  icon: JSX.Element;
  text: string;
}

export const ProfilePage = () => {
  const theme = useTheme();
  const { userId } = useParams();
  const asyncDispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const [bacenterIndex, setBacenterIndex] = useState(0);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deactivateDialog, setDeactivateDialog] = useState<boolean>(false);
  const users = useSelector(Users);
  const isLoading = useSelector(loading);
  const userStats = useSelector(getUserStats);
  const services = useSelector(getServices);
  const [currentPage, setCurrentPage] = useState(1);
  const selectedUser = users?.find((user) => user.id === parseInt(userId!));
  const [statsCounter, setStatCounter] = useState<StatCounter[]>();
  const navigate = useNavigate();
  const pageSize = 1;

  const visibleService = paginateByItem<Service>(
    services,
    pageSize,
    currentPage
  );
  const [service, setService] = useState<Service | undefined>(visibleService);

  const handleReset = async (open: boolean) => {
    if (open) {
      handleClose(setOpenModal);
      return;
    }
    handleClose(setOpenModal);
    const userService = new UserService("auth/users/reset_password/");
    const response = await userService.resetPwd(selectedUser?.email!);
    if (response.status !== 204) {
      toast.error("Something went wrong happened, please try again");
    }
    toast.success("Password reset initiated successfully");
  };

  const toArray = (bacenters: any[], props: string) => {
    const array = bacenters.map((bacenter) => bacenter[props]);
    return [...new Set(array)];
  };
  const findBacenterIndex = (bacenter: any[], name: string) => {
    const index = bacenter.findIndex((bacenter) => bacenter.name === name);
    console.log(index);
    return index !== -1 ? index : 0;
  };

  const handleDeactivate = async (open: boolean) => {
    let responseStatus: number;
    const endpoint = selectedUser?.is_active
      ? `auth/users/deactivate/${selectedUser?.id}/`
      : `auth/users/activate/${selectedUser?.id}/`;

    if (open) {
      handleClose(setDeactivateDialog);
      return;
    }

    handleClose(setDeactivateDialog);
    const userService = new UserService(endpoint);
    let successMessage = "";

    if (selectedUser?.is_active) {
      const { data, status } = await userService.deactivateUser();
      responseStatus = status;
      successMessage = "successfully deactivated";
      dispatch(updateSelectedUser(data));
    } else {
      const { data, status } = await userService.activateUser();
      responseStatus = status;
      successMessage = "successfully activated";
      dispatch(updateSelectedUser(data));
    }

    if (responseStatus === 200) {
      toast.success(
        `User ${fullName(
          selectedUser?.first_name!,
          selectedUser?.last_name!
        )} ${successMessage}.`
      );
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchServiceStats = async () => {
      const bacenterId =
        selectedUser?.bacenters.length ?? 0 > 0
          ? selectedUser?.bacenters[bacenterIndex].id
          : null;
      if (bacenterId) {
        await asyncDispatch(fetchServices(`bacenters/${bacenterId}/services`));
        await asyncDispatch(fetchUserStats(bacenterId?.toString()!));
      }
    };

    fetchServiceStats();
  }, [userId, asyncDispatch, bacenterIndex]);

  useEffect(() => {
    if (visibleService) {
      setService(visibleService);
    }
    if (services.length === 0) {
      setService(undefined);
    }
  }, [visibleService, currentPage]);

  useEffect(() => {
    if (userStats) {
      setStatCounter([
        {
          count: userStats.total_services,
          icon: <ChurchIcon sx={{ fontSize: 40 }} color="primary" />,
          text: "Réunions tenues",
        },
        {
          count: userStats.total_new_comer,
          icon: <PersonAddIcon sx={{ fontSize: 40 }} color="primary" />,
          text: "Nouveaux Venus",
        },
        {
          count: userStats.total_new_convert,
          icon: <SosIcon sx={{ fontSize: 40 }} color="primary" />,
          text: "Nouveaux Convertis",
        },
      ]);
    }
  }, [userStats]);

  const handleClick = () => {
    navigate(`/users/update/${userId}`);
  };
  return (
    <Box sx={{ marginBottom: 1 }}>
      <SectionDivider text="Profil utilisateur" />

      <Card>
        <UserInfo
          height={150}
          width={150}
          fullName={fullName(
            selectedUser?.first_name!,
            selectedUser?.last_name!
          )}
          role={selectedUser?.profil?.statut!}
          img={selectedUser?.profil?.image!}
          position="vertical"
        >
          <Box display={"flex"} justifyContent={"center"} gap={1} mt={1}>
            <Button onClick={handleClick} variant="contained" disableElevation>
              mettre a jour
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOpen(setOpenModal)}
              disableElevation
            >
              Reset Password
            </Button>
            <Button
              variant="contained"
              color={selectedUser?.is_active ? "error" : "secondary"}
              onClick={() => handleOpen(setDeactivateDialog)}
              disableElevation
            >
              {selectedUser?.is_active ? "deactivate" : "activate"}
            </Button>
          </Box>
        </UserInfo>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader type="circle" color="#8e44ad" />
          </div>
        ) : (
          <Box display={"flex"} mt={2} gap={1}>
            <Box flex={`1 1 ${pxToRem(15)}`} p={2}>
              <Card elevation={0}>
                <StatCounter
                  count={selectedUser?.bacenters?.length ?? 0}
                  text={"nombre de bacenter"}
                  icon={
                    <Diversity3Icon sx={{ fontSize: 40 }} color="primary" />
                  }
                />
              </Card>
            </Box>
            {userStats &&
              statsCounter &&
              statsCounter.map((stat) => (
                <Box flex={`1 1 ${pxToRem(15)}`} key={stat.text} p={2}>
                  <Card elevation={0}>
                    <StatCounter
                      count={stat.count}
                      icon={stat.icon}
                      text={stat.text}
                    />
                  </Card>
                </Box>
              ))}
          </Box>
        )}
      </Card>
      <CsDialog
        title={` Reset 
        ${fullName(selectedUser?.first_name!, selectedUser?.last_name!)}'s
         password`}
        open={openModal}
        description={
          "Would you like to reset the password for this user? Performing this action will trigger an email to the selected user, allowing them to reset their password."
        }
        onClose={handleReset}
      />
      <CsDialog
        title={` 
        ${selectedUser?.is_active ? "Deactivate" : "activate"} user 
        ${fullName(selectedUser?.first_name!, selectedUser?.last_name!)}`}
        open={deactivateDialog}
        description={
          selectedUser?.is_active
            ? `Would you like to deactivate this user? Performing this action will disable the selected user, and they will no longer be able to access their account`
            : `Would you like to activate this user? Performing this action will enable the selected user, and they will regain access to their account.`
        }
        onClose={handleDeactivate}
      />
      <SectionDivider text="Reunion Tenus" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Card>
            <Box padding={2}>
              <Stack >
                  <Box>
                    <img
                      style={{width: '100%', height: '30rem', objectFit: 'cover'}}
                      src={!service?.photo ? defaultProfile : service.photo}
                      alt={service?.service_name}
                    />
                  </Box>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"} marginTop={1}>
                <StatCounter
                  icon={<PersonAddIcon sx={{ fontSize: 40 }} color="primary" />}
                  count={service?.new_comer!}
                  text="nouveau venu"
                />
                <StatCounter
                  icon={<SosIcon sx={{ fontSize: 40 }} color="primary" />}
                  count={service?.new_convert!}
                  text="nouveau convertis"
                />
                <StatCounter
                  icon={<ChurchIcon sx={{ fontSize: 40 }} color="primary" />}
                  count={service?.offrandes!}
                  text="offrandes"
                />
                <StatCounter
                  icon={<DraftsIcon sx={{ fontSize: 40 }} color="primary" />}
                  count={service?.tithes!}
                  text="dimes"
                />
                <StatCounter
                  icon={<PeopleIcon sx={{ fontSize: 40 }} color="primary" />}
                  count={service?.attendance!}
                  text="attendances"
                />
              </Stack>
            </Box>
          </Card>
          
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {/* <Doughnut data={data} /> */}
          {/* <Chart options={data.options} series={data.series} type="bar" height={350} /> */}
          <Card sx={{marginBottom: 2}}>
          <Box padding={2}>
                  <h3>
                    Enseignant: {service?.predicator}
                  </h3>
                  <h4>
                    Enseignement: {service?.service_name}
                  </h4>
                  <h4>
                    A eu Lieu :{" "}
                    {service?.date &&
                      new Date(service?.date as string).toLocaleDateString()}
                  </h4>
                  <h4>
                    Quartier :{service?.bacenter.quarter}
                  </h4>
                </Box>
                  <Box mb={1}>
                    <Typography>bacenter</Typography>
                    <SelectField
                      className="box"
                      options={toArray(selectedUser?.bacenters!, "name")}
                      placeholder="selectionner le bacenter"
                      onChange={(e) =>
                        setBacenterIndex(
                          findBacenterIndex(
                            selectedUser?.bacenters!,
                            e.target.value!
                          )
                        )
                      }
                    />
                </Box>
           </Card>
           <AppCurrentVisits
            title="Service Chart"
            chartData={[
              {label: "tithes", value: visibleService?.tithes!},
              {label: "attendances", value: visibleService?.attendance!},
              {label: "offrandes", value: visibleService?.offrandes!},
              {label: "new comers", value: visibleService?.new_comer!},
              {label: "new converts", value: visibleService?.new_convert!},

            ]
            }
            chartColors={[
              theme.palette.secondary.main,
              theme.palette.success.main,
              theme.palette.warning.main,
              theme.palette.error.main,
              theme.palette.primary.main
            ]}
           
           />
         
        </Grid>
      </Grid>
      <Pagination
        itemsCount={services.length!}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </Box>
  );
};
