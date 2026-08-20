export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  href?: string;
  github?: string;
  status: "shipped" | "live" | "soon" | "current";
  accent: string;
  bgFrom: string;
  bgTo: string;
  platform: "macos" | "ios" | "cross" | "web";
  screenshot?: string;
  video?: string;
  iframe?: string;
  icon: string;
};

export const projects: Project[] = [
  {
    id: "icu-deterioration",
    name: "ICU Deterioration Detection",
    tagline: "Earlier signals for time-critical care.",
    description: "A machine-learning system built from MIMIC-III ICU waveform data to identify early patient deterioration and provide interpretable clinical signals.",
    highlights: ["86.4% model accuracy", "91% precision", "Explainable AI for clinical interpretation"],
    tech: ["MIMIC-III", "Machine Learning", "Explainable AI"],
    status: "shipped", accent: "#9B2C5B", bgFrom: "#f4d9e4", bgTo: "#dca4b9", platform: "web", icon: "",
  },
  {
    id: "antidepressant-analysis",
    name: "Treatment Pattern Analysis",
    tagline: "Finding signal in incomplete healthcare data.",
    description: "An analysis of antidepressant prescribing patterns in the All of Us Dataset v8, combining imputation, feature engineering, and predictive modeling.",
    highlights: ["SQL and Python analysis", "Missing-data imputation", "Patient-history-based recommendations"],
    tech: ["All of Us", "Python", "SQL", "Feature Engineering"],
    status: "shipped", accent: "#4B6B78", bgFrom: "#dce9eb", bgTo: "#abc8cc", platform: "web", icon: "",
  },
  {
    id: "chest-xray",
    name: "Chest X-ray Assistant",
    tagline: "Applied AI for preliminary imaging support.",
    description: "A ResNet-50 diagnostic assistant for classifying NIH chest X-rays, with image preprocessing and augmentation designed for a healthcare context.",
    highlights: ["NIH Chest X-ray dataset", "ResNet-50 transfer learning", "61% test accuracy"],
    tech: ["MATLAB", "ResNet-50", "Medical Imaging"],
    status: "shipped", accent: "#72558A", bgFrom: "#e8dded", bgTo: "#c6afd1", platform: "web", icon: "",
  },
  {
    id: "heart-failure",
    name: "Heart Failure Prediction",
    tagline: "Risk modeling after myocardial infarction.",
    description: "A Random Forest study using 1,700 patient records to explore early chronic heart failure prediction after myocardial infarction.",
    highlights: ["1,700 patient records", "KNN/MICE imputation and SMOTE", "Random Forest modeling"],
    tech: ["Random Forest", "KNN", "MICE", "SMOTE"],
    status: "shipped", accent: "#B04752", bgFrom: "#f2dadd", bgTo: "#d8a4aa", platform: "web", icon: "",
  },
  {
    id: "heart-health",
    name: "Heart Health Explorer",
    tagline: "Making cardiac risk easier to understand.",
    description: "An interactive Python tool that visualizes health indicators and disease probability for patients and healthcare professionals.",
    highlights: ["Interactive risk exploration", "Clear visual interpretation", "Patient and clinician audiences"],
    tech: ["Python", "Matplotlib", "Seaborn"],
    status: "shipped", accent: "#B36A3E", bgFrom: "#f4e0d3", bgTo: "#ddb696", platform: "web", icon: "",
  },
];
