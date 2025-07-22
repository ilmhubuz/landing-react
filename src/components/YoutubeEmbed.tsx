import React, { useState } from 'react';
import { Box, IconButton, Typography, Skeleton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  showTitle?: boolean;
}

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingBottom: '56.25%', // 16:9 aspect ratio
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover .play-button': {
    transform: 'scale(1.1)',
  },
  '&:hover .thumbnail': {
    opacity: 0.8,
  },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 0, 0, 0.9)',
  color: 'white',
  width: 80,
  height: 80,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 0, 0, 1)',
  },
}));

const IframeContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  paddingBottom: '56.25%', // 16:9 aspect ratio
  height: 0,
  overflow: 'hidden',
  borderRadius: 8,
  '& iframe': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  },
});

export default function YouTubeEmbed({ 
  videoId, 
  title, 
  autoplay = false, 
  showTitle = true 
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1${autoplay ? '&autoplay=1' : ''}`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleThumbnailLoad = () => {
    setThumbnailLoaded(true);
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
    setThumbnailLoaded(true);
  };

  if (isPlaying) {
    return (
      <Box sx={{ my: 3 }}>
        {showTitle && title && (
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}
        <IframeContainer>
          <iframe
            src={embedUrl}
            title={title || `YouTube video ${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </IframeContainer>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 3 }}>
      {showTitle && title && (
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <ThumbnailContainer onClick={handlePlay}>
        {!thumbnailLoaded && (
          <Skeleton
            variant="rectangular"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        )}
        {!thumbnailError ? (
          <img
            className="thumbnail"
            src={thumbnailUrl}
            alt={title || `YouTube video thumbnail`}
            onLoad={handleThumbnailLoad}
            onError={handleThumbnailError}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: thumbnailLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.900',
              color: 'white',
            }}
          >
            <Typography variant="h6">YouTube Video</Typography>
          </Box>
        )}
        <PlayButton className="play-button">
          <PlayArrow sx={{ fontSize: 40 }} />
        </PlayButton>
      </ThumbnailContainer>
    </Box>
  );
}
