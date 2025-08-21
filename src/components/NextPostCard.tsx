import * as React from 'react';
import MuiCard from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import MaterialMarkdownRenderer from './MaterialMarkdownRenderer';

interface NextPostCardProps {
  title: string;
  summary: string;
  readTime: string;
  href: string;
}

export default function NextPostCard({ title, summary, readTime, href }: NextPostCardProps) {
  return (
    <MuiCard
      component={RouterLink}
      to={href}
      elevation={1}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        mt: 4,
        mb: 2,
        gap: { xs: 2, sm: 4 },
        textDecoration: 'none',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3,
          borderColor: 'primary.light',
        },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          {title}
        </Typography>
        <Box sx={{ mb: 2, '& .nextpost-markdown p': { mb: 0.5, lineHeight: 1.4 } }}>
          <MaterialMarkdownRenderer content={summary.trim()} />
        </Box>
        <Typography variant="caption" color="text.secondary">
          {readTime}
        </Typography>
      </Box>
    </MuiCard>
  );
}
