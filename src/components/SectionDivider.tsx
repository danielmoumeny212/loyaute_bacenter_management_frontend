import  {Divider} from "@mui/material"; 
interface Props {
  text: string;
  color?: string;
  borderColor?: string;
}
const SectionDivider = ({ text, color, borderColor }: Props) => {
  return <>
  <h1  style={{color, borderColor, fontSize: 25}}>{text}</h1>
   <Divider  sx={{marginBottom: 1, color, borderColor}}/>
  
  </>
};

export default SectionDivider;
