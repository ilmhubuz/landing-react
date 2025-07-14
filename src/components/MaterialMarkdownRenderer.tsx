import React from 'react';
import {
  Typography,
  Box,
  Stack,
  Divider,
  Link,
  Paper,
  Alert,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
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
  // Generate slug from header text
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  
  const copyHeaderLink = async (slug: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const updateUrlWithHash = (slug: string) => {
    const url = `${window.location.pathname}#${slug}`;
    window.history.pushState(null, '', url);
  };


  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: Array<{ text: string; checked?: boolean; type: 'regular' | 'task' }> = [];
    let currentBlockquote: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

        const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <Stack key={`list-${elements.length}`} spacing={0.25} sx={{ my: 1 }}>
            {currentList.map((item, index) => (
              item.type === 'task' ? (
                <Stack key={index} direction="row" alignItems="center" spacing={1}>
                  <Checkbox
                    checked={item.checked || false}
                    size="small"
                    sx={{ p: 0 }}
                    disabled
                  />
                  <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                    {parseInlineElements(item.text)}
                  </Typography>
                </Stack>
              ) : (
                <Stack key={index} direction="row" alignItems="center" spacing={1.5}>
                  <Box sx={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: 'text.primary', 
                    borderRadius: '50%',
                    flexShrink: 0
                  }} />
                  <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                    {parseInlineElements(item.text)}
                  </Typography>
                </Stack>
              )
            ))}
          </Stack>
        );
        currentList = [];
      }
    };

    const flushBlockquote = () => {
      if (currentBlockquote.length > 0) {
        elements.push(
          <BlockQuote key={`blockquote-${elements.length}`} severity="info" icon={false} sx={{ my: 1 }}>
            <Box sx={{ '& p': { mb: 0.5 } }}>
              {currentBlockquote.map((line, i) => (
                <Typography key={i} variant="body1" sx={{ mb: i === currentBlockquote.length - 1 ? 0 : 0.5 }}>
                  {parseInlineElements(line)}
                </Typography>
              ))}
            </Box>
          </BlockQuote>
        );
        currentBlockquote = [];
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

    // Header component with anchor link
    const renderHeader = (text: string, level: number, key: number) => {
      const slug = generateSlug(text);
      const Component = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
      const variant = level === 1 ? 'h3' : level === 2 ? 'h4' : 'h5';
      
      return (
        <Box
          key={key}
          id={slug}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            mb: 1,
            '&:hover .header-link': {
              opacity: 1,
            },
          }}
        >
          <Typography
            variant={variant}
            component={Component}
            sx={{ 
              lineHeight: 1.1, 
              flexGrow: 1,
              cursor: 'pointer',
            }}
            onClick={() =>  { updateUrlWithHash(slug); copyHeaderLink(slug); } }
          >
            {parseInlineElements(text)}
          </Typography>
          <Tooltip title="Copy link to this section">
            <IconButton
              className="header-link"
              size="small"
              onClick={() => { updateUrlWithHash(slug); copyHeaderLink(slug); } }
              sx={{
                opacity: 0,
                transition: 'opacity 0.2s',
                ml: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <LinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      );
    };

    lines.forEach((line, index) => {
             // Handle code blocks
       if (line.startsWith('```')) {
         if (inCodeBlock) {
           flushCodeBlock();
           inCodeBlock = false;
         } else {
           flushList();
           flushBlockquote();
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
         flushBlockquote();
         elements.push(renderHeader(line.replace('# ', ''), 1, index));
         return;
       }

       if (line.startsWith('## ')) {
         flushList();
         flushBlockquote();
         elements.push(renderHeader(line.replace('## ', ''), 2, index));
         return;
       }

       if (line.startsWith('### ')) {
         flushList();
         flushBlockquote();
         elements.push(renderHeader(line.replace('### ', ''), 3, index));
         return;
       }

       // Handle horizontal rules
       if (line.trim() === '---') {
         flushList();
         flushBlockquote();
         elements.push(<Divider key={index} sx={{ my: 1.5 }} />);
         return;
       }

             // Handle blockquotes
       if (line.startsWith('> ') || line.trim() === '>') {
         flushList();
         currentBlockquote.push(line.replace(/^>\s?/, ''));
         return;
       }

       // Handle lists
       if (line.startsWith('- ') || line.startsWith('* ')) {
         flushBlockquote();
         const lineContent = line.replace(/^[-*] /, '');
         
         // Check if it's a task list item
         if (lineContent.match(/^\[[x\sX]\]/)) {
           const checked = lineContent.includes('[x]') || lineContent.includes('[X]');
           const text = lineContent.replace(/^\[[x\sX]\]\s?/, '');
           currentList.push({ text, checked, type: 'task' });
         } else {
           currentList.push({ text: lineContent, type: 'regular' });
         }
         return;
       }

       // Handle numbered lists
       if (line.match(/^\d+\. /)) {
         flushBlockquote();
         currentList.push({ text: line.replace(/^\d+\. /, ''), type: 'regular' });
         return;
       }

             // Handle empty lines
       if (line.trim() === '') {
         flushList();
         flushBlockquote();
         elements.push(<Box key={index} sx={{ height: 4 }} />);
         return;
       }

       // Handle regular paragraphs
       if (line.trim() !== '') {
         flushList();
         flushBlockquote();
         elements.push(
           <Typography
             key={index}
             variant="body1"
             paragraph
             sx={{ mb: 0.5, lineHeight: 1.2 }}
           >
             {parseInlineElements(line)}
           </Typography>
         );
       }
     });

     // Flush remaining items
     flushList();
     flushBlockquote();
     flushCodeBlock();

     return elements;
  };

  return (
    <Box sx={{ 
      '& > *:first-of-type': { mt: 0 },
      '& p': { mb: 0.5 }
    }}>
      {parseMarkdown(content)}
    </Box>
  );
} 