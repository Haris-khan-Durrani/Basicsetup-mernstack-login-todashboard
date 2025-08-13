# Firebase Studio
# 📂 Project File Overview & Implementation Guide

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-Live-brightgreen?style=for-the-badge&logo=mysql)](#)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)](#)

This guide provides the **purpose**, **action items**, **recommendations**, and **workflow** for your key project files — so contributors can quickly understand how to replace mock data with a **live database connection**.

---

## 📜 File Overview Table

| File Path | Purpose | Action Required |
|-----------|---------|-----------------|
| **`src/types/index.ts`** | Defines the **structure** of your data (`Company` interface). | Ensure your **database schema** matches this type definition, or update the type to match your DB. |
| **`src/app/dashboard/page.tsx`** | Main **Dashboard Page** showing stats/charts with mock data. | Replace mock data with a **database fetch** (possible directly here as it's a **Server Component**). |
| **`src/app/dashboard/submitted/page.tsx`** | Displays a **table** of submitted companies (mock data). | Replace with a **database query** to fetch submitted companies. |
| **`src/app/dashboard/initiate/page.tsx`** | Page to **start a new process** (create company entry). | Build a **form** + **Next.js Server Action** to save form data to DB. |

---

## 🛠 Detailed File Descriptions & Actions

### 1️⃣ `src/types/index.ts`
**Purpose:**  
Defines the **TypeScript interface** for `Company` — ensuring a consistent data structure across the app.

**Action:**  
- Verify that your **database schema** matches this interface.  
- Or update the type definition to reflect your actual DB table/collection structure.

---

### 2️⃣ `src/app/dashboard/page.tsx`
**Purpose:**  
Main dashboard displaying **statistics** and **charts**.

**Current State:**  
Uses:
```ts
const companies: Company[] = [ ... ];
```
— which is mock data.

Action:

Replace the mock array with a function fetching data from the DB.

Since it’s a Server Component, you can fetch data directly here without needing an API endpoint.

### 3️⃣ src/app/dashboard/submitted/page.tsx
Purpose:
Shows a table of all submitted companies.

Current State:

Uses a hardcoded mock data array.

Action:

Replace mock array with a real DB query to list submitted companies.

### 4️⃣ src/app/dashboard/initiate/page.tsx
Purpose:
The page where a user can start a new process (add a company).

Action Steps:

Build a form with required fields.

Create a Next.js Server Action for form submission.

Save the data to the database.

## 💡 Recommendations for Organizing Code
To keep database logic separate from UI code, create a dedicated folder for DB operations:


src/
 ├─ lib/
 │   └─ db.ts               # Database connection logic
 └─ services/
     └─ company-service.ts  # CRUD functions for Company
Benefits:

Centralized data handling

Easier maintenance and testing

Cleaner component code

Example usage in page.tsx:

ts
Copy
Edit
import { getAllCompanies } from "@/services/company-service";

export default async function Dashboard() {
  const companies = await getAllCompanies();
  return <DashboardUI data={companies} />;
}
📊 Workflow Diagram
mermaid
Copy
Edit
flowchart LR
    A[👤 User] --> B[💻 UI Page]
    B --> C[⚡ Next.js Server Action]
    C --> D[🛠 DB Service Functions]
    D --> E[(🗄 Database)]
    E --> F[📤 Response]
    F --> G[🔄 UI Update]
🚀 Next Steps
✅ Replace all mock data arrays with live DB queries

✅ Move database operations into /lib or /services

✅ Implement CRUD functions in company-service.ts

✅ Build type-safe DB operations with Prisma or Drizzle ORM

💡 Pro Tip:
Using an ORM like Prisma will keep your DB operations type-safe and auto-sync your TypeScript interfaces with your database schema.

