import React, { useEffect, useRef } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import SideBar from "../../../components/SideBar/SideBar";
import style from "./style.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import ButtonCustom from "../../../components/CutstomButton/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../Redux/store";
import { AccountUser } from "../../../types/Account";
import {
  getListAccount,
  updateAccount,
} from "../../../Service/account.service";
import { setupdateAccount } from "../../../Redux/State/Account.slice";
import ButtonChangePass from "../../../components/ButttonCustom/ButtonChangePass/ButtonChangePass";
import ButtonSubmit from "../../../components/ButttonCustom/ButtonSubmit/ButtonSubmit";
import ButtonClear from "../../../components/ButttonCustom/ButtonClear/ButtonClear";
import ButtonDelete from "../../../components/ButttonCustom/ButtonDelete/ButtonDelete";
import ButtonUpdate from "../../../components/ButttonCustom/ButtonUpdate/ButtonUpdate";
import {
  deleteAccountAdmin,
  updateAccountAdmin,
} from "../../../Service/dashboard.service";
interface Column {
  id: "name" | "email" | "phone" | "address" | "more";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
  },
  {
    id: "more",
    label: "",
    minWidth: 50,
  },
];

export default function Account() {
  const param = "user";
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let AccountUpdate = useAppSelector(
    (state) => state.account.account.accountUpdate
  );
  console.log(AccountUpdate);
  // sửa thông tin tài khoản người dùng
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [isOpenPopup2, setIsOpenPopup2] = React.useState(false);
  const [username, setUsername] = React.useState<string>(
    AccountUpdate.username
  );
  const [email, setEmail] = React.useState<string>(AccountUpdate.email);
  const [phone, setPhone] = React.useState<string>(AccountUpdate.phone);
  const [address, setAddress] = React.useState<string>(AccountUpdate.address);
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

  const handleUpdate = async () => {
    const account = {
      _id: AccountUpdate._id,
      username: username,
      phone: phone,
      address: address,
      email: email,
    };
    const response = await updateAccountAdmin(account);
    if (response) {
      alert(response);
    }
  };
  const handleDelete = async () => {
    const response = await deleteAccountAdmin(AccountUpdate);
    if (response) {
      alert(response);
    }
  };

  const handeEditUser = (account: AccountUser) => {
    dispatch(setupdateAccount(account));
    setIsOpenPopup(true);
  };

  const handleDeleteUser = (account: AccountUser) => {
    dispatch(setupdateAccount(account));
    setIsOpenPopup2(true);
  };

  const dispatch = useDispatch();
  const listUser: AccountUser[] = useAppSelector(
    (state) => state.account.account.listAccounts
  );

  const [data, setData] = React.useState(listUser);
  const [data2, setData2] = React.useState(listUser);
  //search
  const Filter = (event: any) => {
    let row = data2.filter((f) =>
      f.username.toLowerCase().includes(event.target.value)
    );
    setData(row);
    console.log(data2);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    const users = await getListAccount(dispatch);
    setData2(users);
    setData(users);
  };

  useEffect(() => {
    getData();
    setUsername(AccountUpdate.username);
    if (AccountUpdate.email != null) {
      setEmail(AccountUpdate.email);
    }
    if (AccountUpdate.address != null) {
      setAddress(AccountUpdate.address);
    }
    if (AccountUpdate.phone != null) {
      setPhone(AccountUpdate.phone);
    }
  }, [AccountUpdate]);

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", height: "100vh" }}>
      <HeaderAdmin />
      <Box>
        <Box>
          <SideBar param={param} />
        </Box>
        <Box
          sx={{
            height: "400px",
            width: "1150px",
            margin: "120px 0px 0px 340px",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h5" gutterBottom fontWeight={550}>
              User
            </Typography>
            {/* <a>
              <ButtonCustom text={"Add User"} />
            </a> */}
          </Stack>
          <div className={style.search}>
            <SearchIcon id={style.search_icon} />
            <input placeholder="Search user..." onChange={Filter} />
          </div>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "10px",
              boxShadow: "none",
              border: "1px solid #F3F5F6",
            }}
          >
            <TableContainer sx={{ maxHeight: 800 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead sx={{ height: "75px" }}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{
                          fontSize: "20px",
                          backgroundColor: "#AFD788",
                          color: "#FFFFFF",
                          fontWeight: "550",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((dataUser) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={dataUser._id}
                          sx={{ height: "60px" }}
                        >
                          <TableCell component="th" scope="row">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={dataUser.username} src={""} />
                              <Typography variant="subtitle2" noWrap>
                                {dataUser.username}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{dataUser.email}</TableCell>
                          <TableCell>{dataUser.phone}</TableCell>
                          <TableCell
                            sx={{ borderBottom: "0.5px solid #F1F3F4" }}
                          >
                            {dataUser.address}
                          </TableCell>
                          <TableCell sx={{ padding: "0px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <a
                                style={{ margin: "2px" }}
                                onClick={() => handeEditUser(dataUser)}
                              >
                                <ButtonUpdate text={"Update"} />
                              </a>
                              <a
                                style={{ margin: "2px" }}
                                onClick={() => handleDeleteUser(dataUser)}
                              >
                                <ButtonDelete text={"Delete"} />
                              </a>
                            </Box>
                          </TableCell>
                          {/* <Popover
                          open={Boolean(open)}
                          anchorEl={open}
                          onClose={handleCloseMenu}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 140,
                              "& .MuiMenuItem-root": {
                                px: 1,
                                typography: "body2",
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => console.log(dataUser.username)}
                          >
                            <ModeIcon sx={{ marginRight: "10px" }} />
                            Edit
                          </MenuItem>

                          <MenuItem sx={{ color: "error.main" }}>
                            <DeleteForeverIcon sx={{ marginRight: "10px" }} />
                            Delete
                          </MenuItem>
                        </Popover> */}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={listUser.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
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
                    height: "35px",
                    padding: "5px",
                    width: "150px",
                  }}
                >
                  <input
                    type="text"
                    value={username}
                    onChange={handleChangeUsername}
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
                  height: "20px",
                  minWidth: "100px",
                }}
              >
                Email:
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
                    type="text"
                    value={email}
                    onChange={handleChangeEmail}
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
                  height: "20px",
                  minWidth: "100px",
                }}
              >
                Phone:
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
                    type="text"
                    value={phone}
                    onChange={handleChangePhone}
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
                Address:
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
                    type="text"
                    value={address}
                    onChange={handleChangeAddress}
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
                height: "80px",
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
                <ButtonChangePass text={"Huỷ bỏ"} />
              </div>
              <div style={{ margin: "10px" }} onClick={() => handleUpdate()}>
                <ButtonSubmit text={"Xác nhận"} />
              </div>
            </Box>
          </Box>
        </div>
      )}
      {isOpenPopup2 && (
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
              width: "350px",
              display: "flex",
              background: "#FFFFFF",
              boxShadow: "1px 2px 5px 2px #828282",
              borderRadius: "8px",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ padding: "10px 40px 10px 40px" }}>
                Xác nhận xoá tài khoản
              </Typography>
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
                    height: "35px",
                    padding: "8px",
                    width: "150px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  >
                    {username}
                  </Typography>
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
                  height: "20px",
                  minWidth: "100px",
                }}
              >
                Email:
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
                    padding: "8px",
                    width: "150px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  >
                    {email}
                  </Typography>
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
                  height: "20px",
                  minWidth: "100px",
                }}
              >
                Phone:
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
                    padding: "8px",
                    width: "150px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  >
                    {phone}
                  </Typography>
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
                Address:
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
                    padding: "8px",
                    width: "150px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "rgba(34,49,63,0.6)",
                    }}
                  >
                    {address}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                height: "80px",
                width: "350px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{ margin: "10px" }}
                onClick={() => setIsOpenPopup2(false)}
              >
                <ButtonChangePass text={"Huỷ bỏ"} />
              </div>
              <div style={{ margin: "10px" }} onClick={() => handleDelete()}>
                <ButtonChangePass text={"Xác nhận"} />
              </div>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
}
