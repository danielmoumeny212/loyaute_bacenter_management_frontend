import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { addUser, Users, updateSelectedUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Form, { FormField } from "../../components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionDivider from "../../components/SectionDivider";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { set } from "lodash";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../Services/userService";
import { User } from "../../models/user";
import { getChurchInfo } from "../../utils/utilsFn";
import { Box , Button} from "@mui/material";

const fileSchema = z.object({
  0: z.object({
    name: z.string(),
    size: z
      .number()
      .max(5242880, "Le fichier doit être inférieur à 5 Mo")
      .min(1, "Le fichier est requis"),
    type: z.string(),
    lastModified: z.number(),
    lastModifiedDate: z.date(),
    webkitRelativePath: z.string().optional(),
  }),
});

const schema = z.object({
  password: z.string().min(5, { message: "Champ obligatoire" }),
  email: z
    .string()
    .min(5, { message: "La Description est un champ obligatoire" }),
  last_name: z.string().min(3, { message: "Ce champ est obligatoire" }),
  first_name: z.string().min(3, { message: "Ce champ est obligatoire" }),
  statut: z.string().min(2, { message: "Ce champ est obligatoire" }),
  is_staff: z.boolean({ invalid_type_error: "cocher ou decocher ce champ" }),
});
const schema2 = z.object({
  email: z
    .string()
    .min(8, { message: "Email Should be a least 5 charactères" }),
  last_name: z
    .string()
    .min(3, { message: "Last Name should be a least 3 charactères" }),
  first_name: z.string().min(3, { message: "Ce champ est obligatoire" }),
  statut: z.string().min(2, { message: "Ce champ est obligatoire" }),
  is_staff: z.boolean({ invalid_type_error: "cocher ou decocher ce champ" }),
});

const formFields: FormField[] = [
  {
    name: "last_name",
    label: "Nom",
    type: "text",
    className: "box",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    className: "box",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    className: "box",
  },
];

const formFields2: FormField[] = [
  {
    name: "first_name",
    label: "Prenom",
    type: "text",
    className: "box",
  },
  {
    name: "statut",
    label: "Status",
    type: "select",
    className: "box",
    placeholder: "selectionner le titre",
    options: ["Berger", "Pasteur", "Potentiel Berger", "Ms"],
    
    
  },
  {
    name: "is_staff",
    label: "Administrateur",
    type: "checkbox",
    className: "box",
  },
];
const CreateUserPage = () => {
  const asyncDispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const navigate = useNavigate();
  const users = useSelector(Users);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const selectedUser = users?.find((user) => user.id === parseInt(userId!));
  const textAction = userId ? "Modify" : "Add";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(userId ? schema2 : schema),
  });

  useEffect(() => {
    if (userId && users.length > 0) {
      const index = users.findIndex((u) => u.id === +userId);
      if (selectedUser) {
        for (const [key, value] of Object.entries(selectedUser)) {
          if (key === "profil") {
            setValue("statut", selectedUser.profil?.statut);
            continue;
          }
          setValue(key, value, { shouldValidate: true });
          trigger(key);
        }
      }
    }
  }, [userId]);

  const handleSubmission = async (data: FieldValues) => {
    const {id: church_id} = getChurchInfo();
    set(data, "church", church_id);
    if (!userId) {
      asyncDispatch(addUser(data as User))
        .then(() => {
          navigate("/users");
          toast.success("User created successfully");
        })
        .catch((error) => {
          toast.error(
            "Something wrong happened, please try again",
            error.message
          );
        });
      return;
    }
    const userService = new UserService(
      `auth/users/update/${selectedUser?.id}/`
    );
    const { data: datas, status } = await userService.updateUser(data);
    const user = {
      ...datas,
      id: selectedUser?.id!,
      is_active: selectedUser?.is_active,
    };
    dispatch(updateSelectedUser(user));
    toast.success("User updated successfully");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section style={{ backgroundColor: "white", marginTop: "1rem" }}>
      <SectionDivider text={textAction + " User"} />
      <Box display={"flex"} flexWrap={"wrap"} padding={1}
      >
        <Form
          formFields={
            userId
              ? formFields.filter((field) => field.name !== "password")
              : formFields
          }
          register={register}
          errors={errors}
          onSubmit={handleSubmit(handleSubmission)}
        />
        <Form
          formFields={formFields2}
          register={register}
          errors={errors}
          onSubmit={handleSubmit(handleSubmission)}
        />
      </Box>
      <>
      <Button
          variant="contained"
          disabled={!isValid}
          type="submit"
          onClick={handleSubmit(handleSubmission)}
          fullWidth
        >
          {textAction}
        </Button>
        <Button variant="contained" color="error" onClick={() => goBack()} fullWidth sx={{marginY: 1}}>
          Cancel
        </Button>
      </>
    </section>
  );
};

export default CreateUserPage;
