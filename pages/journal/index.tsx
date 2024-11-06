// pages/journal/index.tsx
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts, Post } from '../../lib/mdx';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

interface JournalPageProps {
  posts: Post[];
}

const JournalPage = ({ posts }: JournalPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
            ← home
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.frontMatter.slug} className="group">
              <Link href={`/journal/${post.frontMatter.slug}`}>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <time className="text-sm text-gray-400">{post.frontMatter.date}</time>
                  <h2 className="text-xl font-light text-gray-900 mt-2 group-hover:text-gray-600 transition-colors">
                    {post.frontMatter.title}
                  </h2>
                  {post.frontMatter.excerpt && (
                    <p className="mt-4 text-gray-600">{post.frontMatter.excerpt}</p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JournalPage;
