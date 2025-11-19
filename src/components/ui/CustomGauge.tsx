import { Theme } from "@emotion/react";
import { Box, SxProps, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import React from "react";

interface CustomGaugeProps {
  value: number;
  valueMax?: number;
  sx?: SxProps<Theme>;
}

const CustomGauge: React.FC<CustomGaugeProps> = ({ value, valueMax, sx }) => {
  return (
    <>
      <Box position="relative" display="inline-block">
        <Gauge
          cornerRadius="50%"
          width={150}
          height={150}
          value={Math.round(value)}
          valueMax={valueMax || 100}
          sx={{
            [`& .${gaugeClasses.valueArc}`]: { fill: "#52b202" },
            [`& .${gaugeClasses.referenceArc}`]: { fill: "gray" },
            ...sx,
          }}
        />
        {/* Overlay the text */}
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center the text
            fontWeight: "bold",
          }}
        >
          {Math.round(value)}
        </Typography>
      </Box>
    </>
  );
};

export default CustomGauge;
