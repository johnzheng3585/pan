// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { alpha, Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Breadcrumb from "./Breadcrumb.tsx";
import TopActions from "./TopActions.tsx";
import TopActionsSecondary from "./TopActionsSecondary.tsx";
import { SearchIndicator } from "../Search/SearchIndicator.tsx";

const NavHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 1.5 }}
      sx={(theme) => ({
        px: { xs: 1.5, sm: 2 },
        alignItems: "center",
        pt: { xs: 1.25, sm: 2 },
        pb: { xs: 1, sm: 1.5 },
        mb: 0.75,
        borderBottom: `1px solid ${
          theme.palette.mode === "light" ? alpha(theme.palette.divider, 0.7) : alpha(theme.palette.divider, 0.9)
        }`,
      })}
    >
      <Box
        sx={{
          minWidth: 0,
          width: { xs: "100%", sm: "auto" },
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          pr: { xs: 0, sm: 1 },
        }}
      >
        <Breadcrumb />
        <SearchIndicator />
      </Box>
      <Stack
        direction={"row"}
        spacing={0.75}
        sx={{
          flexShrink: 0,
          width: { xs: "100%", sm: "auto" },
          justifyContent: { xs: "flex-end", sm: "flex-start" },
          alignItems: "center",
        }}
      >
        {!isMobile && (
          <TopActionsSecondary />
        )}
        <TopActions />
      </Stack>
    </Stack>
  );
};

export default NavHeader;
