import { useEffect } from 'react';
import { defaultSEO, pageSEOMap, BASE_SITE_URL } from '../data/seoData';

function setMetaTag(attr, attrValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attr}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url) {
  if (!url) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function setJsonLdBreadcrumb(pageId, pageData) {
  const schemaId = 'dynamic-breadcrumb-schema';
  let script = document.getElementById(schemaId);
  
  if (pageId === 'home') {
    if (script) script.remove();
    return;
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageData.breadcrumbName || pageData.title,
        item: pageData.canonical || `${BASE_SITE_URL}/${pageId}`,
      },
    ],
  };

  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(breadcrumbData);
}

export default function SEO({ page = 'home' }) {
  useEffect(() => {
    const pageData = pageSEOMap[page] || pageSEOMap.home;
    const title = pageData.title || defaultSEO.defaultTitle;
    const description = pageData.description || defaultSEO.defaultDescription;
    const keywords = pageData.keywords || defaultSEO.defaultKeywords;
    const canonical = pageData.canonical || `${BASE_SITE_URL}/`;
    const ogImage = pageData.ogImage || defaultSEO.defaultImage;
    const ogType = pageData.ogType || defaultSEO.type;

    // Document Title
    document.title = title;

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', `${defaultSEO.partyName} Digital Team`);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'googlebot', 'index, follow');

    // Canonical
    setCanonical(canonical);

    // OpenGraph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', defaultSEO.siteName);
    setMetaTag('property', 'og:locale', defaultSEO.locale);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);
    setMetaTag('name', 'twitter:site', defaultSEO.twitterHandle);
    setMetaTag('name', 'twitter:creator', defaultSEO.founderTwitter);

    // Dynamic JSON-LD Breadcrumb Schema
    setJsonLdBreadcrumb(page, pageData);
  }, [page]);

  return null;
}
