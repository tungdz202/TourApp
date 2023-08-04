import React, { useEffect } from "react";
import { Typography, Box, Grid, CardMedia, Card } from "@mui/material";
import styles from "./styles.module.css";
import { getHotTour2 } from "../../Service/tour.service";
import { useAppSelector } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function HotTours() {
  const tours = useAppSelector((state) => state.hotTour.hotTour.allHotTour);
  console.log(tours);
  const dispatch = useDispatch();
  // const fetchData = async () => {
  //   const response = await getHotTour();
  //   // setTour(response);
  // };
  useEffect(() => {
    getHotTour2(dispatch);
  }, []);

  return (
    <div className={styles.container}>
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
        Các tour du lịch giờ chót
      </Typography>
      <Box>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={4}>
            {tours.map((tour) => (
              <Grid key={tour.name} item>
                <Box>
                  <a href={tour.url}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 200, width: 300 }}
                        image={tour.imgs[1]}
                      />
                    </Card>
                  </a>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "#000000",
                      paddingLeft: "15px",
                      paddingTop: "5px",
                      width: 300,
                    }}
                  >
                    {tour.name}
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
