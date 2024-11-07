'use client';
import React, { useEffect, useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { PostMetadata } from '../lib/mdx';
import Link from 'next/link';
import Head from 'next/head';

interface BlogPostProps {
  source: MDXRemoteSerializeResult;
  metadata: PostMetadata;
}

export default function BlogPost({ source, metadata }: BlogPostProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // Estimate reading time
  const wordCount = source.compiledSource.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{metadata.title} | tryuseless</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="tryuseless" />
        <link rel="canonical" href={`https://tryuseless.com/journal/${metadata.slug}`} />
      </Head>

      {/* Progress bar - only show on client */}
      {isClient && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
          <div 
            className="h-full bg-gray-300 transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {/* Header */}
      <header className="bg-white">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Link 
            href="/" 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← home
          </Link>
        </div>
      </header>

      <article className="prose lg:prose-xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="text-gray-600 space-y-2">
            <time>{new Date(metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
            <div className="text-sm">{readingTime} min read</div>
          </div>
          <h1 className="mb-2">{metadata.title}</h1>
          {metadata.description && (
            <p className="text-xl mt-2">{metadata.description}</p>
          )}
        </div>
        <div className="mdx-content">
          <MDXRemote {...source} />
        </div>
      </article>

      <footer className="mt-12 py-12 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 flex justify-between items-center text-sm text-gray-400">
          <span>tryuseless</span>
          {isClient && typeof navigator !== 'undefined' && navigator.share && (
            <button 
              onClick={() => {
                navigator.share({
                  title: metadata.title,
                  text: metadata.description,
                  url: window.location.href,
                });
              }}
              className="hover:text-gray-600 transition-colors"
            >
              Share
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}