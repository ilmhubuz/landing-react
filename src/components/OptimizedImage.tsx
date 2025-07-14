import React, { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  className?: string;
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  loading = 'lazy',
  style,
  className,
  fallback
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Preload critical images
    if (priority) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setIsError(true);
        if (fallback) {
          setImageSrc(fallback);
          setIsLoaded(true);
        }
      };
      img.src = src;
    } else {
      setImageSrc(src);
    }
  }, [src, priority, fallback]);

  const handleLoad = () => {
    if (!priority) {
      setIsLoaded(true);
    }
  };

  const handleError = () => {
    setIsError(true);
    if (fallback) {
      setImageSrc(fallback);
      setIsLoaded(true);
    }
  };

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!priority && loading === 'lazy' && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              observer.unobserve(img);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [priority, loading]);

  if (isError && !fallback) {
    return (
      <Box
        sx={{
          width: width || '100%',
          height: height || 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.100',
          color: 'grey.500',
          fontSize: '14px',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 1,
        }}
      >
        Image failed to load
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: width || '100%',
        height: height || 'auto',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width={width || '100%'}
          height={height || 200}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
      <img
        ref={imgRef}
        src={priority ? imageSrc : undefined}
        data-src={!priority ? imageSrc : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        decoding="async"
      />
    </Box>
  );
};

export default OptimizedImage; 