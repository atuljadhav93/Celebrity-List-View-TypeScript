import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import data from "../JSONData/celebrities.json";
import {
  GreyTypography,
  DisplayFlex,
  DisplayFlexCenter,
  DisplayFlexStartBox,
  DisplayJustifyFlexEnd,
  DisplayFlexJustifyFlexEnd,
} from "../Style/StyleIndex";
import CloseAlert from "../Component/CloseAlert";
import CloseButtonDialog from "../Icons/CloseButtonIcon";
import DeleteButton from "../Icons/DeleteButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const genderOptions = [
  "Male",
  "Female",
  "Transgender",
  "Rather not say",
  "Other",
];

interface Celebrity {
  id: number;
  name: string;
  first: string;
  last: string;
  gender: string;
  dob: string;
  age?: number;
  country: string;
  picture: string;
  description: string;
}

const CelebritiesListView: React.FC = () => {
  const nameValidationRegex = /^[a-zA-Z\s]*$/;
  const ageValidationRegex = /^\d*$/;
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [filteredCelebrities, setFilteredCelebrities] = useState<Celebrity[]>(
    []
  );
  const [expanded, setExpanded] = useState<number | false>(false);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<Celebrity> | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const normalizedData = data.map((item: any) => ({
      ...item,
      name: `${item.first} ${item.last}`,
      gender: item.gender.charAt(0).toUpperCase() + item.gender.slice(1),
    }));
    setCelebrities(normalizedData);
    setFilteredCelebrities(normalizedData);
  }, []);

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleAccordionToggle = (id: number) => {
    if (editMode) return;
    setExpanded(expanded === id ? false : id);
  };

  const handleEdit = (id: number) => {
    setEditMode(id);
    const celebrity = celebrities.find((c) => c.id === id);
    if (celebrity) setEditedData(celebrity);
  };

  const handleDelete = () => {
    setDeleteDialog(true);
  };

  const handleInputChange = (
    field: keyof Celebrity,
    value: string | number
  ) => {
    setEditedData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    if (!editedData || !editMode) return;
    setCelebrities((prev) =>
      prev.map((c) => (c.id === editMode ? { ...c, ...editedData } : c))
    );
    setFilteredCelebrities((prev) =>
      prev.map((c) => (c.id === editMode ? { ...c, ...editedData } : c))
    );
    setEditMode(null);
    setEditedData(null);
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedData(null);
  };

  const hasChanges = (): boolean => {
    const original = celebrities.find((c) => c.id === editMode);
    const isCountryValid = editedData?.country?.trim() !== "";
    const isDataModified =
      JSON.stringify(original) !== JSON.stringify(editedData);
    return !!(isCountryValid && isDataModified);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
    const filtered = celebrities.filter((c) =>
      c.name.toLowerCase().includes(search)
    );

    setFilteredCelebrities(filtered.length > 0 ? filtered : []);
  };

  const deleteCelebritiesDone = () => {
    if (selectedId !== null) {
      const updatedCelebrities = celebrities.filter((c) => c.id !== selectedId);
      setCelebrities(updatedCelebrities);
      setFilteredCelebrities(updatedCelebrities);
      setSelectedId(null);

      setSearchTerm("");
    }
  };

  const handleModalClose = () => {
    setDeleteDialog(false);
  };

  return (
    <>
      <Box p={8}>
        <TextField
          fullWidth
          placeholder="Search User"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              marginBottom: "8px",
              height: "40px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {filteredCelebrities.length === 0 ? (
          <Typography variant="h6" color="textSecondary" align="center">
            No results found
          </Typography>
        ) : (
          filteredCelebrities.map((celebrity) => (
            <Accordion
              key={celebrity.id}
              expanded={expanded === celebrity.id}
              onChange={() => handleAccordionToggle(celebrity.id)}
              sx={{
                backgroundColor: "#ffffff",
                marginBottom: "16px",
                borderRadius: "12px",
                boxShadow: "none",
                "&:before": {
                  display: "none",
                },
                "&:last-of-type": {
                  marginBottom: 0,
                  borderRadius: "12px",
                },
                "& .MuiAccordionSummary-root": {
                  minHeight: "70px",
                  alignItems: "center",
                },
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
              }}
              variant="outlined"
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <DisplayFlexCenter
                  style={{
                    columnGap: "4px",
                  }}
                >
                  <img
                    src={celebrity?.picture || "default-picture-url.jpg"}
                    alt="Profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  {editMode === celebrity.id ? (
                    <TextField
                      value={editedData?.name || ""}
                      fullWidth
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (nameValidationRegex.test(inputValue)) {
                          handleInputChange("name", inputValue);
                        }
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          height: "34px",
                        },
                      }}
                    />
                  ) : (
                    <Typography>{celebrity.name}</Typography>
                  )}
                </DisplayFlexCenter>
              </AccordionSummary>
              <AccordionDetails>
                {editMode === celebrity.id ? (
                  <Box>
                    <Box>
                      <DisplayFlex
                        style={{
                          columnGap: "14px",
                          marginBottom: "8px",
                        }}
                      >
                        <DisplayFlexStartBox>
                          <GreyTypography>Age </GreyTypography>

                          <TextField
                            value={
                              editedData &&
                              "age" in editedData &&
                              editedData.age !== undefined
                                ? `${editedData.age} Years`
                                : `${calculateAge(celebrity.dob)} Years`
                            }
                            fullWidth
                            onChange={(e) => {
                              const inputValue = e.target.value.replace(
                                " Years",
                                ""
                              );
                              if (ageValidationRegex.test(inputValue)) {
                                handleInputChange(
                                  "age",
                                  inputValue ? parseInt(inputValue, 10) : 0
                                );
                              }
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                marginBottom: "8px",
                                height: "40px",
                              },
                            }}
                          />
                        </DisplayFlexStartBox>
                        <DisplayFlexStartBox>
                          <GreyTypography>Gender </GreyTypography>
                          <TextField
                            select
                            value={editedData?.gender || ""}
                            fullWidth
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                marginBottom: "8px",
                                height: "40px",
                              },
                            }}
                          >
                            {genderOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </DisplayFlexStartBox>
                        <DisplayFlexStartBox>
                          <GreyTypography>Country </GreyTypography>
                          <TextField
                            value={editedData?.country || ""}
                            fullWidth
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (nameValidationRegex.test(inputValue)) {
                                handleInputChange("country", inputValue);
                              }
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                marginBottom: "8px",
                                height: "40px",
                              },
                            }}
                          />
                        </DisplayFlexStartBox>
                      </DisplayFlex>
                      <Box>
                        <DisplayFlexStartBox>
                          <GreyTypography>Description </GreyTypography>
                          <TextField
                            value={editedData?.description || ""}
                            multiline
                            rows={4}
                            fullWidth
                            onChange={(e) =>
                              handleInputChange("description", e.target.value)
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                marginBottom: "8px",
                              },
                            }}
                            variant="outlined"
                          />
                        </DisplayFlexStartBox>
                      </Box>
                    </Box>

                    <DisplayJustifyFlexEnd gap={2}>
                      <IconButton sx={{ cursor: "pointer" }}>
                        <HighlightOffIcon
                          style={{
                            width: "25px",
                            height: "25px",
                            color: "#ff0000",
                          }}
                          onClick={handleCancel}
                        />
                      </IconButton>

                      <IconButton
                        sx={{
                          cursor: !hasChanges() ? "not-allowed" : "pointer",
                        }}
                        disabled={!hasChanges()}
                        onClick={hasChanges() ? handleSave : undefined}
                      >
                        <CloseButtonDialog
                          width="21px"
                          height="21px"
                          fill={!hasChanges() ? "#808080" : "#008000"}
                        />
                      </IconButton>
                    </DisplayJustifyFlexEnd>
                  </Box>
                ) : (
                  <Box>
                    <Box>
                      <DisplayFlex
                        style={{
                          columnGap: "14px",
                          marginBottom: "8px",
                        }}
                      >
                        <DisplayFlexStartBox>
                          <GreyTypography>Age </GreyTypography>
                          <Typography>
                            {calculateAge(celebrity.dob)} Years
                          </Typography>
                        </DisplayFlexStartBox>
                        <DisplayFlexStartBox>
                          <GreyTypography>Gender </GreyTypography>
                          <Typography>{celebrity.gender}</Typography>
                        </DisplayFlexStartBox>
                        <DisplayFlexStartBox>
                          <GreyTypography>Country </GreyTypography>
                          <Typography>{celebrity.country}</Typography>
                        </DisplayFlexStartBox>
                      </DisplayFlex>
                      <Box>
                        <DisplayFlexStartBox>
                          <GreyTypography>Description </GreyTypography>
                          <Typography textAlign="left">
                            {celebrity.description}
                          </Typography>
                        </DisplayFlexStartBox>
                      </Box>
                    </Box>

                    <DisplayFlexJustifyFlexEnd mt={2} gap={2}>
                      <IconButton
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDelete();
                          setSelectedId(celebrity.id);
                        }}
                      >
                        <DeleteButton width="21px" height="21px" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(celebrity.id)}
                        disabled={calculateAge(celebrity.dob) < 18}
                        sx={{ cursor: "pointer" }}
                      >
                        <EditIcon
                          sx={{
                            color:
                              calculateAge(celebrity.dob) < 18
                                ? "#808080"
                                : "#1E90FF",
                          }}
                        />
                      </IconButton>
                    </DisplayFlexJustifyFlexEnd>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>

      <CloseAlert
        id={deleteCelebritiesDone}
        openCloseDialog={deleteDialog}
        setOpenCloseDialog={handleModalClose}
        accept={`Delete`}
        cancel={`Cancel`}
        mainTitle={`Are you sure you want to delete?`}
      />
    </>
  );
};

export default CelebritiesListView;
