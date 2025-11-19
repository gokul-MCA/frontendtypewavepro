import styles from "../../css/AccountSettings.module.css";

import React, { useState } from "react";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { GoogleUser } from "../../types";
import CustomButton from "../../components/ui/CustomButton";
import { useOutletContext } from "react-router-dom";
import { deleteAccount } from "../../services/authService";

interface OutletContext {
  user: GoogleUser;
}

const AccountSettings = () => {
  const { user } = useOutletContext<OutletContext>();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(user.picture);
  // const handleDeleteAccount = () => {};
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      window.location.href = "/";
    } catch (err) {
      console.error("Account deletion failed:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.back_button}>
        <CustomButton label="Back" variant="outlined" href="/dashboard" />
      </div>
      <h2>Account Settings</h2>
      <div className={styles.box}>
        <section className={styles.user_information}>
          <h3>INFORMATION</h3>

          <div className={styles.profileSection}>
            <form>
              {/* name */}
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input id="name" value={user?.name} readOnly />
              </div>

              {/* email */}
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input id="email" value={user?.email} readOnly />
              </div>
            </form>
            <div className={styles.profile_image_container}>
              <img
                src={user?.picture || "/frontend/public/profile.webp"} // fallback image
                alt="User profile"
                referrerPolicy="no-referrer"
                className={styles.profile_image}
              />
              <p>Profile Picture</p>
            </div>
          </div>
        </section>
        <section className={styles.delete_section}>
          <h3>DELETE ACCOUNT</h3>

          <p className={styles.delete_warning}>
            Deleting your account is permanent and cannot be undone. All your
            data will be lost. Please proceed with caution.
          </p>
          <div className={styles.delete_button_wrap}>
            <Button
              onClick={handleClickOpen}
              sx={{ padding: "0.75rem 1.5rem" }}
            >
              DELETE MY ACCOUNT{" "}
              <Delete sx={{ color: "red", fontSize: "26px" }} />
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              sx={{ color: "black", fill: "red" }}
              slotProps={{
                paper: {
                  component: "form",
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(
                      (formData as any).entries()
                    );
                    const confirmation = formJson.confirmation;
                    if (confirmation === "DELETE") {
                      handleDeleteAccount();
                    }
                    console.log(confirmation === "DELETE");
                    handleClose();
                  },
                },
              }}
            >
              <DialogTitle color="secondary">
                Confirm Account Deletion
              </DialogTitle>
              <DialogContent>
                <DialogContentText color="secondary">
                  This will permanently delete your account and all your
                  associated data. To confirm, type <strong>DELETE</strong>.
                  This cannot be undone.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  variant="standard"
                  id="confirmation"
                  name="confirmation"
                  color="secondary"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="info">
                  Cancel
                </Button>
                <Button type="submit" color="error">
                  Confirm Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountSettings;
