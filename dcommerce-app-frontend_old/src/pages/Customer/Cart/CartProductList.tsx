import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Alienware 7.1 Wired", 20500, 2, 41000, 4.0),
  createData("Alienware 7.1 Wired", 20500, 2, 41000, 4.3),
];

export default function CartProductList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Sub Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <CloseIcon />
              </TableCell>
              <TableCell align="center">
                <img
                  className="cart-image-thumbnail"
                  alt="test"
                  src="https://dev-dcommerce-product-images.s3.ap-south-1.amazonaws.com/resized/200/0840005d-ca80-45f3-91e5-8c3cc9375aff.jpg"
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">LKR.{row.calories}</TableCell>
              <TableCell align="right">
                <TextField
                  className="buy-now-quantity"
                  type="number"
                  variant="outlined"
                  defaultValue={1}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </TableCell>
              <TableCell align="right">LKR.{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
