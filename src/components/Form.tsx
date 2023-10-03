import { FaCamera } from "react-icons/fa";
import SelectField from "./SelectField";
import { useRef, useId, useState, CSSProperties } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  Button,
  styled,
  Typography,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { pxToRem } from "../pages/theme/typography";

interface BaseField {
  name: string;
  label?: string;
  style?: CSSProperties;
  className?: string;
  hookFormOptions?: {};
}
interface PlaceholderField {
  placeholder?: string;
}

interface TextField extends BaseField, PlaceholderField {
  type: "text" | "password" | "email" | "number";
}

interface SelectFormField extends BaseField, PlaceholderField {
  type: "select";
  options?: string[];
  value?: string;
}
interface AutoCompleteField extends BaseField, PlaceholderField {
  type: "autocomplete";
  options?: string[];
}

interface FileField extends BaseField {
  type: "file";
}

interface CheckboxField extends BaseField {
  type: "checkbox";
}

export type FormField =
  | TextField
  | SelectFormField
  | FileField
  | CheckboxField
  | AutoCompleteField;

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  formHeading?: string;
  formFields: FormField[];
  withBtn?: boolean;
  btnText?: string;
  errors: any;
  register: UseFormRegister<Record<string, any>>;
  isValid?: boolean;
}

const FormTitle = styled(Typography)`
  text-align: center;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 700;
  text-transfomr: "capitalize";
  font-size: ${pxToRem(25)};
`;
const Form = ({
  withBtn,
  btnText,
  formHeading,
  formFields,
  children,
  errors,
  register,
  isValid,
  ...rest
}: FormProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const checkboxId = useId();

  const handleClick = (name: string) => {
    const input = document.getElementById(name) as HTMLInputElement;
    input && input.click();
    // setIsSuccess(!isSuccess);
  };

  const renderFormField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <>
            <TextField
              type={field.type}
              {...register(field.name, { required: true })}
              placeholder={field.placeholder}
              className={field.className}
              // maxLength={50}
              fullWidth
              style={field.style}
            />
          </>
        );
      case "password":
        return (
          <>
            <TextField
              type={isVisible ? "text" : "password"}
              {...register(field.name, { required: true })}
              placeholder={field.placeholder}
              className={field.className}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setIsVisible(!isVisible)}>
                    {!isVisible ? (
                      <VisibilityIcon color="primary" />
                    ) : (
                      <VisibilityOffIcon color="primary" />
                    )}
                  </IconButton>
                ),
              }}
              fullWidth
              style={field.style}
            />
          </>
        );

      case "select":
        return (
          <TextField
        helperText={errors?.message}
        {...register(field.name)}
        fullWidth
        select // Utilisation de la prop select pour indiquer un champ de sélection
      >
        {field.options && field.options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>
        );
      case "checkbox":
        return (
          <FormControlLabel  control={<Checkbox  {...register(field.name, field.hookFormOptions)}/>} label={field.label} />
        );
      case "file":
        return (
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
            variant="contained"
            color="primary"
            onClick={() => handleClick(field.name)}
          > 
            <span>{isSuccess ? "Image Selectionné" : field.label}</span>
            <FaCamera style={{ fontSize: "2rem" }} />
          </Button>
        );
      case "autocomplete":
        return (
          <Autocomplete
            // disablePortal
            id="combo-box-demo"
            className={field.className}
            options={field.options!}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={field.placeholder}
                  {...register(field.name, field.hookFormOptions)}
                />
              );
            }}
          />
        );
    }
  };
  if (withBtn && btnText === undefined)
    throw new Error("Cannot set withBtn if btnText is undefined");

  return (
    <form {...rest} style={{ width: 500, padding: "10px" }}>
      <FormTitle>{formHeading}</FormTitle>
      {formFields.map((field) => (
        <div key={field.name}>
          {!["file", "checkbox"].includes(field.type) && <p>{field.label}</p>}
          {renderFormField(field)}
          {errors[field.name] && (
            <Typography color={"error"}>
              {errors[field.name]?.message as React.ReactNode}
            </Typography>
          )}
        </div>
      ))}
      {withBtn && (
        <Box textAlign="center" marginY={1}>
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid}
            color="primary"
            size="large"
            fullWidth
          >
            {btnText ? btnText : "Submit"}
          </Button>
        </Box>
      )}
    </form>
  );
};

export default Form;
