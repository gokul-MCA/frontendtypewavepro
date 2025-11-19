import styles from "../../css/Header.module.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static" sx={{ borderBottom: "2px solid #001110" }}>
      <Container maxWidth="xl" sx={{ backgroundColor: "black" }}>
        <Toolbar disableGutters className={styles.header}>
          <Link to="/" className={styles.logo_with_icon}>
            <Avatar
              alt="typewavepro-logo"
              src="typewavepro-logo-large.png"
              variant="rounded"
            />

            {/* laptop screen */}
            <Typography
              variant="h5"
              noWrap
              sx={{
                mx: 2,
                display: { xs: "none", sm: "inline-block" },
                fontWeight: 900,
                fontFamily: "monospace",
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                "&::first-letter":{
                  fontFamily: "times new roman",
                  fontSize:"40px"
                }
              }}
              className={styles.logo}
            >
              TypeWavePro
            </Typography>

            {/* tablet & mobile screen */}
            <Typography
              variant="h5"
              noWrap
              sx={{
                mx: 1.5,
                display: { xs: "flex", sm: "none" },
                fontFamily: "times new roman",
                fontWeight: 800,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: "32px"
              }}
              className={styles.logo}
            >
              T
            </Typography>
          </Link>
          <div className={styles.header_buttons}>
            <Button
              variant="contained"
              sx={{ ml: "auto", textTransform: "none", }}
              href="/contact"
            >
              Contact
            </Button>
            <Button
              variant="contained"
              sx={{ ml: "auto", textTransform: "none" }}
              href="/login"
            >
              Sign in
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
