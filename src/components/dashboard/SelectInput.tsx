import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { PracticeState } from "../../pages/practice/PracticeLogic";
import { practiceContent } from "../../utils/data";

const SelectInput = () => {
  const [select, setSelect] = React.useState("");

  const context = useContext(PracticeState);

  if (!context) {
    throw new Error("SearchInput must be used within a PracticeState.Provider");
  }

  const { setTypingContent } = context;

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  useEffect(() => {
    setTypingContent(select);
  }, [select]);

  return (
    <div>
      <FormControl
        sx={{
          backgroundColor: "#1f2023",
          width: 400,
          "& .MuiSelect-icon": {
            color: "white",
          },
        }}
      >
        <InputLabel id="select-content-label" sx={{ color: "grey" }}>
          Select
        </InputLabel>
        <Select
          labelId="select-content-label"
          id="select-content"
          value={select}
          label="Select"
          onChange={handleSelectChange}
          sx={{
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          {practiceContent.map((x) => (
            <MenuItem key={x.title} value={x.content}>
              {x.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
