import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";
import { registerUser } from "../../../Service/auth.service";

export function Register() {
  //   const { errors, signingUp, user } = useStoreWithInitializer(
  //     ({ register }) => register,
  //     dispatchOnCall(initializeRegister())
  //   );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate: NavigateFunction = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      email: email,
      phone: phone,
      address: address,
    };
    const res = await registerUser(newUser);
    if (res) {
      if (res == "Register Successfully") {
        alert("Đăng kí thành công");
        navigate("/Login");
      } else alert(res);
    }
  };

  return (
    <div className="auth-page-user">
      {/* <Header /> */}
      <div className="register-container">
        <Box>
          <h3 className="Auth-form-title-user"> ĐĂNG NHẬP TÀI KHOẢN </h3>
          <p className="text-register">
            bạn đã có tài khoản? <a href="/login">Đăng nhập tại đây</a>
          </p>
          <div className="">
            <TextField
              sx={{ marginBottom: "30px" }}
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              sx={{ marginBottom: "30px" }}
              fullWidth
              id="outlined-basic"
              label="Họ và Tên"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              sx={{ marginBottom: "30px" }}
              fullWidth
              id="outlined-password-input"
              label="Mật khẩu"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: "30px" }}
              fullWidth
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: "30px" }}
              fullWidth
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
            />
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
              className="button-Register"
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
              onClick={handleRegister}
            >
              Đăng Ký
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
