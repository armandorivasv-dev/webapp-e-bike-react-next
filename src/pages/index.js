"use client";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { DashboardLayout } from "./dashboard-layout";
import ProductNews from "@/components/Home/ProductNews";
import Search from "@/components/Search/SearchProductsBar";
import ProductCarousel from "@/components/Home/ProductCarousel";
import { getUserApi } from "@/services/api/auth";
import { useState, useEffect, useMemo, useCallback } from "react";
import useAuth from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState(null);
  const { logout, auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getUserApi(auth.token);
      setUser(response);
    })();
  }, []);

  return (
    <>
      <Head>
        <title> E-bike - Tienda MountainBike</title>
        <meta
          name="description"
          content="Tienda especializada en MountainBike"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ProductCarousel />
        <Search />
        <ProductNews user={user} />
      </main>
    </>
  );
}

Home.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
