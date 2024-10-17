import { ContentData } from '@gocontento/client'

export default function SmallArticleCard({ post }: { post: ContentData }) {
  return (
    <div className="py-6 md:px-6 lg:first:pl-0 lg:last:pr-0">
      <h3 className="mb-3 line-clamp-2 text-lg/[1.2em] font-bold text-neutral-900">
        {post.fields.title.text}
      </h3>
      <p className="line-clamp-2 text-base text-neutral-900/80">
        {post.fields.excerpt.text}
      </p>
    </div>
  )
}
