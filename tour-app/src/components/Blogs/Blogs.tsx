import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { BlogDetail } from "../../types/Blog";
import { useAppSelector } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { getAllBlog } from "../../Service/blog.service";
import style from "./style.module.css";

export default function Blogs() {
  let ListBlog: BlogDetail[] = useAppSelector(
    (state) => state.blog.blog.ListBlog
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBlog(dispatch);
  }, []);
  return (
    <Box>
      <Typography
        sx={{
          marginLeft: 26,
          fontSize: "25px",
          fontWeight: "bold",
          color: "#000000",
          marginTop: "50px",
        }}
      >
        Blogs & Cẩm nang du lịch
      </Typography>
      <Box
        sx={{
          width: 1400,
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "row",
        }}
      >
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
    </Box>
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
