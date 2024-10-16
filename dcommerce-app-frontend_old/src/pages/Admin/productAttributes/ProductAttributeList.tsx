/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import {
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageLayout from "../../../components/adminDashboard/common/PageLayout";
import { AppDispatch, RootState } from "../../../store";
import {
  deleteProductAttribute,
  fetchProductAttributeList,
} from "../../../actions/admin-product-attribute.actions";
import { productAttributeActions } from "../../../store/admin-product-attribute.slice";
import ProductAttributeModal from "./ProductAttributeModal";
import ConfirmDialog from "../../../components/adminDashboard/common/ConfirmDialog";

export default function ProductAttributeList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isFetching,
    data: productAttributes,
    error,
  } = useSelector(
    (state: RootState) => state.productAttribute.productAttributes
  );

  const {
    isFetching: deleteAttributeLoading,
    data: deleteAttributeSuccess,
    error: deleteAttributeError,
  } = useSelector(
    (state: RootState) => state.productAttribute.deleteProductAttribute
  );

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedAttributeId, setSelectedAttributeId] = useState<
    string | undefined
  >(undefined);
  const [selectedAttributeIdToDelete, setSelectedAttributeIdToDelete] =
    useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchProductAttributeList({ limit, pageNumber }));

    return () => {
      dispatch(productAttributeActions.resetFetchProductAttribute());
    };
  }, [limit, pageNumber]);

  useEffect(() => {
    if (selectedAttributeId) {
      setShowModal(true);
    }
  }, [selectedAttributeId]);

  useEffect(() => {
    if (selectedAttributeIdToDelete) {
      setShowDeleteConfirmation(true);
    }
  }, [selectedAttributeIdToDelete]);

  useEffect(() => {
    if (deleteAttributeSuccess) {
      dispatch(productAttributeActions.resetDeleteProductAttribute());
      dispatch(fetchProductAttributeList({ limit, pageNumber }));
      setSelectedAttributeIdToDelete(undefined);
    }
  }, [deleteAttributeSuccess]);

  return (
    <>
      <PageLayout
        title="Products Attributes"
        action="Add product attribute"
        onActionClickHandler={() => {
          setShowModal(true);
        }}
      >
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ height: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Options</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isFetching && (
                  <>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Skeleton animation="wave" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Skeleton animation="wave" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Skeleton animation="wave" />
                      </TableCell>
                    </TableRow>
                  </>
                )}
                {productAttributes?.data.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">
                      {row.options.map((option) => (
                        <Chip key={option.id} label={option.name} />
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="action-buttons">
                        <Tooltip title="Edit" placement="top">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              // eslint-disable-next-line no-underscore-dangle
                              setSelectedAttributeId(row._id as string);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              // eslint-disable-next-line no-underscore-dangle
                              setSelectedAttributeIdToDelete(row._id);
                            }}
                          >
                            {deleteAttributeLoading &&
                            row._id === selectedAttributeIdToDelete ? (
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={20}
            rowsPerPage={10}
            page={1}
            onPageChange={() => {
              //
            }}
            onRowsPerPageChange={() => {
              //
            }}
          />
        </Paper>
      </PageLayout>

      {showModal && (
        <ProductAttributeModal
          productAttributeId={selectedAttributeId}
          handleClose={(refresh) => {
            setShowModal(false);
            setSelectedAttributeId(undefined);

            if (refresh) {
              dispatch(fetchProductAttributeList({ limit, pageNumber }));
            }
          }}
        />
      )}

      <ConfirmDialog
        isOpen={showDeleteConfirmation}
        title="Delete record"
        message="Delete this product attribute?"
        primaryButtonLabel="Delete"
        secondaryButtonLabel="Cancel"
        onPrimaryButtonClick={() => {
          dispatch(
            deleteProductAttribute(selectedAttributeIdToDelete as string)
          );
          setShowDeleteConfirmation(false);
        }}
        onSecondaryButtonClick={() => {
          setShowDeleteConfirmation(false);
          setSelectedAttributeIdToDelete(undefined);
        }}
      />
    </>
  );
}
