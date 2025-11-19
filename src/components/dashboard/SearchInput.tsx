import styles from "../../css/SearchInput.module.css";

import React, { useContext, useState } from "react";
import { PracticeState } from "../../pages/practice/PracticeLogic";
import { IconButton, InputBase, Paper, SxProps } from "@mui/material";
import { BadgeAlert, BadgeCheck, Loader, SearchIcon, X } from "lucide-react";
import axios from "axios";
import { postGeminiPrompt } from "../../services/geminiService";

const SearchInput: React.FC = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [promptResponses, setpromptResponses] = useState<string[]>([]);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const context = useContext(PracticeState);

  if (!context) {
    throw new Error("SearchInput must be used within a PracticeState.Provider");
  }

  const { setTypingContent } = context;
  const API_BASE_URL =
    import.meta.env.VITE_MODE === "development"
      ? "http://localhost:5555"
      : import.meta.env.VITE_BACKEND_URL;

  const handleSearch = async () => {
    try {
      if (searchInputValue.trim() === "") return;

      setSearchStatus("success");

      const response = await postGeminiPrompt(searchInputValue);

      const aiResponse = response.data.text;
      const updatedResponses = [...promptResponses, aiResponse];

      setpromptResponses(updatedResponses);
      setTypingContent(aiResponse);

      setTimeout(() => {
        setSearchStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Failed to fetch AI response:", error);

      setSearchStatus("error");

      setTimeout(() => {
        setSearchStatus("idle");
      }, 2000);
    }
  };

  const handleReset = async () => {
    setSearchInputValue("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          component="form"
          sx={{
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 350,
            bgcolor: "#1f2023",
            borderRadius: 6,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: "white", // input text
              "& input::placeholder": {
                color: "grey", // placeholder text
                opacity: 1, // ensure it's visible
              },
            }}
            placeholder="Enter the topic you want to practice"
            inputProps={{
              "aria-label": "Enter the topic you want to practice",
            }}
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          {searchInputValue && (
            <IconButton
              type="button"
              sx={{ color: "white", backgroundColor: "" }}
              aria-label="reset"
              onClick={handleReset}
            >
              <X size="18px" color="lightGrey" />
            </IconButton>
          )}
          <IconButton
            type="button"
            sx={{ p: "10px", color: "white", backgroundColor: "" }}
            aria-label="search"
            onClick={handleSearch}
          >
            {/* <SearchIcon /> */}
            {searchStatus === "loading" ? (
              <Loader className={styles.searchLoader} />
            ) : searchStatus === "success" ? (
              <BadgeCheck style={{ color: "#2bd43d" }} />
            ) : searchStatus === "error" ? (
              <BadgeAlert style={{ color: "#f6094a" }} />
            ) : (
              <SearchIcon />
            )}
          </IconButton>
        </Paper>
      </div>
    </>
  );
};

export default SearchInput;
