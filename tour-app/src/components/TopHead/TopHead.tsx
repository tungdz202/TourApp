import { Box, Typography } from "@mui/material";
import React from "react";

export default function TopHead() {
  return (
    <div>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          flexDirection: "row",
          padding: "12px 0px 10px 400px",
          backgroundColor: "rgba(255,231,186,0.4)",
        }}
      >
        <a>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "550",
              color: "rgba(210,180,140,0.9)",
              margin: "0px 20px",
            }}
          >
            Trang chủ
          </Typography>
        </a>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "550",
              color: "rgba(210,180,140,0.9)",
              margin: "0px 20px",
            }}
          >
            Tour du lịch
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "550",
              color: "rgba(210,180,140,0.9)",
              margin: "0px 20px",
            }}
          >
            Tin tức
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "550",
              color: "rgba(210,180,140,0.9)",
              margin: "0px 20px",
            }}
          >
            Liên hệ với chúng tôi
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "550",
              color: "rgba(210,180,140,0.9)",
              margin: "0px 20px",
            }}
          >
            Email
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
