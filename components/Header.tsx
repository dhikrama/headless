'use client'

import { BlockData, ContentData } from '@gocontento/client'
import MogalLogo from '@/images/MogalLogo'
import Link from 'next/link'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'
import { usePathname } from 'next/navigation'
import { classNames } from '@/utils/ClassNames'
import { useState } from 'react'
import CategoryPill from './blocks/layouts/CategoryPill'
import LinkedInIcon from './icons/LinkedInIcon'
import TwitterIcon from './icons/TwitterIcon'
import MogalLogoOutline from '@/images/MogalLogoOutline'

export default function Header({
  mainNav,
  categoryLinks,
}: {
  mainNav: ContentData
  categoryLinks: ContentData[]
}) {
  const pathName = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-neutral-100">
      <nav
        aria-label="Global"
        className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 md:px-16 lg:h-28"
      >
        <div className="flex gap-x-9 lg:flex-1">
          <Link href="/" className="inline-block w-[120px] hover:opacity-80">
            <span className="sr-only">Mogal</span>
            <MogalLogo className="h-auto w-full" />
          </Link>
          <div className="hidden flex-wrap items-center gap-x-3 gap-y-4 md:flex">
            {categoryLinks.map((category, index) => (
              <div
                key={`article-category-${index}`}
                className="[&_span]:last-of-type:hidden"
              >
                <CategoryPill category={category} />
                <span className="px-3 text-neutral-900">/</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-900"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden items-center lg:flex lg:gap-x-12">
          {mainNav.fields.nav_links.blocks.map((item: BlockData) => {
            if (item.fields.button.is_on) {
              return (
                <Link
                  key={item.fields.link_text.text}
                  href={item.fields.link_url.text}
                  className="my-9 inline-block rounded-md bg-neutral-900 px-9 py-3 text-neutral-50 hover:opacity-80"
                  target={item.fields.open_in_new_tab.is_on ? '_blank' : ''}
                >
                  {item.fields.link_text.text}
                </Link>
              )
            } else {
              return (
                <Link
                  key={item.fields.link_text.text}
                  href={item.fields.link_url.text}
                  className={classNames(
                    pathName.startsWith(item.fields.link_url.text)
                      ? 'underline'
                      : 'text-neutral-900',
                    'text-md ',
                  )}
                  target={item.fields.open_in_new_tab.is_on ? '_blank' : ''}
                >
                  {item.fields.link_text.text}
                </Link>
              )
            }
          })}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-neutral-900 px-4">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              className="inline-block w-[120px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Mogal</span>
              <MogalLogoOutline className="h-auto w-full" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-900"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                aria-hidden="true"
                className="h-6 w-6 text-neutral-50"
              />
            </button>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-4 py-6">
              {categoryLinks.map((category, index) => (
                <div
                  key={`article-category-${index}`}
                  className="[&_span]:last-of-type:hidden"
                >
                  <CategoryPill
                    category={category}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <span className="px-3 text-neutral-50">/</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-5 border-t border-t-neutral-50 py-6">
              {mainNav.fields.nav_links.blocks.map((item: BlockData) => {
                if (item.fields.button.is_on) {
                  return (
                    <div key={item.fields.link_text.text} className="pt-7">
                      <Link
                        href={item.fields.link_url.text}
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-block rounded-md bg-neutral-900 px-9 py-3 text-center text-neutral-50"
                        target={
                          item.fields.open_in_new_tab.is_on ? '_blank' : ''
                        }
                      >
                        {item.fields.link_text.text}
                      </Link>
                    </div>
                  )
                } else {
                  return (
                    <Link
                      key={item.fields.link_text.text}
                      href={item.fields.link_url.text}
                      onClick={() => setMobileMenuOpen(false)}
                      className={classNames(
                        pathName.startsWith(item.fields.link_url.text)
                          ? 'underline decoration-1 underline-offset-1'
                          : 'underline-none',
                        'text-md text-neutral-50',
                      )}
                      target={item.fields.open_in_new_tab.is_on ? '_blank' : ''}
                    >
                      {item.fields.link_text.text}
                    </Link>
                  )
                }
              })}
            </div>
          </div>
          <div className="flex gap-x-4  text-neutral-50">
            <LinkedInIcon href="https://www.linkedin.com" />
            <TwitterIcon href="https://www.twitter.com" />
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
