import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogProps,
} from "@mui/material";

interface CsDialogProps extends DialogProps {
  title: string;
  description: string;
  onClose: (open: boolean) => void;
  open: boolean;
}

const CsDialog = ({ title, description, onClose, open }: CsDialogProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(open)} >
          No
        </Button>
        <Button onClick={() => onClose(!open)} autoFocus >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CsDialog;
