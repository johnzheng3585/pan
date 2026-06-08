// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Outlet, useNavigation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks.ts";
import AutoHeight from "../Common/AutoHeight.tsx";
import CircularProgress from "../Common/CircularProgress.tsx";
import LanguageSwitcher from "../Common/LanguageSwitcher.tsx";
import Logo from "../Common/Logo.tsx";
import { ConnectingLine, OAuthAppCard } from "./OauthAppCard.tsx";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: 7,
        pb: 9,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

const HeadlessFrame = () => {
  const loading = useAppSelector((state) => state.globalState.loading.headlessFrame);
  const { headless_footer, headless_bottom } = useAppSelector(
    (state) => state.siteConfig.basic?.config?.custom_html ?? {},
  );
  const oauthApp = useAppSelector((state) => state.globalState.oauthApp);
  const oauthAppLoading = useAppSelector((state) => state.globalState.oauthAppLoading);
  let navigation = useNavigation();

  const showOAuthCard = oauthApp || oauthAppLoading;

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth={"xs"}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Box sx={{ width: "100%", py: 2 }}>
            {showOAuthCard && (
              <>
                <OAuthAppCard app={oauthApp} loading={!!oauthAppLoading && !oauthApp} />
                <ConnectingLine />
              </>
            )}
            <Paper
              sx={{
                padding: (theme) => `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                boxShadow: "0 14px 42px rgba(15, 23, 42, 0.10)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Logo
                    sx={{
                      maxWidth: "220px",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
                    安全连接你的网盘账号
                  </Typography>
                </Box>
                <LanguageSwitcher />
              </Box>
              <AutoHeight>
                <div>
                  <Box
                    sx={{
                      display: loading || navigation.state !== "idle" ? "none" : "block",
                    }}
                  >
                    <Outlet />
                    {headless_bottom && (
                      <Box sx={{ width: "100%" }}>
                        <div dangerouslySetInnerHTML={{ __html: headless_bottom }} />
                      </Box>
                    )}
                  </Box>
                  {(loading || navigation.state !== "idle") && <Loading />}
                </div>
              </AutoHeight>
            </Paper>
          </Box>
          {headless_footer && (
            <Box sx={{ width: "100%", mb: 2 }}>
              <div dangerouslySetInnerHTML={{ __html: headless_footer }} />
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default HeadlessFrame;
