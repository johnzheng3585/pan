// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import Add from "../Icons/Add.tsx";
import { alpha, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/hooks.ts";
import { openNewContextMenu } from "../../redux/thunks/filemanager.ts";
import { FileManagerIndex } from "./FileManager.tsx";

const NewButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <IconButton
        onClick={(e) => dispatch(openNewContextMenu(FileManagerIndex.main, e))}
        sx={{
          width: 38,
          height: 38,
          borderRadius: "11px",
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          boxShadow: theme.palette.mode === "light" ? "0 10px 24px rgba(63, 111, 185, 0.18)" : "none",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <Add />
      </IconButton>
    );
  }

  return (
    <Button
      variant={"contained"}
      onClick={(e) => dispatch(openNewContextMenu(FileManagerIndex.main, e))}
      startIcon={<Add />}
      color={"primary"}
      sx={{
        borderRadius: "12px",
        px: 2.25,
        minHeight: 40,
        minWidth: 92,
        fontWeight: 800,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        boxShadow:
          theme.palette.mode === "light"
            ? `0 12px 28px ${alpha(theme.palette.primary.main, 0.24)}`
            : `0 12px 28px ${alpha(theme.palette.common.black, 0.28)}`,
        transition: theme.transitions.create(["transform", "box-shadow", "background-color"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow:
            theme.palette.mode === "light"
              ? `0 16px 34px ${alpha(theme.palette.primary.main, 0.28)}`
              : `0 14px 30px ${alpha(theme.palette.common.black, 0.34)}`,
        },
      }}
    >
      {t("fileManager.new")}
    </Button>
  );
};

export default NewButton;
