import React, { useEffect } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import SideBar from "../../../components/SideBar/SideBar";
import { useAppSelector } from "../../../Redux/store";
import { useDispatch } from "react-redux";
import { getAllTour, getHotTour2 } from "../../../Service/tour.service";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export default function Tours() {
  const param = "tour";
  const tours = useAppSelector((state) => state.hotTour.hotTour.allHotTour);
  const newTour = [];
  const dispatch = useDispatch();
  for (let tour of tours) {
    const newOriginalPrice = tour.originalPrice.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    const newPresentPrice = tour.presentPrice.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    let newtour = {
      ...tour,
      newOriginalPrice: newOriginalPrice,
      newPresentPrice: newPresentPrice,
    };
    tour = newtour;
    newTour.push(tour);
  }

  useEffect(() => {
    getAllTour(dispatch);
  }, []);
  return (
    <Box sx={{ backgroundColor: "#F9FAFB", height: "100vh" }}>
      <HeaderAdmin />
      <SideBar param={param} />
      <Box
        sx={{
          height: "400px",
          width: "1150px",
          margin: "120px 0px 0px 340px",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Typography variant="h5" fontWeight={550} sx={{ marginBottom: "40px" }}>
          Tour
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {newTour.map((tour) => (
              <Grid item xs={2} sm={4} md={4} key={tour.name}>
                <Card
                  sx={{
                    maxWidth: 400,
                    height: 300,
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "5px 5px 5px 5px #F5F5F5;",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={tour.imgs[1]}
                      alt="tour"
                    />
                    <Box sx={{ padding: "10px" }}>
                      <Typography
                        fontWeight={550}
                        fontSize={"14px"}
                        height={"50px"}
                      >
                        {tour.name}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          component="div"
                          fontWeight={550}
                          fontSize={"15px"}
                          margin={"10px 5px 10px 10px"}
                        >
                          {tour.newPresentPrice}
                          <span
                            style={{
                              marginLeft: "3px",
                              fontSize: "12px",
                              fontWeight: "550",
                            }}
                          >
                            đ
                          </span>
                        </Typography>
                        <Box
                          sx={{
                            textDecoration: "line-through",
                            color: "#999999",
                          }}
                        >
                          <Typography
                            component="div"
                            fontWeight={550}
                            fontSize={"15px"}
                            margin={"10px"}
                          >
                            {tour.newOriginalPrice}
                            <span
                              style={{
                                marginLeft: "3px",
                                fontSize: "12px",
                                fontWeight: "550",
                              }}
                            >
                              đ
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
