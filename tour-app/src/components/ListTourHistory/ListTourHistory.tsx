import { Box, Typography } from "@mui/material";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import React, { useEffect } from "react";
import ButtonClear from "../ButttonCustom/ButtonClear/ButtonClear";
import { AccountDetail } from "../../types/Account";
import { useAppSelector } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { updateHistoryAccount } from "../../Redux/State/Account.slice";

interface tourSeen {
  _id: string;
  name: string;
  url: string;
}

export default function ListTourHistory() {
  let Account: AccountDetail = useAppSelector(
    (state) => state.account.account.account
  );
  let AccountUpdate = useAppSelector(
    (state) => state.account.account.accountUpdate
  );
  const dispatch = useDispatch();

  const [historySeen, setHistorySeen] = React.useState<tourSeen[]>([]);
  React.useEffect(() => {
    // Cập nhật giá trị username2 thành giá trị mới của username
    setHistorySeen(Account.historySeen);
  }, [Account]);

  //tourHistory
  const [selectedTours, setSelectedTours] = React.useState<tourSeen[]>([]);

  console.log(selectedTours);
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    tour: tourSeen
  ) => {
    const isChecked = event.target.checked;
    setSelectedTours((prevSelectedTours) =>
      isChecked
        ? [...prevSelectedTours, tour]
        : prevSelectedTours.filter((Tour) => Tour._id !== tour._id)
    );
  };

  const handleDeleteTour = () => {
    setHistorySeen((prevTours) =>
      prevTours.filter((tour) => !selectedTours.includes(tour))
    );
    setSelectedTours([]);
  };
  const handleDeleteAllTours = () => {
    setHistorySeen([]);
    setSelectedTours([]);
  };

  useEffect(() => {
    dispatch(updateHistoryAccount(historySeen));
  }, [historySeen]);
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
            height: "100px",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            padding: "60px 0px 20px 0px",
          }}
        >
          <ContactMailOutlinedIcon sx={{ color: "#6600CC" }} />
          <Typography sx={{ marginLeft: "10px", height: "30px" }}>
            Lịch sử tour đã quan tâm
          </Typography>
        </Box>

        <Box
          sx={{
            height: "280px",
            margin: "0px 20px 0px 20px",
            borderRadius: "10px",
            boxShadow: "0px 1px 1px 1px #DCDCDC",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ overflowY: "scroll", overflowX: "hidden" }}>
            {historySeen.map((tour) => (
              <Box
                key={tour._id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 20px 1px 10px ",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTours.includes(tour)}
                  onChange={(e) => handleCheckboxChange(e, tour)}
                  style={{ width: "20px", height: "20px" }}
                />
                <Box
                  sx={{
                    width: "230px",
                    marginLeft: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FAFAD2",
                    padding: "5px",
                  }}
                >
                  <Typography fontSize={"13px"}>{tour.name}</Typography>
                </Box>
              </Box>
            ))}
          </div>
        </Box>
        <Box
          sx={{
            width: "260px",
            display: "flex",
            flexDirection: "row",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              width: "100px",
              margin: "20px 20px 0px 10px",
            }}
            onClick={() => handleDeleteTour()}
          >
            <ButtonClear text="Clear" />
          </div>
          <div
            style={{
              width: "100px",
              margin: "20px 20px 0px 10px",
            }}
            onClick={() => handleDeleteAllTours()}
          >
            <ButtonClear text="Clear all" />
          </div>
        </Box>
      </Box>
    </div>
  );
}
function setupdateHistoryAccount(): any {
  throw new Error("Function not implemented.");
}
