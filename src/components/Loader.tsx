interface LoaderProps {
  type: "circle" | "pulse";
  color?: string;
}
const Loader = ({ type, color = "black" }: LoaderProps) => {
  if(type === "pulse" && color !== "black") throw new Error('color is not supporter for loading pulse')

  switch(type){
    case 'circle':
      return (
        <div
          className="loader-circle"
          style={{ borderColor: color, borderTop: color }}
        ></div>
      )
    case 'pulse': 
      return <div className="dot-pulse"></div>
    default: 
    return <div>Loader</div>
  }
  
};

export default Loader;
