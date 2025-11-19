import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function SelectContent(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedContent, setSelectedContent] = useState<string | null>(null); // To store selected content
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOkay = () => {
    if (selectedContent) {
      const sessionId = `session-${Date.now()}`; // or use uuid if you prefer
      navigate(`${selectedContent}/${sessionId}`);
      // navigate to a page based on the selected content (for example, dynamic/static content page)
      // navigate(`${selectedContent}`);
      setError(false);
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <CustomButton
        label="Practice today!"
        variant="contained"
        sx={{ border: "none" }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#f0f0f0", // Light grey background for the dialog
            color: "#333", // Text color for the dialog box
          },
        }}
      >
        <DialogTitle color="secondary">Choose Your Content Type</DialogTitle>
        <DialogContent>
          <DialogContentText color="secondary">
            Please select the type of content you would like to practice.
          </DialogContentText>

          {/* Radio Buttons for Content Type Selection */}
          <FormControl required error={error} sx={{ width: "100%", marginTop: "10px" }}>
            <RadioGroup
              value={selectedContent}
              onChange={(e) => setSelectedContent(e.target.value)}
            >
              <FormControlLabel
                value="static-content-practice"
                control={<Radio color="info" />}
                label="Static Content"
                sx={{ color: "black" }}
              />
              <FormControlLabel
                value="dynamic-content-practice"
                control={<Radio color="info" />}
                label="Dynamic Content"
                sx={{ color: "black" }}
              />
            </RadioGroup>
            {error && <FormHelperText>Selection is required</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkay} color="info">
            Okay
          </Button>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
