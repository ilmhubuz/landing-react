// Utility functions for handling blog posts

export interface PostMetadata {
  title: string;
  slug: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  keywords: string[];
  author: string;
}

export const extractPostMetadata = (markdown: string, slug: string): PostMetadata => {
  const lines = markdown.split('\n');
  
  // Extract title (first H1)
  const titleLine = lines.find(line => line.startsWith('# '));
  let title = titleLine ? titleLine.replace('# ', '').trim() : '';
  
  // Fallback: if no H1 found, use slug as title
  if (!title) {
    title = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Extract excerpt (first meaningful paragraph after title)
  const titleIndex = lines.findIndex(line => line.startsWith('# '));
  const contentLines = lines.slice(titleIndex + 1).filter(line => 
    line.trim() !== '' && 
    !line.startsWith('#') && 
    !line.startsWith('---') &&
    !line.startsWith('>') &&
    !line.startsWith('```') &&
    !line.startsWith('- ') &&
    !line.startsWith('* ') &&
    !line.match(/^\d+\. /)
  );

  let excerpt = '';
  for (const line of contentLines) {
    const cleanLine = line.trim();
    if (cleanLine !== '') {
      excerpt += cleanLine + ' ';
      if (excerpt.length > 160) break;
    }
  }

  // Only trim whitespace, do not strip markdown syntax
  excerpt = excerpt.trim();

  // Limit excerpt length (but keep markdown)
  if (excerpt.length > 160) {
    excerpt = excerpt.substring(0, 160);
    // Try to end at a word boundary
    const lastSpace = excerpt.lastIndexOf(' ');
    if (lastSpace > 120) {
      excerpt = excerpt.substring(0, lastSpace);
    }
    excerpt += '...';
  }

  // Fallback excerpt if empty
  if (!excerpt) {
    excerpt = `${title} haqida batafsil ma'lumot va foydali maslahatlar.`;
  }
  
  // Calculate read time (assuming 200 words per minute)
  const wordCount = markdown.split(/\s+/).filter(word => word.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  
  // Extract keywords from content
  const keywords = extractKeywords(markdown, title);
  
  return {
    title,
    slug,
    excerpt,
    readTime: `${readTime} daqiqa`,
    publishedAt: new Date().toISOString(),
    keywords,
    author: 'Ilmhub',
  };
};

const extractKeywords = (markdown: string, title: string = ''): string[] => {
  // Extract meaningful words from markdown
  const text = markdown
    .replace(/[#*_`[\]()]/g, ' ')  // Remove markdown syntax
    .replace(/\n/g, ' ')           // Replace newlines with spaces
    .toLowerCase();
  
  // Extract keywords from title
  const titleKeywords = title
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && word.length < 15);
  
  // Common tech/programming keywords that might appear in posts
  const techKeywords = [
    'dasturlash', 'programming', 'kod', 'code', 'javascript', 'python', 'react',
    'web', 'sayt', 'website', 'frontend', 'backend', 'api', 'database',
    'texnologiya', 'technology', 'kompyuter', 'computer', 'internet',
    'dizayn', 'design', 'ui', 'ux', 'responsive', 'mobile',
    'algoritm', 'algorithm', 'struktura', 'structure', 'function',
    'o\'rganish', 'learning', 'ta\'lim', 'education', 'kurs', 'course',
    'typescript', 'html', 'css', 'node', 'express', 'mongodb', 'sql',
    'git', 'github', 'vscode', 'npm', 'yarn', 'webpack', 'vite'
  ];
  
  const foundKeywords = techKeywords.filter(keyword => 
    text.includes(keyword)
  );
  
  // Add default keywords
  const defaultKeywords = ['ilmhub', 'maqola', 'dasturlash', 'texnologiya'];
  
  // Combine all keywords: title keywords first, then found keywords, then defaults
  const allKeywords = Array.from(new Set([...titleKeywords, ...foundKeywords, ...defaultKeywords]));
  
  return allKeywords.slice(0, 10);
};

export const generatePostSEO = (metadata: PostMetadata, currentUrl: string) => {
  // Generate a more SEO-friendly title
  const seoTitle = metadata.title.length > 60 
    ? `${metadata.title.substring(0, 57)}... - Ilmhub`
    : `${metadata.title} - Ilmhub`;
  
  // Ensure description is optimal length for SEO
  let seoDescription = metadata.excerpt;
  if (seoDescription.length > 160) {
    seoDescription = metadata.excerpt.substring(0, 157) + '...';
  } else if (seoDescription.length < 120) {
    seoDescription = `${metadata.excerpt} Ilmhub.uz da batafsil o'qing.`;
  }
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metadata.title,
    "description": seoDescription,
    "author": {
      "@type": "Organization",
      "name": metadata.author,
      "url": "https://ilmhub.uz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ilmhub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ilmhubuz.github.io/static/images/logo/icon-minimal.png"
      }
    },
    "datePublished": metadata.publishedAt,
    "dateModified": metadata.publishedAt,
    "url": currentUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "keywords": metadata.keywords.join(', '),
    "timeRequired": metadata.readTime,
    "articleSection": "Technology",
    "inLanguage": "uz-UZ",
    "isAccessibleForFree": true,
    "genre": "Technology",
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Students, Tech Enthusiasts"
    }
  };
  
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: metadata.keywords.join(', '),
    structuredData
  };
};

// Utility to get all available posts (for future listing functionality)
export const getAvailablePosts = async (): Promise<string[]> => {
  // This would need to be implemented based on your deployment strategy
  // For now, return a static list or implement dynamic discovery
  return [
    'tez-kod-yetkazish'
  ];
};

// Utility to generate post URL
export const getPostUrl = (slug: string): string => {
  return `/posts/${slug}`;
};

// Utility to validate post slug
export const isValidSlug = (slug: string): boolean => {
  return /^[a-z0-9-]+$/.test(slug);
}; 