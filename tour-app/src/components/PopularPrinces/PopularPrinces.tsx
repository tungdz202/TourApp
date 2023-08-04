import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CardMedia,
  Card,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProvinceSuccess } from "../../Redux/State/Province.slice";
export default function PopularPrinces() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (province: any) => {
    dispatch(getProvinceSuccess({ name: province }));
    navigate("/tour");
  };
  return (
    <div className="container">
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#000000",
          marginTop: "50px",
          marginBottom: "80px",
        }}
      >
        Khám phá những điểm đến yêu thích
      </Typography>
      <Box>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={4}>
            {provinces.map((province) => (
              <Grid key={province.id} item>
                <Box>
                  <Card
                    sx={{ maxWidth: 345 }}
                    onClick={() => handleNavigate(province.province)}
                  >
                    <CardMedia
                      sx={{ height: 200, width: 300 }}
                      image={province.img}
                    />
                  </Card>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "#000000",
                      paddingLeft: "15px",
                      paddingTop: "5px",
                    }}
                  >
                    {province.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

const provinces = [
  {
    name: "Đà Nẵng",
    id: "001",
    province: "Đà Nẵng",
    district: "Đà Nẵng",
    province_id: "001",
    district_id: "001",
    img: "https://liontrip.vn/wp-content/uploads/2022/06/Tour-du-li%CC%A3ch-Da%CC%80-Na%CC%86%CC%83ng-_-Du-li%CC%A3ch-Lion-Trip.png",
  },
  {
    name: "Hà Nội",
    id: "002",
    province: "Hà Nội",
    district: "Hà Nội",
    province_id: "002",
    district_id: "002",
    img: "https://vcdn1-dulich.vnecdn.net/2022/05/12/Hanoi2-1652338755-3632-1652338809.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=NxMN93PTvOTnHNryMx3xJw",
  },
  {
    name: "Phú Quốc",
    id: "003",
    province: "Phú Quốc",
    district: "Phú Quốc",
    province_id: "003",
    district_id: "003",
    img: "https://2trip.vn/wp-content/uploads/2020/08/dao-ngoc-phu-quoc.jpg",
  },
  {
    name: "Ninh Bình",
    id: "004",
    province: "Ninh Bình",
    district: "Ninh Bình",
    province_id: "004",
    district_id: "004",
    img: "https://image.nhandan.vn/w800/Uploaded/2023/igpcvcvjntc8510/2023_02_08/trang-an-5882.jpg",
  },
];
