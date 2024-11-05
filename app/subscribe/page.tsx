import Link from 'next/link'

export default function Subscribe() {
  return (
    <div className="mx-auto px-4 py-9 md:p-16">
      <h2 className="mb-5 text-3xl font-bold">
        Set up your Subscribe page here
      </h2>
      <p>
        You can easily integrate this template with your own subscription
        process
      </p>
      <Link
        href="/"
        className="my-7 inline-block bg-neutral-900 px-6 py-3 text-neutral-50 hover:opacity-80"
      >
        Return Home
      </Link>
    </div>
  )
}
