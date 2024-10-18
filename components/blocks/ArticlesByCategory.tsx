import { BlockData, ContentData } from '@gocontento/client'
import SmallArticleCard from './layouts/SmallArticleCard'
import LargeArticleCard from './layouts/LargeArticleCard'

export default function ArticlesByCategory({
  posts,
  block,
}: {
  posts: ContentData[]
  block: BlockData
}) {
  // Filters all posts to get only posts for this category

  const filteredContent = posts.filter(
    (post) =>
      post.fields.category.content_links[0].content_link.name ==
      block.fields.category.content_links[0].content_link.name,
  )

  // Takes just the first post to use as large article card at top of section

  const firstPost = filteredContent[0]

  // Removes the first post from the filtered content so there isn't a duplicate in the small article cards

  const categoryPosts = filteredContent.slice(1)

  const largeGrid = categoryPosts.slice(0, 5)

  const smallGrid = categoryPosts.slice(0, 3)

  return (
    <div className="py-8">
      <div className="border-t border-t-neutral-900">
        <p className="inline-block bg-neutral-900 px-3 py-2 text-center font-mono text-xs text-neutral-50">
          {block.fields.category.content_links[0].content_link.name}
        </p>
        <LargeArticleCard post={firstPost} />
        <div className="mt-9 hidden grid-cols-5 divide-neutral-900 xl:grid xl:divide-x">
          {largeGrid.map((post: ContentData, index: number) => (
            <SmallArticleCard key={`blog-post-${index}`} post={post} />
          ))}
        </div>
        <div className="grid-cols-3 divide-y divide-neutral-900 md:mt-9 md:grid md:divide-x md:divide-y-0 xl:hidden">
          {smallGrid.map((post: ContentData, index: number) => (
            <SmallArticleCard key={`blog-post-${index}`} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
