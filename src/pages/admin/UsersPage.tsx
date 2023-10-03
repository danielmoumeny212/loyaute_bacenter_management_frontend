import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import SearchBox from "../../components/SearchBox";
import UserCard from "../../components/UserCard";
import Pagination from "../../components/Pagination/Pagination";
import { paginate } from "../../utils/paginate";
import SectionDivider from "../../components/SectionDivider";
import {
  Users,
  getUsers,
  getStatus,
  loggedUser,
} from "../../features/userSlice";
import { User } from "../../models/user";
import { Stack, Button, Grid } from "@mui/material";

const UserPage = () => {
  const asyncDispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const userLogged = useSelector(loggedUser);
  const users = useSelector(Users)?.filter(
    (user) => user.id !== userLogged?.id
  );
  const usersLoadingStatus = useSelector(getStatus);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("Tout");
  const pageSize = 6;

  useEffect(() => {
    // Vérifier si des utilisateurs sont déjà présents dans le store
    if (users.length === 0) {
      asyncDispatch(getUsers());
    }
  }, [asyncDispatch, users]);

  const allUsers = useMemo(() => {
    let filteredUsers: User[] = [];

    if (users) {
      if (searchValue.trim() === "Tout") {
        filteredUsers = users;
      } else if (searchValue.trim() !== "" && searchType === "texte") {
        filteredUsers = users.filter((user) =>
          [user.first_name, user.last_name, user.email]
            .join(" ")
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      } else if (searchValue.trim() === "") {
        filteredUsers = users;
      } else {
        filteredUsers = users.filter(
          (user) => user?.profil?.statut === searchValue
        );
      }
    }

    return paginate(filteredUsers, currentPage, pageSize);
  }, [users, searchValue, searchType, currentPage, pageSize]);

  const visibleUsers = allUsers as User[];

  const handleSearch = (value: string, type: string) => {
    setSearchValue(value);
    setSearchType(type);
    setCurrentPage(1);
  };

  const handleButtonClick = () => {
    navigate("/users/create");
  };

  if (usersLoadingStatus === "loading") {
    <div>
      <div className="loader"></div>
    </div>;
  }

  return (
    <section>
      <SectionDivider text="Gestion utilisateurs" />
      <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
        <SearchBox
          type="select"
          placeholder="Search By Status"
          options={["Tout", "Berger", "Ms", "Potentiel Berger"]}
          onSearch={(value) => handleSearch(value, "statut")}
        />
        <SearchBox
          type="input"
          placeholder="You can search with followins nom, prénom ou email"
          onSearch={(value) => {
            handleSearch(value, "texte");
          }}
        />
        <Button onClick={handleButtonClick} variant="contained" size="medium">
          New User
        </Button>
      </Stack>
      <Grid
        container
        spacing={1}
        sx={{
          marginTop: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
          gap: "1rem",
        }}
      >
        {visibleUsers.length === 0 && (
          <h1
            style={{
              alignSelf: "center",
              justifySelf: "center",
              fontSize: 10,
            }}
          >
            Aucun Bacenter leader trouvé
          </h1>
        )}
        {visibleUsers.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </Grid>
      {visibleUsers.length > 0 && (
        <Pagination
          itemsCount={users?.length!}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      )}
    </section>
  );
};

export default UserPage;
