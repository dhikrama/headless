import Link from 'next/link'
import { ContentData } from '@gocontento/client'
import { MouseEventHandler } from 'react'

export default function CategoryPill({
  category,
  onClick,
}: {
  category: ContentData
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}) {
  return (
    category && (
      <Link
        href={`/${category.uri}`}
        onClick={onClick}
        className="hover:bold not-prose p-2 font-mono text-sm text-neutral-50 first:pl-0 md:text-neutral-900"
      >
        {category.name}
      </Link>
    )
  )
}
