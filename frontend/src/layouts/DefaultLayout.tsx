import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import MainLayout from "./MainLayout";

interface Props {
  children?: React.ReactNode;
}

function DefaultLayout(props: Props) {
  const { children } = props;

  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar />}
      rightbar={<Rightbar />}
      footer={<Footer />}
    >
      {children}
    </MainLayout>
  );
}

export default DefaultLayout;
