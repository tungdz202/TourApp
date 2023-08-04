import React, { useEffect } from "react";
import { getWeather } from "../../Service/tour.service";
import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../Redux/store";

interface weather {
  temp: string;
  icon: string;
  date: string;
}

interface province {
  name: string;
}

export default function WeatherBar(province: province) {
  const Weather: weather[] = [];
  const [data, setData] = React.useState<weather[]>([]);
  const fetchData = async () => {
    const response = await getWeather(
      province.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
    );
    const weathers = response.forecast.forecastday;
    for (let weather of weathers) {
      let temp = weather.day.avgtemp_c;
      let icon = weather.day.condition.icon;
      let date = weather.date;
      const weatherday = {
        temp: temp,
        icon: icon,
        date: date,
      };
      Weather.push(weatherday);
    }
    setData(Weather);
  };
  useEffect(() => {
    fetchData();
  }, [province]);
  return (
    <div>
      <Box sx={{}}>
        <Typography
          variant="h6"
          width={"300px"}
          marginRight={"auto"}
          marginLeft={"auto"}
        >
          Thời tiết trong những ngày tới
        </Typography>
      </Box>
      <Stack direction={"row"} spacing={5} padding={"20px"} marginLeft={"10px"}>
        {data.map((w) => (
          <Box key={w.date} display={"flex"} flexDirection={"column"}>
            <img src={w.icon} width={"55px"} height={"55px"} />
            <Typography fontSize={"14px"} fontWeight={550} paddingLeft={"9px"}>
              {w.temp}ºC
            </Typography>
          </Box>
        ))}
      </Stack>
    </div>
  );
}
