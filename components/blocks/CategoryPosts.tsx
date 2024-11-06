import Link from 'next/link'
import Image from '@/utils/Image'
import { ContentData } from '@gocontento/client'

export default function CategoryPosts({
  posts,
  currentPost,
  className,
}: {
  posts: ContentData[]
  currentPost: ContentData
  className?: string
}) {
  // Filters all posts to get only posts for this category

  const filteredContent = posts.filter(
    (post) =>
      post.fields.category.content_links[0].content_link.name ==
      currentPost.fields.category.content_links[0].content_link.name,
  )

  // Removes current post from array

  const postsWithoutFeatured = filteredContent.filter(
    (post) => post.slug != currentPost.slug,
  )

  // Gets latest five posts

  const latestPosts = postsWithoutFeatured.slice(0, 5)

  return (
    <div className={`border-t border-t-neutral-900 pb-6 ${className}`}>
      <Link
        href={`/${currentPost.fields.category.content_links[0].content_link.uri}`}
        className="inline-block bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-50"
      >
        {currentPost.fields.category.content_links[0].content_link.name}
      </Link>
      <div className="flex flex-col justify-between">
        {latestPosts.map((post) => {
          return (
            <div key={`${post.id}`} className="flex gap-x-5 py-4">
              <Link className="h-20 w-20 flex-shrink-0" href={`/${post.uri}`}>
                <Image
                  asset={post.fields.image.assets[0].asset}
                  apiParams="fit=crop&w=150&h=150&dpr=2&q=80"
                  imgClassName="object-cover aspect-square"
                />
              </Link>
              <div className="flex flex-col justify-between">
                <Link href={`/${post.uri}`}>
                  <h3 className="text-pretty text-base/[1.3em] font-bold tracking-tight sm:text-xl/[1.3em] md:line-clamp-3 md:text-base/[1.3em] 2xl:w-4/5">
                    {post.fields.title.text}
                  </h3>
                </Link>
                <Link
                  href={`/${post.fields.category.content_links[0].content_link.uri}`}
                  className="font-mono text-sm"
                >
                  {post.fields.category.content_links[0].content_link.name}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
