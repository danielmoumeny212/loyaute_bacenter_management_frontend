interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "contained" | "medium" | "large";
  color?: "btn--primary" | "btn--danger" | "btn--secondary";
}

const Button = ({
  onClick,
  variant = "contained",
  color = "btn--primary",
  children,
  ...rest
}: ButtonProps) => {
  const buttonClass = `btn ${variant ? `btn--${variant}` : ""} ${color}`;

  return (
    <button className={buttonClass} {...rest}  onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
