import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import SideBar from "../../../components/SideBar/SideBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

export default function Blog() {
  const param = "blog";
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
          Blog
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {blogs.map((blog) => (
              <Grid item xs={6} sm={4} md={4} key={blog.name}>
                <Card
                  sx={{
                    maxWidth: 400,
                    height: 520,
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "5px 5px 5px 5px #F5F5F5;",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="400"
                      image={blog.url}
                      alt="tour"
                    />

                    <Box sx={{ padding: "10px" }}>
                      <Typography fontSize={"14px"} color={"#828282"}>
                        {blog.time}
                      </Typography>
                      <Typography
                        fontWeight={550}
                        fontSize={"14px"}
                        height={"50px"}
                      >
                        {blog.name}
                      </Typography>
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        sx={{ marginLeft: "15vw" }}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          color={"#B5B5B5"}
                          alignItems={"center"}
                          marginRight={"15px"}
                        >
                          <VisibilityIcon
                            sx={{ width: "18px", marginRight: "4px" }}
                          />

                          <Typography fontSize={"14px"}>
                            {blog.Comment}
                          </Typography>
                        </Box>
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          color={"#B5B5B5"}
                          alignItems={"center"}
                        >
                          <SpeakerNotesIcon
                            sx={{ width: "18px", marginRight: "4px" }}
                          />
                          <Typography>{blog.seen}</Typography>
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

const blogs = [
  {
    name: "Top những trải nghiệm tại Đà Nẵng bạn nhất định phải thử một lần trong đời",
    url: "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/ur2mrg23d91mex03l4mw.jpg",
    time: "21-6-2023",
    Comment: 64,
    seen: 489,
  },
  {
    name: "Núi Fuji – Ngọn núi biểu tượng đầy tự hào của người dân Nhật Bản",
    url: "https://www.vietnambooking.com/wp-content/uploads/2023/06/nui-fuji-2.jpg",
    time: "21-6-2023",
    Comment: 64,
    seen: 489,
  },
  {
    name: "Chi phí du lịch Hàn Quốc 7 ngày là bao nhiêu? Cách tối ưu chi phí khi vi vu xứ sở kim chi",
    url: "https://www.vietnambooking.com/wp-content/uploads/2023/06/chi-phi-du-lich-han-quoc-7-ngay-5.jpg",
    time: "21-6-2023",
    Comment: 64,
    seen: 489,
  },
  {
    name: "Sổ tay kinh nghiệm du lịch Đài Loan dành cho người lần đầu vi vu đảo quốc",
    url: "https://www.vietnambooking.com/wp-content/uploads/2023/06/kinh-nghiem-du-lich-dai-loan-5.jpg",
    time: "21-6-2023",
    Comment: 64,
    seen: 489,
  },
  {
    name: "Chia sẻ kinh nghiệm du lịch Phú Quốc để có chuyến đi hoàn hảo nhất",
    url: "https://www.vietnambooking.com/wp-content/uploads/2023/06/kinh-nghiem-du-lich-phu-quoc-12.jpg",
    time: "21-6-2023",
    Comment: 64,
    seen: 489,
  },
  {
    name: "Lễ hội du lịch Chùa Hương 2023 có gì mới?",
    url: "https://www.vietnambooking.com/wp-content/uploads/2023/01/le-hoi-du-lich-chua-huong-2023-co-gi-moi-2.jpg",
    time: "21-6-2023",
    Comment: 64,
    seen: 489,
  },
];
