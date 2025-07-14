import React from 'react';
import {
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Chip,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FiberManualRecord as BulletIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

const StyledCodeBlock = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f8f9fa',
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const StyledCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f1f3f4',
  padding: '1px 4px',
  borderRadius: 4,
  fontSize: '0.875rem',
  fontFamily: '"Roboto Mono", "Consolas", "Monaco", monospace',
  color: theme.palette.mode === 'dark' ? '#ff8a65' : '#c5221f',
  fontWeight: 500,
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledPre = styled('pre')(({ theme }) => ({
  margin: 0,
  padding: 0,
  fontFamily: '"Roboto Mono", "Consolas", "Monaco", monospace',
  fontSize: '0.875rem',
  lineHeight: 1.6,
  color: theme.palette.text.primary,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}));

const StyledBlockquote = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const theme = useTheme();
  
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';
    let listType: 'bullet' | 'number' = 'bullet';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <List key={`list-${elements.length}`} sx={{ mb: 3 }}>
            {currentList.map((item, index) => (
              <ListItem key={index} sx={{ py: 0.5, pl: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <BulletIcon 
                    sx={{ 
                      fontSize: 8, 
                      color: theme.palette.primary.main,
                      mt: 1 
                    }} 
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {parseInlineElements(item)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <StyledCodeBlock key={`code-${elements.length}`} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon sx={{ mr: 1, fontSize: 18, color: theme.palette.primary.main }} />
                {codeBlockLanguage && (
                  <Chip
                    label={codeBlockLanguage}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem', height: 24 }}
                  />
                )}
              </Box>
              <StyledPre>
                <code>{codeBlockContent.join('\n')}</code>
              </StyledPre>
            </CardContent>
          </StyledCodeBlock>
        );
        codeBlockContent = [];
        codeBlockLanguage = '';
      }
    };

    const parseInlineElements = (text: string): React.ReactNode => {
      const parts: React.ReactNode[] = [];
      let remainingText = text;
      let index = 0;

      while (remainingText.length > 0) {
        // Handle inline code first
        const codeMatch = remainingText.match(/`([^`]+)`/);
        if (codeMatch) {
          const beforeCode = remainingText.substring(0, codeMatch.index);
          if (beforeCode) {
            parts.push(parseTextFormatting(beforeCode, index++));
          }
          parts.push(
            <StyledCode key={index++}>
              {codeMatch[1]}
            </StyledCode>
          );
          remainingText = remainingText.substring(codeMatch.index! + codeMatch[0].length);
          continue;
        }

        // Handle links
        const linkMatch = remainingText.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const beforeLink = remainingText.substring(0, linkMatch.index);
          if (beforeLink) {
            parts.push(parseTextFormatting(beforeLink, index++));
          }
          parts.push(
            <Link
              key={index++}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {linkMatch[1]}
            </Link>
          );
          remainingText = remainingText.substring(linkMatch.index! + linkMatch[0].length);
          continue;
        }

        parts.push(parseTextFormatting(remainingText, index++));
        break;
      }

      return parts;
    };

    const parseTextFormatting = (text: string, key: number): React.ReactNode => {
      // Handle bold text
      const boldParts = text.split(/\*\*(.*?)\*\*/g);
      return boldParts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={`${key}-${i}`}>{parseItalic(part)}</strong>;
        }
        return parseItalic(part);
      });
    };

    const parseItalic = (text: string): React.ReactNode => {
      // Handle italic text
      const italicParts = text.split(/\*(.*?)\*/g);
      return italicParts.map((part, i) => {
        if (i % 2 === 1) {
          return <em key={i}>{part}</em>;
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
          codeBlockLanguage = line.replace('```', '').trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Handle headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ 
              mt: 4, 
              mb: 3, 
              fontWeight: 600,
              color: theme.palette.primary.main,
              fontSize: { xs: '1.75rem', md: '2.25rem' }
            }}
          >
            {line.replace('# ', '')}
          </Typography>
        );
        return;
      }

      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ 
              mt: 4, 
              mb: 2, 
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.5rem', md: '1.875rem' }
            }}
          >
            {line.replace('## ', '')}
          </Typography>
        );
        return;
      }

      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ 
              mt: 3, 
              mb: 2, 
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            {line.replace('### ', '')}
          </Typography>
        );
        return;
      }

      // Handle horizontal rules
      if (line.trim() === '---') {
        flushList();
        elements.push(
          <Divider 
            key={index} 
            sx={{ 
              my: 4,
              borderColor: theme.palette.divider,
              '&::before, &::after': {
                borderColor: theme.palette.divider,
              }
            }} 
          />
        );
        return;
      }

      // Handle blockquotes
      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <StyledBlockquote key={index} variant="outlined">
            <CardContent>
              <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                {parseInlineElements(line.replace('> ', ''))}
              </Typography>
            </CardContent>
          </StyledBlockquote>
        );
        return;
      }

      // Handle lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        currentList.push(line.replace(/^[-*] /, ''));
        return;
      }

      // Handle numbered lists
      if (line.match(/^\d+\. /)) {
        currentList.push(line.replace(/^\d+\. /, ''));
        return;
      }

      // Handle empty lines
      if (line.trim() === '') {
        flushList();
        elements.push(<Box key={index} sx={{ height: 20 }} />);
        return;
      }

      // Handle regular paragraphs
      if (line.trim() !== '') {
        flushList();
        elements.push(
          <Typography
            key={index}
            variant="body1"
            paragraph
            sx={{ 
              lineHeight: 1.7,
              mb: 3,
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: theme.palette.text.primary,
              textAlign: 'left'
            }}
          >
            {parseInlineElements(line)}
          </Typography>
        );
      }
    });

    // Flush any remaining items
    flushList();
    flushCodeBlock();

    return elements;
  };

  return (
    <Box sx={{ 
      '& > *:first-of-type': { mt: 0 },
      '& p': { mb: 3 },
      '& ul, & ol': { mb: 3 }
    }}>
      {parseMarkdown(content)}
    </Box>
  );
};

export default MarkdownRenderer; 