import { Box, styled, Button, Typography, Dialog } from "@mui/material";

export const DialogOpen = styled(Dialog)`
  & .MuiPaper-root.MuiPaper-elevation {
    overflow: visible;
  }
`;

export const GreyTypography = styled(Typography)(() => ({
  color: "#808080",
}));

export const CloseAlertButtons = styled(Button)(() => ({
  letterSpacing: "0px",
  color: "#FFFFFF",
  fontSize: "14px",
}));

export const CloseAlertMainTitle = styled(Typography)(() => ({
  textAlign: "left",
  letterspacing: "0px",
  opacity: 1,
  fontSize: "16px",
}));

export const DisplayFlex = styled(Box)(() => ({
  display: "flex",
}));

export const DisplayFlexCenter = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const DisplayFlexColumn = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const DisplayFlexStartBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
}));

export const DisplayFlexGridColumn = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const DisplayJustifyFlexEnd = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

export const DisplayFlexJustifyFlexEnd = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}));
