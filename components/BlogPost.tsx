import React from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { PostMetadata } from '../lib/mdx'

interface BlogPostProps {
  source: MDXRemoteSerializeResult
  metadata: PostMetadata
}

export default function BlogPost({ source, metadata }: BlogPostProps) {
  return (
    <article className="prose lg:prose-xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="mb-2">{metadata.title}</h1>
        <div className="text-gray-600">
          <time>{metadata.date}</time>
        </div>
        <p className="text-xl mt-2">{metadata.description}</p>
      </div>
      <div className="mdx-content">
        <MDXRemote {...source} />
      </div>
    </article>
  )
}
