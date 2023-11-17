// DataTable.js
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { utils, writeFile } from "xlsx";
import { mockData } from "../data/tempData";

const DataTable = ({ data }) => {
  console.log(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCan, setSelectedCan] = useState(null);

  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (!data) return;

    const c = data.filter(
      (item) => item.ClassNames !== undefined && item.ClassNames !== ""
    );

    const c1 = c.sort((a, b) => {
      if (a.date === b.date) {
        return b.time.localeCompare(a.time);
      }
      return b.date.localeCompare(a.date);
    });
    setChartData(
      c1.map((x, k) => ({
        defective:
          x.ClassNames.indexOf("Dent_Can") !== -1 ||
          x.ClassNames.indexOf("Lid_Open") !== -1
            ? "Yes"
            : "No",
        id: c1.length - k - 1,
        ...x,
      }))
    );
  }, [data]);

  const handleMoreInfo = (row) => {
    setSelectedCan(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExport = () => {
    const worksheet = utils.json_to_sheet(chartData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Data");
    const excelFile = writeFile(workbook, "data.xlsx", {
      bookType: "xlsx",
      type: "blob",
    });

    const a = document.createElement("a");
    a.download = "data.xlsx";
    a.click();
  };

  const renderAttributeWithOval = (label, status) => {
    const ovalStyle = {
      width: "80px", // Increase the width for a larger oval
      height: "45px", // Adjust the height to match the text size
      borderRadius: "50%",
      display: "inline-block",
      backgroundColor: status ? "red" : "green",
      color: "white",
      textAlign: "center",
      lineHeight: "45px", // To vertically center the text
      fontSize: "12px", // Adjust the font size as needed
    };

    return (
      <div>
        <div style={ovalStyle}>{label}</div>
      </div>
    );
  };

  if (!chartData) return;

  return (
    <div className="half-page-table">
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExport}
          style={{ marginTop: "16px" }}
        >
          Export to Excel
        </Button>
      </div>

      <TableContainer
        component={Paper}
        style={{ maxHeight: "50vh", overflow: "auto" }}
      >
        <Table className="evenly-spaced-table">
          <TableHead>
            <TableRow>
              <TableCell className="evenly-spaced-cell bold-text">ID</TableCell>
              <TableCell className="evenly-spaced-cell bold-text">
                Defective
              </TableCell>
              <TableCell className="evenly-spaced-cell bold-text">
                Date
              </TableCell>
              <TableCell className="evenly-spaced-cell bold-text">
                Time
              </TableCell>
              <TableCell className="evenly-spaced-cell bold-text">
                More Info
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="evenly-spaced-cell">{row.id}</TableCell>
                <TableCell
                  className={`evenly-spaced-cell ${
                    row.defective === "Yes" ? "red-text" : "green-text"
                  }`}
                >
                  {row.defective}
                </TableCell>
                <TableCell className="evenly-spaced-cell">{row.date}</TableCell>
                <TableCell className="evenly-spaced-cell">{row.time}</TableCell>
                <TableCell className="evenly-spaced-cell">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleMoreInfo(row)}
                  >
                    More Info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>More Info</DialogTitle>
        <DialogContent style={{ minWidth: "300px", textAlign: "center" }}>
          {selectedCan && (
            <div>
              <img
                src={selectedCan.S3URI.replace(
                  /s3:\/\/(.*)\/(.*)/,
                  "https://$1.s3.amazonaws.com/$2"
                )}
                width="400"
              ></img>
              <Typography>Can ID: {selectedCan.id}</Typography>
              <Typography>Defective: {selectedCan.defective}</Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {renderAttributeWithOval(
                  "Shape",
                  selectedCan.ClassNames.indexOf("Dent_Can") !== -1
                )}
                {renderAttributeWithOval(
                  "Lid",
                  selectedCan.ClassNames.indexOf("Lid_Open") !== -1
                )}
              </Box>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
