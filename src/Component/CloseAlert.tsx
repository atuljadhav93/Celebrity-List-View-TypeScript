import React from "react";
import {
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CloseAlertButtons,
  CloseAlertMainTitle,
  DialogOpen,
} from "../Style/StyleIndex";

interface CloseAlertProps {
  id: () => void; 
  mainTitle: string; 
  openCloseDialog: boolean; 
  setOpenCloseDialog: (open: boolean) => void; 
  accept: string; 
  cancel: string; 
}

const CloseAlert: React.FC<CloseAlertProps> = ({
  id,
  mainTitle,
  openCloseDialog,
  setOpenCloseDialog,
  accept,
  cancel,
}) => {
  return (
    <DialogOpen
      open={openCloseDialog}
      data-testid="dialog-reference"
      PaperProps={{
        sx: {
          width: "400px",
          height: "110px",
          padding: 2,
        },
      }}
    >
      <CloseAlertMainTitle
        sx={{ m: 1.5 }}
        id="dialog-title"
        data-testid="mainTitle"
      >
        {mainTitle}
      </CloseAlertMainTitle>
      
      <IconButton
        aria-label="close"
        onClick={() => {
          setOpenCloseDialog(false);
        }}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogActions
        sx={{
          justifyContent: "right",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
        }}
      >
        <CloseAlertButtons
          data-testid="dialog-close-btn"
          id="dialog-close-btn"
          style={{
            background: "#FFFFFF",
            color: "black",
            width: "110px",
            height: "40px",
            border: "1px solid #BABABA",
            boxShadow: "none",
            borderRadius: "12px",
          }}
          variant="contained"
          onClick={() => {
            setOpenCloseDialog(false);
          }}
          autoFocus
        >
          {cancel}
        </CloseAlertButtons>
        <CloseAlertButtons
          data-testid="dialog-accept-btn"
          id="dialog-accept-btn"
          variant="contained"
          style={{
            width: "110px",
            height: "40px",
            boxShadow: "none",
            background: "#ED2939",
            borderRadius: "12px",
          }}
          onClick={() => {
            id();
            setOpenCloseDialog(false);
          }}
        >
          {accept}
        </CloseAlertButtons>
      </DialogActions>
    </DialogOpen>
  );
};

export default CloseAlert;
