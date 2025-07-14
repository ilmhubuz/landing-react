import React from 'react';
import {
  Typography,
  Box,
  Divider,
  Link,
  Paper,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CollapsibleCodeBlock from './CollapsibleCodeBlock';



const InlineCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f1f3f4',
  color: theme.palette.secondary.main,
  padding: theme.spacing(0.25, 0.5),
  borderRadius: theme.shape.borderRadius,
  fontFamily: '"Roboto Mono", "Consolas", "Monaco", monospace',
  fontSize: '0.875rem',
}));

const BlockQuote = styled(Alert)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper,
  '& .MuiAlert-message': {
    fontStyle: 'italic',
  },
}));

interface MaterialMarkdownRendererProps {
  content: string;
}

export default function MaterialMarkdownRenderer({ content }: MaterialMarkdownRendererProps) {
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <Box 
            key={`list-${elements.length}`} 
            component="ul" 
            sx={{ 
              my: 2, 
              pl: 3,
              listStyleType: 'disc',
              '& li': {
                display: 'list-item',
                mb: 0.5
              }
            }}
          >
            {currentList.map((item, index) => (
              <Box key={index} component="li">
                <Typography variant="body1" component="div" sx={{ lineHeight: 1.2 }}>
                  {parseInlineElements(item)}
                </Typography>
              </Box>
            ))}
          </Box>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <CollapsibleCodeBlock
            key={`code-${elements.length}`}
            code={codeBlockContent.join('\n')}
            language={codeBlockLanguage || 'text'}
            maxLines={7}
          />
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
        // Handle inline code
        const codeMatch = remainingText.match(/`([^`]+)`/);
        if (codeMatch) {
          const beforeCode = remainingText.substring(0, codeMatch.index);
          if (beforeCode) {
            parts.push(parseTextFormatting(beforeCode, index++));
          }
          parts.push(
            <InlineCode key={index++}>
              {codeMatch[1]}
            </InlineCode>
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
              color="secondary"
            >
              {linkMatch[1]}
            </Link>
          );
          remainingText = remainingText.substring(linkMatch.index! + linkMatch[0].length);
          continue;
        }

        // Process remaining text
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
            sx={{ mt: 4, mb: 2, lineHeight: 1.1 }}
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
            sx={{ mt: 3, mb: 2, lineHeight: 1.1 }}
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
            sx={{ mt: 3, mb: 2, lineHeight: 1.1 }}
          >
            {line.replace('### ', '')}
          </Typography>
        );
        return;
      }

      // Handle horizontal rules
      if (line.trim() === '---') {
        flushList();
        elements.push(<Divider key={index} sx={{ my: 3 }} />);
        return;
      }

      // Handle blockquotes
      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <BlockQuote key={index} severity="info" icon={false}>
            {parseInlineElements(line.replace('> ', ''))}
          </BlockQuote>
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
        elements.push(<Box key={index} sx={{ height: 8 }} />);
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
            sx={{ mb: 1.0, lineHeight: 1.2 }}
          >
            {parseInlineElements(line)}
          </Typography>
        );
      }
    });

    // Flush remaining items
    flushList();
    flushCodeBlock();

    return elements;
  };

  return (
    <Box sx={{ 
      '& > *:first-of-type': { mt: 0 },
      '& p': { mb: 1.0 }
    }}>
      {parseMarkdown(content)}
    </Box>
  );
} 