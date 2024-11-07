import MogalIcon from '@/images/MogalIcon'
import { ContentLink } from '@/utils/Types'
import { BlockData, ContentData } from '@gocontento/client'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Footer({ footerNav }: { footerNav: ContentData }) {
  return (
    <div className="mx-auto mt-9 flex w-full flex-col gap-x-16 gap-y-6 bg-neutral-900 px-6 py-16 md:flex-row md:justify-between md:px-16">
      <div className="flex flex-col justify-center">
        <MogalIcon className="-ml-1 h-10 w-10" />
        <form className="max-w-60 py-4 lg:max-w-none">
          <h3 className="mb-3 text-xl font-bold text-neutral-50">Subscribe</h3>
          <div className="flex flex-col gap-x-5 gap-y-4 lg:flex-row">
            <input
              type="text"
              placeholder="Name"
              className="flex-shrink-0 border border-neutral-50/80 bg-neutral-900 px-2 py-2 text-sm text-neutral-50 md:py-1"
            />
            <input
              type="email"
              placeholder="Email"
              className="flex-shrink-0 border border-neutral-50/80 bg-neutral-900 px-2 py-2 text-sm text-neutral-50 md:py-1"
            />
            <div className="mt-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-neutral-50/80 p-2 text-neutral-50/80 hover:bg-neutral-50/80 hover:text-neutral-900 md:mt-0">
              <ArrowRightIcon className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-6 text-xs text-neutral-50/80 md:mt-4 lg:w-3/4">
            By submitting you agree to our{' '}
            <Link className="underline" href="/privacy-policy">
              Privacy Policy
            </Link>
            . You may unsubscribe at any time.
          </p>
        </form>
      </div>
      <div className="flex flex-col justify-center">
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-bold text-neutral-50">
            Popular Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            {footerNav.fields.popular_categories.content_links.map(
              (category: ContentLink) => {
                return (
                  <Link
                    href={`/${category.content_link.uri}`}
                    key={`footer-category-${category.content_link.id}`}
                    className="border border-neutral-50/80 px-3 py-1 text-xs text-neutral-50 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    {category.content_link.name}
                  </Link>
                )
              },
            )}
          </div>
        </div>
        <div className="border-t border-neutral-50/80 pt-5">
          <FooterNav footerNav={footerNav} />
          <p className="mt-10 text-xs text-neutral-50/80 md:mt-4">
            &copy; {new Date().getFullYear()} Mogul Media Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

function FooterNav({ footerNav }: { footerNav: ContentData }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {footerNav.fields.nav_links.blocks &&
        footerNav.fields.nav_links.blocks.map((link: BlockData) => (
          <Link
            href={link.fields.link_url.text}
            className="block text-sm text-neutral-50 hover:opacity-80"
            target={link.fields.open_in_new_tab.is_on ? '_blank' : ''}
            key={link.fields.link_text.text}
          >
            {link.fields.link_text.text}
          </Link>
        ))}
    </div>
  )
}
