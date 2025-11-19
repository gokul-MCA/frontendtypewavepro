import { useEffect, useState } from "react";
import styles from "../../css/Analytics.module.css";

import { Gauge, gaugeClasses } from "@mui/x-charts";
import { Delete, InfoOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useResult } from "../../context/ResultContext";

// axios services
import { deleteResults, getResults } from "../../services/resultService";
import { ResultType } from "../../types";

const Analytics = () => {
  const { result } = useResult()!;

  const [resultCount, setResultCount] = useState(0);
  const [averageResult, setAverageResult] = useState<ResultType>({
    accuracy: 0,
    cpm: 0,
    wpm: 0,
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getResults()
      .then((response) => {
        const { count, data } = response.data;

        setResultCount(count);

        if (count > 0) {
          const total = data.reduce(
            (acc: ResultType, curr: ResultType) => ({
              accuracy: acc.accuracy + curr.accuracy,
              cpm: acc.cpm + curr.cpm,
              wpm: acc.wpm + curr.wpm,
            }),
            { accuracy: 0, cpm: 0, wpm: 0 }
          );

          const avg = {
            accuracy: Math.round(total.accuracy / count),
            cpm: Math.round(total.cpm / count),
            wpm: Math.round(total.wpm / count),
          };

          setAverageResult(avg);
        }
      })
      .catch((error) => console.error(error));
  }, [result]);

  const handleDelete = async () => {
    if (resultCount > 0) {
      try {
        const response = await deleteResults();
        setResultCount(0);
        setAverageResult({ accuracy: 0, cpm: 0, wpm: 0 });
        console.log(response);
      } catch (error) {
        console.error("Failed to delete results:", error);
      }
    }
  };

  const wpmValue = averageResult?.wpm ?? 0;
  const cpmValue = averageResult?.cpm ?? 0;
  const accuracyValue = averageResult?.accuracy ?? 0;

  // Determine arc color based on WPM range
  let arcColor; // Red by default
  let accuracyArcColor;

  if (wpmValue >= 80 && cpmValue >= 400) {
    arcColor = "#52b202"; // 🟢 Green – Fast/Expert Typist
  } else if (wpmValue >= 60 && cpmValue >= 300) {
    arcColor = "#fbc02d"; // 🟡 Yellow – Average Typist
  } else if (wpmValue >= 40 && cpmValue >= 200) {
    arcColor = "#ff7f00"; // 🟠 Orange – Below Average Typist
  } else {
    arcColor = "#ff4c4c"; // 🔴 Red – Poor/Beginner
  }

  if (accuracyValue >= 90) {
    accuracyArcColor = "#52b202"; // Green – Excellent
  } else if (accuracyValue >= 70) {
    accuracyArcColor = "#fbc02d"; // Yellow – Average
  } else if (accuracyValue >= 40) {
    accuracyArcColor = "#ff7f00"; // Orange – Poor
  } else {
    accuracyArcColor = "#ff4c4c"; // Red – Very Poor
  }

  return (
    <>
      <div className={styles.analytics_container}>
        {/* heading and delete button */}
        <div className={styles.analytics_heading}>
          <h2>Insights</h2>
          {averageResult.accuracy === 0 &&
            averageResult.cpm === 0 &&
            averageResult.wpm === 0 && (
              <div className={styles.infoMessage}>
                <InfoOutlined
                  style={{
                    color: "orange",
                    fontSize: "24px",
                    marginRight: "8px",
                  }}
                />
                <span>No data yet. Start typing to see your stats!</span>
              </div>
            )}
          <div className={styles.delete_analytics_data_button}>
            <Tooltip title="Delete all results and data">
              <IconButton onClick={handleClickOpen}>
                <Delete sx={{ color: "red", fontSize: "26px" }} />
              </IconButton>
            </Tooltip>

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
                      handleDelete();
                    }
                    console.log(confirmation === "DELETE");
                    handleClose();
                  },
                },
              }}
            >
              <DialogTitle color="secondary">Confirm Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText color="secondary">
                  This will permanently delete all your results. Type{" "}
                  <strong>DELETE</strong> to confirm. This cannot be undone.
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
        </div>

        {/* analytics with Gauge section */}
        <div className={styles.analytics}>
          <div id="wpm">
            <Gauge
              value={wpmValue}
              valueMax={wpmValue > 120 ? 200 : 120}
              width={250}
              height={250}
              startAngle={0}
              endAngle={360}
              text={({ value }) => `${value}`}
              sx={{
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: arcColor,
                  filter: `drop-shadow(0 0 6px ${arcColor})`,
                },
                [`& .${gaugeClasses.referenceArc}`]: { fill: "#2e2e2e" },
                [`& .${gaugeClasses.valueText} text`]: {
                  fill: arcColor,
                  fontSize: "30px",
                },
              }}
              aria-labelledby="wpm-label"
            />
            <h2 id="wpm-lable">WPM</h2>
          </div>

          <div id="accuracy">
            <Gauge
              value={accuracyValue}
              valueMax={100}
              width={280}
              height={280}
              startAngle={0}
              endAngle={360}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
              sx={{
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: accuracyArcColor,
                  filter: `drop-shadow(0 0 6px ${accuracyArcColor})`,
                },
                [`& .${gaugeClasses.referenceArc}`]: { fill: "#2e2e2e" },
                [`& .${gaugeClasses.valueText} text`]: {
                  fill: accuracyArcColor, // Change text color here
                  fontSize: "30px",
                },
              }}
              aria-labelledby="accuracy-label"
            />
            <h2 id="accuracy-label">Accuracy</h2>
          </div>

          <div id="cpm">
            <Gauge
              value={averageResult?.cpm}
              valueMax={600}
              width={250}
              height={250}
              startAngle={0}
              endAngle={360}
              text={({ value }) => `${value}`}
              sx={{
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: arcColor,
                  filter: `drop-shadow(0 0 6px ${arcColor})`,
                },
                [`& .${gaugeClasses.referenceArc}`]: { fill: "#2e2e2e" },
                [`& .${gaugeClasses.valueText} text`]: {
                  fill: arcColor,
                  fontSize: "30px",
                },
              }}
              aria-labelledby="cpm-label"
            />
            <h2 id="cpm-label">CPM</h2>
          </div>
        </div>

        {/* infoMessage & info  */}
        {averageResult.accuracy !== 0 &&
          averageResult.cpm !== 0 &&
          averageResult.wpm !== 0 && (
            <div className={styles.info}>
              <div className={styles.infoMessage}>
                <InfoOutlined
                  style={{
                    color: "orange",
                    fontSize: "24px",
                    marginRight: "8px",
                  }}
                />
                <span>Based on your 5 most recent results.</span>
              </div>

              <div className={styles.gaugeLegend}>
                <h4 className={styles.title}>📝 Gauge Legend</h4>
                <table className={styles.legendTable}>
                  <thead>
                    <tr>
                      <th className={styles.th}>Color</th>
                      <th className={styles.th}>🎯 Accuracy</th>
                      <th className={styles.th}>⚡ Typing Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.td}>🟢 Green</td>
                      <td className={styles.td}>Excellent (90–100%)</td>
                      <td className={styles.td}>Expert (80+ WPM / 400+ CPM)</td>
                    </tr>
                    <tr>
                      <td className={styles.td}>🟡 Yellow</td>
                      <td className={styles.td}>Good (70–89%)</td>
                      <td className={styles.td}>
                        Average (60–79 WPM / 300–399 CPM)
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.td}>🟠 Orange</td>
                      <td className={styles.td}>Fair (40–69%)</td>
                      <td className={styles.td}>
                        Below Avg (40–59 WPM / 200–299 CPM)
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.td}>🔴 Red</td>
                      <td className={styles.td}>Poor (&lt;40%)</td>
                      <td className={styles.td}>
                        Poor (&lt;40 WPM / &lt;200 CPM)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Analytics;
