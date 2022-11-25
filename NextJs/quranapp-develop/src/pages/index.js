import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Button, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuranChapters } from "/src/api/quran-chapter-api";
import Layout from "/src/components/Layout";
import MainBanner from "/src/components/banners/MainBanner";
import QuranListTab from "/src/components/navigation/QuranListTab";

export default function Home() {
  const { data, error, isLoading } = useQuranChapters();

  // console.log("data", data);

  // console.log("data in index", data);
  return (
    <Layout>
      <Head>
        <title>main quran page</title>
      </Head>
      <main>
        <Box sx={{ px: "20px", pt: "20px" }}>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: "18px", color: "#8789A3" }}
          >
            Asslamualaikum
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: 600,
              color: "#240F4F",
            }}
          >
            Tanvir Ahassan
          </Typography>
          <MainBanner />
          <QuranListTab />
        </Box>
      </main>
    </Layout>
  );
}
