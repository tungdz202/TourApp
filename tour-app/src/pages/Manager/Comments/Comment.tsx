import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import SideBar from "../../../components/SideBar/SideBar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeIcon from "@mui/icons-material/Mode";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function Comment() {
  const param = "comment";
  const [open, setOpen] = React.useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  return (
    <Box sx={{ backgroundColor: "#F9FAFB", height: "100vh" }}>
      <HeaderAdmin />
      <SideBar param={param} />
      <Box
        sx={{
          height: "auto",
          width: "1150px",
          margin: "120px 0px 0px 340px",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Typography variant="h5" fontWeight={550} sx={{ marginBottom: "40px" }}>
          Comment
        </Typography>
        <Box display={"flex"} flexDirection={"row"}>
          <Box sx={{ width: "700px" }}>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              Danh sách bài viết
            </Typography>
            <Stack>
              {blogs.map((blog) => (
                <Box key={blog.name}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      padding: "20px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                      width: "550px",
                      height: "60px",
                    }}
                  >
                    <Box>{blog.name}</Box>
                    <Box>
                      <Box>
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={handleOpenMenu}
                        >
                          <ExpandMore />
                        </IconButton>
                        <Popover
                          open={Boolean(open)}
                          anchorEl={open}
                          onClose={handleCloseMenu}
                          anchorOrigin={{ vertical: "top", horizontal: "left" }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          PaperProps={{
                            sx: {
                              p: 1.5,
                              width: 400,
                              boxShadow: "0px 1px 1px 1px #DCDCDC",
                              "& .MuiMenuItem-root": {
                                px: 1,
                                typography: "body2",
                                borderRadius: 1,
                              },
                            },
                          }}
                        >
                          {blog.Comments.map((comment) => (
                            <Box sx={{ marginBottom: "8px" }}>
                              {comment.name}: {comment.Comment}
                            </Box>
                          ))}
                        </Popover>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="h6">Bộ lọc từ cấm</Typography>
            <Box>
              <Box>
                <TextField
                  id="standard-basic"
                  label="Điền từ"
                  variant="standard"
                />
                <Button>Thêm</Button>
              </Box>
              <Box sx={{ height: "200px" }}>
                <Typography>Danh sách từ khoá</Typography>
                <Box display={"flex"} flexWrap={"wrap"}>
                  {forbiddenWords.map((word) => (
                    <Box
                      sx={{
                        padding: "3px 8px 3px 8px",
                        margin: "2px",
                        background: "#FF3030",
                        color: "#CFCFCF",
                        borderRadius: "5px",
                      }}
                    >
                      {word.word}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography>
                  Danh sách các bình luận chứa từ cấm bị xoá:
                </Typography>
                <Box
                  sx={{
                    textDecoration: "line-through",
                    color: "#999999",
                  }}
                >
                  <Typography>Hoài: hoài bò ăn cứt</Typography>
                  <Typography>Trung: Làm đéo gì có chuyện đấy</Typography>
                  <Typography>Tuấn: Fuck</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const blogs = [
  {
    id: 1,
    name: "Top những trải nghiệm tại Đà Nẵng bạn nhất định phải thử một lần trong đời",
    Comments: [
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
    ],
  },
  {
    id: 2,
    name: "Núi Fuji – Ngọn núi biểu tượng đầy tự hào của người dân Nhật Bản",
    Comments: [
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
    ],
  },
  {
    id: 3,
    name: "Chi phí du lịch Hàn Quốc 7 ngày là bao nhiêu? Cách tối ưu chi phí khi vi vu xứ sở kim chi",
    Comments: [
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
    ],
  },
  {
    id: 4,
    name: "Sổ tay kinh nghiệm du lịch Đài Loan dành cho người lần đầu vi vu đảo quốc",
    Comments: [
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
    ],
  },
  {
    id: 5,
    name: "Chia sẻ kinh nghiệm du lịch Phú Quốc để có chuyến đi hoàn hảo nhất",
    Comments: [
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
    ],
  },
  {
    id: 6,
    name: "Lễ hội du lịch Chùa Hương 2023 có gì mới?",
    Comments: [
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
      {
        name: "Hoài bò",
        Comment: "Như shit",
      },
    ],
  },
];

const forbiddenWords = [
  { word: "cút" },
  { word: "xéo" },
  { word: "đụ" },
  { word: "đéo" },
  { word: "méo" },
  { word: "kẹc" },
  { word: "ma tuý" },
  { word: "heroin" },
];
