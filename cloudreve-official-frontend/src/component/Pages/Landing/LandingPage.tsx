// This file is part of Cloudreve Pro edition source code, Reference ID: 1380
import {
  Add,
  ArrowForward,
  CloudDoneOutlined,
  DevicesOutlined,
  FolderOutlined,
  ImageOutlined,
  InsertDriveFileOutlined,
  LockOutlined,
  MovieOutlined,
  SearchOutlined,
  ShareOutlined,
  StorageOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Common/Logo.tsx";
import PageTitle from "../../../router/PageTitle.tsx";
import SessionManager from "../../../session";
import DarkThemeSwitcher from "../../Frame/NavBar/DarkThemeSwitcher.tsx";

const capabilityItems = [
  {
    icon: <FolderOutlined />,
    title: "文件归档",
    text: "集中管理图片、视频、文档和文件夹，路径清晰，找文件更快。",
  },
  {
    icon: <ShareOutlined />,
    title: "分享协作",
    text: "公开分享、私密提取码、有效期和访问记录都在一个入口里。",
  },
  {
    icon: <CloudDoneOutlined />,
    title: "离线任务",
    text: "后台下载、任务进度和完成入库统一查看，减少重复等待。",
  },
  {
    icon: <DevicesOutlined />,
    title: "多端连接",
    text: "兼容 WebDAV 与桌面客户端，常用设备之间保持连续体验。",
  },
];

const navItems = ["我的文件", "图片", "视频", "音乐", "分享"];

const previewFiles = [
  { icon: <FolderOutlined />, title: "项目资料", meta: "文件夹" },
  { icon: <MovieOutlined />, title: "旅行记录.mp4", meta: "视频" },
  { icon: <ImageOutlined />, title: "设计截图.png", meta: "图片" },
  { icon: <InsertDriveFileOutlined />, title: "说明文档.md", meta: "文档" },
];

const ProductPreview = () => {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        borderRadius: 2,
        bgcolor: theme.palette.mode === "light" ? "#ffffff" : alpha(theme.palette.common.white, 0.04),
        boxShadow:
          theme.palette.mode === "light"
            ? "0 26px 80px rgba(42, 74, 122, 0.14)"
            : "0 26px 80px rgba(0, 0, 0, 0.32)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: { xs: 1.25, sm: 1.75 },
          py: 1.25,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.035 : 0.1),
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "#f87171",
            boxShadow: "18px 0 0 #facc15, 36px 0 0 #4ade80",
            mr: 5,
            flexShrink: 0,
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            flex: 1,
            minWidth: 0,
            px: 1.25,
            py: 0.75,
            borderRadius: 1.5,
            border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            bgcolor: "background.paper",
          }}
        >
          <SearchOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            搜索文件名、分享或任务
          </Typography>
        </Stack>
        {!compact && (
          <Button size="small" variant="contained" startIcon={<Add />} sx={{ height: 36 }}>
            新建
          </Button>
        )}
      </Stack>

      <Stack direction="row" sx={{ minHeight: { xs: 360, md: 430 } }}>
        {!compact && (
          <Box
            sx={{
              width: 150,
              p: 1.5,
              borderRight: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.mode === "light" ? "#f8fafc" : alpha(theme.palette.common.white, 0.025),
            }}
          >
            <Stack spacing={0.5}>
              {navItems.map((item, index) => (
                <Stack
                  key={item}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    px: 1,
                    py: 0.75,
                    borderRadius: 1.25,
                    color: index === 0 ? "primary.main" : "text.secondary",
                    bgcolor: index === 0 ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                    fontWeight: index === 0 ? 800 : 600,
                  }}
                >
                  <FolderOutlined sx={{ fontSize: 17 }} />
                  <Typography variant="body2" fontWeight="inherit" noWrap>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Box
              sx={{
                mt: 3,
                p: 1.25,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1.5,
                bgcolor: "background.paper",
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="caption" fontWeight={800}>
                  存储空间
                </Typography>
                <StorageOutlined sx={{ fontSize: 16, color: "primary.main" }} />
              </Stack>
              <LinearProgress variant="determinate" value={36} sx={{ mt: 1, height: 6, borderRadius: 99 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: "block" }}>
                已使用 36%
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ flex: 1, p: { xs: 1.5, sm: 2 }, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" color="text.secondary">
                我的文件
              </Typography>
              <Typography variant="h6" fontWeight={900} noWrap>
                今天继续整理的内容
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1.25 }}>
                <UploadFileOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1.25 }}>
                <ShareOutlined fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Box
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
              gap: 1.25,
            }}
          >
            {previewFiles.map((file, index) => (
              <Stack
                key={file.title}
                direction="row"
                alignItems="center"
                spacing={1.25}
                sx={{
                  p: 1.25,
                  minHeight: 76,
                  borderRadius: 1.5,
                  border: `1px solid ${index === 0 ? alpha(theme.palette.primary.main, 0.28) : theme.palette.divider}`,
                  bgcolor:
                    index === 0
                      ? alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.075 : 0.14)
                      : alpha(theme.palette.background.paper, 0.9),
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 1.25,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: index === 0 ? "primary.main" : "text.secondary",
                    bgcolor: alpha(index === 0 ? theme.palette.primary.main : theme.palette.text.secondary, 0.1),
                    flexShrink: 0,
                  }}
                >
                  {file.icon}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={800} noWrap>
                    {file.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {file.meta}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>

          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 1.5,
              border: `1px dashed ${alpha(theme.palette.primary.main, 0.35)}`,
              bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.045 : 0.1),
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.paper",
                  color: "primary.main",
                  flexShrink: 0,
                }}
              >
                <LockOutlined sx={{ fontSize: 19 }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" fontWeight={850}>
                  私密分享更可控
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  提取码、有效期、下载权限和访问统计保持在同一条链路里。
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLoggedIn = useMemo(() => !!SessionManager.currentLoginOrNull(), []);

  return (
    <Box
      sx={{
        height: "100vh",
        minHeight: 0,
        bgcolor: theme.palette.mode === "light" ? "#f5f7fb" : "background.default",
        color: "text.primary",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <PageTitle title="首页" />
      <Box
        component="header"
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "light" ? 0.86 : 0.72),
          backdropFilter: "blur(18px)",
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ minHeight: 72 }}>
            <Logo />
            <Stack direction="row" spacing={1} alignItems="center">
              <DarkThemeSwitcher />
              {!isLoggedIn && (
                <Button variant="outlined" onClick={() => navigate("/session")}>
                  登录
                </Button>
              )}
              <Button variant="contained" endIcon={<ArrowForward />} onClick={() => navigate(isLoggedIn ? "/home" : "/session")}>
                进入网盘
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, pb: { xs: 5, md: 7 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
        >
          <Box sx={{ flex: 0.9, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 900,
                letterSpacing: 0,
              }}
            >
              私人网盘工作台
            </Typography>
            <Typography
              component="h1"
              sx={{
                mt: 1.25,
                maxWidth: 620,
                fontSize: { xs: 42, sm: 54, md: 68 },
                lineHeight: 0.98,
                fontWeight: 950,
              }}
            >
              糖果盘
            </Typography>
            <Typography
              sx={{
                mt: 2,
                maxWidth: 620,
                fontSize: { xs: 24, md: 32 },
                lineHeight: 1.18,
                fontWeight: 900,
              }}
            >
              把文件、分享和离线任务收进一个清爽入口
            </Typography>
            <Typography
              sx={{
                mt: 2,
                maxWidth: 590,
                color: "text.secondary",
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.8,
              }}
            >
              保留后端稳定能力，换成更适合日常使用的网盘界面。登录后即可管理文件、创建分享、查看离线任务，并连接 WebDAV 与桌面客户端。
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ mt: 3 }}>
              <Button size="large" variant="contained" endIcon={<ArrowForward />} onClick={() => navigate(isLoggedIn ? "/home" : "/session")}>
                {isLoggedIn ? "打开我的文件" : "登录使用"}
              </Button>
              {!isLoggedIn && (
                <Button size="large" variant="outlined" onClick={() => navigate("/session/signup")}>
                  创建账号
                </Button>
              )}
            </Stack>

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{ mt: 3, color: "text.secondary", flexWrap: "wrap", rowGap: 1 }}
            >
              <Typography variant="body2">拖拽上传</Typography>
              <Typography variant="body2">在线播放</Typography>
              <Typography variant="body2">私密分享</Typography>
              <Typography variant="body2">离线下载</Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: 1.1, width: "100%", minWidth: 0 }}>
            <ProductPreview />
          </Box>
        </Stack>

        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
            gap: 1.5,
          }}
        >
          {capabilityItems.map((item) => (
            <Stack
              key={item.title}
              spacing={1}
              sx={{
                p: 2,
                minHeight: 136,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                {item.icon}
              </Box>
              <Typography fontWeight={850}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                {item.text}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
