// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { createTheme, CssBaseline, GlobalStyles, styled, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles/createTheme";
import i18next from "i18next";
import { enqueueSnackbar, MaterialDesignContent, SnackbarProvider } from "notistack";
import { Suspense, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useRegisterSW } from "virtual:pwa-register/react";
import FileIconSnackbar from "./component/Common/Snackbar/FileIconSnackbar.tsx";
import LoadingSnackbar from "./component/Common/Snackbar/LoadingSnackbar.tsx";
import { ServiceWorkerUpdateAction } from "./component/Common/Snackbar/snackbar.tsx";
import GlobalDialogs from "./component/Dialogs/GlobalDialogs.tsx";
import { GrowDialogTransition } from "./component/FileManager/Search/SearchPopup.tsx";
import Warning from "./component/Icons/Warning.tsx";
import { useAppSelector } from "./redux/hooks.ts";
import { changeThemeColor } from "./util";

export const applyThemeWithOverrides = (themeConfig: ThemeOptions): ThemeOptions => {
  return {
    ...themeConfig,
    shape: {
      ...themeConfig.shape,
      borderRadius: 8,
    },
    typography: {
      fontFamily:
        '"Inter", "Roboto", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, sans-serif',
      ...themeConfig.typography,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            overscrollBehavior: "none",
            letterSpacing: 0,
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          enterDelay: 500,
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 6,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            fontWeight: 600,
          },
          outlined: ({ theme }) => ({
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.paper,
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.mode === "light" ? "#f8fbff" : theme.palette.action.hover,
            },
          }),
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            transition: "background-color 160ms ease, border-color 160ms ease, color 160ms ease",
            "&:hover": {
              backgroundColor: theme.palette.mode === "light" ? "#f1f5fb" : theme.palette.action.hover,
            },
          }),
        },
      },
      MuiAlert: {
        defaultProps: {
          iconMapping: {
            warning: <Warning color={"inherit"} />,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiSkeleton: {
        defaultProps: {
          animation: "wave",
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: "8px",
            border: "1px solid",
            borderColor: theme.palette.divider,
          }),
          list: {
            padding: "6px 0",
          },
        },
        defaultProps: {
          slotProps: {
            paper: {
              elevation: 3,
            },
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: 0,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: "6px",
            margin: "0px 4px",
            paddingLeft: "8px",
            paddingRight: "8px",
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          TransitionComponent: GrowDialogTransition,
        },
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: 8,
            border: "1px solid",
            borderColor: theme.palette.divider,
          }),
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              borderBottom: "none",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "none",
            },
            borderRadius: 8,
            // '&:hover:not(.Mui-disabled, .Mui-error):before': {
            //   borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            // },
            // '&.Mui-focused:after': {
            //   borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            // },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            backgroundColor: theme.palette.background.paper,
            transition: "box-shadow 160ms ease, border-color 160ms ease",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 3px ${
                theme.palette.mode === "light" ? "rgba(63, 111, 185, 0.12)" : "rgba(122, 162, 247, 0.18)"
              }`,
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
          rounded: {
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            border: "1px solid",
            borderColor: theme.palette.divider,
            boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 600,
          },
        },
      },
    },
  };
};

export const useGeneratedTheme = (preferedDark?: boolean, subTheme?: boolean) => {
  const themes = useAppSelector((state) => state.siteConfig.basic.config.themes);
  const defaultTheme = useAppSelector((state) => state.siteConfig.basic.config.default_theme);
  const preferredTheme = useAppSelector((state) => state.globalState.preferredTheme);
  let darkMode = useAppSelector((state) => state.globalState.darkMode);
  darkMode = darkMode;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode =
    preferedDark !== undefined
      ? preferedDark
        ? "dark"
        : "light"
      : darkMode === undefined
        ? prefersDarkMode
          ? "dark"
          : "light"
        : darkMode
          ? "dark"
          : "light";
  const theme = useMemo(() => {
    // Determine preferred theme
    var themeConfig = {} as ThemeOptions;
    if (themes) {
      try {
        const themeOptions = JSON.parse(themes) as themeOptions;
        themeConfig = getPreferredTheme(themeOptions, mode, preferredTheme, defaultTheme);
      } catch (e) {
        console.log("failed to parse theme config, using default", e);
      }
    }

    const basePalette =
      mode === "light"
        ? {
            primary: { main: "#3f6fb9" },
            background: { default: "#f4f7fb", paper: "#ffffff" },
            divider: "#d4dce8",
            text: { primary: "#0f172a", secondary: "#53627a" },
          }
        : {
            primary: { main: "#7aa2f7" },
            background: { default: "#0f172a", paper: "#111827" },
            divider: "#263247",
            text: { primary: "#eef2ff", secondary: "#a8b3c7" },
          };

    themeConfig = {
      ...themeConfig,
      palette: {
        ...basePalette,
        ...themeConfig.palette,
        mode: mode,
        primary: {
          ...basePalette.primary,
          ...themeConfig.palette?.primary,
        },
        background: {
          ...basePalette.background,
          ...themeConfig.palette?.background,
        },
        text: {
          ...basePalette.text,
          ...themeConfig.palette?.text,
        },
      },
    };

    const t = createTheme(applyThemeWithOverrides(themeConfig));
    if (!subTheme) {
      changeThemeColor(themeConfig?.palette?.mode === "light" ? t.palette.grey[100] : t.palette.grey[900]);
    }
    return t;
  }, [prefersDarkMode, preferredTheme, defaultTheme, themes, darkMode]);

  return theme;
};

const removeI18nCache = () => {
  Object.keys(localStorage).forEach(function (key) {
    if (key && key.startsWith("i18next_res_")) {
      localStorage.removeItem(key);
    }
  });
};

export const App = () => {
  const theme = useGeneratedTheme();
  const { t } = useTranslation();

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      enqueueSnackbar({
        message: i18next.t("common:newVersionRefresh"),
        variant: "default",
        persist: true,
        action: ServiceWorkerUpdateAction(() => {
          updateServiceWorker(true);
          removeI18nCache();
        }),
      });
    }
  }, [needRefresh, updateServiceWorker]);

  return (
    <Suspense fallback={<div>正在加载...</div>}>
      <ThemeProvider theme={theme}>
        <AppContent />
      </ThemeProvider>
    </Suspense>
  );
};

interface themeOptions {
  [key: string]: singleThemeOption;
}

interface singleThemeOption {
  light: ThemeOptions;
  dark?: ThemeOptions;
}

const getPreferredTheme = (
  opts: themeOptions,
  mode: "dark" | "light",
  preferredTheme?: string,
  defaultTheme?: string,
): ThemeOptions => {
  let themeConfig = {} as singleThemeOption;
  if (defaultTheme && opts[defaultTheme]) {
    themeConfig = opts[defaultTheme];
  }
  if (preferredTheme && opts[preferredTheme]) {
    themeConfig = opts[preferredTheme];
  }

  if (!themeConfig?.light) {
    themeConfig = Object.values(opts)[0];
  }

  if (mode === "dark" && themeConfig.dark) {
    return themeConfig.dark;
  }

  return themeConfig.light;
};

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  "&.notistack-MuiContent": {
    borderRadius: 12,
  },
  "&.notistack-MuiContent-success": {
    backgroundColor: theme.palette.success.main,
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: theme.palette.error.main,
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: theme.palette.warning.main,
  },
}));

const AppContent = () => {
  const title = useAppSelector((state) => state.siteConfig.basic.config.title);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollBar = {
    "&::-webkit-scrollbar-button": {
      width: 0,
      height: 0,
    },
    "&::-webkit-scrollbar-corner": {
      background: "0 0",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 4,
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 4,
    },
    "&::-webkit-scrollbar-track:hover": {
      backgroundColor: theme.palette.mode == "light" ? grey[200] : grey[800],
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: theme.palette.primary.main + "!important",
    },
    "& :hover::-webkit-scrollbar-thumb,:hover>:first-child::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.mode == "light" ? grey[400] : grey[600],
    },
    "&::-webkit-scrollbar ": {
      width: 8,
      height: 8,
    },
  };

  useEffect(() => {
    const loader = document.getElementById("app-loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={() => ({
          html: {
            scrollbarWidth: isMobile ? "initial" : "thin",
            //scrollbarColor: theme.palette.action.selected + " transparent",
          },
          ...(isMobile ? undefined : scrollBar),
          body: {
            overflowY: isMobile ? "initial" : "hidden",
            backgroundColor: theme.palette.background.default,
          },
          "*, *::before, *::after": {
            letterSpacing: 0,
          },
          ".highlight-marker": {
            backgroundColor: "#ffc1079e",
            borderRadius: "4px",
            boxShadow: "0 0 0 2px #ffc1079e",
          },
          ".fade-enter": {
            opacity: 0,
            transform: "translateY(4px)",
          },
          ".fade-enter-active": {
            opacity: 1,
            transform: "translateY(0)",
            transition: "opacity 180ms ease, transform 180ms ease",
          },
          ".fade-exit": {
            opacity: 1,
          },
          ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 120ms ease",
          },
          ".MuiDrawer-paper .MuiTypography-body2": {
            fontWeight: 560,
          },
        })}
      />
      <SnackbarProvider
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
          warning: StyledMaterialDesignContent,
          loading: LoadingSnackbar,
          default: StyledMaterialDesignContent,
          file: FileIconSnackbar,
        }}
      >
        <GlobalDialogs />
        <Outlet />
      </SnackbarProvider>
    </>
  );
};
