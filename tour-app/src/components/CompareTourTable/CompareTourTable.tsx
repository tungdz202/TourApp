import React, { useState, useRef, useEffect } from "react";
import style from "./style.module.css";
import { useAppSelector } from "../../Redux/store";
import { Box, Typography } from "@mui/material";
import { TourCompare } from "../../types/TourCompare";
import { useDispatch } from "react-redux";
import { getCompareTourSuccess } from "../../Redux/State/Comparetours.slice";
import ListTour from "../ListTour/ListTour";
import ButtonCompareTable from "../ButttonCustom/ButtonCompareTable/ButtonCompareTable";
import ButtonRemoveTable from "../ButttonCustom/ButtonRemoveTable/ButtonRemoveTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fieldMappings: { [key: string]: string } = {
  name: "Thông tin tour",
  origin: "Nơi cung cấp",
  originalPrice: "Giá gốc",
  presentPrice: "Giá Sale",
  schedules: "Lịch trình",
  time: "Thời lượng",
  vehicle: "Phương tiện",
  departurePoint: "Nơi khởi hành",
};

export default function CompareTourTable() {
  const listtourCompare = useAppSelector(
    (state) => state.tourCompare.ListTour.listCompareTour
  );
  console.log(listtourCompare);
  const hiddenFields: string[] = [
    "imgs",
    "_id",
    "highlightDestinations",
    "url",
    "tourcode",
  ];
  const isHiddenField = (field: string) => {
    return hiddenFields.includes(field);
  };

  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const bigTableRef = useRef<HTMLDivElement>(null);
  const smallTableRef = useRef<HTMLDivElement>(null);

  const handleBigTableButtonClick = () => {
    if (listtourCompare.length > 0) {
      setIsOpenPopup(!isOpenPopup);
    } else {
      toast.warn("Chưa có tour trong danh sách so sánh", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const ListourCompare: TourCompare[] = useAppSelector(
    (state) => state.tourCompare.ListTour.listCompareTour
  );
  const dispatch = useDispatch();
  const ListTourCompare2: TourCompare[] = [...ListourCompare];

  const removeTourCompare = (tourCompare: TourCompare) => {
    const newListTourcompare = ListTourCompare2.filter(
      (tour) => tour._id !== tourCompare._id
    );
    console.log(newListTourcompare.length);
    dispatch(getCompareTourSuccess(newListTourcompare));
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        bigTableRef.current &&
        bigTableRef.current.contains(event.target as Node)
      ) {
        if (
          smallTableRef.current &&
          smallTableRef.current.contains(event.target as Node)
        ) {
          setIsOpenPopup(true);
        } else {
          setIsOpenPopup(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      style={{ position: "fixed", bottom: "100px", right: "20px", zIndex: "3" }}
    >
      <ToastContainer />
      <a onClick={handleBigTableButtonClick}>
        <ButtonCompareTable />
      </a>
      {isOpenPopup && (
        <div
          ref={bigTableRef}
          style={{
            position: "fixed",
            background: "rgba(255,255,255,0.5)",
            paddingTop: "90px",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Box
            ref={smallTableRef}
            sx={{
              maxHeight: "600px",
              maxWidth: "1200px",
              height: "auto",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFFFFF",
              boxShadow: "1px 2px 5px 2px #828282",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
            <Box sx={{ padding: "20px" }}>
              <div className={style.comparison_table}>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {ListTourCompare2.map((tourCompare, index) => (
                        <th key={index} style={{ padding: "0px" }}>
                          <img
                            src={tourCompare.imgs[0]}
                            width={"220px"}
                            height={"140px"}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ListTourCompare2.length > 0 ? (
                      Object.keys(ListTourCompare2[0]).map(
                        (attribute, index) =>
                          !isHiddenField(attribute) && (
                            <tr key={index} className={style.row}>
                              <td id={style.attribute}>
                                <Typography fontSize={"18px"} fontWeight={550}>
                                  {fieldMappings[attribute]}
                                </Typography>
                              </td>
                              {ListTourCompare2.map((TourCompare, i) => (
                                <td key={i}>
                                  <a
                                    href={TourCompare.url}
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      textDecoration: "none",
                                      color: "transparent",
                                    }}
                                  >
                                    {attribute == "schedules" ? (
                                      <Typography sx={{ color: "black" }}>
                                        {TourCompare.schedules.map((s) => (
                                          <Box>{s}</Box>
                                        ))}
                                      </Typography>
                                    ) : (
                                      <Typography sx={{ color: "black" }}>
                                        {
                                          TourCompare[
                                            attribute as keyof TourCompare
                                          ]
                                        }
                                      </Typography>
                                    )}
                                  </a>
                                </td>
                              ))}
                            </tr>
                          )
                      )
                    ) : (
                      <tr>
                        <td>Hãy thêm tour vào bảng so sánh</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ border: "none" }}></td>
                      {ListTourCompare2.map((TourCompare, index) => (
                        <td key={index} style={{ border: "none" }}>
                          <div onClick={() => removeTourCompare(TourCompare)}>
                            <ButtonRemoveTable />
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Box>
            {/* <Box>thêm tour</Box> */}
          </Box>
        </div>
      )}
    </div>
  );
}
