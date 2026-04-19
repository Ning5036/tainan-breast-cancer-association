# 台南市乳癌防治學會 官方網站

Tainan Breast Cancer Prevention Association Official Website

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Notion API
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Visitor Counter:** Vercel KV (Upstash Redis)
- **Contact Form:** Formspree

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `env.example.txt` to `.env.local` and fill in your values:

```bash
cp env.example.txt .env.local
```

Required variables:

| Variable                            | Description               |
| ----------------------------------- | ------------------------- |
| `NOTION_API_KEY`                    | Notion integration secret |
| `NOTION_NEWS_DB`                    | News database ID          |
| `NOTION_ARTICLES_DB`                | Articles database ID      |
| `NOTION_DOWNLOADS_DB`               | Downloads database ID     |
| `NOTION_GALLERY_DB`                 | Gallery database ID       |
| `KV_REST_API_URL`                   | Vercel KV URL             |
| `KV_REST_API_TOKEN`                 | Vercel KV token           |
| `NEXT_PUBLIC_FORMSPREE_ID`          | Formspree form ID         |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | Google Maps embed URL     |
| `NEXT_PUBLIC_SITE_URL`              | Production site URL       |

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
```

## Notion CMS Setup

Create four databases in Notion with the following schemas:

### News Database

| Property    | Type     | Values             |
| ----------- | -------- | ------------------ |
| Title       | Title    | -                  |
| Category    | Select   | 公告 / 活動 / 新聞 |
| PublishDate | Date     | -                  |
| CoverImage  | Files    | -                  |
| Published   | Checkbox | -                  |

### Articles Database

| Property    | Type      | Values                                    |
| ----------- | --------- | ----------------------------------------- |
| Title       | Title     | -                                         |
| Category    | Select    | 預防篩檢 / 治療新知 / 術後照護 / 心理支持 |
| Author      | Rich Text | -                                         |
| PublishDate | Date      | -                                         |
| Excerpt     | Rich Text | -                                         |
| Thumbnail   | Files     | -                                         |
| Published   | Checkbox  | -                                         |

### Downloads Database

| Property    | Type      | Values            |
| ----------- | --------- | ----------------- |
| FileName    | Title     | -                 |
| FileType    | Select    | PDF / Word / 其他 |
| Description | Rich Text | -                 |
| UploadDate  | Date      | -                 |
| File        | Files     | -                 |

### Gallery Database

| Property   | Type      | Values                                |
| ---------- | --------- | ------------------------------------- |
| PhotoTitle | Title     | -                                     |
| EventName  | Rich Text | -                                     |
| EventDate  | Date      | -                                     |
| Year       | Select    | 2024 / 2025 / ...                     |
| Category   | Select    | 學術活動 / 公益活動 / 受獎紀錄 / 其他 |
| Caption    | Rich Text | -                                     |
| Photo      | Files     | -                                     |
| Published  | Checkbox  | -                                     |

### Notion Integration Setup

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the API key to `NOTION_API_KEY`
4. Share each database with the integration
5. Copy each database ID to the corresponding env variable

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Enable Vercel KV from the Storage tab
5. Deploy

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About page
│   ├── news/
│   │   ├── page.tsx        # News listing
│   │   └── [id]/page.tsx   # News detail
│   ├── education/
│   │   ├── page.tsx        # Education articles
│   │   └── [id]/page.tsx   # Article detail
│   ├── resources/page.tsx  # Downloads
│   ├── gallery/page.tsx    # Photo gallery
│   ├── links/page.tsx      # Related links
│   ├── contact/page.tsx    # Contact form
│   ├── api/visitor/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/             # Header, Footer, ScrollToTop
│   ├── home/               # Hero, LatestNews, Mission, QuickLinks, VisitorCounter
│   ├── ui/                 # PageHeader, CategoryFilter, Lightbox, etc.
│   └── shared/             # PageTransition
├── lib/
│   ├── notion.ts           # Notion API client
│   └── visitor.ts          # Visitor counter logic
└── types/
    └── index.ts            # TypeScript interfaces
```

## License

Copyright 台南市乳癌防治學會. All rights reserved.
