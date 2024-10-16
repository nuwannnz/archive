/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { IconButton, ThemeProvider, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { AppDispatch, RootState } from "../../../store";
import {
  deleteProductCategory,
  fetchProductCategoryList,
} from "../../../actions/admin-product-category.action";
import { adminProductActions } from "../../../store/admin-products.slice";
import PageLayout from "../../../components/adminDashboard/common/PageLayout";
import { modes, ROUTES } from "../../../constants/common";

const dataGridTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
        cell: {
          width: "auto !important",
        },
        row: {
          width: "100%",
          justifyContent: "space-around",
        },
        columnHeadersInner: {
          width: "100%",
        },
      },
    },
  },
});

function ProductCategoryList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [deleteProductCategoryId, setDeleteProductCategoryId] = useState(null);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const { isFetching, data: productCategoryList } = useSelector(
    (state: RootState) => state.adminProductCategory.adminProductCategoryList
  );

  const {
    isFetching: productCategoryDeleting,
    data: deleteProductCategoryStatus,
  } = useSelector(
    (state: RootState) => state.adminProductCategory.deleteProductCategory
  );

  useEffect(() => {
    if (deleteProductCategoryStatus) setPage(0);
  }, [deleteProductCategoryStatus]);

  useEffect(() => {
    dispatch(
      fetchProductCategoryList({
        limit: pageSize,
        pageNumber: page + 1,
      })
    );

    return () => {
      dispatch(adminProductActions.resetAdminProductFetch());
    };
  }, [page]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", sortable: false, width: 200 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          <Tooltip title="Edit" placement="top">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `${ROUTES.PRODUCT_CATEGORY}/${modes.Edit}/${params.row._id}`
                );
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteProductCategory(params.row._id));
                setDeleteProductCategoryId(params.row._id);
              }}
            >
              {productCategoryDeleting &&
              params.row._id === deleteProductCategoryId ? (
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
      title="Product Category"
      action="Add Product Category"
      onActionClickHandler={() => {
        navigate(`${ROUTES.PRODUCT_CATEGORY}/${modes.Add}`);
      }}
    >
      <ThemeProvider theme={dataGridTheme}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            onPageChange={(newPage) => setPage(newPage)}
            rowCount={productCategoryList?.totalCount}
            rows={productCategoryList?.data}
            columns={columns}
            pageSize={pageSize}
            paginationMode="server"
            loading={isFetching}
            getRowId={(row) => row._id}
            disableColumnMenu
            onRowClick={(param) =>
              navigate(
                `${ROUTES.PRODUCT_CATEGORY}/${modes.View}/${param.row._id}`
              )
            }
            disableSelectionOnClick
            page={page}
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

export default ProductCategoryList;
