// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { BoxProps, useMediaQuery, useTheme } from "@mui/material";
import { RadiusFrame } from "../Frame/RadiusFrame.tsx";

const PageContainer = (props: BoxProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <RadiusFrame
      {...props}
      sx={{
        flexGrow: 1,
        width: "100%",
        maxWidth: 1320,
        mx: "auto",
        mb: isMobile ? 0 : 1.5,
        px: { xs: 2, sm: 3, lg: 4 },
        py: { xs: 2.5, sm: 3.5 },
        boxSizing: "border-box",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "auto",
      }}
      square={isMobile}
      withBorder={false}
    />
  );
};

export default PageContainer;
