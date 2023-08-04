import React, { useEffect } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import SideBar from "../../../components/SideBar/SideBar";
import { useAppSelector } from "../../../Redux/store";
import { useDispatch } from "react-redux";
import { getAllTour, getHotTour2 } from "../../../Service/tour.service";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonUpdateTourList from "../../../components/ButttonCustom/ButtonUpdateTourList/ButtonUpdateTourList";
import { Tour, TourCompare } from "../../../types/TourCompare";
import {
  deleteTourAdmin,
  updateTourList,
} from "../../../Service/dashboard.service";
import ButtonChangePass from "../../../components/ButttonCustom/ButtonChangePass/ButtonChangePass";

export default function Tours() {
  //lấy thông tin tour
  const param = "tour";
  const tours: Tour[] = useAppSelector(
    (state) => state.hotTour.hotTour.allHotTour
  );
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

  //bộ lọc tour
  const [price, setPrice] = React.useState<string>("Tất cả các tour");
  const [value2, setValue2] = React.useState<number[]>([500000, 9500000]);
  const handleChange3 = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
  };
  const handelValue = (minprice: number, maxprice: number) => {
    setValue2([minprice, maxprice]);
    console.log(maxprice, minprice);
  };
  const [sortingOrder, setSortingOrder] = React.useState<SortingOrder>(
    SortingOrder.None
  );

  const handleSortNone = () => {
    setSortingOrder(SortingOrder.None);
  };
  const handleSortAsc = () => {
    setSortingOrder(SortingOrder.Ascending);
  };
  const handleSortDesc = () => {
    setSortingOrder(SortingOrder.Descending);
  };
  let list = SortingAlgorithm(newTour, sortingOrder);

  //
  const handleUpdateTour = async () => {
    const res = await updateTourList();
    return res;
  };
  const display = () => {
    toast.promise(
      handleUpdateTour,
      {
        pending: "Đang cập nhập danh sách Tour du lịch",
        success: "Cập nhật thành công 👌",
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };

  const [data, setData] = React.useState(tours);
  const [data2, setData2] = React.useState(tours);
  //search
  const Filter = (event: any) => {
    let row = data2.filter((f) =>
      f.name.toLowerCase().includes(event.target.value)
    );
    setData(row);
  };
  console.log(data2);
  const [tourSelect, setTourSelect] = React.useState<Tour>();
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);

  //cập nhật, xoá tour
  // const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  // const [name, setName] = React.useState<string>();
  // const [url, seturl] = React.useState<string>();
  // const [origin, setorigin] = React.useState<string>();
  // const [originalPrice, setoriginalPrice] = React.useState<string>();
  // const [presentPrice, setpresentPrice] = React.useState<string>();
  // const [time, settime] = React.useState<string>();
  // const [vehicle, setvehicle] = React.useState<string>();
  // const [highlightDestinations, sethighlightDestinations] =
  //   React.useState<string>();
  // const [schedules, setschedules] = React.useState<string[]>([]);
  // const [departurePoint, setdeparturePoint] = React.useState<string>();
  // const handleChangename = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };
  // const handelChangeurl = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   seturl(event.target.value);
  // };
  // const handelChangeorigin = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setorigin(event.target.value);
  // };
  // const handelChangeoriginalPrice = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setoriginalPrice(event.target.value);
  // };
  // const handelChangepresentPrice = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setpresentPrice(event.target.value);
  // };
  // const handelChangetime = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   settime(event.target.value);
  // };
  // const handelChangevehicle = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setvehicle(event.target.value);
  // };
  // const handelChangehighlightDestinations = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   sethighlightDestinations(event.target.value);
  // };

  // const handelChangedeparturePoint = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setdeparturePoint(event.target.value);
  // };

  // const selectTour = (tour: Tour) => {
  //   setName(tour.name)
  //   seturl(tour.url)
  //   setoriginalPrice(tour.originalPrice)
  //   setpresentPrice(tour.presentPrice)
  //   settime(tour.time)
  //   setvehicle(tour.vehicle)
  //   sethighlightDestinations(tour.highlightDestinations)
  //   setschedules(tour.schedules)
  //   setdeparturePoint(tour.departurePoint)
  // };

  const handelDeleteTour = async () => {
    const res = await deleteTourAdmin(tourSelect);
    if (res) alert(res);
    setIsOpenPopup(false);
  };
  const handelDelete = async (tour: Tour) => {
    setTourSelect(tour);
    setIsOpenPopup(true);
  };

  useEffect(() => {
    getAllTour(dispatch);
    setValue2([500000, 9500000]);
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
        <Box
          sx={{ display: "flex", flexDirection: "row", position: "relative" }}
        >
          <Typography
            variant="h5"
            fontWeight={550}
            sx={{ marginBottom: "40px" }}
          >
            Tour
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
            width: "770px",
            height: "130px",
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
            padding: "20px",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: "400px",
              height: "60px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "400px",
                height: "40px",
                display: "flex",
                flexDirection: "row",
                alignItems: "row",
              }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Typography>Chọn kinh phí: </Typography>
              </Box>
              <Box sx={{ width: "150px", height: "auto" }}>
                <Select
                  value={price}
                  sx={{ height: "30px", width: "150px" }}
                  onChange={handleChange3}
                >
                  {rangePrices.map((rangePrice) => (
                    <MenuItem
                      onClick={() =>
                        handelValue(rangePrice.minprice, rangePrice.maxprice)
                      }
                      value={rangePrice.name}
                      key={rangePrice.maxprice}
                    >
                      <Typography fontSize={"15px"}>
                        {rangePrice.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box
              sx={{
                width: "400px",
                height: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "row",
              }}
            >
              <Typography sx={{ marginRight: "10px" }}>
                Sắp xếp theo giá:{" "}
              </Typography>
              <Box>
                <button onClick={handleSortNone}>Gốc</button>
                <button onClick={handleSortDesc}>Giảm dần</button>
                <button onClick={handleSortAsc}>Tăng dần</button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {list.map((tour) => (
              <Box key={tour._id}>
                {tour.presentPrice >= value2[0] &&
                  tour.presentPrice <= value2[1] && (
                    <div
                      onClick={() => handelDelete(tour)}
                      style={{
                        width: "350px",
                        height: "300px",
                        margin: "20px",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: 400,
                          height: 300,
                          borderRadius: "15px",
                          border: "none",
                          boxShadow: "5px 5px 5px 5px #F5F5F5",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          height={"200px"}
                          width={"350px"}
                          src={tour.imgs[1]}
                          alt="tour"
                        />
                        <Box sx={{ padding: "10px" }}>
                          <Typography
                            fontWeight={550}
                            fontSize={"14px"}
                            height={"40px"}
                          >
                            {tour.name}
                          </Typography>
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Typography
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
                      </Box>
                    </div>
                  )}
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
      {isOpenPopup && (
        <div
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
              height: "500px",
              width: "700px",
              display: "flex",
              background: "#FFFFFF",
              boxShadow: "1px 2px 5px 2px #828282",
              borderRadius: "8px",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ width: "200px", paddingLeft: "15px" }}
              >
                Xác nhận xoá tour:
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  height: "auto",
                  width: "700px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  sx={{
                    margin: "15px",
                    height: "20px",
                    minWidth: "100px",
                  }}
                >
                  Name:
                </Typography>
                <Box
                  sx={{
                    padding: "10px 0px",
                    height: "auto",
                  }}
                >
                  <Box
                    sx={{
                      color: "rgba(34,49,63,0.6)",
                      borderRadius: "5px",
                      padding: "8px",
                      width: "500px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "rgba(34,49,63,0.6)",
                      }}
                    >
                      {tourSelect?.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  height: "50px",
                  width: "350px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  sx={{
                    margin: "15px",
                    height: "20px",
                    minWidth: "100px",
                  }}
                >
                  Giá:
                </Typography>
                <Box
                  sx={{
                    padding: "10px 0px",
                    height: "auto",
                  }}
                >
                  <Box
                    sx={{
                      color: "rgba(34,49,63,0.6)",
                      borderRadius: "5px",
                      padding: "8px",
                      width: "500px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "rgba(34,49,63,0.6)",
                      }}
                    >
                      {tourSelect?.presentPrice} vnd
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  height: "50px",
                  width: "350px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  sx={{
                    margin: "15px",
                    height: "20px",
                    minWidth: "100px",
                  }}
                >
                  Thời gian:
                </Typography>
                <Box
                  sx={{
                    padding: "10px 0px",
                    height: "auto",
                  }}
                >
                  <Box
                    sx={{
                      color: "rgba(34,49,63,0.6)",
                      borderRadius: "5px",
                      padding: "8px",
                      width: "500px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "rgba(34,49,63,0.6)",
                      }}
                    >
                      {tourSelect?.time}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "350px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  sx={{
                    margin: "15px",
                    height: "30px",
                    minWidth: "100px",
                  }}
                >
                  Lịch trình:
                </Typography>

                <Box
                  sx={{
                    padding: "10px 0px",
                    height: "auto",
                  }}
                >
                  <Box
                    sx={{
                      color: "rgba(34,49,63,0.6)",
                      borderRadius: "5px",
                      padding: "8px",
                      width: "500px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "rgba(34,49,63,0.6)",
                      }}
                    >
                      {tourSelect?.schedules.map((schedule, index) => (
                        <div key={schedule}>{schedule}</div>
                      ))}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                height: "80px",
                width: "650px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{ margin: "20px" }}
                onClick={() => setIsOpenPopup(false)}
              >
                <ButtonChangePass text={"Huỷ bỏ"} />
              </div>
              <div
                style={{ margin: "20px" }}
                onClick={() => handelDeleteTour()}
              >
                <ButtonChangePass text={"Xác nhận"} />
              </div>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
}

enum SortingOrder {
  Ascending = "asc",
  Descending = "desc",
  None = "none",
}

const SortingAlgorithm = (array: Tour[], sortOrder: SortingOrder) => {
  const bubbleSort = (arr: Tour[], order: SortingOrder): Tour[] => {
    if (order === SortingOrder.None) {
      return arr;
    }

    const n = arr.length;
    let tempArr = [...arr];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (
          (order === SortingOrder.Ascending &&
            tempArr[j].presentPrice > tempArr[j + 1].presentPrice) ||
          (order === SortingOrder.Descending &&
            tempArr[j].presentPrice < tempArr[j + 1].presentPrice)
        ) {
          // Swap elements
          let temp = tempArr[j];
          tempArr[j] = tempArr[j + 1];
          tempArr[j + 1] = temp;
        }
      }
    }

    return tempArr;
  };

  const sortedArray = bubbleSort(array, sortOrder);
  return sortedArray;
};

const rangePrices = [
  {
    name: "Tất cả các tour",
    minprice: 0,
    maxprice: 1000000000,
  },
  {
    name: "Dưới 1.000.000vnd ",
    minprice: 0,
    maxprice: 1000000,
  },
  {
    name: "Dưới 2.000.000vnd ",
    minprice: 0,
    maxprice: 2000000,
  },
  {
    name: "Dưới 3.000.000vnd ",
    minprice: 0,
    maxprice: 3000000,
  },
  {
    name: "Dưới 5.000.000vnd ",
    minprice: 0,
    maxprice: 5000000,
  },
  {
    name: "Dưới 7.000.000vnd ",
    minprice: 0,
    maxprice: 7000000,
  },
  {
    name: "Dưới 9.000.000vnd ",
    minprice: 0,
    maxprice: 9000000,
  },
  {
    name: "Dưới 10.000.000vnd ",
    minprice: 0,
    maxprice: 10000000,
  },
  {
    name: "Trên 10.000.000vnd ",
    minprice: 100000000,
    maxprice: 500000000,
  },
];
