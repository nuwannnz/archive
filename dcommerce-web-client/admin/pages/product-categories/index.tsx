import { ReactElement, useEffect, useState } from "react";
import FullLayout from "../../src/layouts/full/FullLayout";
import ProtectedRoute from "../../src/layouts/full/shared/protectedRoute/ProtectedRoute";
import PageContainer from "../../src/components/container/PageContainer";
import {
  useMutateProductCategory,
  useProductCategories,
} from "../../src/hooks/productCategoryHooks";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Box,
  Chip,
  CircularProgress,
  TablePagination,
  Button,
  IconButton,
  Stack,
  Fab,
} from "@mui/material";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import ProductCategoryModal from "../../src/components/modals/ProductCategoryModal";
import { useConfirm } from "material-ui-confirm";
import { useToast } from "../../src/hooks/useToast";
import CenteredFlexBox from "../../src/components/shared/CenteredFlexBox";
import FixedPositionedBox from "../../src/components/shared/FixedPositionedBox";
import { useIsMobile } from "../../src/hooks/useIsMobile";
import { useIsAuthorizedTo } from "../../src/hooks/useIsAuthorized";
import { ACTION_PERMISSIONS } from "../../src/config/actionPermissions";

const ProductCategories = () => {
  const confirm = useConfirm();
  const { successToast, errorToast } = useToast();
  const { isMobile } = useIsMobile();

  const canAddProductCategory = useIsAuthorizedTo(
    ACTION_PERMISSIONS.ADD_PRODUCT_CATEGORY
  );
  const canUpdateProductCategory = useIsAuthorizedTo(
    ACTION_PERMISSIONS.UPDATE_PRODUCT_CATEGORY
  );
  const canDeleteProductCategory = useIsAuthorizedTo(
    ACTION_PERMISSIONS.DELETE_PRODUCT_CATEGORY
  );

  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined);

  const { mutateProductCategory } = useMutateProductCategory();
  const { isLoading, productCategories, isError, mutate } =
    useProductCategories({
      limit,
      pageNumber: pageNumber + 1,
    });

  useEffect(() => {
    if (!showModal) {
      setSelectedCategoryId(undefined);
    }
  }, [showModal]);

  useEffect(() => {
    if (isError) {
      errorToast("Failed to load Product Categories");
    }
  }, [isError]);

  const onDeleteClickHandler = async (categoryId: string) => {
    try {
      await confirm({ description: "Delete this Product Category?" });
      setDeletingId(categoryId);
      await mutateProductCategory({ id: categoryId }, "Delete");
      mutate(); // refresh cache

      successToast("Deleted Product Category");
    } catch (error) {
      errorToast("Failed to Delete Product Category");
    } finally {
      setDeletingId(undefined);
    }
  };

  let content = <></>;

  if (isLoading) {
    content = (
      <CenteredFlexBox height="70vh">
        <CircularProgress />
      </CenteredFlexBox>
    );
  } else if (productCategories) {
    content = (
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productCategories.data.map((productCategory) => (
              <TableRow
                key={productCategory._id}
                hover
                onClick={() => {
                  setSelectedCategoryId(productCategory._id);
                  setShowModal(true);
                }}
              >
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {productCategory.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    <Chip
                      sx={{
                        px: "4px",
                        color: "#fff",
                      }}
                      color={productCategory.isActive ? "success" : "default"}
                      size="small"
                      label={productCategory.isActive ? "Published" : "Hidden"}
                    ></Chip>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row-reverse">
                    {canDeleteProductCategory && (
                      <IconButton
                        onClick={() =>
                          onDeleteClickHandler(productCategory._id as string)
                        }
                      >
                        {deletingId === productCategory._id ? (
                          <CircularProgress size={20} color="info" />
                        ) : (
                          <IconTrash />
                        )}
                      </IconButton>
                    )}
                    {canUpdateProductCategory && (
                      <IconButton
                        onClick={() => {
                          setSelectedCategoryId(productCategory._id);
                          setShowModal(true);
                        }}
                      >
                        <IconPencil />
                      </IconButton>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={productCategories.totalCount}
          page={pageNumber}
          onPageChange={(_e, n) => setPageNumber(n)}
          rowsPerPage={limit}
          onRowsPerPageChange={(e) => setLimit(Number(e.target.value))}
        />
        <ProductCategoryModal
          isOpen={showModal}
          productCategoryId={selectedCategoryId}
          isReadOnly={
            selectedCategoryId !== undefined && !canUpdateProductCategory
          }
          closeModal={(refresh) => {
            setShowModal(false);
            if (refresh) {
              mutate();
            }
          }}
        />
        {isMobile && canAddProductCategory && (
          <FixedPositionedBox vertical="bottom" horizontal="right">
            <Fab color="primary" onClick={() => setShowModal(true)}>
              <IconPlus />
            </Fab>
          </FixedPositionedBox>
        )}
      </Box>
    );
  }

  const headerAction =
    !isMobile && canAddProductCategory ? (
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus size={20} />}
        onClick={() => setShowModal(true)}
      >
        <Typography variant="button">Add Product Category</Typography>
      </Button>
    ) : undefined;

  return (
    <FullLayout title="Product Categories" headerAction={headerAction}>
      <PageContainer
        title="Product Categories"
        description="Products categories page"
      >
        {content}
      </PageContainer>
    </FullLayout>
  );
};

const ProductsCategoriesPage = ProtectedRoute(ProductCategories, [
  ACTION_PERMISSIONS.VIEW_PRODUCT_CATEGORY,
]);

(ProductsCategoriesPage as any).getLayout = function getLayout(
  page: ReactElement
) {
  return <>{page}</>;
};

export default ProductsCategoriesPage;
