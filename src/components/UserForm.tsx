import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import data from "./userMocks";
import Form, { FormField } from "./Form";
import SectionDivider from "./SectionDivider";
import Button from "./Button";

interface User {
  id: number;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  status: string;
  is_staff: boolean;
}

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
  status: z.string().min(3, { message: "Ce champ est obligatoire" }),
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
    name: "status",
    label: "Status",
    type: "select",
    className: "box",
    placeholder: "selectionner le titre",
    options: ["Berger", "Berger", "Potentiel Berger", "Ms"],
  },
  {
    name: "is_staff",
    label: "Administrateur",
    type: "checkbox",
    className: "box",
  },
 
];

interface UserFormProps {
  onSubmit: (data: FieldValues) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [user, setUser] = useState<User | null>(null);

  const { userId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger, 
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // useEffect(() => {
  //   if (userId) {
  //     const currentUser = data.find((user) => user.id === +userId);
  //     if (currentUser) {
  //       setUser({
  //         email: currentUser.email,
  //         password: "sdmqlfjdms qf",
  //         lastName: currentUser.first_name,
  //         id: currentUser.id,
  //         firstName: currentUser.first_name,
  //         status: currentUser.profil.statut,
  //         is_staff: currentUser.is_staff,
  //       });
  //       if (user !== null) {
  //         Object.entries(user).forEach(([key, value]) => {
  //           console.log(`Clé : ${key}, Valeur : ${value}`);
  //           if (key !== 'id')
  //               setValue(key, value);
  //           trigger();
  //         });
  //         // trigger(); 
          
  //       }
  //     }
  //   }
  // }, [userId, setValue]);

  const handleSubmission = (data: FieldValues) => {
    console.log(data);
    reset();
  };

  return (
    <section style={{ backgroundColor: "white", marginTop: "1rem" }}>
      <SectionDivider
        text={user ? "Modifier l'utilisateur" : "Creer un Utilisateur"}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "1rem",
        }}
      >
        <Form
          className="form bg-transparent"
          formFields={formFields}
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
        />
        <Form
          className="form bg-transparent"
          formFields={formFields2}
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
        />
        <Button
          variant="large"
          disabled={!isValid}
          type="submit"
          onClick={handleSubmit(handleSubmission)}
        >
          Soumettre
        </Button>
      </div>
    </section>
  );
};

export default UserForm;
