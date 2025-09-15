import { getPlaiceholder } from 'plaiceholder'

export async function getBlurDataURL(src: string): Promise<string> {
  try {
    const response = await fetch(src)
    const buffer = await response.arrayBuffer()
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))
    return base64
  } catch (error) {
    console.error('Error generating blur data URL:', error)
    // フォールバック用の透明な1x1ピクセル画像
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  }
}

// 事前生成されたBlurHashデータ（オプション）
export const preGeneratedBlurHashes: Record<string, string> = {
  // ここに事前生成したBlurHashを追加可能
  // '/images/hero1.jpg': 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
}