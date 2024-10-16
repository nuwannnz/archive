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
import { useMutateProduct, useProducts } from "../../src/hooks/productHooks";
import Image from "next/image";

const Products = () => {
  const confirm = useConfirm();
  const { successToast, errorToast } = useToast();
  const { isMobile } = useIsMobile();

  const canAddProduct = useIsAuthorizedTo(ACTION_PERMISSIONS.ADD_PRODUCT);
  const canUpdateProduct = useIsAuthorizedTo(ACTION_PERMISSIONS.UPDATE_PRODUCT);
  const canDeleteProduct = useIsAuthorizedTo(ACTION_PERMISSIONS.DELETE_PRODUCT);

  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >(undefined);
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined);

  const { mutateProduct } = useMutateProduct();
  const { isLoading, products, isError, mutate } = useProducts({
    limit,
    pageNumber: pageNumber + 1,
  });

  useEffect(() => {
    if (!showModal) {
      setSelectedProductId(undefined);
    }
  }, [showModal]);

  useEffect(() => {
    if (isError) {
      errorToast("Failed to load Products");
    }
  }, [isError]);

  const onDeleteClickHandler = async (productId: string) => {
    try {
      await confirm({ description: "Delete this Product?" });
      setDeletingId(productId);
      await mutateProduct({ id: productId }, "Delete");
      mutate(); // refresh cache

      successToast("Deleted Product");
    } catch (error) {
      errorToast("Failed to Delete Product");
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
  } else if (products) {
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
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.data.map((product) => (
              <TableRow
                key={product._id}
                hover
                onClick={() => {
                  setSelectedProductId(product._id);
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
                    {product.name}
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
                      }}
                      color="default"
                      size="small"
                      label={product.productCategoryId.name}
                    ></Chip>
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
                      color={product.isActive ? "success" : "default"}
                      size="small"
                      label={product.isActive ? "Published" : "Hidden"}
                    ></Chip>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row-reverse">
                    {canDeleteProduct && (
                      <IconButton
                        onClick={() =>
                          onDeleteClickHandler(product._id as string)
                        }
                      >
                        {deletingId === product._id ? (
                          <CircularProgress size={20} color="info" />
                        ) : (
                          <IconTrash />
                        )}
                      </IconButton>
                    )}
                    {canUpdateProduct && (
                      <IconButton
                        onClick={() => {
                          setSelectedProductId(product._id);
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
          count={products.totalCount}
          page={pageNumber}
          onPageChange={(_e, n) => setPageNumber(n)}
          rowsPerPage={limit}
          onRowsPerPageChange={(e) => setLimit(Number(e.target.value))}
        />
        <ProductCategoryModal
          isOpen={showModal}
          productCategoryId={selectedProductId}
          isReadOnly={selectedProductId !== undefined && !canUpdateProduct}
          closeModal={(refresh) => {
            setShowModal(false);
            if (refresh) {
              mutate();
            }
          }}
        />
        {isMobile && canAddProduct && (
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
    !isMobile && canAddProduct ? (
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus size={20} />}
        onClick={() => setShowModal(true)}
      >
        <Typography variant="button">Add Product</Typography>
      </Button>
    ) : undefined;

  return (
    <FullLayout title="Products" headerAction={headerAction}>
      <PageContainer title="Products" description="Products page">
        {content}
      </PageContainer>
    </FullLayout>
  );
};

const ProductsPage = ProtectedRoute(Products, [
  ACTION_PERMISSIONS.VIEW_PRODUCT,
]);

(ProductsPage as any).getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ProductsPage;
