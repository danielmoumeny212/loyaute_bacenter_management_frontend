import { Box, Typography, } from "@mui/material";

interface StatCounterProps {
  count: number;
  text: string; 
  icon: JSX.Element;
}
function StatCounter({ count, text , icon}: StatCounterProps) {
  return (
    
   
    <Box display={"flex"} alignItems={"center"} gap={2} flexDirection={"column"} pt={2} >
      {/* <i className={"fas "+iconClass}></i> */}
      <Box textAlign={"center"}>
      {icon}
      <Typography variant="body1">{count}</Typography>
      </Box>
      <p>{text}</p>
      
    </Box>
  );
}

export default StatCounter;
