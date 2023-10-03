import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import Form, { FormField } from "../../components/Form";

const schema = z.object({
  leader: z
    .string({
      invalid_type_error: "ce  champ ne peux contenir que des caractères ",
    })
    .min(5, { message: "Champ obligatoire" }),
  quarter: z
    .string({
      invalid_type_error: "ce champ ne peux contenir que des caractères",
    })
    .min(5, { message: "La Description est un champ obligatoire" }),
  name: z.string().min(3, { message: "Ce champ est obligatoire" }),
});
const formFields: FormField[] = [
  {
    name: "name",
    label: "Nom du centre",
    type: "text",
    className: 'box'
  },
  {
    name: "quarter",
    label: "Quartier",
    type: "text",
    className: 'box'
  },

  {
    name: "leader",
    label: "choisir le leader de centre",
    type: "select",
    className: 'box',
    options: ["daniel", "patrick", "heritier", "manasse"],
  },
];

const AddBacenterPage = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <section className="form-container">
      <Form
        className="form"
        formHeading="Creer un nouveau centre "
        formFields={formFields}
        withBtn={true}
        errors={errors}
        isValid={isValid}
        btnText="Ajouter"
        register={register}
        onSubmit={handleSubmit(onSubmit)}
      />
    </section>
  );
};

export default AddBacenterPage;
