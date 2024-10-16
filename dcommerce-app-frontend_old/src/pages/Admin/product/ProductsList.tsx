/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IconButton, ThemeProvider, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import PageLayout from "../../../components/adminDashboard/common/PageLayout";
import { modes, ROUTES } from "../../../constants/common";
import { AppDispatch, RootState } from "../../../store";
import {
  deleteProduct,
  fetchProductList,
} from "../../../actions/admin-products.actions";
import { adminProductActions } from "../../../store/admin-products.slice";
import type {} from "@mui/x-data-grid/themeAugmentation";

const dataGridTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
        cell: {
          // width: "auto !important",
        },
        "cell--textLeft": {
          margin: "0 40px",
        },
        row: {
          width: "100%",
          justifyContent: "space-around",
        },
        columnHeadersInner: {
          // width: "100%",
        },
        columnHeader: {
          margin: "0 40px",
          // paddingLeft: "0px",
          // marginLeft: "-25px",
          // width: "100%",
          // justifyContent: "space-around",
        },
      },
    },
  },
});

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const pageSize = 8;

  const { isFetching, data: productList } = useSelector(
    (state: RootState) => state.adminProduct.adminProductList
  );

  const { isFetching: productDeleting, data: deleteProductStatus } =
    useSelector((state: RootState) => state.adminProduct.deleteProduct);

  useEffect(() => {
    if (deleteProductStatus) setPage(0);
  }, [deleteProductStatus]);

  useEffect(() => {
    dispatch(fetchProductList({ limit: pageSize, pageNumber: page + 1 }));

    return () => {
      dispatch(adminProductActions.resetAdminProductFetch());
    };
  }, [page]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", sortable: false, width: 220 },
    {
      field: "productCategoryId",
      headerName: "Product Category",
      sortable: false,
      width: 200,
      renderCell: (params) => <div>{params.row.productCategoryId.name}</div>,
    },
    { field: "quantity", headerName: "Quantity", sortable: false, width: 100 },
    { field: "price", headerName: "Price", sortable: false, width: 100 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 140,
      renderCell: (params) => (
        <div className="action-buttons">
          <Tooltip title="Edit" placement="top">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate(`${ROUTES.PRODUCT}/${modes.Edit}/${params.row._id}`);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteProduct(params.row._id));
                setDeleteProductId(params.row._id);
              }}
            >
              {productDeleting && params.row._id === deleteProductId ? (
                <CircularProgress
                  style={{ marginLeft: 0, marginRight: 0 }}
                  size={20}
                />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <PageLayout
      title="Products"
      action="Add products"
      onActionClickHandler={() => {
        navigate(`${ROUTES.PRODUCT}/${modes.Add}`);
      }}
    >
      <ThemeProvider theme={dataGridTheme}>
        <div style={{ height: 526, width: "100%" }}>
          <DataGrid
            onPageChange={(newPage) => setPage(newPage)}
            rowCount={productList?.totalCount}
            rows={productList?.data}
            columns={columns}
            pageSize={pageSize}
            page={page}
            paginationMode="server"
            loading={isFetching}
            getRowId={(row) => row._id}
            disableColumnMenu
            onRowClick={(param) =>
              navigate(`${ROUTES.PRODUCT}/${modes.View}/${param.row._id}`)
            }
            disableSelectionOnClick
            sx={{
              ".css-yrdy0g-MuiDataGrid-columnHeaderRow": {
                width: "100%",
                justifyContent: "space-around",
              },

              ".css-s1v7zr-MuiDataGrid-virtualScrollerRenderZone": {
                width: "100%",
              },
            }}
          />
        </div>
      </ThemeProvider>
    </PageLayout>
  );
}

export default ProductList;
