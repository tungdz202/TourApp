import { Box, Card, Typography } from "@mui/material";

import Header from "../../../components/Header/Header";
import style from "./Style.module.css";
import TopHead from "../../../components/TopHead/TopHead";
import React, { useEffect } from "react";
import { BlogDetail } from "../../../types/Blog";
import { useAppSelector } from "../../../Redux/store";
import { useDispatch } from "react-redux";
import { getAllBlog } from "../../../Service/blog.service";
import { news } from "../../../public/img";

export default function Blog() {
  let ListBlog: BlogDetail[] = useAppSelector(
    (state) => state.blog.blog.ListBlog
  );
  console.log(ListBlog);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBlog(dispatch);
  }, []);

  return (
    <div className={style.container}>
      <TopHead />
      <Header />
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          width: "1200px",
          marginRight: "auto",
          marginLeft: "auto",
          padding: "50px 30px 0px 30px",
          borderRadius: "10px",
          height: "auto",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            width: "1200px",
            marginRight: "auto",
            marginLeft: "auto",
            justifyContent: "center",
            borderRadius: "10px",
            padding: "40px",
            height: "120px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <a>
            <img src={news} />
          </a>
          <Typography
            sx={{
              padding: "0px 5px",
              marginTop: "10px",
              fontSize: "19px",
              color: "#555555",
            }}
          >
            Tin tức du lịch - Chìa khóa khám phá, mở ra cánh cửa đến những điều
            kỳ diệu.
          </Typography>
          <Typography sx={{ padding: "0px 5px", color: "#666666" }}>
            Đồng hành chúng tôi trải nghiệm và tìm hiểu thêm về những điểm đến
            hấp dẫn và tuyệt vời trong cuộc hành trình khám phá thế giới của
            bạn.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            width: "1200px",
            marginRight: "auto",
            marginLeft: "auto",
            justifyContent: "center",
            borderTop: "1px solid #DCDCDC",
            padding: "20px",
            height: "auto",
            display: "flex",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {ListBlog.map((blog) => (
            <Item key={blog._id} blog={blog} />
          ))}
        </Box>
      </Box>
    </div>
  );
}

function Item(props: { blog: BlogDetail }) {
  return (
    <Card
      sx={{
        maxWidth: 360,
        boxShadow: "none",
        maxHeight: 500,
        paddingTop: "2px",
        margin: "10px",
      }}
    >
      <a
        href={props.blog.url}
        className={style.blog}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          textDecoration: "none",
          color: "transparent",
        }}
      >
        <img src={props.blog.img} alt="green iguana" />
        <Box
          sx={{
            maxHeight: 195,
            padding: "5px",
          }}
        >
          <Typography
            fontSize={"16px"}
            sx={{ height: 60, fontWeight: "550", color: "black" }}
          >
            {props.blog.name}
          </Typography>
          <Typography
            color="text.secondary"
            fontSize={"13px"}
            maxWidth={300}
            maxHeight={45}
            sx={{ overflowWrap: "break-word" }}
          >
            {props.blog.description}
          </Typography>
        </Box>
      </a>
    </Card>
  );
}
