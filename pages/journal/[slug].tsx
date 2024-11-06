// pages/journal/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostBySlug, getPostSlugs, Post } from '../../lib/mdx';
import BlogPost from '../../components/BlogPost';

// Get static paths for all blog posts
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

// Get static props for a specific blog post
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { frontMatter, content } = await getPostBySlug(slug);

  return {
    props: {
      metadata: frontMatter,
      source: content,
    },
  };
};

// The blog post page component
interface PostPageProps {
  metadata: Post['frontMatter'];
  source: Post['content'];
}

const PostPage = ({ metadata, source }: PostPageProps) => {
  return (
    <BlogPost source={source} metadata={metadata} />
  );
};

export default PostPage;
