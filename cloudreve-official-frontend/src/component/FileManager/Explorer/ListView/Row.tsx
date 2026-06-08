// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import { alpha, Box, Skeleton, styled } from "@mui/material";
import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "../../../../redux/hooks.ts";
import { navigateReconcile } from "../../../../redux/thunks/filemanager.ts";
import { NoWrapTypography } from "../../../Common/StyledComponents.tsx";
import useActionDisplayOpt from "../../ContextMenu/useActionDisplayOpt.ts";
import { FileBlockProps } from "../Explorer.tsx";
import { useFileBlockState } from "../GridView/GridFile.tsx";
import Cell from "./Cell.tsx";

const RowContainer = styled(Box)<{
  selected: boolean;
  transparent?: boolean;
  isDropOver?: boolean;
  disabled?: boolean;
}>(({ theme, disabled, transparent, isDropOver, selected }) => {
  let bgColor = "transparent";
  let bgColorHover =
    theme.palette.mode === "light" ? alpha(theme.palette.primary.main, 0.045) : alpha(theme.palette.primary.main, 0.12);

  if (selected) {
    bgColor =
      theme.palette.mode === "light" ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.main, 0.2);
    bgColorHover = bgColor;
  }
  return {
    position: "relative",
    minHeight: "46px",
    margin: "3px 0",
    borderRadius: "12px",
    border: `1px solid ${selected ? alpha(theme.palette.primary.main, 0.16) : "transparent"}`,
    display: "flex",
    backgroundColor: bgColor,
    color: selected ? theme.palette.primary.main : theme.palette.text.primary,
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 8,
      bottom: 8,
      width: 3,
      borderRadius: "0 4px 4px 0",
      backgroundColor: selected ? theme.palette.primary.main : "transparent",
    },
    "&:hover": {
      backgroundColor: bgColorHover,
      borderColor: selected
        ? alpha(theme.palette.primary.main, 0.2)
        : alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.08 : 0.18),
      boxShadow: theme.palette.mode === "light" ? "0 10px 26px rgba(15, 23, 42, 0.055)" : "none",
    },
    pointerEvents: disabled ? "none" : "auto",
    opacity: transparent || disabled ? 0.5 : 1,
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    transitionProperty: "background-color,opacity,box-shadow,border-color,color",
    boxShadow: isDropOver ? `inset 0 0 0 2px ${theme.palette.primary.light}` : "none",
  };
});

const Column = styled(Box)<{ w: number }>(({ theme, w }) => ({
  display: "flex",
  alignItems: "center",
  width: `${w}px`,
  padding: "0 12px",
  minWidth: 0,
  "& .MuiTypography-root": {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },
  "&:first-of-type .MuiTypography-root": {
    color: "inherit",
  },
}));

const Row = memo((props: FileBlockProps) => {
  const { file, columns, search, isDragging, isDropOver } = props;
  const dispatch = useAppDispatch();

  const {
    fmIndex,
    isSelected,
    isLoadingIndicator,
    noThumb,
    uploading,
    ref,
    inView,
    showLock,
    fileTag,
    onClick,
    onDoubleClicked,
    hoverStateOff,
    hoverStateOn,
    onContextMenu,
    setRefFunc,
    disabled,
    fileDisabled,
    thumbWidth,
    thumbHeight,
  } = useFileBlockState(props);

  const targetDisplayOptions = useActionDisplayOpt([file]);

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (isLoadingIndicator) {
      if (file.first) {
        dispatch(navigateReconcile(fmIndex, { next_page: true }));
      }
      return;
    }
  }, [inView]);

  const stopPop = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <RowContainer
      transparent={isDragging || fileDisabled}
      isDropOver={isDropOver && !isDragging}
      ref={setRefFunc}
      selected={!!isSelected}
      onMouseDown={stopPop}
      onClick={onClick}
      onDoubleClick={onDoubleClicked}
      onMouseEnter={hoverStateOn}
      onMouseLeave={hoverStateOff}
      onContextMenu={onContextMenu}
      disabled={disabled}
    >
      {columns?.map((column, index) => (
        <Column w={column.width ?? column.defaults.width} key={index}>
          <NoWrapTypography
            sx={{
              width: "100%",
            }}
            variant={"body2"}
          >
            {!file.placeholder && (
              <Cell
                actionDisplayOpt={targetDisplayOptions}
                isSelected={!!isSelected}
                search={search}
                column={column}
                file={file}
                uploading={uploading}
                fileTag={fileTag}
                showLock={showLock}
                noThumb={noThumb}
                thumbWidth={thumbWidth}
                thumbHeight={thumbHeight}
              />
            )}

            {file.placeholder && <Skeleton variant={"text"} width={0.5 * (column.width ?? column.defaults.width)} />}
          </NoWrapTypography>
        </Column>
      ))}
    </RowContainer>
  );
});

export default Row;
