import { BlockData, ContentData } from '@gocontento/client'
import Link from 'next/link'
import Image from '@/utils/Image'
import { formatDate } from '@/utils/formatDate'
import LinkedInIcon from '../icons/LinkedInIcon'
import TwitterIcon from '../icons/TwitterIcon'
import LatestPosts from './layouts/LatestPosts'

export default function FeaturedPost({
  posts,
  block,
}: {
  posts: ContentData[]
  block: BlockData
}) {
  // Stores featuredPost, featuredPostAuthor and authors as variables to reduce inline referencing

  const featuredPost = block.fields.featured_post.content_links[0].content_link

  const featuredPostAuthor =
    featuredPost.fields.author.content_links[0].content_link

  const authors = block.fields.authors.content_links

  // Removes featured post from posts array

  const postsWithoutFeatured = posts.filter(
    (post) => post.slug != featuredPost.slug,
  )

  // Gets latest three posts

  const latestPosts = postsWithoutFeatured.slice(0, 3)

  return (
    <div className="grid-cols-12 gap-x-10 md:grid">
      <div className="col-span-8 pb-6">
        <Link href={`/${featuredPost.uri}`}>
          <Image
            asset={featuredPost.fields.image.assets[0].asset}
            imgClassName="aspect-square md:aspect-[9/4] object-cover mb-7"
            apiParams="fit=crop&w=1200&dpr=2"
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
      <div className="col-span-4 flex flex-col justify-between">
        <LatestPosts posts={latestPosts} />
        <div className="border-t border-t-neutral-900 pb-6">
          <h3 className="inline-block bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-50">
            Popular Authors
          </h3>
          <div className="flex flex-col justify-center">
            {authors.map((author: any) => {
              return (
                <div key={`${author.id}`} className="flex gap-x-5 py-5">
                  <Link
                    className="h-20 w-20"
                    href={`/${author.content_link.uri}`}
                  >
                    <Image
                      asset={author.content_link.fields.image.assets[0].asset}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col justify-between">
                    <div>
                      <Link href={`/${author.content_link.uri}`}>
                        <h3 className="text-md font-bold">
                          {author.content_link.fields.name.text}
                        </h3>
                      </Link>
                      <p className="font-mono text-sm">
                        {author.content_link.fields.role.text}
                      </p>
                    </div>
                    <div className="flex gap-x-3 text-neutral-900">
                      <LinkedInIcon
                        href={author.content_link.fields.linked_in.text}
                      />
                      <TwitterIcon
                        href={author.content_link.fields.twitter.text}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
