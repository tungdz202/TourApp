import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import { AccountDetail } from "../../types/Account";
import { useAppSelector } from "../../Redux/store";
import ButtonSubmit from "../ButttonCustom/ButtonSubmit/ButtonSubmit";
import { updateAccount } from "../../Service/account.service";
import { setupdateAccount } from "../../Redux/State/Account.slice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfileTable() {
  let Account: AccountDetail = useAppSelector(
    (state) => state.account.account.account
  );
  let AccountUpdate = useAppSelector(
    (state) => state.account.account.accountUpdate
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);

  const [username, setUsername] = React.useState<string>(Account.username);
  const [email, setEmail] = React.useState<string>(Account.email);
  const [phone, setPhone] = React.useState<string>(Account.phone);
  const [address, setAddress] = React.useState<string>(Account.address);
  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleUpdate = () => {
    const account = {
      _id: Account._id,
      username: username,
      phone: phone,
      address: address,
      avatar: Account.avatar,
      historySeen: AccountUpdate.historySeen,
    };
    dispatch(setupdateAccount(account));
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    const response = await updateAccount(AccountUpdate);
    if (response == "cập nhật thành công") {
      toast.success("Cập nhật thành công", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (response == "Chưa nhập mật khẩu") {
      toast.warn("Hãy nhập mật khẩu!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (response == "Chưa nhập mật khẩu cũ") {
      toast.warn("Chưa nhập mật khẩu cũ!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (response == "Chưa nhập mật khẩu mới") {
      toast.warn("Chưa nhập mật khẩu mới!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (response == "Sai mật khẩu") {
      toast.error("Sai mật khẩu!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    // Cập nhật giá trị username2 thành giá trị mới của username

    setUsername(Account.username);
    if (Account.email != null) {
      setEmail(Account.email);
    }
    if (Account.address != null) {
      setAddress(Account.address);
    }
    if (Account.phone != null) {
      setPhone(Account.phone);
    }
  }, [Account]);
  return (
    <div>
      <Box
        sx={{
          width: "350px",
          height: "450px",
          boxShadow: "0px 1px 1px 1px #DCDCDC",
          margin: "0px 20px 0px 20px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            width: "300px",
            height: "120px",
            margin: "auto",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
            padding: "60px 0px 60px 0px",
          }}
        >
          <ContactMailOutlinedIcon sx={{ color: "#6600CC" }} />
          <Typography sx={{ marginLeft: "10px", height: "30px" }}>
            Bảng thông tin cá nhân
          </Typography>
        </Box>
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
                height: "100px",
                width: "350px",
                display: "flex",
                alignItems: "center",
                background: "#FFFFFF",
                boxShadow: "1px 2px 5px 2px #828282",
                borderRadius: "8px",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ margin: "15px", height: "30px" }}>
                Xác nhận cập nhật tài khoản
              </Typography>
              <div
                style={{ alignItems: "center" }}
                onClick={() => handleSubmit()}
              >
                <ButtonSubmit text={"submit"} />
              </div>
            </Box>
          </div>
        )}
        <Box
          sx={{
            height: "260px",
            margin: "0px 20px 0px 20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "85px",
              marginLeft: "15px",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ padding: "10px 0px", width: "80px", height: "60px" }}>
              Họ và tên:
            </Box>
            <Box sx={{ padding: "10px 0px", width: "80px", height: "60px" }}>
              Email:
            </Box>
            <Box sx={{ padding: "10px 0px", width: "80px", height: "60px" }}>
              Phone:
            </Box>
            <Box sx={{ padding: "10px 0px", width: "80px", height: "60px" }}>
              Địa chỉ:
            </Box>
          </Box>
          <Box
            sx={{
              width: "200px",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                width: "200px",
              }}
            >
              <Box
                sx={{
                  padding: "8px 0px",
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
                    width: "190px",
                  }}
                >
                  <input
                    type="text"
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder={Account.username}
                    style={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  />
                  {/* <Typography
              fontSize={"15px"}
              sx={{ color: "rgba(34,49,63,0.6)" }}
            >
              Bùi Tùng Anh
            </Typography> */}
                </Box>
              </Box>
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
                    width: "190px",
                  }}
                >
                  <input
                    type="text"
                    value={email}
                    placeholder={Account.email}
                    style={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  />
                </Box>
              </Box>
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
                    width: "190px",
                  }}
                >
                  <input
                    type="text"
                    value={phone}
                    onChange={handleChangePhone}
                    placeholder={Account.phone}
                    style={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  />
                </Box>
              </Box>
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
                    width: "190px",
                  }}
                >
                  <input
                    type="text"
                    value={address}
                    onChange={handleChangeAddress}
                    placeholder={Account.address}
                    style={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <div
            style={{
              width: "100px",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={() => handleUpdate()}
          >
            <ButtonSubmit text={"submit"} />
          </div>
        </Box>
      </Box>
    </div>
  );
}
