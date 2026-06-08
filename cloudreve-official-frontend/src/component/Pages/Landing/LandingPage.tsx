import { Box, Typography, Button, Container, Stack, Paper, alpha, useTheme } from "@mui/material";
import { CloudDoneOutlined, ShareOutlined, FolderOutlined } from "@mui/icons-material";

export function ModernLandingPage() {
  const theme = useTheme();

  const features = [
    { icon: <FolderOutlined />, title: "极速归档", text: "集中管理所有素材，路径清晰，查找快如闪电。" },
    { icon: <ShareOutlined />, title: "灵活协作", text: "分享链接、私密提取码、访问记录，一触即达。" },
    { icon: <CloudDoneOutlined />, title: "安全存储", text: "银行级加密技术，确保您的隐私与数据永不外泄。" },
  ];

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: 10 }}>
      {/* Hero 区域：简约大气 */}
      <Container maxWidth="lg" sx={{ pt: 15, pb: 10, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 800, letterSpacing: '-0.02em', mb: 3 }}>
          您的云端，<span style={{ color: theme.palette.primary.main }}>由您定义</span>
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
          无论是办公文档还是高清素材，Cloudpan Pro 提供极致、安全且高效的存储解决方案。
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 3, boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}` }}>
            立即开始
          </Button>
          <Button variant="outlined" size="large" sx={{ px: 4, py: 1.5, borderRadius: 3 }}>
            下载客户端
          </Button>
        </Stack>
      </Container>

      {/* 特性卡片区域：悬浮卡片式设计 */}
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {features.map((f, i) => (
            <Paper 
              key={i} 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                border: '1px solid', 
                borderColor: 'divider',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: 10 }
              }}
            >
              <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, color: 'primary.main' }}>
                {f.icon}
              </Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>{f.title}</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{f.text}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}