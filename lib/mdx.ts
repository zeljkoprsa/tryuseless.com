// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// Type definitions
export interface PostMetadata {
  title: string;
  date: string;
  excerpt?: string;
  slug: string;
  [key: string]: any; // For any additional frontmatter fields
}

export interface Post {
  frontMatter: PostMetadata;
  content: MDXRemoteSerializeResult;
}

// Configuration
const POSTS_PATH = path.join(process.cwd(), 'content/posts');

// Get all post slugs (filenames)
export const getPostSlugs = (): string[] => {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ''));
};

// Get post content by slug
export const getPostBySlug = async (slug: string): Promise<Post> => {
  const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath, 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content);

  return {
    frontMatter: {
      ...data,
      slug,
    } as PostMetadata,
    content: mdxSource,
  };
};

// Get all posts with their content
export const getAllPosts = async (): Promise<Post[]> => {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => getPostBySlug(slug))
  );

  // Sort posts by date
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontMatter.date);
    const dateB = new Date(b.frontMatter.date);
    return dateB.getTime() - dateA.getTime();
  });
};
