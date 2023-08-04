import { Box, Card, CardMedia, Typography } from "@mui/material";
import React, { useEffect } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import SideBar from "../../../components/SideBar/SideBar";
import { useAppSelector } from "../../../Redux/store";
import { useDispatch } from "react-redux";
import { getCollection } from "../../../Service/collection.service";
import { TourCollection, TourCompare } from "../../../types/TourCompare";
import { updateCollection } from "../../../Service/dashboard.service";
import ButtonUpdateTourList from "../../../components/ButttonCustom/ButtonUpdateTourList/ButtonUpdateTourList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Collection() {
  const param = "collection";
  const Collections = useAppSelector(
    (state) => state.collection.collection.collection
  );
  const [listTour, setListTour] = React.useState<TourCollection[]>();
  const handleSetListTour = (tour: TourCollection[]) => {
    setListTour(tour);
  };
  console.log(listTour);

  const handleUpdateCollection = async () => {
    const res = await updateCollection();
    return res;
  };
  const display = () => {
    toast.promise(
      handleUpdateCollection,
      {
        pending: "Đang cập nhập danh sách Collection",
        success: "Cập nhật thành công 👌",
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getCollection(dispatch);
  }, []);
  return (
    <Box>
      <HeaderAdmin />
      <SideBar param={param} />
      <Box
        sx={{
          height: "600px",
          width: "1150px",
          margin: "120px 0px 0px 340px",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", position: "relative" }}
        >
          <Typography
            variant="h5"
            fontWeight={550}
            sx={{ marginBottom: "40px" }}
          >
            Danh sách Collection
          </Typography>
          <Box sx={{ position: "absolute", right: "0px" }}>
            <a onClick={() => display()}>
              <ButtonUpdateTourList />
            </a>
            <ToastContainer />
          </Box>
        </Box>

        <Box
          sx={{
            width: "1150px",
            height: "600px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              height: "495px",
              width: "650px",
              overflow: "hidden",
              boxShadow: " 0px 7px 29px 0px rgba(100, 100, 111, 0.25)",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                height: "500px",
                width: "700px",
                display: "flex",
                flexDirection: "column",
                overflowX: "scroll",
                padding: "10px 30px 20px 40px",
              }}
            >
              {Collections.map((collection) => (
                <a
                  key={collection._id}
                  style={{
                    width: "550px",
                    height: "auto",
                    margin: "5px",
                    background: "#FDF5E6",
                    borderRadius: "10px",
                    padding: "5px 10px",
                  }}
                  onClick={() => handleSetListTour(collection.listTour)}
                >
                  {collection.name}
                </a>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              height: "500px",
              marginLeft: "50px",
              width: "450px",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              boxShadow: " 0px 7px 29px 0px rgba(100, 100, 111, 0.25)",
              borderRadius: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "550",
                color: "#528B8B",
              }}
            >
              Các tour trong collection
            </Typography>
            <Box
              sx={{
                height: "500px",
                width: "400px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "450px",
                  width: "430px",
                  display: "flex",
                  flexDirection: "column",
                  overflowX: "scroll",
                  padding: "20px",
                  marginLeft: "30px",
                }}
              >
                {listTour?.map((tour) => (
                  <Box key={tour.url}>
                    <Box
                      key={tour.url}
                      sx={{
                        maxWidth: 400,
                        maxHeight: 500,
                      }}
                    >
                      <Box
                        sx={{
                          width: "400px",
                          minHeight: "320px",

                          // backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),url(${tour.imgs[0]})`,
                        }}
                      >
                        <a href={tour.url} style={{ textDecoration: "none" }}>
                          <Card sx={{ maxWidth: 350, borderRadius: "8px" }}>
                            <CardMedia
                              sx={{ height: 200 }}
                              image={tour.imgs[1]}
                              title="tour"
                            />
                          </Card>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000000",
                              paddingLeft: "5px",
                              paddingTop: "5px",
                              width: 350,
                            }}
                          >
                            {tour.name}
                          </Typography>
                        </a>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Box
                            sx={{
                              width: "220px",
                            }}
                          >
                            <Typography
                              variant="h6"
                              fontWeight={550}
                              color={"#fc0309"}
                            >
                              <span>Giá ưu đãi: </span> {tour.presentPrice}
                              <span
                                style={{
                                  marginLeft: "3px",
                                  fontSize: "16px",
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
                              <Typography fontSize={"15px"}>
                                Giá gốc: {tour.originalPrice}
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
                          <Box sx={{ width: "120px" }}>
                            <Typography
                              fontSize={"13px"}
                              fontWeight={550}
                              color={"#777777"}
                            >
                              Phương tiện: {tour.vehicle}
                            </Typography>
                            <Typography
                              fontSize={"13px"}
                              fontWeight={550}
                              color={"#777777"}
                            >
                              Lịch trình: {tour.time}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
