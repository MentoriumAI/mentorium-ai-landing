import { redirect } from 'next/navigation'

interface DocsPageProps {
  params: {
    slug: string[]
  }
}

export default function DocsSlugPage({ params }: DocsPageProps) {
  const path = params.slug.join('/')
  redirect(`/pages/${path}`)
}