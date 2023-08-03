import React, { useEffect } from "react";
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
import { getListAccount } from "../../../Service/account.service";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(null);
  const param = "user";

  const dispatch = useDispatch();
  const listUser: AccountUser[] = useAppSelector(
    (state) => state.account.account.listAccounts
  );

  const [AccountChange, SetAccountChange] = React.useState<AccountUser>();

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
  const handeEditUser = (account: AccountUser) => {
    console.log(account.username);
  };

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
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
  }, []);

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
            <ButtonCustom text={"Add User"} />
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
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                          sx={{ height: "60px" }}
                        >
                          <TableCell component="th" scope="row">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={row.username} src={""} />
                              <Typography variant="subtitle2" noWrap>
                                {row.username}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell
                            sx={{ borderBottom: "0.5px solid #F1F3F4" }}
                          >
                            {row.address}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenu}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                          <Popover
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
                            <MenuItem onClick={() => handeEditUser(row)}>
                              <ModeIcon sx={{ marginRight: "10px" }} />
                              Edit
                            </MenuItem>

                            <MenuItem sx={{ color: "error.main" }}>
                              <DeleteForeverIcon sx={{ marginRight: "10px" }} />
                              Delete
                            </MenuItem>
                          </Popover>
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
    </Box>
  );
}
