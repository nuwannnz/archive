import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AppDispatch, RootState } from "../../../../store";
import { fetchProductCategoryList } from "../../../../actions/admin-product-category.action";

function CategoryPanel() {
  const dispatch = useDispatch<AppDispatch>();

  const [showMore, setShowMore] = useState(false);

  const { isFetching, data: productCategoryList } = useSelector(
    (state: RootState) => state.adminProductCategory.adminProductCategoryList
  );

  useEffect(() => {
    if (productCategoryList?.data.length === 0)
      dispatch(fetchProductCategoryList({ limit: 100 }));
  }, []);

  if (isFetching)
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List
        style={{ maxHeight: "100%", overflow: "auto", height: "240px" }}
        disablePadding
      >
        {productCategoryList?.data.length > 0 &&
          productCategoryList?.data
            .slice(0, showMore ? productCategoryList?.data.length : 5)
            .map((ele) => (
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText primary={ele.name} />
                </ListItemButton>
              </ListItem>
            ))}
      </List>

      <Button
        variant="text"
        size="small"
        onClick={() => setShowMore(!showMore)}
        sx={{ paddingLeft: "15px" }}
      >
        {showMore ? "Show Less" : "Show More"}
      </Button>
    </Box>
  );
}

export default CategoryPanel;
