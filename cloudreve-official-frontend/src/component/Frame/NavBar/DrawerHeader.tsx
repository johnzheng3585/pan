// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { ChevronLeft } from "@mui/icons-material";
import { Box, Fade, IconButton, styled, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { setDrawerOpen } from "../../../redux/globalStateSlice.ts";
import { useAppDispatch } from "../../../redux/hooks.ts";
import Logo from "../../Common/Logo.tsx";

export const DrawerHeaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1.5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const DrawerHeader = ({ disabled }: { disabled?: boolean }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  const [showCollapse, setShowCollapse] = useState(false);

  return (
    <DrawerHeaderContainer
      onMouseEnter={() => setShowCollapse(disabled ? false : true)}
      onMouseLeave={() => setShowCollapse(false)}
    >
      <Box sx={{ width: "100%", pl: 0.5 }}>
        <Logo
          sx={{
            width: "100%",
          }}
        />
      </Box>
      {!isMobile && (
        <Box>
          <Fade in={showCollapse}>
            <IconButton onClick={() => dispatch(setDrawerOpen(false))}>
              <ChevronLeft />
            </IconButton>
          </Fade>
        </Box>
      )}
    </DrawerHeaderContainer>
  );
};

export default DrawerHeader;
