import React, { useEffect } from "react";
import { useAppSelector } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { Box, Card, CardMedia, List, Typography } from "@mui/material";
import { Collection } from "../../types/Collection";
import { TourCompare } from "../../types/TourCompare";
import { getCompareTourSuccess } from "../../Redux/State/Comparetours.slice";
import ButtonAddTourCompare from "../ButttonCustom/ButtonAddTourCompare/ButtonAddTourCompare";
import { updateHistorySeen } from "../../Service/account.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListTour(props: { collection: Collection }) {
  //lấy thông tin user
  const historyTracking = (tourname: any) => {
    updateHistorySeen(tourname);
  };

  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  let ListourCompare: TourCompare[] = useAppSelector(
    (state) => state.tourCompare.ListTour.listCompareTour
  );

  let newList: TourCompare[] = [...ListourCompare];
  const dispatch = useDispatch();
  const checkExist = (tour: TourCompare) => {
    if (newList.length == 0) {
      return false;
    } else {
      for (let tourCompare of newList) {
        if (tour._id == tourCompare._id) return true;
      }
    }
  };

  const addTourCompare = (tour: any) => {
    if (checkExist(tour)) {
      toast.warn("Tour đã trong danh sách so sánh", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (newList.length == 4) {
      toast.warn("Danh sách so sánh đã đầy", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      newList.push(tour);
      historyTracking(tour);
      dispatch(getCompareTourSuccess(newList));
      toast.success("Đã thêm tour vào bảng so sánh", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <a onClick={() => setIsOpenPopup(true)}>
        <Box>
          <Box
            sx={{
              width: "600px",
              height: "300px",
              // backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),url(${tour.imgs[0]})`,
            }}
          >
            <Card sx={{ maxWidth: 550 }}>
              <CardMedia
                sx={{ height: 200 }}
                image={props.collection.imgs[0]}
                title="green iguana"
              />
            </Card>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000000",
                paddingLeft: "5px",
                paddingTop: "5px",
                width: 550,
              }}
            >
              {props.collection.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  width: "350px",
                }}
              >
                <Typography variant="h6" fontWeight={550} color={"#fc0309"}>
                  <span>Giá chỉ từ: </span> {props.collection.price}
                  <span
                    style={{
                      marginLeft: "3px",
                      fontSize: "16px",
                    }}
                  >
                    đ
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </a>
      {isOpenPopup && (
        <div
          onClick={() => setIsOpenPopup(false)}
          style={{
            position: "fixed",
            background: "rgba(255,255,255,0.5)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              maxHeight: "650px",
              maxWidth: "1200px",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              background: "#FFFFFF",
              boxShadow: "1px 2px 5px 2px #828282",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
            {props.collection.listTour.map((tour) => (
              <Box
                key={tour.url}
                sx={{
                  maxWidth: 450,
                  maxHeight: 500,
                  margin: "30px",
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
                    <Card sx={{ maxWidth: 400 }}>
                      <CardMedia
                        sx={{ height: 200 }}
                        image={tour.imgs[1]}
                        title="green iguana"
                      />
                    </Card>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "#000000",
                        paddingLeft: "5px",
                        paddingTop: "5px",
                        width: 400,
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
                        width: "350px",
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
                    <Box>
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
                <div
                  onClick={() =>
                    addTourCompare({
                      ...tour,
                      departurePoint: props.collection.departurePoint,
                    })
                  }
                  style={{
                    marginLeft: "60px",
                  }}
                >
                  <ButtonAddTourCompare />
                </div>
              </Box>
            ))}
          </Box>
        </div>
      )}
    </div>
  );
}
