# Plura - Comprehensive B2B2B SaaS Platform

Plura is a robust, production-ready white-label SaaS platform designed specifically for digital marketing agencies. It features a complete B2B2B structure, allowing agencies to manage their clients (subaccounts), build highly-converting marketing funnels, and operate a fully functional CRM pipeline—all under their own branding.

## 🚀 Key Features

*   🤯 **Multivendor B2B2B SaaS**
*   🏢 **Agency and Sub accounts**
*   🌐 **Unlimited funnel hosting**
*   🚀 **Full Website & Funnel builder**
*   💻 **Role-based Access**
*   🔄 **Stripe Subscription plans**
*   🛒 **Stripe add-on products**
*   🔐 **Connect Stripe accounts for all users! - Stripe Connect**
*   💳 **Charge application fee per sale and recurring sales**
*   💰 **Custom Dashboards**
*   📊 **Media Storage**
*   📈 **Stripe Product Sync**
*   📌 **Custom checkouts on funnels**
*   📢 **Get leads from funnels**
*   🎨 **Khanban board for pipeline management**
*   📂 **Project management system**
*   🔗 **Notifications**
*   📆 **Funnel performance metrics**
*   🧾 **Agency and subaccount metrics**
*   🌙 **Graphs and charts**
*   ☀️ **Light & Dark mode**
*   📄 **Functioning landing page**

## ✨ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions, React Server Components)
- **Database ORM:** [Prisma](https://www.prisma.io/) with MySQL
- **Authentication:** [Clerk](https://clerk.com/)
- **Payments:** [Stripe Connect](https://stripe.com/connect)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **File Uploads:** [UploadThing](https://uploadthing.com/)

## 📂 Project Structure

```text
website_builder/
├── prisma/               # Database schema and Prisma configuration
│   └── schema.prisma     # Main database schema definition
├── public/               # Static assets (images, icons, etc.)
├── src/                  # Source code for the Next.js application
│   ├── app/              # Next.js App Router endpoints and pages
│   │   ├── (main)/       # Main application routes (dashboard, agency, subaccounts)
│   │   ├── api/          # Next.js API routes (webhooks, etc.)
│   │   └── site/         # Public-facing landing page routes
│   ├── components/       # Reusable React UI components (global, forms, ui)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions, queries, types, and constants
│   ├── middleware.ts     # Next.js edge middleware for routing & auth
│   └── providers/        # Global React context providers (Themes, Auth, Modals)
├── .env                  # Environment variables
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🛠️ Getting Started

First, ensure you have your environment variables configured for Clerk, Prisma, Stripe, and UploadThing.

```bash
# Install dependencies
bun install
# or
npm install
# or
yarn install
# or
pnpm install
```

Generate Prisma Client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

Run the development server:

```bash
bun run dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
