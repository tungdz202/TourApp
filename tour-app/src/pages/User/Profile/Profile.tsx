import React, { useEffect } from "react";
import TopHead from "../../../components/TopHead/TopHead";
import Header from "../../../components/Header/Header";
import { Box, Typography } from "@mui/material";
import { avatar } from "../../../public/img";

import ListTourHistory from "../../../components/ListTourHistory/ListTourHistory";
import { AccountDetail } from "../../../types/Account";
import { useAppSelector } from "../../../Redux/store";
import ButtonChangePass from "../../../components/ButttonCustom/ButtonChangePass/ButtonChangePass";
import UserProfileTable from "../../../components/UserProfileTable/UserProfileTable";
import { changePassword } from "../../../Service/account.service";

export default function Profile() {
  let Account: AccountDetail = useAppSelector(
    (state) => state.account.account.account
  );
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [oldpassword, setOldpassword] = React.useState<string>("");
  const [newpassword, setNewpassword] = React.useState<string>("");

  const handleChangeOldpassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldpassword(event.target.value);
  };
  const handleChangeNewpassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewpassword(event.target.value);
  };

  const handleChangePassword = async () => {
    const res = await changePassword(oldpassword, newpassword);
    alert(res);
    setIsOpenPopup(false);
  };
  return (
    <div>
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
            boxShadow: "0px 1px 1px 1px #DCDCDC",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            height: "510px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "280px",
              height: "450px",
              margin: "0px 20px 0px 20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "270px",
                height: "380px",
                padding: "25px ",
                boxShadow: "0px 1px 1px 1px #DCDCDC",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "10px",
                backgroundColor: "rgba(204,255,153,0.2)",
              }}
            >
              <a
                style={{
                  marginLeft: "10px",
                  width: "200px",
                  height: "auto",
                }}
              >
                <img
                  src={avatar}
                  width={"200px"}
                  height={"200px"}
                  style={{ borderRadius: "50%" }}
                />
              </a>

              <Box
                sx={{
                  width: "200px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "rgba(238,201, 0,0.7)",
                  padding: "3px 0px 3px 10px",
                  color: "#FFFFFF",
                  margin: "15px 8px 8px 8px",
                }}
              >
                Họ Tên: {Account.username}
              </Box>

              <Box
                sx={{
                  width: "200px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "rgba(238,201, 0,0.7)",
                  padding: "3px 0px 3px 10px",
                  color: "#FFFFFF",
                  margin: "8px",
                }}
              >
                Email: <span style={{ fontSize: "15px" }}>{Account.email}</span>
              </Box>
              <Box
                sx={{
                  width: "200px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "rgba(238,201, 0,0.7)",
                  padding: "3px 0px 3px 10px",
                  color: "#FFFFFF",
                  margin: "8px",
                }}
              >
                Phone: {Account.phone}
              </Box>
            </Box>
            <Box
              sx={{
                width: "280px",
                height: "40px",
              }}
            >
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
                      height: "180px",
                      width: "350px",
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
                        Mật khẩu cũ
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
                            height: "35px",
                            padding: "5px",
                            width: "150px",
                          }}
                        >
                          <input
                            type="password"
                            value={oldpassword}
                            onChange={handleChangeOldpassword}
                            placeholder={"mật khẩu cũ"}
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
                          height: "30px",
                          minWidth: "100px",
                        }}
                      >
                        Mật khẩu mới
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
                            height: "35px",
                            padding: "5px",
                            width: "150px",
                          }}
                        >
                          <input
                            type="password"
                            value={newpassword}
                            onChange={handleChangeNewpassword}
                            placeholder={"mật khẩu mới"}
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
                        height: "100px",
                        width: "350px",
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
                        <ButtonChangePass text={"Đóng cửa sổ"} />
                      </div>
                      <div
                        style={{ margin: "10px" }}
                        onClick={() => handleChangePassword()}
                      >
                        <ButtonChangePass text={"Đổi mật khẩu"} />
                      </div>
                    </Box>
                  </Box>
                </div>
              )}
              <div
                style={{
                  width: "150px",
                  marginTop: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingLeft: "10px",
                }}
                onClick={() => setIsOpenPopup(true)}
              >
                <ButtonChangePass text={"Đổi mật khẩu"} />
              </div>
            </Box>
          </Box>
          <UserProfileTable />
          <ListTourHistory />
        </Box>
      </Box>
    </div>
  );
}
