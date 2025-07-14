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
  const title = titleLine ? titleLine.replace('# ', '').trim() : slug;
  
  // Extract excerpt (first meaningful paragraph after title)
  const titleIndex = lines.findIndex(line => line.startsWith('# '));
  const contentLines = lines.slice(titleIndex + 1).filter(line => 
    line.trim() !== '' && 
    !line.startsWith('#') && 
    !line.startsWith('---') &&
    !line.startsWith('>')
  );
  
  let excerpt = '';
  for (const line of contentLines) {
    if (line.trim() !== '') {
      excerpt += line + ' ';
      if (excerpt.length > 160) break;
    }
  }
  
  // Clean up excerpt
  excerpt = excerpt
    .replace(/[#*_`[\]()]/g, '')  // Remove markdown syntax
    .replace(/\s+/g, ' ')         // Normalize whitespace
    .trim()
    .substring(0, 160);
  
  if (excerpt.length === 160) {
    excerpt += '...';
  }
  
  // Calculate read time (assuming 200 words per minute)
  const wordCount = markdown.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  
  // Extract keywords from content
  const keywords = extractKeywords(markdown);
  
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

const extractKeywords = (markdown: string): string[] => {
  // Extract meaningful words from markdown
  const text = markdown
    .replace(/[#*_`[\]()]/g, ' ')  // Remove markdown syntax
    .replace(/\n/g, ' ')           // Replace newlines with spaces
    .toLowerCase();
  
  // Common tech/programming keywords that might appear in posts
  const techKeywords = [
    'dasturlash', 'programming', 'kod', 'code', 'javascript', 'python', 'react',
    'web', 'sayt', 'website', 'frontend', 'backend', 'api', 'database',
    'texnologiya', 'technology', 'kompyuter', 'computer', 'internet',
    'dizayn', 'design', 'ui', 'ux', 'responsive', 'mobile',
    'algoritm', 'algorithm', 'struktura', 'structure', 'function',
    'o\'rganish', 'learning', 'ta\'lim', 'education', 'kurs', 'course'
  ];
  
  const foundKeywords = techKeywords.filter(keyword => 
    text.includes(keyword)
  );
  
  // Add default keywords
  const defaultKeywords = ['ilmhub', 'maqola', 'dasturlash', 'texnologiya'];
  
  // Combine and deduplicate keywords
  const allKeywords = foundKeywords.concat(defaultKeywords);
  const uniqueKeywords = Array.from(new Set(allKeywords));
  
  return uniqueKeywords.slice(0, 10);
};

export const generatePostSEO = (metadata: PostMetadata, currentUrl: string) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metadata.title,
    "description": metadata.excerpt,
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
    "wordCount": metadata.readTime,
    "articleSection": "Technology",
    "inLanguage": "uz-UZ"
  };
  
  return {
    title: `${metadata.title} - Ilmhub`,
    description: metadata.excerpt,
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