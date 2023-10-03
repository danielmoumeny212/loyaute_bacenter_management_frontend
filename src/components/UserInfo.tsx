import { Children } from "react";
import {CardHeader, Avatar, Box , Typography} from "@mui/material"; 
import { red } from '@mui/material/colors';

interface Props {
  fullName: string;
  role: string;
  position?: 'vertical' | 'horizontal'
  img?: string;
  width?: number;
  height? : number;
  children?: React.ReactNode;
}
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string, width: number | undefined, height: number | undefined) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: width,
      height: height

    },
    children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`,
  };
}


export const UserInfo = ({
  fullName,
  role,
  img,
  width,
  height,
  position = "horizontal",
  children,
}: Props) => {
  
  if (position === "vertical") { 
   return (
    <Box component={"div"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
       {
             !img ? <Avatar {...stringAvatar(fullName, width, height)} aria-label="Bacenter Leader" />
             : <Avatar src={img}  aria-label="Bacenter Leader" sx={{width, height}}/>
       }
       <Typography variant="h3">{fullName}</Typography>
       <Typography variant="h6" color={"primary"}>{role}</Typography>
       {children}
    </Box>
   )
  }

    return (
      <CardHeader 
      avatar={
        !img ? <Avatar {...stringAvatar(fullName, width, height)} aria-label="Bacenter Leader" />
         : <Avatar src={img}  aria-label="Bacenter Leader" sx={{width, height}}/>
      }
      title={fullName}
      subheader={role}
     >
     </CardHeader>
    )
  
};
