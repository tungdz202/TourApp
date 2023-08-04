import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import React from "react";

function Item(props: any) {
  return (
    <Paper sx={{ boxShadow: "none" }}>
      <Stack direction="row" spacing={2}>
        <Typography variant="subtitle1">{props.name}</Typography>
      </Stack>
    </Paper>
  );
}
export default function Provinces() {
  return (
    <Box className={styles.provinces}>
      <Typography
        sx={{
          marginLeft: 35,
          fontSize: "20px",
          fontWeight: "bold",
          color: "#000000",
          marginTop: "50px",
        }}
      >
        Khám phá những trải nghiệm tuyệt vời tại
      </Typography>
      <Box className={styles.slider}>
        <Box className={styles.slide_track}>
          {provinces.map((province) => (
            <Box className={styles.slide} key={province.name}>
              <img src={province.url} height={200} width={300}></img>
              <Typography
                sx={{
                  marginLeft: 2,
                  marginTop: "2px",
                  fontSize: "15px",
                  fontWeight: 550,
                  color: "#000000",
                }}
              >
                {province.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const provinces = [
  {
    id: 1,
    name: "Hà nội",
    url: "https://vcdn1-dulich.vnecdn.net/2022/05/11/hoan-kiem-lake-7673-1613972680-1508-1652253984.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=2wB1cBTUcNKuk68nrG6LMQ",
  },
  {
    id: 2,
    name: "Đà Nẵng",
    url: "https://vcdn1-dulich.vnecdn.net/2022/06/01/CauVangDaNang-1654082224-7229-1654082320.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=MeVMb72UZA27ivcyB3s7Kg",
  },
  {
    id: 3,
    name: "Hải Phòng",
    url: "https://xdcs.cdnchinhphu.vn/446259493575335936/2023/3/31/hai-phong-6-1680234763392125722891.jpg",
  },
  {
    id: 4,
    name: "Sài Gòn",
    url: "https://nucuoimekong.com/wp-content/uploads/dia-diem-chup-hinh-dep-o-sai-gon.jpg",
  },
  {
    id: 5,
    name: "Ninh Bình",
    url: "https://ik.imagekit.io/tvlk/blog/2022/12/du-lich-ninh-binh-1.jpg?tr=dpr-2,w-675",
  },
  {
    id: 6,
    name: "Thái Bình",
    url: "https://i1-dulich.vnecdn.net/2022/04/06/Bien-Thai-Binh-Doan-Ngoc-Anh-4-1649234099.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=fVcLXrxKTPhm9BeAClZM8A",
  },
  {
    id: 7,
    name: "Nam Định",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Statue_of_Tran_Hung_Dao%2C_Nam_Dinh_City%2C_Vietnam_%2803%29.jpg",
  },
  {
    id: 8,
    name: "Đà Lạt",
    url: "https://www.dalattrip.com/dulich/media/2017/12/thanh-pho-da-lat.jpg",
  },
  {
    id: 9,
    name: "Quảng Ninh",
    url: "https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-quang-ninh-1.jpg?tr=dpr-2,w-675",
  },
  {
    id: 10,
    name: "Lào Cai",
    url: "https://media.baodautu.vn/Images/phuongthanh02/2022/08/25/14-Du%20l%E1%BB%8Bch%20l%C3%A0o%20Cai%204.jpg",
  },
];
