import React, { useEffect, useState } from "react";
import { Container, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "@mkyy/mui-search-bar";
import { useRouter } from "next/router";
import { getSearchApi, updateSearchApi } from "@/services/api/search";
import { SEARCH_HISTORY, TOKEN } from "@/utils/constants";

const SearchProductsBar = (props) => {
  const { currentSearch } = props;
  const [searchQuery, setSearchQuery] = useState(currentSearch || "");
  const [searchHistory, setSearchHistory] = useState(null);
  const onChangeSearch = (query) => setSearchQuery(query);

  const { push } = useRouter();

  const onSearch = (reuseSearch) => {
    const isReuse = typeof reuseSearch === "string";
    !isReuse && updateSearchApi(searchQuery);
    push({
      pathname: "/search",
      query: { search: searchQuery },
    });
  };

  useEffect(() => {
    (async () => {
      const response = await getSearchApi(SEARCH_HISTORY);
      const searchList = response.map((item) => item.search);
      setSearchHistory(searchList);
    })();
  }, [searchQuery]);

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 1, mb: 3 }}>
        <SearchBar
          placeholder="Busca un producto aqui..."
          value={searchQuery}
          onChange={onChangeSearch}
          onSearch={onSearch}
          options={searchHistory}
          width="400px"
        />
      </Container>
    </>
  );
};

export default SearchProductsBar;
