// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { Box, Drawer, Popover, PopoverProps, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import SessionManager from "../../../session";
import TreeNavigation from "../../FileManager/TreeView/TreeNavigation.tsx";
import { PageVariant, PageVariantContext } from "../NavBarFrame.tsx";
import DrawerHeader from "./DrawerHeader.tsx";
import PageNavigation, { AdminPageNavigation } from "./PageNavigation.tsx";
import StorageSummary from "./StorageSummary.tsx";

const DrawerContent = () => {
  const { sidebar_bottom } = useAppSelector((state) => state.siteConfig.basic?.config?.custom_html ?? {});
  const scrollRef = useRef<any>();
  const user = SessionManager.currentLoginOrNull();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pageVariant = useContext(PageVariantContext);
  const isDashboard = pageVariant === PageVariant.dashboard;
  return (
    <>
      <DrawerHeader />
      <Stack
        direction={"column"}
        spacing={1.5}
        ref={scrollRef}
        sx={{
          px: 1.25,
          pb: 1.5,
          flexGrow: 1,
          mx: 0.75,
          overflow: "auto",
          "& > .MuiBox-root": {
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            pt: 1.25,
            mt: 0.5,
          },
          "& > .MuiBox-root:first-of-type": {
            borderTop: "none",
            pt: 0,
            mt: 0,
          },
        }}
      >
        {!isDashboard && (
          <>
            <TreeNavigation scrollRef={scrollRef} hideWithDrawer={!isMobile} />
            <PageNavigation />
            {user && <StorageSummary />}
          </>
        )}
        {isDashboard && <AdminPageNavigation />}
        {sidebar_bottom && (
          <Box sx={{ width: "100%" }}>
            <div dangerouslySetInnerHTML={{ __html: sidebar_bottom }} />
          </Box>
        )}
      </Stack>
    </>
  );
};

export const DrawerPopover = (props: PopoverProps) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.globalState.drawerOpen);
  const drawerWidth = useAppSelector((state) => state.globalState.drawerWidth);
  return (
    <Popover {...props}>
      <Box sx={{ width: "70vw" }}>
        <DrawerContent />
      </Box>
    </Popover>
  );
};

const AppDrawer = () => {
  const theme = useTheme();
  const open = useAppSelector((state) => state.globalState.drawerOpen);
  const drawerWidth = useAppSelector((state) => state.globalState.drawerWidth);
  const appBarBg = theme.palette.mode === "light" ? "#f3f6fb" : theme.palette.background.default;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: "flex",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: appBarBg,
          borderRight: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.palette.mode === "light" ? "inset -1px 0 0 rgba(255,255,255,0.78)" : "none",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerContent />
    </Drawer>
  );
};

export default AppDrawer;
