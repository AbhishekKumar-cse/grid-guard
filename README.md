# GridGuard 2030: India's Smart Grid Intelligence Platform

**GridGuard 2030** is a futuristic, AI-powered mission control platform designed to secure India's energy future. Our goal is to reduce Aggregate Technical and Commercial (AT&C) losses from the national average of 17.4% to below 2% by the year 2030 through a synergy of IoT, Generative AI, and Blockchain technology.

## 🚀 Vision: Energy Sovereignty
Energy leakage costs the Indian economy over ₹87,800 Crore annually. GridGuard 2030 provides DISCOM officers with the tools to detect theft, predict asset failure, and optimize energy distribution in real-time.

---

## 🛠 Features

### 1. Mission Control Dashboard
- **Live KPI Tracking:** Real-time monitoring of national AT&C loss, energy balance, and revenue protection.
- **National Grid Map:** Geospatial visualization of grid health with pulsing alerts for critical zones.
- **Dynamic Charting:** 24-hour loss trends and DISCOM performance rankings using Recharts.

### 2. AI Theft Detection Engine
- **Pattern Recognition:** Detects sophisticated theft patterns like CT Bypass, Magnetic Interference, and Illegal Sub-metering.
- **Automated Evidence Reports:** Uses **Google Genkit** to analyze sensor anomalies and generate blockchain-ready narrative evidence reports for field dispatch.
- **Confidence Scoring:** AI-driven probability assessment (e.g., 99.2% accuracy) to reduce false positives.

### 3. Predictive Maintenance Suite
- **Asset Health Indexing:** Monitoring the lifecycle of over 2.8 Crore transformers nationwide.
- **Sensor Diagnostics:** Real-time gauges for winding temperature, vibration, and oil levels.
- **Failure Prediction:** GenAI-powered insights that predict mechanical or thermal failures 14 days in advance, allowing for proactive scheduling.

### 4. Intelligence Stack
- **Perception Layer:** IoT Smart Meters and Transformer sensors.
- **Communication Layer:** 5G Mesh and NB-IoT coverage.
- **Intelligence Layer:** Ensemble AI models for anomaly detection.
- **Action Layer:** SCADA 4.0 integration for auto-healing grid capabilities.

---

## 💻 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Three.js](https://threejs.org/) (3D Particle Backgrounds)
- **AI Engine:** [Google Genkit](https://github.com/firebase/genkit) with **Gemini 2.5 Flash**
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)

---

## 🤖 AI Flows (Genkit)

The application leverages specialized Genkit flows located in `src/ai/flows/`:

- **`aiPredictiveMaintenanceInsights`**: Analyzes transformer sensor data to output failure modes, likelihood, and recommended preemptive actions.
- **`aiTheftEvidenceReport`**: Converts raw sensor anomalies into a professional legal evidence report for DISCOM engineers.
- **`summarizeGridReports`**: Generates high-level narrative summaries of complex grid performance data for executive review.

---

## 🛠 Development

### Getting Started

1.  **Install dependencies:**
    The environment automatically handles package installation via `package.json`.

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Genkit Developer UI:**
    To test AI prompts and flows locally:
    ```bash
    npm run genkit:dev
    ```

---

## 🇮🇳 Official Entry
**GridGuard 2030** is a pioneer entry for the **CreaTech 2025 National Innovation Competition**, focusing on deep-tech solutions for India's infrastructure challenges.