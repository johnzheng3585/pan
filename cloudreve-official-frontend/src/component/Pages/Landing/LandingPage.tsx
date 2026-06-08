import {
  alpha,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowForwardRounded,
  CloudDoneOutlined,
  DevicesOutlined,
  FolderOutlined,
  LockOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const features = [
  {
    icon: <FolderOutlined />,
    title: "文件管理",
    text: "集中整理图片、视频、文档与文件夹，保留完整的网盘文件能力。",
  },
  {
    icon: <ShareOutlined />,
    title: "分享协作",
    text: "创建公开或私密分享链接，适合临时分发和长期保存。",
  },
  {
    icon: <CloudDoneOutlined />,
    title: "离线任务",
    text: "支持离线下载与后台任务进度查看，完成后自动入库。",
  },
  {
    icon: <DevicesOutlined />,
    title: "多端连接",
    text: "配合 WebDAV 与桌面客户端，在常用设备之间同步使用。",
  },
];

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowX: "hidden",
        bgcolor: theme.palette.mode === "light" ? "#f8fafc" : theme.palette.background.default,
        backgroundImage:
          theme.palette.mode === "light"
            ? "radial-gradient(circle at 50% 0%, rgba(63,111,185,0.16), transparent 34rem)"
            : "radial-gradient(circle at 50% 0%, rgba(96,165,250,0.18), transparent 34rem)",
      }}
    >
      <Container maxWidth="lg" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Stack
          component="header"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: { xs: 2, sm: 3 } }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                color: "primary.main",
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                boxShadow: theme.palette.mode === "light" ? "0 12px 28px rgba(63,111,185,0.16)" : "none",
              }}
            >
              <LockOutlined fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={800} lineHeight={1.1}>
                糖果盘
              </Typography>
              <Typography variant="caption" color="text.secondary">
                个人网盘
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button component={RouterLink} to="/session" variant="outlined" sx={{ borderRadius: 2 }}>
              登录
            </Button>
            <Button
              component={RouterLink}
              to="/home"
              variant="contained"
              endIcon={<ArrowForwardRounded />}
              sx={{ borderRadius: 2, px: 2.2, fontWeight: 800 }}
            >
              进入网盘
            </Button>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 6, md: 9 }}
          sx={{ flex: 1, py: { xs: 7, md: 10 } }}
        >
          <Box sx={{ maxWidth: 540 }}>
            <Typography variant="overline" color="primary.main" fontWeight={800}>
              私人网盘工作台
            </Typography>
            <Typography
              variant="h1"
              sx={{
                mt: 1.2,
                fontSize: { xs: 42, sm: 56, md: 68 },
                lineHeight: 1.04,
                fontWeight: 900,
                letterSpacing: 0,
              }}
            >
              糖果盘
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 1,
                fontSize: { xs: 28, sm: 38, md: 46 },
                lineHeight: 1.14,
                fontWeight: 900,
                letterSpacing: 0,
              }}
            >
              把文件、分享和离线任务收进一个清爽入口
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2.5, lineHeight: 1.9, maxWidth: 500 }}>
              保留后端稳定能力，换成更适合日常使用的网盘界面。登录后即可管理文件、创建分享、查看离线任务，并连接 WebDAV 与桌面客户端。
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 4 }}>
              <Button
                component={RouterLink}
                to="/session"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRounded />}
                sx={{ borderRadius: 2.2, px: 3, fontWeight: 800 }}
              >
                登录使用
              </Button>
              <Button component={RouterLink} to="/session/signup" variant="outlined" size="large" sx={{ borderRadius: 2.2, px: 3 }}>
                创建账号
              </Button>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{ mt: 3, color: "text.secondary" }}
            >
              <Typography variant="caption">拖拽上传</Typography>
              <Typography variant="caption">在线播放</Typography>
              <Typography variant="caption">私密分享</Typography>
              <Typography variant="caption">离线下载</Typography>
            </Stack>
          </Box>

          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 560,
              borderRadius: 4,
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
              overflow: "hidden",
              boxShadow: theme.palette.mode === "light" ? "0 26px 80px rgba(15,23,42,0.10)" : "0 26px 80px rgba(0,0,0,0.34)",
              bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "light" ? 0.92 : 0.76),
              backdropFilter: "blur(18px)",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}` }}>
              <Box sx={{ width: 8, height: 8, borderRadius: 99, bgcolor: "#ef4444" }} />
              <Box sx={{ flex: 1, height: 32, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.08), px: 1.5, display: "flex", alignItems: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  搜索文件名、分享或任务
                </Typography>
              </Box>
              <Button variant="contained" size="small" sx={{ borderRadius: 2 }}>
                新建
              </Button>
            </Stack>
            <Stack direction="row" sx={{ minHeight: isMobile ? 300 : 400 }}>
              <Box sx={{ width: 132, p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.035), borderRight: `1px solid ${alpha(theme.palette.divider, 0.65)}` }}>
                {["我的文件", "图片", "视频", "音乐", "分享"].map((item, index) => (
                  <Box
                    key={item}
                    sx={{
                      px: 1.25,
                      py: 0.9,
                      mb: 0.5,
                      borderRadius: 2,
                      bgcolor: index === 0 ? alpha(theme.palette.primary.main, 0.12) : "transparent",
                    }}
                  >
                    <Typography variant="caption" fontWeight={index === 0 ? 800 : 600} color={index === 0 ? "primary.main" : "text.secondary"}>
                      {item}
                    </Typography>
                  </Box>
                ))}
                <Box sx={{ mt: 3, p: 1.25, borderRadius: 2.5, border: `1px solid ${alpha(theme.palette.divider, 0.8)}`, bgcolor: "background.paper" }}>
                  <Typography variant="caption" fontWeight={800}>
                    存储空间
                  </Typography>
                  <Box sx={{ mt: 1, height: 7, borderRadius: 99, bgcolor: alpha(theme.palette.primary.main, 0.11), overflow: "hidden" }}>
                    <Box sx={{ width: "36%", height: "100%", bgcolor: "primary.main" }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    已使用 36%
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
                <Typography variant="subtitle2" fontWeight={900}>
                  今天继续整理的内容
                </Typography>
                <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.25 }}>
                  {[
                    ["项目资料", "文件夹"],
                    ["旅行记录.mp4", "视频"],
                    ["设计截图.png", "图片"],
                    ["说明文档.md", "文档"],
                  ].map(([name, type]) => (
                    <Box
                      key={name}
                      sx={{
                        p: 1.4,
                        borderRadius: 2.5,
                        border: `1px solid ${alpha(theme.palette.divider, 0.82)}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                      }}
                    >
                      <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), display: "grid", placeItems: "center", color: "primary.main" }}>
                        <FolderOutlined fontSize="small" />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={800} noWrap>
                          {name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {type}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mt: 2, p: 2, borderRadius: 3, border: `1px dashed ${alpha(theme.palette.primary.main, 0.35)}`, bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                  <Typography variant="body2" fontWeight={800}>
                    私密分享更可控
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    提取码、有效期、下载权限和访问统计保持在同一条链路里。
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 1.5,
            pb: 5,
          }}
        >
          {features.map((item) => (
            <Paper
              key={item.title}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.78)}`,
                bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "light" ? 0.78 : 0.62),
                transition: theme.transitions.create(["transform", "box-shadow", "border-color"], {
                  duration: theme.transitions.duration.shorter,
                }),
                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: alpha(theme.palette.primary.main, 0.28),
                  boxShadow: theme.palette.mode === "light" ? "0 16px 40px rgba(15,23,42,0.08)" : "none",
                },
              }}
            >
              <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: "primary.main", display: "grid", placeItems: "center", mb: 1.5 }}>
                {item.icon}
              </Box>
              <Typography variant="subtitle2" fontWeight={900}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.6, lineHeight: 1.7 }}>
                {item.text}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
