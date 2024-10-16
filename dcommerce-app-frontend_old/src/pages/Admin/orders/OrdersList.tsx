import React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableBody, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../components/adminDashboard/common/PageLayout";
import { modes, ROUTES } from "../../../constants/common";

export const data = [
  {
    Id: 1,
    Name: "Nikon Camera",
    Image: "https://picsum.photos/seed/picsum/200/300",
    Discount: "10%",
    Total: "560",
  },
  {
    Id: 2,
    Name: "cricket Bat",
    Image: "https://picsum.photos/seed/picsum/200/300",
    Discount: "20%",
    Total: "16000",
  },
  {
    Id: 3,
    Name: "Kitchen Item",
    Image: "https://picsum.photos/seed/picsum/200/300",
    Discount: "0%",
    Total: "10500",
  },
  {
    Id: 4,
    Name: "Baskcet Ball",
    Image: "https://picsum.photos/seed/picsum/200/300",
    Discount: "5%",
    Total: "960",
  },
];

function OrdersList() {
  const navigate = useNavigate();
  return (
    <PageLayout title="Orders">
      <Table className="table-wrapper">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell> Name</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.Id} className="table-row">
              <TableCell component="th" scope="row">
                {item.Id}
              </TableCell>
              <TableCell>{item.Name}</TableCell>
              <TableCell>{item.Total}</TableCell>
              <TableCell>{item.Discount}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    navigate(`${ROUTES.ORDER}/${modes.View}/${item.Id}`)
                  }
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
}

export default OrdersList;
