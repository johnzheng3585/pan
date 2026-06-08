// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { Box, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../redux/hooks.ts";
import HardDrive from "../Icons/HardDrive.tsx";

const Logo = (props: any) => {
  const theme = useTheme();
  const title = useAppSelector((state) => state.siteConfig.basic.config.title);
  const displayTitle = !title || title.toLowerCase() === "cloudreve" ? "糖果盘" : title;

  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        minWidth: 0,
        userSelect: "none",
        ...props.sx,
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #3f6fb9 0%, #5d86d7 55%, #83d2d5 100%)"
              : "linear-gradient(135deg, #4f7fd6 0%, #7aa2f7 55%, #63d6d1 100%)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 10px 24px rgba(63, 111, 185, 0.22)"
              : "0 10px 26px rgba(0, 0, 0, 0.35)",
          flexShrink: 0,
        }}
      >
        <HardDrive sx={{ fontSize: 19 }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle1" fontWeight={800} noWrap sx={{ lineHeight: 1.1 }}>
          {displayTitle}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block", lineHeight: 1.1, mt: 0.25 }}>
          个人网盘
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
