import { redirect } from 'next/navigation'

interface DocsPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function DocsSlugPage({ params }: DocsPageProps) {
  const { slug } = await params
  const path = slug.join('/')
  redirect(`/pages/${path}`)
}