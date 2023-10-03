import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import Form, { FormField } from "../../../components/Form";
import { Card, Box } from "@mui/material";
import style from "./Login.module.css";
import authService from "../../../Services/authService";
import { authenticate } from "../../../features/authSlice";
import { getCurrentUser} from "../../../features/userSlice";
import { removeBodyLeftPadding } from "../../../utils/utilsFn";


const formFields: FormField[] = [
  {
    name: "email",
    type: "text",
    placeholder: "youremail@gmail.com",
    className: "box",
  },
  {
    name: "password",
    type: "password",
    placeholder: "your password",
    className: "box",
  },
];

const schema = z.object({
  email: z
    .string()
    .min(5, { message: "email should be at least 8 characters" }),
  password: z
    .string()
    .min(8, { message: "password should be at least 8 characters" }),
});
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const asyncDispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  useEffect(() => {
    removeBodyLeftPadding();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmission = async (fields: FieldValues) => {
    try {
      await authService.login(
        fields as { email: string; password: string }
      );
      const user = authService.getCurrentUser()
      await asyncDispatch(getCurrentUser());
      if(!user?.is_admin){
         authService.logout();
      }
      dispatch(authenticate());
      navigate("/");
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("email", { message: "Invalid email or password" });
      }
    }
  };
  return (
    <div className={`${style.body}`}>
      <Card sx={{padding: 2}}>
        <Form
          formHeading="Connexion au compte"
          className="form"
          formFields={formFields}
          errors={errors}
          withBtn={true}
          btnText="Connexion"
          isValid={isValid}
          register={register}
          onSubmit={handleSubmit(handleFormSubmission)}
        />
        <Box textAlign={'center'}>&copy; Loyauté internationnal</Box>
      </Card>
    </div>
  );
};

export default Login;
