import React from "react";
import styles from "@/styles/Account.module.css";
import { DashboardLayout } from "../dashboard-layout";

const Account = () => {
  return (
    <main className={styles.main}>
      <h1>Account</h1>
    </main>
  );
};

export default Account;

Account.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
