'use client'

import { useId } from 'react'
import { BlockData, ContentData } from '@gocontento/client'
import ArticlesByCategory from './blocks/ArticlesByCategory'
import Hero from './blocks/Hero'

export default function BlockMatcher({
  posts,
  blocks,
}: {
  posts: ContentData[]
  blocks: BlockData[]
}) {
  const id = useId()

  return blocks.map((block: BlockData, index) => {
    switch (block.content_type.handle) {
      case 'hero':
        return <Hero key={id + '-' + index} posts={posts} block={block} />

      case 'articles_by_category':
        return (
          <ArticlesByCategory
            key={id + '-' + index}
            posts={posts}
            block={block}
          />
        )

      default:
        return (
          <div className="py-16">
            <div
              key={id + '-' + index}
              className="prose max-w-none border-t-8 border-red-400 bg-zinc-100 p-4"
            >
              <h2 className="mb-0 text-red-400">
                Invalid block - {block.content_type.name}
              </h2>
              <p>
                Please check you have added the block to the block matcher and
                the case matches the{' '}
                <span className="font-semibold">content_type.handle</span>
              </p>

              <pre className="max-h-[40vh]">
                {JSON.stringify(block, null, '  ')}
              </pre>
            </div>
          </div>
        )
    }
  })
}
