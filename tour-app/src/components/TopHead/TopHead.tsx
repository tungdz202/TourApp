import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TopHead() {
  const navigate = useNavigate();
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
        <a href="/" style={{ textDecoration: "none", color: "transparent" }}>
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
        <a
          href="/tour"
          style={{ textDecoration: "none", color: "transparent" }}
        >
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
        </a>
        <a
          href="/blog"
          style={{ textDecoration: "none", color: "transparent" }}
        >
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
        </a>
        <div>
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
        </div>
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
