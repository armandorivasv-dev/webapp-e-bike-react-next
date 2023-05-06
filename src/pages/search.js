import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { DashboardLayout } from "./dashboard-layout";
import SearchProductList from "../components/Search/SearchProductList";
import SearchProductsBar from "../components/Search/SearchProductsBar";
import { useRouter } from "next/router";
import { searchProductApi } from "@/services/api/search";
import { Typography } from "@mui/material";

const SearchProduct = () => {
  const router = useRouter();
  const { search } = router.query;

  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductApi(search);
      setProducts(response.data);
    })();
  }, [search]);

  return (
    <main className={styles.main}>
      <SearchProductsBar currentSearch={search} />
      {!products ? (
        <h1>Cargando productos...</h1>
      ) : products.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          No hay resultados, intente otro termino de busqueda...
        </Typography>
      ) : (
        <SearchProductList products={products} />
      )}
    </main>
  );
};

SearchProduct.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SearchProduct;
