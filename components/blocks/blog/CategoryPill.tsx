import Link from 'next/link'
import { ContentData } from '@gocontento/client'

export default function CategoryPill({ category }: { category: ContentData }) {
  return (
    category && (
      <Link
        href={`/${category.uri}`}
        className="hover:bold p-2 font-mono text-sm"
      >
        {category.name}
      </Link>
    )
  )
}
