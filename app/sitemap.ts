import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://booksrepay.com';
  
  const categories = [
    'self-development', 'philosophy', 'business', 'fiction', 'psychology',
    'spirituality', 'finance', 'science', 'history', 'biography', 
    'classics', 'health', 'sleep'
  ];

  const categoryPages = categories.map(cat => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryPages,
  ];
}
