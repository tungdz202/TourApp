import React, { useEffect } from "react";
import Header from "../../../components/Header/Header";
import Slide from "../../../components/Slide/Slide";
import style from "./Style.module.css";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { blog } from "../../../public/img/index";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  FormControl,
  Grid,
  MenuItem,
  Popper,
  PopperPlacementType,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../Redux/store";
import { useDispatch } from "react-redux";
import ListTour from "../../../components/ListTour/ListTour";
import { getCollectionbyProvince } from "../../../Service/collection.service";
import WeatherBar from "../../../components/WeatherBar/weatherBar";
import { getProvinceSuccess } from "../../../Redux/State/Province.slice";
import { background } from "../../../public/img";
import { Collection } from "../../../types/Collection";
import CompareTourTable from "../../../components/CompareTourTable/CompareTourTable";
import TopHead from "../../../components/TopHead/TopHead";
import { BlogDetail } from "../../../types/Blog";
import { getlistBlog } from "../../../Service/blog.service";
import ButtonBlog from "../../../components/ButttonCustom/ButtonBlog/ButtonBlog";
import { useNavigate } from "react-router-dom";

enum SortingOrder {
  Ascending = "asc",
  Descending = "desc",
  None = "none",
}

const SortingAlgorithm = (array: Collection[], sortOrder: SortingOrder) => {
  const bubbleSort = (arr: Collection[], order: SortingOrder): Collection[] => {
    if (order === SortingOrder.None) {
      return arr;
    }

    const n = arr.length;
    let tempArr = [...arr];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (
          (order === SortingOrder.Ascending &&
            tempArr[j].priceMin > tempArr[j + 1].priceMin) ||
          (order === SortingOrder.Descending &&
            tempArr[j].priceMin < tempArr[j + 1].priceMin)
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

export default function Tours() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/blog");
  };

  //lấy thông tin tỉnh thành từ store
  const provincetest = useAppSelector(
    (state) => state.province.province.province
  );
  //lấy các collection từ store
  const Collections = useAppSelector(
    (state) => state.collection.collection.collection
  );
  const newCollections: Collection[] = [];
  const dispatch = useDispatch();

  //lấy giá thấp nhất và cao nhất của tour trong collection
  for (let collection of Collections) {
    let priceMinCheck = 50000000;
    let priceMaxCheck = 0;
    for (const tour of collection.listTour) {
      if (tour.presentPrice <= priceMinCheck) {
        priceMinCheck = tour.presentPrice;
      }
      if (tour.presentPrice > priceMaxCheck) {
        priceMaxCheck = tour.presentPrice;
      }
    }
    const price = priceMinCheck.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    const newCollection = {
      ...collection,
      price: price,
      priceMin: priceMinCheck,
      priceMax: priceMaxCheck,
    };
    newCollections.push(newCollection);
  }
  //bộ lọc giá
  const [price, setPrice] = React.useState<string>("Tất cả các tour");
  const [value2, setValue2] = React.useState<number[]>([500000, 9500000]);
  const handleChange3 = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
  };
  const handelValue = (minprice: number, maxprice: number) => {
    setValue2([minprice, maxprice]);
    console.log(maxprice, minprice);
  };

  //bộ sắp xếp theo giá
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
  let list = SortingAlgorithm(newCollections, sortingOrder);

  //tỉnh thành
  const [province, setProvince] = React.useState<String>(provincetest.name);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleProvince = (province: String) => {
    setProvince(province);
    dispatch(getProvinceSuccess({ name: province }));
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  //Bộ lọc theo địa điểm khởi hành
  const [departurePoint, setDeparturePoint] =
    React.useState("Mọi miền tổ quốc");

  const handleChange = (event: SelectChangeEvent) => {
    setDeparturePoint(event.target.value);
  };

  let ListBlog: BlogDetail[] = useAppSelector(
    (state) => state.blog.blog.ListBlog
  );

  useEffect(() => {
    getCollectionbyProvince(dispatch, { province });
    setValue2([500000, 9500000]);
    getlistBlog(dispatch);
  }, [province]);

  return (
    <div className={style.container}>
      <TopHead />
      <Header />
      <Slide />
      <Box
        sx={{
          width: "1200px",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "-105px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
          sx={{ zIndex: "2" }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    width: "600px",
                    background: "#FFFFFF",
                    opacity: 0.9,
                    borderRadius: "10px",
                    boxShadow: "2px 2px 5px 1px grey;",
                  }}
                >
                  <Grid
                    container
                    spacing={{ xs: 1 }}
                    columns={{ xs: 1, sm: 5 }}
                  >
                    {district.map((d) => (
                      <Grid item xs={2} sm={1} key={d.name}>
                        <Card sx={{ boxShadow: "none" }}>
                          <Button
                            sx={{
                              width: "100px",
                              padding: "5px",
                              marginLeft: "5px",
                            }}
                            onClick={() => handleProvince(d.name)}
                          >
                            <Typography fontSize={"13px"} color={"#696969"}>
                              {d.name}
                            </Typography>
                          </Button>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Fade>
          )}
        </Popper>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            width: "765px",
            marginRight: "auto",
            marginLeft: "auto",
            padding: "15px 30px 0px 30px",
            boxShadow: "0px 1px 1px 1px #DCDCDC",
            borderRadius: "10px",
            height: "300px",
          }}
        >
          <Stack direction={"row"} spacing={35}>
            <Typography align="right" padding={"0px 0px 15px 10px"}>
              Cùng TATravel vi vu tới...
            </Typography>
            <Button onClick={handleClick("bottom-end")} sx={{ width: "200px" }}>
              <Typography color={"black"} fontSize={"14px"}>
                {province}
              </Typography>
            </Button>
          </Stack>
          <Box className={style.search}>
            <FmdGoodOutlinedIcon id={style.search_icon} />
            <input placeholder="Nơi yêu thích của bạn..." />
          </Box>
          <WeatherBar name={provincetest.name} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "770px",
          marginTop: "10px",
          marginRight: "auto",
          marginLeft: "auto",
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          position: "sticky",
          top: "100px",
          zIndex: 2,
          background: "rgba(255, 255, 255,0.8)",
          borderRadius: "5px",
          boxShadow: "0px 1px 1px 1px #DCDCDC",
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
                    <Typography fontSize={"15px"}>{rangePrice.name}</Typography>
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

        <Box>
          <FormControl
            sx={{
              width: "300px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Khởi hành từ: </Typography>
            <Select
              value={departurePoint}
              onChange={handleChange}
              sx={{ height: "30px", width: "180px" }}
            >
              {listdeparturePoint.map((departurePoint) => (
                <MenuItem
                  value={departurePoint.district}
                  key={departurePoint.district}
                >
                  {departurePoint.district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          width: 1200,
          height: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "row",
          paddingTop: "80px",
        }}
      >
        <Box
          sx={{
            width: 700,
            marginLeft: "20px",
            padding: "25px 25px 0px 25px",
            borderBottom: "1px solid rgba(0,205,0,0.2)",
            color: "rgba(0,191,255,0.5)",
          }}
        >
          <Typography fontSize={"20px"} fontWeight={550}>
            Tour du lịch tại {province}
          </Typography>
        </Box>
        <Box sx={{ width: 550, margin: "0px 25px 0px 25px" }}>
          <Box>
            <a>
              <img src={blog} alt="blog" height={"50px"} width={"250px"} />
            </a>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: 1200,
          height: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "row",
          paddingTop: "10px",
        }}
      >
        <CompareTourTable />

        {departurePoint == "Mọi miền tổ quốc" ? (
          <Box sx={{ width: 600, margin: "20px 25px 0px 25px" }}>
            {list.map((collection) => (
              <Box>
                {collection.priceMax >= value2[0] &&
                  collection.priceMin <= value2[1] && (
                    <ListTour key={collection.name} collection={collection} />
                  )}
              </Box>
            ))}
            {/* 123 */}
          </Box>
        ) : (
          <Box
            sx={{ width: 600, margin: "20px 25px 0px 25px", height: "200px" }}
          >
            {list.map((collection) => (
              <Box>
                {collection.priceMax >= value2[0] &&
                  collection.priceMin <= value2[1] &&
                  collection.departurePoint == departurePoint && (
                    <ListTour key={collection.name} collection={collection} />
                  )}
              </Box>
            ))}
            {/* 123 */}
          </Box>
        )}

        <Box sx={{ width: 500, margin: "20px 25px 0px 25px" }}>
          <Stack spacing={4}>
            {ListBlog.map((blog) => (
              <Blog key={blog._id} blog={blog} />
            ))}
          </Stack>
          <div
            onClick={() => handleNavigate()}
            style={{ margin: "30px 40px 0px 100px" }}
          >
            <ButtonBlog />
          </div>
        </Box>
      </Box>
    </div>
  );
}

function Blog(props: { blog: BlogDetail }) {
  return (
    <Card
      sx={{
        boxShadow: "none",
        maxHeight: 200,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <img src={props.blog.img} height={"160px"} width={"200px"} />
        <Box
          sx={{
            maxHeight: 195,
            padding: "0px 0px 5px 10px",
          }}
        >
          <Typography fontSize={"17px"} sx={{ height: "80px", width: "210px" }}>
            {props.blog.name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            maxWidth={225}
            height={"30px"}
          >
            {props.blog.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

interface Data {
  name: string;
}

function createData(name: string): Data {
  return { name };
}

const district = [
  createData("Hà Nội"),
  createData("An Giang"),
  createData("Bạc Liêu"),
  createData("Bắc Giang"),
  createData("Bắc Kạn"),
  createData("Bắc Ninh"),
  createData("Bình Dương"),
  createData("Bình Định"),
  createData("Thái Bình"),
  createData("Cao Bằng"),
  createData("Đà Nẵng"),
  createData("Đắk Nông"),
  createData("Điện Biên"),
  createData("Đồng Nai"),
  createData("Đồng Tháp"),
  createData("Lào Cai"),
  createData("Lai Châu"),
  createData("Nam Định"),
  createData("Ninh Bình"),
  createData("Phú Thọ"),
  createData("Quảng Bình"),
  createData("Quảng Nam"),
  createData("Sơn La"),
  createData("Thái Nguyên"),
  createData("Thanh Hóa"),
  createData("TP Hồ Chí Minh"),
  createData("Vĩnh Long"),
  createData("Vĩnh Phúc"),
];

const listdeparturePoint = [
  {
    name: "Mọi miền Tổ quốc",
    district: "Mọi miền tổ quốc",
  },
  {
    name: "Hà Nội",
    district: "Hà Nội",
  },
  {
    name: "Hồ Chí Minh",
    district: "Hồ Chí Minh",
  },
  {
    name: "Đà Nẵng",
    district: "Đà Nẵng",
  },
];

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
    name: "Dưới 10.000.000vnd ",
    minprice: 100000000,
    maxprice: 500000000,
  },
];
