import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import {
  getTourByOrigin,
  getTourByOrigin2,
} from "../../../Service/tour.service";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../Redux/store";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function QuantityByMonth() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: "#FF6633",
        borderRadius: 25,
      },
    },
  };

  let listOrigin = useAppSelector((state) => state.hotTour.hotTour.listOrigin);

  // const [sumTour, setSumtour] = useState([{ origin: "", number: "" }]);
  const [label, setLabel] = useState<String[]>([listOrigin[0].origin]);
  const [number, setNumber] = useState<Number[]>([]);
  const dispatch = useDispatch();

  // const update = () => {
  //   const label = [];
  //   const number = [];
  //   for (const origin of listOrigin) {
  //     label.push(origin.origin);
  //     number.push(origin.number);
  //   }
  //   setLabel(label);
  //   setNumber(number);
  // };

  const chartData = {
    labels: label,
    datasets: [
      {
        label: "Số lượng tour",
        data: number,
      },
    ],
  };
  const getdata = async () => {
    const label = [];
    const number = [];
    const listOrigin = await getTourByOrigin2();
    for (const origin of listOrigin) {
      label.push(origin.origin);
      number.push(origin.number);
    }
    setLabel(label);
    setNumber(number);
  };
  console.log(label, number);
  useEffect(() => {
    getTourByOrigin(dispatch);
    getdata();
  }, []);
  return (
    <div
      style={{
        width: "590px",
        height: "420px",
        boxShadow: " 0px 7px 29px 0px rgba(100, 100, 111, 0.25)",
        padding: "30px",
        borderRadius: "15px",
        margin: "15px",
      }}
    >
      <div>
        <Typography
          padding={"0px 0px 10px 35px"}
          sx={{ fontSize: "18px", fontWeight: "550", color: "#3399FF" }}
        >
          Thống kê lượng tour từng trang
        </Typography>
      </div>
      <div style={{ width: "500px" }}>
        <Bar options={chartOptions} data={chartData} height={`350px`} />
      </div>
    </div>
  );
}

const data = {
  user: {
    name: "TungBoss",
    img: "",
  },

  quantityByMonths: {
    labels: [
      "VNBooking",
      "Ivivu",
      "Travel",
      "Viettourist",
      "SaigonTourist",
      "Dulichviet",
    ],
    data: [135, 144, 78, 69, 103, 92],
  },
};
