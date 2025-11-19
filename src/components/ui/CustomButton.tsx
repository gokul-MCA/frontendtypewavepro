import { Theme } from "@emotion/react";
import { Button, SxProps } from "@mui/material";
import React from "react";

interface CustomButtonProps {
  label: string;
  variant: "text" | "contained" | "outlined";
  onClick?: () => void; // Make onClick optional
  href?: string;
  sx?: SxProps<Theme>; // Make sx (styles) optional
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, variant, onClick, href, sx, children, }) => {
  return (
    <>
      <Button
        variant={variant}
        color="primary"
        sx={{
          textTransform: "none",
          padding: {
            xs: "4px 16px", // Smaller padding on extra-small screens
            sm: "6px 20px", // Medium padding on small screens
            md: "8px 24px", // Larger padding on medium screens and up
          },
          fontSize: {
            xs: "14px", // Smaller font size on extra-small screens
            sm: "16px", // Default font size on small screens
            md: "18px", // Larger font size on medium screens and up
          },
          letterSpacing: "0.05rem", // Adds some spacing between letters
          border: "2px solid white",
          ...sx,
        }}
        onClick={onClick}
        href={href}
        // className={className}
      >
        {children}
        {label}
      </Button>
    </>
  );
};

export default CustomButton;
