# AURA Official Website - Next.js Version

## 技術スタック

- **フレームワーク**: Next.js 15.2.4 (App Router)
- **言語**: TypeScript (厳格モード)
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **パッケージマネージャー**: pnpm

## 機能

- レスポンシブデザイン
- カスタム円形カーソル（デスクトップのみ）
- スムーズなアニメーション
- 日本語フォント対応（Noto Sans JP）

## 開発環境のセットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# プロダクションサーバーの起動
pnpm start
```

## プロジェクト構造

```
nextjs/
├── app/
│   ├── globals.css      # グローバルスタイル
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # ホームページ
├── components/
│   ├── custom-cursor.tsx # カスタムカーソル
│   ├── header.tsx       # ヘッダー
│   ├── footer.tsx       # フッター
│   └── home/           # ホームページコンポーネント
│       ├── actress-marquee.tsx
│       ├── audition-link.tsx
│       ├── hero-banner.tsx
│       └── news-section.tsx
└── lib/
    └── utils.ts         # ユーティリティ関数
```

## TypeScript設定

厳格モードが有効になっており、以下の設定が含まれています：

- `strict`: true
- `noImplicitAny`: true
- `strictNullChecks`: true
- `noUnusedLocals`: true
- `noUnusedParameters`: true
- `noUncheckedIndexedAccess`: true

## デプロイ

Vercelへのデプロイが推奨されます：

```bash
# Vercel CLIでデプロイ
vercel
```
