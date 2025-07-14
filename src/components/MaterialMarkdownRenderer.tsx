import React from 'react';
import {
  Typography,
  Box,
  Divider,
  Link,
  Paper,
  Alert,
  Checkbox,
  FormControlLabel,
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
    let currentList: Array<{ text: string; checked?: boolean; type: 'regular' | 'task' }> = [];
    let currentBlockquote: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <Box key={`list-${elements.length}`} sx={{ my: 2 }}>
            {currentList.map((item, index) => (
              item.type === 'task' ? (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={item.checked || false}
                      size="small"
                      sx={{ my: 'auto' }}
                      disabled
                    />
                  }
                  label={
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        my: 'auto'
                      }}>
                        {parseInlineElements(item.text)}
                    </Typography>
                  }
                  sx={{ display: 'flex', width: '100%' }}
                />
              ) : (
                <Box key={index} sx={{ display: 'flex' }}>
                  <Box sx={{ 
                    width: '8px', 
                    height: '8px', 
                    backgroundColor: 'text.primary', 
                    borderRadius: '50%', 
                    mr: 1.5,
                    flexShrink: 0
                  }} />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      flex: 1
                    }}>
                      {parseInlineElements(item.text)}
                  </Typography>
                </Box>
              )
            ))}
          </Box>
        );
        currentList = [];
      }
    };

    const flushBlockquote = () => {
      if (currentBlockquote.length > 0) {
        elements.push(
          <BlockQuote key={`blockquote-${elements.length}`} severity="info" icon={false}>
            <Box sx={{ '& p': { mb: 1 } }}>
              {currentBlockquote.map((line, i) => (
                <Typography key={i} variant="body1" sx={{ mb: i === currentBlockquote.length - 1 ? 0 : 1 }}>
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
         flushBlockquote();
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
         flushBlockquote();
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
         flushBlockquote();
         elements.push(<Divider key={index} sx={{ my: 3 }} />);
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
         elements.push(<Box key={index} sx={{ height: 8 }} />);
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
             sx={{ mb: 1.0, lineHeight: 1.2 }}
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
      '& p': { mb: 1.0 }
    }}>
      {parseMarkdown(content)}
    </Box>
  );
} 