import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Typography,
  Link,
  CircularProgress,
  Alert,
  Box,
  Stack,
  Fade,
  Skeleton,
  IconButton,
  Button,
} from '@mui/material';
import {
  Home as HomeIcon,
  Article as ArticleIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import PostsTheme from '../theme/PostsTheme';
import MaterialMarkdownRenderer from '../components/MaterialMarkdownRenderer';
import { extractPostMetadata, generatePostSEO, type PostMetadata } from '../utils/postUtils';
import toast from 'react-hot-toast';

interface PostData extends PostMetadata {
  content: string;
}

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Post topilmadi');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const response = await fetch(`/posts/${slug}.md`);
        
        if (!response.ok) {
          throw new Error('Post topilmadi');
        }
        
        const markdown = await response.text();
        const metadata = extractPostMetadata(markdown, slug);
        
        const postData: PostData = {
          content: markdown,
          title: metadata.title,
          slug: metadata.slug,
          excerpt: metadata.excerpt,
          readTime: metadata.readTime,
          publishedAt: metadata.publishedAt,
          keywords: metadata.keywords,
          author: metadata.author,
        };
        
        setPost(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  // Handle smooth scrolling to anchor when page loads with hash
  useEffect(() => {
    if (!loading && !error && post && location.hash) {
      const scrollToAnchor = () => {
        const hash = location.hash.substring(1); // Remove the # symbol
        const element = document.getElementById(hash);
        
        if (element) {
          // Add a small delay to ensure the content is fully rendered
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
            
            // Add a slight offset to account for any fixed headers
            setTimeout(() => {
              const yOffset = -20; // 20px offset from top
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }, 100);
          }, 100);
        }
      };

      scrollToAnchor();
    }
  }, [loading, error, post, location.hash]);

  const handleShare = async () => {
    const url = window.location.href;
    const title = post?.title || 'Ilmhub maqola';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
          text: post?.excerpt,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Havola nusxalandi!');
      } catch (err) {
        toast.error('Havolani nusxalashda xatolik yuz berdi');
      }
    }
  };



  if (loading) {
    return (
      <PostsTheme>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <CircularProgress />
          </Box>
          <Stack spacing={2}>
            <Skeleton variant="text" width="80%" height={60} />
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
          </Stack>
        </Container>
      </PostsTheme>
    );
  }

  if (error) {
    return (
      <PostsTheme>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Fade in timeout={600}>
            <Box sx={{ textAlign: 'center' }}>
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
              
              <Typography variant="h4" gutterBottom>
                Maqola topilmadi
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Siz qidirayotgan maqola mavjud emas yoki o'chirilgan bo'lishi mumkin.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<HomeIcon />}
                  onClick={() => navigate('/')}
                  sx={{ minWidth: 180 }}
                >
                  Bosh sahifa
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<ArticleIcon />}
                  onClick={() => navigate(-1)}
                  sx={{ minWidth: 180 }}
                >
                  Orqaga qaytish
                </Button>
              </Stack>
              
              <Box sx={{ mt: 4, p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Yordam kerak bo'lsa, <strong>90-691-50-60</strong> raqamiga qo'ng'iroq qiling
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Container>
      </PostsTheme>
    );
  }

  return (
    <PostsTheme>
      <Helmet>
        {(() => {
          if (!post) {
            // Default SEO while loading
            const defaultTitle = slug 
              ? `${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Ilmhub`
              : 'Maqola - Ilmhub';
            return (
              <>
                <title>{defaultTitle}</title>
                <meta name="description" content="Ilmhub.uz da dasturlash va texnologiya haqida foydali maqolalar o'qing." />
                <meta name="robots" content="index, follow" />
              </>
            );
          }
          
          const seo = generatePostSEO(post, window.location.href);
          return (
            <>
              <title>{seo.title}</title>
              <meta name="description" content={seo.description} />
              <meta name="keywords" content={seo.keywords} />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={post.title} />
              <meta property="og:description" content={post.excerpt} />
              <meta property="og:url" content={window.location.href} />
              <meta property="og:site_name" content="Ilmhub" />
              <meta property="og:locale" content="uz_UZ" />
              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:title" content={post.title} />
              <meta property="twitter:description" content={post.excerpt} />
              <meta name="author" content={post.author} />
              <meta name="robots" content="index, follow" />
              <meta name="article:author" content={post.author} />
              <meta name="article:published_time" content={post.publishedAt} />
              <meta name="article:section" content="Technology" />
              <meta name="article:tag" content={post.keywords.join(', ')} />
              <link rel="canonical" href={window.location.href} />
              <script type="application/ld+json">
                {JSON.stringify(seo.structuredData)}
              </script>
            </>
          );
        })()}
      </Helmet>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Fade in timeout={600}>
          <div>
            {/* Breadcrumbs and Share */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, width: '100%', overflow: 'hidden' }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                minWidth: 0, 
                flex: 1,
                overflow: 'hidden'
              }}>
                <Link
                  color="secondary.dark"
                  href="/"
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Bosh sahifa
                </Link>
                
                <Typography variant="body2" sx={{ mx: 1, flexShrink: 0 }}>
                  ›
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  minWidth: 0,
                  overflow: 'hidden'
                }}>
                  <ArticleIcon sx={{ mr: 0.5, flexShrink: 0 }} fontSize="inherit" />
                  <Typography 
                    color="secondary.dark"
                    sx={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      minWidth: 0
                    }}
                  >
                    {post?.title}
                  </Typography>
                </Box>
              </Box>
              
              <IconButton 
                onClick={handleShare}
                color="inherit"
                sx={{ ml: 2, flexShrink: 0 }}
                aria-label="Share post"
              >
                <ShareIcon fontSize="inherit" />
              </IconButton>
            </Box>
            
            {/* Article Content */}
            <Box sx={{ mb: 4 }}>
              <article>
                {post && <MaterialMarkdownRenderer content={post.content} />}
              </article>
            </Box>
          </div>
        </Fade>
      </Container>
    </PostsTheme>
  );
};

export default Post; 