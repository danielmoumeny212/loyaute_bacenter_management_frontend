import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch, unwrapResult } from "@reduxjs/toolkit";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog , Stack, Button} from "@mui/material";
import _ from "lodash";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import Button from "../../components/Button";
import CsDialog from "../../components/CsDialog";
import SectionDivider from "../../components/SectionDivider";
import {
  addBacenter,
  allBacenters,
  bacenterLoadingState,
  getBacenters,
  updateBacenter,
} from "../../features/bacenterSlice";

import { Box, IconButton } from "@mui/material";
import Form, { FormField } from "../../components/Form";
import { fullName, getChurchInfo, handleClose, handleOpen } from "../../utils/utilsFn";
import { Users, getUsers } from "../../features/userSlice";
import { toast } from "react-toastify";
import { Bacenter, isBacenter } from "../../models/bacenter";

const schema = z.object({
  bacenter_leader: z
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
    label: "Bacenter's Name",
    type: "text",
    className: "box",
  },
  {
    name: "quarter",
    label: "Quarter",
    type: "text",
    className: "box",
  },

  {
    name: "bacenter_leader",
    label: "Bacenter Leader",
    type: "autocomplete",
    className: "white-box",
    options: [],
  },
];
 


const getRowId = (row: any) => row.id;

const BacenterPage = () => {
  const asyncDispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const bacenters = useSelector(allBacenters);
  const users = useSelector(Users);
  const [formHeading, setFormHeading] = useState<"Creer un nouveau centre" | 'Modifier le centre'>('Creer un nouveau centre')
  const [btnFormText, setBtnFormText] = useState<'Ajouter' | 'Modifier'>("Ajouter");
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBacenter, setSelectedBacenter] = useState<Bacenter | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue, 
    trigger,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  
 


  const handleDelete = async () => {
   const  {id, name, quarter,  bacenter_leader: {id: bacenter_leader}} = selectedBacenter!; 
    
   const result =  await asyncDispatch(updateBacenter({id, name,quarter, bacenter_leader, deleted: true }))
   const bacenter = unwrapResult(result);
   if(!isBacenter(bacenter)) {
    return toast.error('Something went wrong while deleting the selected Bacenter'); 
   }
    toast.success('Bacenter deleted successfully')

     
  }

  const handleDialogState = async (open: boolean) => {
     if (open){
      handleClose(setIsDialogOpen);
      return;
     }
    handleClose(setIsDialogOpen);
    await handleDelete()
  }

 const populate = (data: Bacenter) => {
  for (const [key, value] of Object.entries(data)){
      if (key === 'deleted') continue;
      if (key === 'bacenter_leader'){
         setValue(key, `${fullName(data.bacenter_leader.first_name, data.bacenter_leader.last_name)}`);
         trigger(key); 
         continue; 
      }
      setValue(key, value, {shouldValidate: true});
      trigger(key)
      
  }
 }
  
  



  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 ,},
    { field: "name", headerName: "Name", flex: 1 },
    { field: "quarter", headerName: "Quarter", flex: 1 },
    {
      field: "bacenter leader",
      headerName: "Bacenter Leader",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `
      ${params.row.bacenter_leader.first_name || ""} ${
        params.row.bacenter_leader.last_name || ""
      }
     `,
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <>
        <IconButton onClick={() => {
          setSelectedBacenter(params.row as Bacenter)
           handleOpen(setOpen)
           populate(params.row as Bacenter)
           setFormHeading('Modifier le centre')
           setBtnFormText('Modifier')

        }} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => {
          setSelectedBacenter(params.row as Bacenter)
          handleOpen(setIsDialogOpen)
        }}>
          <DeleteIcon  color="error"/>
        </IconButton>
        </>
      ),
    },
   
  ];



















  const onSubmit = async (data: FieldValues) => {
    // const selectedUser = users.find(user => fullName(user.first_name, user.last_name) === data.bacenter_leader)
    
    

    users.filter((user) => {
      if (fullName(user.first_name, user.last_name).trim() === data.bacenter_leader.toString().trim()) {
        _.set(data, "bacenter_leader", user.id);
        _.set(data, 'deleted',  false);
      }
    });

    if(btnFormText === "Modifier" && formHeading  === "Modifier le centre"){
       const { name , bacenter_leader, quarter, church} = data; 
        const result  =  await asyncDispatch(updateBacenter({ ...(selectedBacenter as Bacenter), name , bacenter_leader, quarter}))
        const bacenter = unwrapResult(result);
        handleClose(setIsDialogOpen)
        isBacenter(bacenter) ?   
        toast.success("Bacenter has been  successfully updated") : 
        toast.error("Something went wrong");
        return
  
    } 
    const {id: church_id} = getChurchInfo();
        _.set(data, "church", church_id);
    const result = await asyncDispatch(addBacenter(data as { name: string; bacenter_leader: number; quarter: string; church: string}));
    const bacenter = unwrapResult(result);
    handleClose(setIsDialogOpen)
    isBacenter(bacenter) ?   
    toast.success("Bacenter has been added successfully") : 
    toast.error("Something went wrong");


  };


  const loadingState = useSelector(bacenterLoadingState);
  

  useEffect(() => {
    asyncDispatch(getBacenters());
    asyncDispatch(getUsers());
  }, []);

  const handleButtonClick = () => {
    setFormHeading('Creer un nouveau centre')
    setBtnFormText('Ajouter')
    handleOpen(setOpen);
    reset();
  };
  
 // @ts-ignore
  formFields[2].options = users.map(
    (user) => `${fullName(user.first_name, user.last_name)}`
  );


  return (
    <>
      <section>
        <SectionDivider text="Gestion des centres" />
        <Box textAlign={'right'} marginBottom={1}>
            <Button onClick={handleButtonClick} color="primary" variant="contained" sx={{alignSelf: "flex-start"}} startIcon={<AddIcon />}>Nouveau</Button>
        </Box>
        <Box
          sx={{
            // height: 550,
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          <DataGrid
            getRowId={getRowId}
            loading={loadingState}
            rows={bacenters}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            pageSizeOptions={[20]}
            disableRowSelectionOnClick
          />
        </Box>
      </section>

      <Dialog onClose={() => handleClose(setOpen)} open={open} >
        <Form
          className="form"
          formHeading={formHeading}
          formFields={formFields}
          withBtn={true}
          errors={errors}
          isValid={isValid}
          btnText={btnFormText}
          register={register}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Dialog>
      <CsDialog  onClose={handleDialogState} open={isDialogOpen} title={"Remove a bacenter"} 
       description={`
         Would you like to remove ${fullName(selectedBacenter?.bacenter_leader.first_name! , selectedBacenter?.bacenter_leader.last_name!)}'s bacenter which it's called ${selectedBacenter?.name} ? 
         Noticed : this action can't be undone.
       `}
      />
        
      
    </>
  );
};

export default BacenterPage;
