import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
import { useAppContext } from "contexts/AppContext";

const SearchBox = () => {
  const parentRef = useRef();
  const [_, startTransition] = useTransition();
  const [resultList, setResultList] = useState([]);
  const [query, setQuery] = useState(""); // Query state
  const { setMainContent, setSearchValue } = useAppContext();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      if (!value) setResultList([]);
      else setResultList(dummySearchResult);
    });
  };

  const handleSearchClick = () => {
    setSearchValue(query); // Update search context with query
    setResultList([]); // Clear results after search
    setMainContent("SEARCHRESULT");
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      ref={parentRef}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for products, categories, or brands..."
        value={query}
        sx={{borderRadius: "0px !important"}}
        onChange={handleInputChange}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "& .MuiOutlinedInput-input": {
              borderRadius: "6px 0 0 6px !important", 
              paddingLeft: "10px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: (
            <Button
              color="primary"
              disableElevation
              variant="contained"
              onClick={handleSearchClick}
              sx={{
                px: "3rem",
                height: "100%",
                borderRadius: "0 300px 300px 0",
              }}
            >
              Search
            </Button>
          ),
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {resultList.length > 0 && (
        <SearchResultCard elevation={2} role="listbox">
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item} passHref>
              <MenuItem>{item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

const dummySearchResult = [
  "",
  // "Asus K555LA",
  // "Acer Aspire X453",
  // "iPad Mini 3",
];

export default SearchBox;
