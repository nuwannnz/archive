/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchAuthSession } from "aws-amplify/auth";
import {
  Box,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { users } from "src/_mock/user";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import CircularProgress from "src/components/progressbar/circular-progressbar";

// ----------------------------------------------------------------------

export default function BookingPage() {
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const [id, setId] = useState(0);

  const [editMode, seteditMode] = useState(false);

  const [inputType, setInputType] = useState("text");

  const [showLabel, setShowLabel] = useState(true);

  const [showStatusMenu, setshowStatusMenu] = useState(true);

  const [modalFormData, setModalFormData] = useState({
    client_name: "",
    client_contact: "",
    event_date: "",
    session: [],
    capacity: 0,
    paid_amount: 0,
    total_amount: 0,
    payment_status: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const allSessionOptions = ["Morning", "Afternoon", "Evening"];
  // const allPaymentStatus = ["Pending", "Partial", "Completed"];
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    updatePaymentStatus();
  }, [modalFormData, editMode]);

  useEffect(() => {
    fetchData();
  }, []);

  const updatePaymentStatus = () => {
    if (editMode) {
      if (modalFormData.paid_amount == modalFormData.total_amount) {
        setPaymentStatus("Completed");
      } else if (modalFormData.paid_amount < modalFormData.total_amount) {
        setPaymentStatus("Partial");
      } else {
        setPaymentStatus("Pending");
      }
    } else {
      if (modalFormData.paid_amount === 0 && modalFormData.total_amount > 0) {
        setPaymentStatus("Pending");
      } else if (
        modalFormData.paid_amount > 0 &&
        modalFormData.paid_amount < modalFormData.total_amount
      ) {
        setPaymentStatus("Partial");
      } else if (
        modalFormData.paid_amount === modalFormData.total_amount &&
        modalFormData.total_amount > 0
      ) {
        setPaymentStatus("Completed");
      } else {
        setPaymentStatus("");
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    if (!modalFormData.date) {
      setShowLabel(false);
    }
  };

  const handleModalForm = () => {
    setModalFormData({
      client_name: "",
      client_contact: "",
      event_date: "",
      session: [],
      capacity: "",
      paid_amount: "",
      total_amount: "",
      payment_status: "",
      notes: "",
    });
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleModalForm();
    setId(0);
    seteditMode(false);
  };

  const handleModalInputChange = (booking) => {
    const { name, value } = booking.target;
    setModalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSessionChange = (booking) => {
    const { value } = booking.target;
    setModalFormData((prevData) => ({
      ...prevData,
      session: value,
    }));
  };

  const handleSubmit = async (bookingData) => {
    bookingData.preventDefault();
    console.log(paymentStatus);

    if (editMode && id) {
      await setModalFormData((prevData) => ({
        ...prevData,
        payment_status: paymentStatus,
      }));

      updateData(id, { ...modalFormData, payment_status: paymentStatus });
    } else {
      console.log("Before addData - paymentStatus:", paymentStatus);
      await addData({ ...modalFormData, payment_status: paymentStatus });
      fetchData({ ...modalFormData, payment_status: paymentStatus });
    }
    handleCloseModal();
  };

  const handleEdit = (id, e) => {
    seteditMode(true);
    setshowStatusMenu(false);
    setShowLabel(true);
    console.log(id);

    const selectedData = data.find((item) => item._id == id);
    console.log("Data", data);
    console.log("Selected Data:", selectedData);

    // Log the selected data
    console.log(selectedData);

    setId(id);

    // Update the modalFormData state with the selected data

    function formatDateToMMDDYYYY(dateString) {
      const [year, month, day] = dateString.split("-");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }

    const dateTimeString = selectedData.event_date;
    const dateOnlyString = dateTimeString.split("T")[0];

    const formattedDate = formatDateToMMDDYYYY(dateOnlyString);

    setModalFormData({
      client_name: selectedData.client_name || "",
      client_contact: selectedData.client_contact || "",
      event_date: formattedDate || "",
      session: selectedData.session ? selectedData.session.split(",") : [],
      capacity: selectedData.capacity || "",
      paid_amount: selectedData.paid_amount || "",
      total_amount: selectedData.total_amount || "",
      payment_status: selectedData.payment_status || "",
      notes: selectedData.notes || "",
    });

    // console.log("Session Value:", modalFormData.session);

    handleOpenModal();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  // ..........Crud Operations..........

  // const fetchData = async () => {
  //   try {

  //     const response = await axios.get(
  //       "https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/public"
  //     );

  //     if (response.status >= 200 && response.status < 300) {
  //       const data = response.data;
  //       console.log("Data:", data);
  //       setData(data);
  //     } else {
  //       throw new Error(`Failed to fetch data. Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const { idToken } = (await fetchAuthSession()).tokens ?? {};

      if (!idToken) {
        throw new Error("Id token not available.");
      }

      const response = await axios.get(
        "https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/private/get-my-bookings",
        {
          headers: {
            Authorization: idToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const formattedData = response.data.map((item) => ({
          ...item,
          event_date: item.event_date
            ? formatDateToMMDDYYYY(item.event_date)
            : "",
        }));

        // console.log("Formatted Data:", formattedData);

        setData(formattedData);
      } else {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function formatDateToMMDDYYYY(dateTimeString) {
    if (!dateTimeString) {
      return "";
    }

    const dateOnlyString = dateTimeString.split("T")[0];
    const [year, month, day] = dateOnlyString.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const addData = async (formData) => {
    seteditMode(false);

    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};

      if (!idToken) {
        throw new Error("Id token not available.");
      }
      formData.session = formData.session.join(",");

      const response = await axios.post(
        "https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/private/",
        formData,
        {
          headers: {
            Authorization: idToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.status === 200) {
        fetchData();
        toast.success("Data successfully added!");
      } else if (response && response.status === 401) {
        handleLogout();
      } else {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.reload();
        handleLogout();
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        toast.error(error.response.data.error);
      } else {
        console.log(error);
        toast.error("An error occurred while adding the user");
      }
    }
  };

  const updateData = async (id, newData) => {
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};

      if (!idToken) {
        throw new Error("Id token not available.");
      }

      newData.session = newData.session.join(",");

      const response = await axios.put(
        `https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/private/${id}`,
        newData,
        {
          headers: {
            Authorization: idToken,
          },
        }
      );

      if (response.status == 200) {
        setData((prevData) => {
          return prevData.map((item) =>
            item._id === id ? { ...item, ...newData } : item
          );
        });
        console.log("Data updated successfully:", newData);
      } else {
        console.error("Failed to update data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id, e) => {
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};

      if (!idToken) {
        throw new Error("Id token not available.");
      }

      const response = await axios.delete(
        `https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/private/${id}`,
        {
          headers: {
            Authorization: idToken,
          },
        }
      );

      if (response.status === 204) {
        console.log("Successfully Deleted");
        fetchData();
      } else {
        console.error("Failed to delete data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Bookings</Typography>

        <Button
          onClick={handleOpenModal}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Booking
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }} >
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "client_name", label: "Name" },
                  { id: "client_contact", label: "Phone No" },
                  { id: "event_date", label: "Date" },
                  { id: "session", label: "Session" },
                  { id: "capacity", label: "Capacity" },
                  { id: "paid", label: "Paid Amount" },
                  { id: "total", label: "Total" },
                  { id: "status", label: "Payment Status" },
                  // { id: "notes", label: "Notes" },
                  { id: "" },
                ]}
              />
              {isLoading && (
                <CircularProgress
                  size={40}
                  thickness={2}
                />
              )}
              
              {Array.isArray(data) &&
                data.slice &&
                data.map &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={index}
                      id={row._id}
                      client_name={row.client_name}
                      client_contact={row.client_contact}
                      event_date={row.event_date}
                      session={row.session}
                      capacity={row.capacity}
                      paid_amount={row.paid_amount}
                      total_amount={row.total_amount}
                      cust_notes={row.notes}
                      payment_status={row.payment_status}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      selected={selected.indexOf(row.client_name) !== -1}
                      handleClick={(event) =>
                        handleClick(event, row.client_name)
                      }
                    />
                  ))}
                  
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            bgcolor: "#E8E9EB",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <form name="basic" onSubmit={handleSubmit} autoComplete="off">
            {editMode ? (
              <Typography variant="h5" align="center" marginBottom={5}>
                Update Booking
              </Typography>
            ) : (
              <Typography variant="h5" align="center" marginBottom={5}>
                Add Booking
              </Typography>
            )}

            <Grid container spacing={4}>
              <Grid item xs={3}>
                <TextField
                  label="Client Name"
                  name="client_name"
                  variant="outlined"
                  fullWidth
                  required
                  value={modalFormData.client_name}
                  onChange={handleModalInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Phone No"
                  name="client_contact"
                  variant="outlined"
                  fullWidth
                  required
                  value={modalFormData.client_contact}
                  onChange={handleModalInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label={showLabel ? "Date" : ""}
                  name="event_date"
                  variant="outlined"
                  type={editMode ? "date" : inputType}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  value={modalFormData.event_date}
                  onChange={handleModalInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="session-label">Session</InputLabel>
                  <Select
                    labelId="session-label"
                    id="session"
                    name="session"
                    multiple
                    value={modalFormData.session || []}
                    onChange={handleSessionChange}
                    label="Session"
                    renderValue={(selected) => {
                      return Array.isArray(selected) ? selected.join(", ") : "";
                    }}
                  >
                    {allSessionOptions.map((sessionOption) => (
                      <MenuItem key={sessionOption} value={sessionOption}>
                        {sessionOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Capacity"
                  name="capacity"
                  variant="outlined"
                  fullWidth
                  required
                  value={modalFormData.capacity}
                  onChange={handleModalInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Paid Amount"
                  name="paid_amount"
                  variant="outlined"
                  fullWidth
                  required
                  value={modalFormData.paid_amount}
                  onChange={handleModalInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Total"
                  name="total_amount"
                  variant="outlined"
                  fullWidth
                  required
                  value={modalFormData.total_amount}
                  onChange={handleModalInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={3}>
                {editMode ? (
                  <Box
                    border={1}
                    borderRadius={1}
                    p={1}
                    borderColor="#8080804f"
                    height={48}
                  >
                    <Typography variant="body1" sx={{ mb: 0 }}>
                      {paymentStatus}
                    </Typography>
                  </Box>
                ) : (
                  <TextField
                    label="Payment Status"
                    name="payment_status"
                    variant="outlined"
                    fullWidth
                    value={paymentStatus}
                    disabled
                    sx={{ mb: 2 }}
                    onChange={handleModalInputChange}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  name="notes"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={modalFormData.notes}
                  onChange={handleModalInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={8}>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    type="submit"
                    color="primary"
                    sx={{ width: "150px", marginRight: "10px" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCloseModal}
                    type="button"
                    color="error"
                    sx={{ width: "150px", marginLeft: "10px" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Container>
  );
}
