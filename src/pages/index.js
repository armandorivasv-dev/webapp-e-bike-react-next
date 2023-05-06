"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Strapi from "./strapi";
import ResponsiveDrawer from "@/components/Menu/ResponsiveDrawer";
import { DashboardLayout } from "./dashboard-layout";
import { useState, useEffect } from "react";
import UserInfo from "@/components/Account/UserInfo";
import { getUserApi } from "@/services/api/auth";
import useAuth from "@/hooks/useAuth";
import ProductNews from "@/components/Home/ProductNews";
import Search from "@/components/Search/SearchProductsBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState(null);

  const apiUrl = process.env.API_URL_ENV;

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getUserApi(auth.token);
      console.log("index - response -->", response);
      setUser(response);
    })();
  }, []);

  console.log("index - user -->", user);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!user ? <h1>Cargando...</h1> : <UserInfo user={user} />}
        <Search />
        <ProductNews />
        {/* <Image
          width="250"
          height="250"
          alt="Images"
          src="http://127.0.0.1:1337/uploads/crosscountry_marlin_52a1ee825b.jpg"
          //src={`${apiUrl}/uploads/crosscountry_marlin_52a1ee825b.jpg`}
          priority
        /> */}
      </main>
    </>
  );
}

Home.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
