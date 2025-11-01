# positioning-statement-generator 🎯

**Stop spending weeks on positioning. Nail it in 10 minutes.**

[![npm version](https://img.shields.io/npm/v/positioning-statement-generator.svg)](https://www.npmjs.com/package/positioning-statement-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Product positioning based on April Dunford's "Obviously Awesome" framework. Interactive CLI that generates your complete positioning document.

## 😱 The Problem

```
Week 1: "Let's nail our positioning"
Week 2: Still arguing about value props
Week 3: Sales makes up their own pitch
Week 4: Website says something different than the deck
Week 5: "What market category are we even in?"
```

**Every company struggles with positioning.** Most PMMs spend months on it. Most get it wrong.

## ✨ The Solution

```bash
$ npx positioning-statement-generator

🎯 Answer 5 questions (takes 10 minutes)
📄 Get complete positioning document
🚀 Ship consistent messaging everywhere
```

Based on April Dunford's proven "Obviously Awesome" framework. Used by thousands of B2B companies.

## 🚀 Quick Start

```bash
# No install needed
npx positioning-statement-generator

# Or install globally
npm install -g positioning-statement-generator
posgen
```

## 💡 What You Get

### ✅ Complete Positioning Document
- Core positioning statement
- 30-second elevator pitch
- 2-minute elevator pitch
- Website hero copy (headline, subheadline, CTA)
- Competitive positioning matrix
- Messaging hierarchy (narrative → pillars → proof points)

### ✅ Export Formats
- **Markdown** - For Notion, Confluence, GitHub
- **Text** - For emails, docs
- **JSON** - For programmatic use

### ✅ April Dunford's 5-Component Framework

1. **Competitive Alternatives** - What would customers use if you didn't exist?
2. **Unique Attributes** - What do you have that alternatives don't?
3. **Value Themes** - What value do those attributes enable?
4. **Target Market** - Who cares most about that value?
5. **Market Category** - What category makes your value obvious?

## 📖 How It Works

### Step 1: Answer 5 Questions

```bash
📦 What's your product name?
→ Acme Analytics

🔄 List competitive alternatives (comma-separated):
→ Excel, Google Sheets, hiring a data analyst

⭐ List unique attributes (comma-separated):
→ real-time dashboards, no-code setup, AI-powered insights

💎 List value themes (comma-separated):
→ make data-driven decisions faster, reduce analytics costs, empower non-technical teams

🎯 Describe your target market:
→ B2B SaaS companies with 10-100 employees

📊 What market category are you in?
→ business intelligence platform
```

### Step 2: Get Your Positioning

```
═══════════════════════════════════════════════════════════════════
           POSITIONING STATEMENT
═══════════════════════════════════════════════════════════════════

📦 Acme Analytics

🎯 Core Positioning Statement:
Acme Analytics is a business intelligence platform that helps B2B SaaS
companies with 10-100 employees make data-driven decisions faster. Unlike
Excel, Google Sheets, hiring a data analyst, we real-time dashboards.

⏱️  30-Second Elevator Pitch:
Acme Analytics helps B2B SaaS companies with 10-100 employees make
data-driven decisions faster. We're the only business intelligence platform
that real-time dashboards.

🌟 Website Hero Copy:
  Headline: make data-driven decisions faster for B2B SaaS companies with 10-100 employees
  Subheadline: Acme Analytics helps you make data-driven decisions faster, reduce analytics costs, empower non-technical teams
  CTA: Get Started

📊 Competitive Positioning Matrix:
┌──────────────────┬────────┬───────┬─────────┐
│ Feature          │ Acme   │ Excel │ Google  │
│                  │        │       │ Sheets  │
├──────────────────┼────────┼───────┼─────────┤
│ real-time        │ ✓      │ ✗     │ ✗       │
│ dashboards       │        │       │         │
├──────────────────┼────────┼───────┼─────────┤
│ no-code setup    │ ✓      │ ✗     │ ✗       │
└──────────────────┴────────┴───────┴─────────┘
```

### Step 3: Export & Share

```bash
💾 Export your positioning document?
→ Markdown (.md)

✓ Saved to positioning-acme-analytics-2025-01-15.md

🚀 Your positioning is ready! Go nail that messaging.
```

## 🎯 Use Cases

### For Product Marketing Managers
- ✅ Onboard new PMMs with clear positioning
- ✅ Align sales, marketing, product on messaging
- ✅ Create positioning for new product launches
- ✅ Refresh positioning when market shifts

### For Founders
- ✅ Nail positioning before fundraising
- ✅ Create consistent pitch across decks, website, sales
- ✅ Test positioning hypotheses quickly
- ✅ Educate team on "what we actually do"

### For Sales Teams
- ✅ Get elevator pitches that actually work
- ✅ Understand competitive differentiation
- ✅ Stop making up your own positioning

## 🔥 Why This Works

### Built on Proven Framework
April Dunford's "Obviously Awesome" is the gold standard for B2B positioning. Used by:
- Y Combinator companies
- Fortune 500 product teams
- Top B2B SaaS companies

### Forces You to Think
The 5 questions aren't random. They force you to:
- Understand your real competition (not who you think it is)
- Identify what actually makes you different
- Articulate value, not features
- Pick a winning market category

### Instant Documentation
No more "positioning is in Sarah's head." Export to Markdown, share with team, iterate.

## 📊 Real-World Example

### Before
- **Website**: "We're an AI-powered analytics platform"
- **Sales pitch**: "We help you understand your data"
- **Deck**: "Business intelligence for modern teams"
- **Result**: Nobody knows what you do

### After (using this tool)
- **Positioning**: "Business intelligence platform for B2B SaaS teams (10-100 employees) who need real-time dashboards without hiring analysts"
- **Result**: Everyone says the same thing. Customers get it immediately.

## 🤝 Who This Is For

✅ **Product Marketing Managers** - Your job is positioning
✅ **Founders** - Positioning unlocks growth
✅ **Product Managers** - Need to position new features
✅ **Sales Leaders** - Tired of inconsistent messaging

## ⚠️ What This Isn't

- ❌ Not a branding tool (doesn't create logos/colors)
- ❌ Not a copywriting tool (you still write the final copy)
- ❌ Not magic (requires honest self-reflection)
- ❌ Not a replacement for customer research (validates, doesn't discover)

## 📚 Learn More

- Read [Obviously Awesome by April Dunford](https://www.aprildunford.com/obviously-awesome)
- Watch [April's talk on positioning](https://www.youtube.com/results?search_query=april+dunford+positioning)
- Follow [@aprildunford on Twitter](https://twitter.com/aprildunford)

## 🛠️ Built With

- [inquirer](https://github.com/SBoudrias/Inquirer.js/) - Interactive CLI prompts
- [chalk](https://github.com/chalk/chalk) - Beautiful terminal colors
- [cli-table3](https://github.com/cli-table/cli-table3) - ASCII tables

## 💬 Positioning Is Hard

**But it doesn't have to take months.** This tool gives you:

- ✅ Proven framework (not made-up questions)
- ✅ Complete document (ready to share)
- ✅ Consistent messaging (no more drift)
- ✅ 10 minutes (not 10 weeks)

**Try it now:**

```bash
npx positioning-statement-generator
```

---

## 👤 Author

**Daniel Shashko**
- GitHub: [@danielshashko](https://github.com/danielshashko)
- LinkedIn: [daniel-shashko](https://linkedin.com/in/daniel-shashko)
- npm: [@danielshashko](https://www.npmjs.com/~danielshashko)

---

## 📄 License

MIT © Daniel Shashko

---

## 🎯 Positioning Is Strategy

*"Positioning is the single largest factor determining your success or failure in the market."* - April Dunford

Stop guessing. Start positioning.

```bash
npx positioning-statement-generator
```
