export type VisaType = {
  name: string;
  feeRange: string;
  duration: string;
  description: string;
  requirements: string[];
  documents: string[];
};

export const visaTypes: VisaType[] = [
  {
    name: "Highly Skilled Migrant Visa",
    feeRange: "$150 – $500",
    duration: "1–3 years (renewable)",
    description: "Allows foreign nationals to work legally with employer sponsorship.",
    requirements: [
      "Valid passport (6+ months)",
      "Job offer from licensed employer",
      "Relevant qualifications",
      "Clean criminal record",
      "Medical fitness certificate",
      "Proof of accommodation",
    ],
    documents: [
      "Completed application form",
      "Passport-size photographs",
      "Employment contract",
      "Educational certificates (attested)",
      "Experience letters",
      "Police clearance certificate",
      "Medical report",
    ],
  },
  {
    name: "Work Visa",
    feeRange: "$150 – $500",
    duration: "1–3 years (renewable)",
    description: "Allows foreign nationals to work legally with employer sponsorship.",
    requirements: [
      "Valid passport (6+ months)",
      "Job offer from licensed employer",
      "Relevant qualifications",
      "Clean criminal record",
      "Medical fitness certificate",
      "Proof of accommodation",
    ],
    documents: [
      "Completed application form",
      "Passport-size photographs",
      "Employment contract",
      "Educational certificates (attested)",
      "Experience letters",
      "Police clearance certificate",
      "Medical report",
    ],
  },
  {
    name: "Student Visa",
    feeRange: "$100 – $350",
    duration: "Duration of course + 6 months",
    description: "Permits enrollment in accredited educational institutions.",
    requirements: [
      "Acceptance letter from institution",
      "Proof of financial support",
      "Academic transcripts",
      "Language proficiency proof",
      "Valid passport",
      "Health insurance",
    ],
    documents: [
      "University admission letter",
      "Financial guarantee / bank statements",
      "Academic certificates",
      "Language test results",
      "Passport copies",
      "Photograph",
    ],
  },
  {
    name: "Entrepreneur Visa",
    feeRange: "$200 – $1,000",
    duration: "1–5 years",
    description: "For entrepreneurs, investors, or business activities.",
    requirements: [
      "Business plan or investment proof",
      "Financial capability evidence",
      "Clean criminal record",
      "Valid passport",
      "Business registration documents",
      "Relevant experience",
    ],
    documents: [
      "Business proposal",
      "Bank statements (6 months)",
      "Company registration",
      "Tax returns",
      "Passport copies",
      "Photograph",
    ],
  },
  {
    name: "Search Year Visa",
    feeRange: "$100 – $500",
    duration: "Varies",
    description: "Specialized visa category. Contact our experts for guidance.",
    requirements: [
      "Valid passport (6+ months)",
      "Supporting documents per category",
      "Clean criminal record",
      "Completed application form",
    ],
    documents: [
      "Application form",
      "Passport copies",
      "Supporting documents",
      "Photographs",
      "Fee receipt",
    ],
  },
];