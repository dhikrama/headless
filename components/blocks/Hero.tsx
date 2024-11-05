import { BlockData, ContentData } from '@gocontento/client'
import Link from 'next/link'
import Image from '@/utils/Image'
import { formatDate } from '@/utils/formatDate'
import LatestPosts from './LatestPosts'
import AuthorCards from './AuthorCards'

export default function Hero({
  posts,
  block,
}: {
  posts: ContentData[]
  block: BlockData
}) {
  // Stores featuredPost, featuredPostAuthor and authors as variables to reduce inline referencing

  const featuredPost = block.fields.featured_post.content_links[0].content_link

  const authors = block.fields.authors.content_links

  // Removes featured post from posts array

  const postsWithoutFeatured = posts.filter(
    (post) => post.slug != featuredPost.slug,
  )

  // Gets latest three posts

  const latestPosts = postsWithoutFeatured.slice(0, 3)
  const latestPostsXl = postsWithoutFeatured.slice(0, 4)

  return (
    <div className="lg:grid lg:grid-cols-5 lg:gap-x-10 xl:grid-cols-7">
      <div className="pb-12 lg:col-span-5 lg:pb-6">
        <Link href={`/${featuredPost.uri}`}>
          <Image
            asset={featuredPost.fields.image.assets[0].asset}
            imgClassName="aspect-video md:aspect-[9/4] object-cover mb-7"
            apiParams="fit=crop&w=1200&dpr=2&q=80"
          />
        </Link>
        <div className=" flex items-center gap-x-5">
          <span className="font-mono text-sm">
            {formatDate(featuredPost.published_at)}
          </span>
          <span>/</span>
          <Link
            href={`/${featuredPost.fields.category.content_links[0].content_link.uri}`}
            className="font-mono text-sm"
          >
            {featuredPost.fields.category.content_links[0].content_link.name}
          </Link>
        </div>
        <Link href={`/${featuredPost.uri}`}>
          <h1 className="mb-7 mt-6 text-pretty text-4xl/[1.1em] font-bold tracking-tight text-neutral-900 lg:text-6xl/[1.1em]">
            {featuredPost.fields.title.text}
          </h1>
        </Link>
        <p className="text-lg text-neutral-900/80 xl:w-3/4">
          {featuredPost.fields.excerpt.text}
        </p>
      </div>
      <div className="flex flex-col justify-between md:col-span-5 md:grid md:grid-cols-2 md:gap-x-10 lg:col-span-5 xl:col-span-2 xl:grid-cols-1">
        <LatestPosts posts={latestPosts} className="xl:hidden" />
        <LatestPosts posts={latestPostsXl} className="hidden xl:block" />
        <AuthorCards authors={authors} />
      </div>
    </div>
  )
}
