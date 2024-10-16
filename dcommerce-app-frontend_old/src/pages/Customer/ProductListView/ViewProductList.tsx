/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import "./ViewProductList.css";
import ListIcon from "@mui/icons-material/List";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { IAdminProduct } from "../../../types/AdminProduct";
import { adminProductActions } from "../../../store/admin-products.slice";
import { fetchProductList } from "../../../actions/admin-products.actions";
import { AppDispatch, RootState } from "../../../store";
import Product from "./ProductCard/ProductCard";
import { getSortOptions } from "../../../util";
import SideMenuLayout from "../../../components/customerlayout/SideMenu/SideMenuLayout";

function ViewProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const [sortOption, setSortOption] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: productList, isFetching } = useSelector(
    (state: RootState) => state.adminProduct.adminProductList
  );

  useEffect(() => {
    dispatch(
      fetchProductList({
        limit,
        pageNumber: currentPage,
        ...getSortOptions(sortOption),
        searchKey: searchParams.get("searchKey"),
      })
    );

    return () => {
      dispatch(adminProductActions.resetAdminProductFetch());
    };
  }, [currentPage, sortOption, searchParams]);

  const handleSort = (event: SelectChangeEvent) => {
    // setSearchParams({id:"new2"});
    setSortOption(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setCurrentPage(p);
  };

  return (
    <SideMenuLayout>
      <>
        <div className="product-list-title">
          <h3>Products</h3>
          {/* <p>page results count</p> */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={sortOption}
              onChange={handleSort}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Default Sorting</MenuItem>
              <MenuItem value="atz">By Name: A to Z</MenuItem>
              <MenuItem value="zta">By Name: Z to A</MenuItem>
              <MenuItem value="lth">By Price: Low to High</MenuItem>
              <MenuItem value="htl">By Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="product-list-filters">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
              <ListIcon />
            </IconButton>
            <h4>Filters</h4>
            <Drawer open={mobileOpen} onClose={handleDrawerToggle}>
              <div className="side-menu-slider">
                <div
                  className="categories center-column "
                  style={{
                    maxHeight: "30rem",
                    backgroundColor: "white",
                    flex: 0.35,
                  }}
                >
                  categories
                </div>
                <div className="filters ">
                  <div className="brands">brands</div>
                  <div className="color">color</div>
                  <div className="price">price</div>
                  <div className="rating">rating</div>
                </div>
                <div
                  className="side-image"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 0.35,
                    backgroundColor: "white",
                  }}
                >
                  image
                </div>
              </div>
            </Drawer>
          </div>
          <p>default sorting</p>
        </div>
        {isFetching ? (
          <div className="spinner">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="product-list-item-container">
              {productList?.data?.map((product: IAdminProduct) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
            {productList?.data?.length > 0 && (
              <Stack
                spacing={2}
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Pagination
                  count={productList?.totalPages}
                  page={currentPage}
                  color="primary"
                  onChange={handleChange}
                />
              </Stack>
            )}
          </>
        )}
      </>
    </SideMenuLayout>
  );
}

export default ViewProductList;
