import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CollapsibleCodeBlockProps {
  code: string;
  language?: string;
  maxLines?: number;
}

export default function CollapsibleCodeBlock({ 
  code, 
  language = 'text', 
  maxLines = 7 
}: CollapsibleCodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const lines = code.split('\n');
  const shouldShowCollapseButton = lines.length > maxLines;
  const displayCode = shouldShowCollapseButton && !isExpanded 
    ? lines.slice(0, maxLines).join('\n')
    : code;

  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#1e1e1e',
      margin: 0,
      padding: '16px',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: '"Roboto Mono", "Consolas", "Monaco", monospace',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'transparent',
      fontFamily: '"Roboto Mono", "Consolas", "Monaco", monospace',
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        px: 2,
        backgroundColor: '#1e1e1e',
        borderRadius: '4px 4px 0 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {language || 'text'}
        </Typography>
        {shouldShowCollapseButton && (
          <Box 
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{ 
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: 'primary.main',
              '&:hover': {
                color: 'primary.light',
              }
            }}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {isExpanded ? 'Collapse' : `Show all ${lines.length} lines`}
            </Typography>
          </Box>
        )}
      </Box>
      
      <Box sx={{ position: 'relative' }}>
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 4px 4px',
          }}
          showLineNumbers
          wrapLines
        >
          {displayCode}
        </SyntaxHighlighter>
        
        {shouldShowCollapseButton && !isExpanded && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(transparent, #1e1e1e)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              pb: 1,
            }}
          >
            <Box 
              onClick={() => setIsExpanded(true)}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'primary.main',
                '&:hover': {
                  color: 'primary.light',
                }
              }}
            >
              <ExpandMore />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                Show {lines.length - maxLines} more lines
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
} 