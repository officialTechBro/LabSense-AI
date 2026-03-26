# 🧬 LabSense AI — Seed Data Specification

## Overview

Create a seed script (`prisma/seed.ts`) to populate the database with realistic sample data for development, testing, and demo purposes.

The seed should reflect real-world lab report scenarios, including users, reports, lab results, summaries, and recommendations.

---

## Requirements

### User

- **Email:** demo@labsense.ai  
- **Name:** Demo User  
- **Password:** 12345678 *(hash with bcryptjs, 12 rounds)*  
- **isPro:** false  
- **emailVerified:** current date  

---

### Reports

Create **3 sample reports** representing realistic health scenarios.

#### 1. Annual Physical - 2025

- **Date:** March 15, 2025  
- **overallStatus:** normal  
- **normalCount:** 10  
- **borderlineCount:** 1  
- **flaggedCount:** 1  

**AI Summary:**  
Most results are within normal range. However, glucose levels are slightly elevated and vitamin D is below optimal levels. No urgent concerns but monitoring is recommended.

#### 2. Blood Work - Follow-up

- **Date:** March 10, 2025  
- **overallStatus:** borderline  
- **normalCount:** 6  
- **borderlineCount:** 2  
- **flaggedCount:** 0  

**AI Summary:**  
Some values are slightly outside the optimal range. This may indicate early-stage imbalances that should be monitored.

#### 3. Liver Function Panel

- **Date:** February 28, 2025  
- **overallStatus:** normal  
- **normalCount:** 6  
- **borderlineCount:** 0  
- **flaggedCount:** 0  

**AI Summary:**  
All liver function markers are within normal range. No concerns identified.

---

### Lab Results

Each report should contain **5–10 realistic lab results**.

#### Example Lab Results (Annual Physical)

| Test Name            | Value | Unit | Range     | Status |
|---------------------|-------|------|-----------|--------|
| Red Blood Cell Count | 4.8   | M/uL | 4.5–5.5   | normal |
| Hemoglobin           | 14.2  | g/dL | 13.5–17.5 | normal |
| Cholesterol Total    | 185   | mg/dL | <200     | normal |
| Glucose (Fasting)    | 102   | mg/dL | 70–99    | borderline |
| Vitamin D            | 28    | ng/mL | 30–100   | low |
| TSH                  | 2.1   | mIU/L | 0.4–4.0  | normal |
| Calcium              | 8.6   | mg/dL | 8.5–10.2 | normal |
| Potassium            | 4.2   | mEq/L | 3.5–5.0  | normal |

Each result should also include:

- **explanation** (simple AI-style explanation)

Example:

> “This value is within the normal range and indicates healthy oxygen-carrying capacity.”

---

### Recommendations

Each report should include **2–4 recommendations**.

#### Example Recommendations

1. **Cholesterol Trending Up**  
   - Priority: warning  
   - Description:  
   Your LDL cholesterol has been increasing over the past few months. Consider dietary adjustments and consult your doctor if this trend continues.

2. **Vitamin D Level Low**  
   - Priority: warning  
   - Description:  
   Your vitamin D is below the recommended range. Increasing sun exposure or supplementation may help.

3. **Schedule Follow-up**  
   - Priority: info  
   - Description:  
   Based on your glucose levels, consider repeating this test in 3 months.

---

### Dashboard Metrics (Derived Data)

Seed data should support UI metrics such as:

- Total reports count  
- Last report date  
- Overall health status  
- Number of flagged/borderline results  
- Trend indicators (e.g., cholesterol increasing over time)  

---

### Trends Data

Include sample historical data for charts.

#### Cholesterol Trend (Last 6 Months)

```ts
[
  { month: "Jan", value: 200 },
  { month: "Feb", value: 205 },
  { month: "Mar", value: 210 },
  { month: "Apr", value: 220 },
  { month: "May", value: 230 },
  { month: "Jun", value: 240 }
]
```

---

### Health Metrics (Quick Stats)

Used in dashboard sidebar:

- Blood Pressure: 120/80  
- Heart Rate: 72 bpm  
- BMI: 24.5  
- Glucose (Fasting): 102  

---

### Notes

- Keep data **realistic and medically plausible**  
- Use **consistent units and ranges**  
- Avoid overly complex relationships  
- This is strictly for **development/demo purposes**  
- Ensure data aligns with UI designs (dashboard, cards, drawer view)

---

## Goal

Provide a complete, realistic dataset that allows the LabSense dashboard, report details, and trends UI to function fully without needing a live backend.

