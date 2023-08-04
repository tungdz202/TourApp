import React, { useState } from "react";
import "../../../public/css/main.scss";
import { Box, Button, TextField } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { loginUser } from "../../../Service/auth.service";
import Cookies from "js-cookie";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };

    const res = await loginUser(newUser);
    if (res.message === "login thành công") {
      Cookies.set("accesstoken", res.accessToken, {
        expires: 1 / 24,
      });
      Cookies.set("refreshtoken", res.refreshToken, {
        expires: 30,
      });
      navigate("/");
    } else alert(res);
  };

  return (
    <div className="auth-page-user">
      {/* <Header /> */}
      <div className="page-container">
        {/* <Box onSubmit={handleLogin}> */}
        <Box>
          <h3 className="Auth-form-title-user"> ĐĂNG NHẬP TÀI KHOẢN </h3>
          <p className="text-register">
            bạn chưa có tài khoản? <a href="/register">Đăng kí tại đây</a>
          </p>
          <div className="">
            <TextField
              sx={{ margin: "30px 0px" }}
              fullWidth
              id="outlined-required"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: "30px" }}
              fullWidth
              id="outlined-password-input"
              type="password"
              label="Mật khẩu"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="exist">
            <p className="forgot-Password">
              Quên mật khẩu? Nhấn vào <a href="#"> đây</a>
            </p>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              className="button-Login"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "40px",
                minHeight: "40px",
                minWidth: "520px",
                padding: "12px 0px",
                backgroundColor: "#ffcf00",
                fontSize: "20",
                fontWeight: "450",
                transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)",
                ":hover": {
                  boxShadow: "rgba(0, 0, 0, 0.25) 0 8px 15px",
                  transform: "transform: translateY(-2px)",
                  backgroundColor: "#ffcf00",
                },
              }}
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>

            <h6 className="otherLogin">
              <span>
                <a className="otherLogin-text" href="">
                  Hoặc đăng nhập bằng
                </a>
              </span>
            </h6>
            <div className="">
              <div className="otherLogin-icon">
                <Button
                  variant="contained"
                  className="button-facebook"
                  sx={{
                    margin: "0px 10px",
                    borderRadius: "2px",
                    minHeight: "40px",
                    minWidth: "120px",
                    backgroundColor: "#3B5998",
                    fontSize: "20",
                    fontWeight: "450",
                    transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)",
                    ":hover": {
                      boxShadow: "rgba(0, 0, 0, 0.25) 0 8px 15px",
                      transform: "transform: translateY(-2px)",
                      backgroundColor: "#3B5998",
                    },
                  }}
                >
                  <Box sx={{ marginRight: "12px", paddingTop: "8px" }}>
                    <FacebookIcon />
                  </Box>
                  FaceBook
                </Button>
                <Button
                  sx={{
                    margin: "0px 10px",
                    borderRadius: "2px",
                    minHeight: "40px",
                    minWidth: "150px",
                    backgroundColor: "#E14B33",
                    fontSize: "20",
                    fontWeight: "450",
                    transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)",
                    ":hover": {
                      boxShadow: "rgba(0, 0, 0, 0.25) 0 8px 15px",
                      transform: "transform: translateY(-2px)",
                      backgroundColor: "#E14B33",
                    },
                  }}
                  variant="contained"
                  className="button-google"
                >
                  <Box sx={{ marginRight: "12px", paddingTop: "8px" }}>
                    <GoogleIcon />
                  </Box>
                  <span> </span>
                  Google
                </Button>
              </div>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
