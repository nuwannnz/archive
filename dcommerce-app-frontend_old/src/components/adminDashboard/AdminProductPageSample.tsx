import React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles, Typography } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableBody } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const useStyles = makeStyles({
  typography: {
    marginTop: "10%",
  },
  table: {
    margin: "10px 50px",
    minWidth: 850,
  },
  tableContainer: {
    marginTop: "50px",
    borderRadius: 15,
    marginLeft: "10%",
  },
});

function AdminProductPage() {
  const {
    isFetching,
    data: productList,
    error,
  } = useSelector((state: RootState) => state.adminProduct.adminProductList);

  const classes = useStyles();

  /**
   * Fetch product list after first render
   */
  // useEffect(() => {
  //   dispatch(fetchAdminProductListAsync());
  //   // cleanup state on component unmount
  //   return () => {
  //     dispatch(adminProductActions.resetAdminProductFetch());
  //   };
  // }, []);

  if (isFetching) {
    return <>Loading...</>;
  }

  if (error) {
    return <>`${error ?? "Failed to load products"}`</>;
  }

  return (
    <div>
      <Typography className={classes.typography} variant="h4">
        Admin Product Page
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.images[0]}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <EditIcon />
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminProductPage;
