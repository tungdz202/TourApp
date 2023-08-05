import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import SideBar from "../../../components/SideBar/SideBar";
import { BlogDetail } from "../../../types/Blog";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../Redux/store";
import {
  crawlBlog,
  deleteBlog,
  getAllBlog,
  updateBlog,
} from "../../../Service/blog.service";
import React from "react";
import ButtonChangePass from "../../../components/ButttonCustom/ButtonChangePass/ButtonChangePass";
import ButtonSubmit from "../../../components/ButttonCustom/ButtonSubmit/ButtonSubmit";
import ButtonUpdateTourList from "../../../components/ButttonCustom/ButtonUpdateTourList/ButtonUpdateTourList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Blog() {
  const param = "blog";
  let ListBlog: BlogDetail[] = useAppSelector(
    (state) => state.blog.blog.ListBlog
  );
  const [blogSelect, setBlog] = useState<BlogDetail>();
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");
  const [img, setImg] = React.useState<string>("");
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImg(event.target.value);
  };

  const handSetBlog = (blog: BlogDetail) => {
    setBlog(blog);
    setName(blog.name);
    setDescription(blog.description);
    setUrl(blog.url);
    setImg(blog.img);
    setIsOpenPopup(true);
  };

  const handleUpdate = async () => {
    const blog = {
      _id: blogSelect?._id,
      name: name,
      description: description,
      url: url,
      img: img,
    };
    const res = await updateBlog(blog);
    if (res) {
      toast.success("Cập nhật thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setTimeout(() => window.location.reload(), 5000);
    }
    setIsOpenPopup(false);
  };

  const handleDelete = async () => {
    setIsOpen(true);
  };
  const handleDeleteConfirm = async () => {
    const res = await deleteBlog(blogSelect);
    if (res) {
      toast.success("Xoá thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setTimeout(() => window.location.reload(), 5000);
    }
    setIsOpenPopup(false);
  };

  const handleCrawlBlog = async () => {
    const res = await crawlBlog();
    return res;
  };

  const display = () => {
    toast.promise(
      handleCrawlBlog,
      {
        pending: "Đang cập nhập danh sách Tour du lịch",
        success: "Cập nhật thành công 👌",
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getAllBlog(dispatch);
  }, []);
  return (
    <Box sx={{ backgroundColor: "#F9FAFB", height: "100vh" }}>
      <HeaderAdmin />
      <SideBar param={param} />
      <Box
        sx={{
          height: "400px",
          width: "1150px",
          margin: "120px 0px 0px 330px",
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
            Blog
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
            <a key={blog._id} onClick={() => handSetBlog(blog)}>
              <Item blog={blog} />
            </a>
          ))}
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
              height: "auto",
              width: "650px",
              display: "flex",
              background: "#FFFFFF",
              boxShadow: "1px 2px 5px 2px #828282",
              borderRadius: "8px",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <Box
              sx={{
                width: "650px",
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
                  height: "60px",
                }}
              >
                <Box
                  sx={{
                    background: "#FFE5BE",
                    color: "rgba(34,49,63,0.6)",
                    borderRadius: "5px",
                    minHeight: "35px",
                    padding: "5px",
                    width: "450px",
                  }}
                >
                  <input
                    type="text"
                    value={name}
                    onChange={handleChangeName}
                    style={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  />
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
                  minWidth: "100px",
                }}
              >
                Url:
              </Typography>
              <Box
                sx={{
                  padding: "8px 0px",
                }}
              >
                <Box
                  sx={{
                    background: "#FFE5BE",
                    color: "rgba(34,49,63,0.6)",
                    borderRadius: "5px",
                    minHeight: "35px",
                    padding: "5px",
                    width: "450px",
                  }}
                >
                  <input
                    type="text"
                    value={url}
                    onChange={handleChangeUrl}
                    style={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  />
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
                Img:
              </Typography>
              <Box
                sx={{
                  padding: "15px 0px",
                  height: "60px",
                }}
              >
                <Box
                  sx={{
                    background: "#FFE5BE",
                    color: "rgba(34,49,63,0.6)",
                    borderRadius: "5px",
                    height: "35px",
                    padding: "5px",
                    width: "450px",
                  }}
                >
                  <input
                    type="text"
                    value={img}
                    onChange={handleChangeImg}
                    style={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "650px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{
                  margin: "15px",
                  minWidth: "100px",
                }}
              >
                Description:
              </Typography>
              <Box
                sx={{
                  padding: "10px 0px",
                }}
              >
                <Box
                  sx={{
                    background: "#FFE5BE",
                    color: "rgba(34,49,63,0.6)",
                    borderRadius: "5px",
                    height: "150px",
                    padding: "5px",
                    width: "450px",
                    overflow: "hidden",
                  }}
                >
                  <textarea
                    value={description}
                    onChange={handleChangeDescription}
                    style={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                      resize: "vertical", // Cho phép điều chỉnh kích thước theo chiều dọc
                      minHeight: "120px", // Đặt chiều cao tối thiểu của textarea
                      minWidth: "440px",
                      background: "none",
                      outline: "none",
                      border: "none",
                      margin: "5px 0px 0px 8px",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                height: "80px",
                width: "600px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{ margin: "10px" }}
                onClick={() => setIsOpenPopup(false)}
              >
                <ButtonChangePass text={"Huỷ bỏ"} />
              </div>
              <div style={{ margin: "10px" }} onClick={() => handleUpdate()}>
                <ButtonSubmit text={"Cập nhật"} />
              </div>
              <div style={{ margin: "10px" }} onClick={() => handleDelete()}>
                <ButtonChangePass text={"Xoá Blog"} />
              </div>
            </Box>
          </Box>
        </div>
      )}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
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
              height: "auto",
              width: "350px",
              display: "flex",
              background: "#FFFFFF",
              boxShadow: "1px 2px 5px 2px #828282",
              borderRadius: "8px",
              flexDirection: "column",
              padding: "15px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                height: "40px",
                width: "auto",
              }}
            >
              Xác nhận xoá Blog!
            </Typography>

            <Box
              sx={{
                height: "80px",
                width: "300px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ margin: "10px" }} onClick={() => setIsOpen(false)}>
                <ButtonChangePass text={"Huỷ bỏ"} />
              </div>
              <div
                style={{ margin: "10px" }}
                onClick={() => handleDeleteConfirm()}
              >
                <ButtonChangePass text={"Xoá Blog"} />
              </div>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
}

function Item(props: { blog: BlogDetail }) {
  return (
    <Box
      sx={{
        maxWidth: 360,
        maxHeight: 500,
        paddingTop: "2px",
        margin: "10px",
        borderRadius: "10px",
        boxShadow:
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
        overflow: "hidden",
      }}
    >
      <a
        style={{
          display: "flex",
          flexDirection: "column",

          textDecoration: "none",
          color: "transparent",
        }}
      >
        <img src={props.blog.img} alt="blog" width={"370px"} height={"210px"} />
        <Box
          sx={{
            maxHeight: 195,
            padding: "13px",
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
    </Box>
  );
}
