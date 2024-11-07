// pages/index.tsx
import React from 'react';
import { Music4, Sparkles } from 'lucide-react';
import { GetStaticProps } from 'next';
import { getAllPosts, Post } from '../lib/mdx';

// Get latest post for the featured section
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  const latestPost = posts[0]; // Gets the most recent post

  return {
    props: {
      latestPost,
    },
  };
};

interface LandingPageProps {
  latestPost: Post;
}

const LandingPage = ({ latestPost }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal, zen-like header */}
      <header className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-light text-gray-900">useless</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        {/* Featured Space - intentionally empty, breathing room */}
        <section className="h-48 flex items-center justify-center">
          <p className="text-2xl font-light text-gray-600 max-w-2xl text-center">
            Sometimes, the most valuable moments are the ones that serve no purpose at all.
          </p>
        </section>

        {/* Apps Grid - clean, minimal presentation */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="group">
            <div className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
              <Music4 className="w-12 h-12 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-light text-gray-900">Metrodome</h2>
              <p className="mt-2 text-gray-600">Every discipline needs practice.</p>
            </div>
          </div>

          <div className="group">
            <div className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-dashed border-gray-100">
              <Sparkles className="w-12 h-12 text-gray-300" />
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-light text-gray-400">soon</h2>
              <p className="mt-2 text-gray-400">Taking our sweet time.</p>
            </div>
          </div>
        </section>

        {/* Journal Section - minimal, breathing space */}
        <section className="pt-12">
          <div className="grid gap-12">
            {latestPost && (
              <a href={`/journal/${latestPost.frontMatter.slug}`} className="block">
                <article className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-light text-gray-900">{latestPost.frontMatter.title}</h3>
                  <p className="mt-4 text-gray-600">
                    {latestPost.frontMatter.excerpt || latestPost.frontMatter.title}
                  </p>
                </article>
              </a>
            )}
          </div>
        </section>

        {/* About - subtle, philosophical */}
        <section className="pt-24 pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 font-light">
              A collection of carefully crafted spaces for the moments between moments.
            </p>
          </div>
        </section>
      </main>

      {/* Footer - minimal */}
      <footer className="bg-white mt-24">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-gray-400 text-sm text-center">
            ©2024 · useless is nothing
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
