import React from "react";
import Carousel from "react-material-ui-carousel";
import { CardContent, Paper } from "@mui/material";
import { CardCover, Typography, Card } from "@mui/joy";

export default function Slide() {
  return (
    // <Card component="li" sx={{ height: "500px", flexGrow: 1 }}>
    //   <CardCover>
    //     <video
    //       autoPlay
    //       loop
    //       muted
    //       poster="https://assets.codepen.io/6093409/river.jpg"
    //     >
    //       <source
    //         src="https://assets.codepen.io/6093409/river.mp4"
    //         type="video/mp4"
    //       />
    //     </video>
    //   </CardCover>
    // </Card>
    <Carousel
      animation="fade"
      indicators={false}
      duration={1500}
      fullHeightHover={false}
      sx={{ zIndex: 0 }}
    >
      {examples.map((example) => (
        <Item key={example.id} item={example} />
      ))}
    </Carousel>
  );
}

function Item(props: any) {
  return (
    <Paper sx={{ boxShadow: "none" }}>
      <img src={props.item.img} height={300} width={"100%"} />
    </Paper>
  );
}

const examples = [
  {
    id: 1,
    img: "https://www.vietnambooking.com/wp-content/uploads/2023/05/chum-tour-le-2-9-2023.png",
    title: "cay",
  },
  {
    id: 2,
    img: "https://www.vietnambooking.com/wp-content/uploads/2023/01/tour-philippines-4n3dvietnam-booking.jpg",
    title: "cay",
  },
  {
    id: 3,
    img: "https://www.vietnambooking.com/wp-content/uploads/2020/07/banner-tour-du-lich-mien-nam.jpg",
    title: "cay",
  },
];
