import { Link } from "react-router-dom";
import { UserInfo } from "./UserInfo";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { Card, CardContent, CardActions, Button, Typography} from "@mui/material"; 

interface Props {
  user: User; 
  
}
const UserCard = ({ user }: Props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <Card >
        <UserInfo
          fullName={[user.first_name, user.last_name].join(" ").toString()}
          img={user.profil?.image!}
          role={user.profil?.statut!}
          width={60}
          height={60}
        />
      <CardContent>
        <h4 className="card-title">{user.church.name}</h4>
        <Typography  variant="h6" component="div">
          Email:{" "}
          <strong>
            {user.email ? (
              <Link to={"mailto:" + user.email}>{user.email}</Link>
            ) : (
              <i className={"fas fa-times"} style={{ color: "red" }}></i>
            )}
          </strong>
        </Typography>
        <Typography>
          Admin:{" "}
          <small style={{ color: user.is_staff ? "green" : "red" }}>
            <i className={user.is_staff ? "fas fa-check" : "fas fa-times"}></i>
          </small>
        </Typography>
        <p>
          Vue:{" "}
          {user.last_login ? (
            new Date(user.last_login).toLocaleDateString()
          ) : (
            <strong>never</strong>
          )}
        </p>
      </CardContent>
        <Button variant="contained" color="error" onClick={handleClick} fullWidth>
          See More 
        </Button>
    </Card>
  );
};

export default UserCard;
