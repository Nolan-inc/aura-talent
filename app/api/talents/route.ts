import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      'http://localhost:3003/api/v1/public/contents/335e80a6-071a-47c3-80d2-b12e3ffe8d48?type=card&category_id=d9ac59d2-4356-4b0f-aa00-8713a909962f',
      { cache: 'no-store' }
    )

    if (!res.ok) {
      throw new Error('API Error')
    }

    const json = await res.json()

    const data = json.success
      ? json.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          publishedAt: item.publishedAt,
          thumbnail: {
            url: item.thumbnail?.url || '',
            alt: item.thumbnail?.alt || ''
          }
        }))
      : []

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, data: [] }, { status: 500 })
  }
}