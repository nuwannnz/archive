import { ReactElement, useEffect, useState } from "react";
import FullLayout from "../../src/layouts/full/FullLayout";
import ProtectedRoute from "../../src/layouts/full/shared/protectedRoute/ProtectedRoute";
import PageContainer from "../../src/components/container/PageContainer";
import { useMutateProductCategory } from "../../src/hooks/productCategoryHooks";
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
import { useConfirm } from "material-ui-confirm";
import { useToast } from "../../src/hooks/useToast";
import CenteredFlexBox from "../../src/components/shared/CenteredFlexBox";
import FixedPositionedBox from "../../src/components/shared/FixedPositionedBox";
import { useIsMobile } from "../../src/hooks/useIsMobile";
import { useIsAuthorizedTo } from "../../src/hooks/useIsAuthorized";
import { ACTION_PERMISSIONS } from "../../src/config/actionPermissions";
import {
  useMutateProductAttribute,
  useProductAttributes,
} from "../../src/hooks/productAttributeHooks";
import ProductAttributeModal from "../../src/components/modals/ProductAttributeModal";

const ProductAttributes = () => {
  const confirm = useConfirm();
  const { successToast, errorToast } = useToast();
  const { isMobile } = useIsMobile();

  const canAddProductAttribute = useIsAuthorizedTo(
    ACTION_PERMISSIONS.ADD_PRODUCT_ATTRIBUTE
  );
  const canUpdateProductAttribute = useIsAuthorizedTo(
    ACTION_PERMISSIONS.UPDATE_PRODUCT_ATTRIBUTE
  );
  const canDeleteProductAttribute = useIsAuthorizedTo(
    ACTION_PERMISSIONS.DELETE_PRODUCT_ATTRIBUTE
  );

  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedAttributeId, setSelectedAttributeId] = useState<
    string | undefined
  >(undefined);
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined);

  const { mutateProductAttribute } = useMutateProductAttribute();
  const { isLoading, productAttributes, isError, mutate } =
    useProductAttributes({
      limit,
      pageNumber: pageNumber + 1,
    });

  useEffect(() => {
    if (!showModal) {
      setSelectedAttributeId(undefined);
    }
  }, [showModal]);

  useEffect(() => {
    if (isError) {
      errorToast("Failed to load Product Attributes");
    }
  }, [isError]);

  const onDeleteClickHandler = async (attributeId: string) => {
    try {
      await confirm({ description: "Delete this Product Attribute?" });
      setDeletingId(attributeId);
      try {
        await mutateProductAttribute({ id: attributeId }, "Delete");
        mutate(); // refresh cache

        successToast("Deleted Product Attribute");
      } catch (error) {
        errorToast("Failed to Delete Product Attribute");
      } finally {
        setDeletingId(undefined);
      }
    } catch (error) {
      // user cancelled, ignore
    }
  };

  let content = <></>;

  if (isLoading) {
    content = (
      <CenteredFlexBox height="70vh">
        <CircularProgress />
      </CenteredFlexBox>
    );
  } else if (productAttributes) {
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
                <Typography variant="subtitle2" fontWeight={600}>
                  Options
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productAttributes.data.map((productAttribute) => (
              <TableRow
                key={productAttribute._id}
                hover
                onClick={() => {
                  setSelectedAttributeId(productAttribute._id);
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
                    {productAttribute.name}
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
                      color={productAttribute.isActive ? "success" : "default"}
                      size="small"
                      label={productAttribute.isActive ? "Published" : "Hidden"}
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
                    {productAttribute.options.map((option) => (
                      <Chip
                        key={option.id}
                        sx={{
                          px: "2px",
                        }}
                        color="default"
                        size="small"
                        label={option.name}
                      ></Chip>
                    ))}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row-reverse">
                    {canDeleteProductAttribute && (
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onDeleteClickHandler(productAttribute._id as string);
                        }}
                      >
                        {deletingId === productAttribute._id ? (
                          <CircularProgress size={20} color="info" />
                        ) : (
                          <IconTrash />
                        )}
                      </IconButton>
                    )}
                    {canUpdateProductAttribute && (
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedAttributeId(productAttribute._id);
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
          count={productAttributes.totalCount}
          page={pageNumber}
          onPageChange={(_e, n) => setPageNumber(n)}
          rowsPerPage={limit}
          onRowsPerPageChange={(e) => setLimit(Number(e.target.value))}
        />
        <ProductAttributeModal
          isOpen={showModal}
          productAttributeId={selectedAttributeId}
          isReadOnly={
            selectedAttributeId !== undefined && !canUpdateProductAttribute
          }
          closeModal={(refresh) => {
            setShowModal(false);
            if (refresh) {
              mutate();
            }
          }}
        />
        {isMobile && canAddProductAttribute && (
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
    !isMobile && canAddProductAttribute ? (
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus size={20} />}
        onClick={() => setShowModal(true)}
      >
        <Typography variant="button">Add Product Attribute</Typography>
      </Button>
    ) : undefined;

  return (
    <FullLayout title="Product Attributes" headerAction={headerAction}>
      <PageContainer
        title="Product Attributes"
        description="Products Attributes page"
      >
        {content}
      </PageContainer>
    </FullLayout>
  );
};

const ProductsAttributesPage = ProtectedRoute(ProductAttributes, [
  ACTION_PERMISSIONS.VIEW_PRODUCT_ATTRIBUTE,
]);

(ProductsAttributesPage as any).getLayout = function getLayout(
  page: ReactElement
) {
  return <>{page}</>;
};

export default ProductsAttributesPage;
