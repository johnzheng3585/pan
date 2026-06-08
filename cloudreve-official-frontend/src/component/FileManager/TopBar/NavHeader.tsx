// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Breadcrumb from "./Breadcrumb.tsx";
import TopActions from "./TopActions.tsx";
import { RadiusFrame } from "../../Frame/RadiusFrame.tsx";
import TopActionsSecondary from "./TopActionsSecondary.tsx";
import { SearchIndicator } from "../Search/SearchIndicator.tsx";

const NavHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack
      direction={"row"}
      spacing={1}
      sx={{
        px: isMobile ? 2 : "initial",
        alignItems: "center",
        mb: 0.5,
      }}
    >
      <RadiusFrame
        sx={{
          flexGrow: 1,
          px: 1,
          py: 0.75,
          overflow: "hidden",
          display: "flex",
          minHeight: 44,
          boxShadow: "none",
          backgroundColor: (theme) => (theme.palette.mode === "light" ? "#ffffff" : theme.palette.background.paper),
        }}
        withBorder
      >
        <Breadcrumb />
        <SearchIndicator />
      </RadiusFrame>
      {!isMobile && (
        <RadiusFrame sx={{ minHeight: 44, display: "flex", alignItems: "center", boxShadow: "none" }}>
          <TopActionsSecondary />
        </RadiusFrame>
      )}
      <RadiusFrame sx={{ minHeight: 44, display: "flex", alignItems: "center", boxShadow: "none" }}>
        <TopActions />
      </RadiusFrame>
    </Stack>
  );
};

export default NavHeader;
