# Firebase Studio

# 📂 Project File Overview & Implementation Guide

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-Connected-brightgreen?style=for-the-badge&logo=mysql)](#)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)](#)

This document explains the **purpose** and **action steps** for core files in the project, so contributors can quickly understand the workflow.

---

## 📜 File Overview Table

| File Path | Purpose | Action Required |
|-----------|---------|-----------------|
| **`src/types/index.ts`** | Defines the **structure** of your data (`Company` interface). | Match database schema to this type definition, or update the type to match your DB. |
| **`src/app/dashboard/page.tsx`** | Main **Dashboard Page**, currently using hardcoded company data. | Replace mock data with a database fetch (can be done directly in this Server Component). |
| **`src/app/dashboard/submitted/page.tsx`** | Displays a **table** of submitted companies, currently mock data. | Replace mock data with a real database query. |
| **`src/app/dashboard/initiate/page.tsx`** | Page to start a **new process** (create a new company). | Build a form + Next.js Server Action to save to the database. |

---

## 🛠 Implementation Details

### 1️⃣ `src/types/index.ts`
- **Purpose:** Centralized **TypeScript type definitions**.  
- **Next Step:** Align with your **database schema**.

---

### 2️⃣ `src/app/dashboard/page.tsx`
- **Purpose:** Main **analytics dashboard** showing charts and stats.  
- **Next Step:** Replace:
```ts
const companies: Company[] = [ ... ];
