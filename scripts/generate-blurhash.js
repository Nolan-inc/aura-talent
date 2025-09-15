const { getPlaiceholder } = require('plaiceholder')
const fs = require('fs').promises
const path = require('path')

// APIから取得する画像URLの例
const imageUrls = [
  // ここに実際の画像URLを追加
  // 'https://admin.cldv.jp/...',
]

async function generateBlurHashes() {
  const blurHashes = {}

  for (const url of imageUrls) {
    try {
      console.log(`Generating blur hash for: ${url}`)
      const response = await fetch(url)
      const buffer = await response.arrayBuffer()
      const { base64 } = await getPlaiceholder(Buffer.from(buffer))
      blurHashes[url] = base64
      console.log(`✓ Generated: ${url.substring(0, 50)}...`)
    } catch (error) {
      console.error(`✗ Failed for ${url}:`, error.message)
    }
  }

  // 結果をファイルに保存
  const outputPath = path.join(__dirname, '../lib/generated-blurhashes.json')
  await fs.writeFile(outputPath, JSON.stringify(blurHashes, null, 2))
  console.log(`\nBlur hashes saved to: ${outputPath}`)
}

// 実行
generateBlurHashes().catch(console.error)