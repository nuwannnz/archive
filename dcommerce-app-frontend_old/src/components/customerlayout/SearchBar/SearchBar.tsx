import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serialize } from "../../../util";
import "./SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = () => {
    navigate(`/products?${serialize({ searchKey })}`);
  };

  return (
    <TextField
      className="search-bar"
      id="outlined-basic"
      variant="outlined"
      placeholder="Search"
      onChange={(e) => {
        setSearchKey(e.target.value);
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleSearch();
      }}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}

export default SearchBar;
