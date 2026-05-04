export type Country = {
  slug: string;
  name: string;
  flag: string;
  region: string;
  capital: string;
  currency: string;
  language: string;
  payrollCycle: string;
  workingHours: string;
  tagline: string;
  employment: { contracts: string; probation: string; notice: string; termination: string };
  leave: { annual: string; sick: string; parental: string; holidays: string };
  tax: string;
  visa: string;
};

export const countries: Country[] = [
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Southeast Asia",
    capital: "Singapore",
    currency: "SGD",
    language: "English",
    payrollCycle: "Monthly",
    workingHours: "44 hrs / week",
    tagline: "Hire top talent in Asia's leading business hub.",
    employment: {
      contracts: "Written contracts in English. Fixed-term and indefinite both common.",
      probation: "Typically 3–6 months.",
      notice: "1 day to 4 weeks based on tenure unless contract states otherwise.",
      termination: "Either party may terminate with notice; statutory protections apply.",
    },
    leave: {
      annual: "7–14 days, scaling with service",
      sick: "Up to 14 outpatient / 60 hospitalisation days",
      parental: "16 weeks maternity, 4 weeks paternity (eligible parents)",
      holidays: "11 public holidays",
    },
    tax: "Progressive personal income tax 0–24%. CPF contributions for citizens/PRs.",
    visa: "Employment Pass, S Pass, and Work Permit categories. Salary thresholds apply.",
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    capital: "Canberra",
    currency: "AUD",
    language: "English",
    payrollCycle: "Weekly, fortnightly or monthly",
    workingHours: "38 hrs / week",
    tagline: "Compliant hiring across every Australian state and territory.",
    employment: {
      contracts: "Governed by the Fair Work Act and modern awards.",
      probation: "Commonly 3–6 months.",
      notice: "1–5 weeks based on age and length of service.",
      termination: "Must follow Fair Work procedures; unfair dismissal protections apply.",
    },
    leave: {
      annual: "20 days paid annual leave",
      sick: "10 days paid personal/carer's leave",
      parental: "Up to 12 months unpaid; government paid parental leave available",
      holidays: "7 national + state public holidays",
    },
    tax: "Progressive PAYG tax 0–45%. Mandatory superannuation contributions by employer.",
    visa: "Subclass 482, 186, 494 and others. Sponsorship and labour market testing may apply.",
  },
  {
    slug: "moldova",
    name: "Moldova",
    flag: "🇲🇩",
    region: "Eastern Europe",
    capital: "Chișinău",
    currency: "MDL",
    language: "Romanian",
    payrollCycle: "Monthly",
    workingHours: "40 hrs / week",
    tagline: "Tap into a skilled, multilingual European workforce.",
    employment: {
      contracts: "Written individual labour contract required, in Romanian.",
      probation: "Up to 3 months for most roles, 6 for executives.",
      notice: "14 days to 1 month depending on grounds.",
      termination: "Strict cause-based regime under the Labour Code.",
    },
    leave: {
      annual: "28 calendar days",
      sick: "Paid via state social insurance after first days",
      parental: "126 days maternity; partially paid childcare leave",
      holidays: "12 public holidays",
    },
    tax: "Flat personal income tax 12%. Social and medical contributions apply.",
    visa: "Work permit and long-stay visa required for non-residents.",
  },
  {
    slug: "serbia",
    name: "Serbia",
    flag: "🇷🇸",
    region: "Southeast Europe",
    capital: "Belgrade",
    currency: "RSD",
    language: "Serbian",
    payrollCycle: "Monthly",
    workingHours: "40 hrs / week",
    tagline: "A growing tech hub in the heart of the Balkans.",
    employment: {
      contracts: "Written contract in Serbian; fixed-term capped at 24 months.",
      probation: "Up to 6 months.",
      notice: "8–30 days statutory minimum.",
      termination: "Justified cause required; severance for redundancy.",
    },
    leave: {
      annual: "Minimum 20 working days",
      sick: "Paid; rate depends on cause and duration",
      parental: "Up to 365 days combined maternity and childcare",
      holidays: "11 public holidays",
    },
    tax: "Personal income tax 10%. Pension, health and unemployment contributions apply.",
    visa: "Unified residence and work permit for foreign nationals.",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    capital: "Riyadh",
    currency: "SAR",
    language: "Arabic",
    payrollCycle: "Monthly",
    workingHours: "48 hrs / week (40 in Ramadan for Muslims)",
    tagline: "Hire and sponsor talent under Vision 2030.",
    employment: {
      contracts: "Bilingual Arabic/English contracts; Arabic prevails.",
      probation: "Up to 90 days, extendable by agreement to 180.",
      notice: "30–60 days based on pay frequency.",
      termination: "Governed by the Saudi Labour Law; end-of-service gratuity payable.",
    },
    leave: {
      annual: "21 days, rising to 30 after 5 years",
      sick: "Up to 120 days at varying pay",
      parental: "10 weeks maternity; 3 days paternity",
      holidays: "Eid Al-Fitr, Eid Al-Adha, National Day, Founding Day",
    },
    tax: "No personal income tax. GOSI social insurance contributions apply.",
    visa: "Work visa + Iqama residence permit; Saudization (Nitaqat) quotas apply.",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    capital: "Abu Dhabi",
    currency: "AED",
    language: "Arabic",
    payrollCycle: "Monthly via WPS",
    workingHours: "48 hrs / week",
    tagline: "Onboard talent across mainland and free zones with confidence.",
    employment: {
      contracts: "MOHRE-registered fixed-term contracts (up to 3 years, renewable).",
      probation: "Up to 6 months.",
      notice: "30–90 days.",
      termination: "Cause-based or by mutual agreement; end-of-service gratuity payable.",
    },
    leave: {
      annual: "30 calendar days after 1 year",
      sick: "Up to 90 days at varying pay",
      parental: "60 days maternity; 5 days parental",
      holidays: "Approx. 13–14 public holidays",
    },
    tax: "No personal income tax. 9% corporate tax above thresholds.",
    visa: "Standard work permit + residence visa; Golden and Green visas for select talent.",
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    flag: "🇰🇼",
    region: "Middle East",
    capital: "Kuwait City",
    currency: "KWD",
    language: "Arabic",
    payrollCycle: "Monthly",
    workingHours: "48 hrs / week",
    tagline: "Reliable employment of record across the Gulf.",
    employment: {
      contracts: "Bilingual contracts; Arabic prevails. Fixed and indefinite both used.",
      probation: "Up to 100 working days.",
      notice: "3 months for monthly-paid employees.",
      termination: "End-of-service indemnity payable on termination.",
    },
    leave: {
      annual: "30 days after 9 months of service",
      sick: "Up to 75 days at sliding pay",
      parental: "70 days maternity",
      holidays: "Approx. 10 public holidays",
    },
    tax: "No personal income tax. Social security for Kuwaiti nationals.",
    visa: "Article 18 (private sector) work visa with sponsoring entity.",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "Southeast Asia",
    capital: "Kuala Lumpur",
    currency: "MYR",
    language: "Malay",
    payrollCycle: "Monthly",
    workingHours: "45 hrs / week",
    tagline: "Hire across Peninsular and East Malaysia, fully compliant.",
    employment: {
      contracts: "Written contract recommended; Employment Act sets minimums.",
      probation: "Typically 3–6 months.",
      notice: "4–8 weeks based on tenure.",
      termination: "Just cause or excuse required; Industrial Court oversight.",
    },
    leave: {
      annual: "8–16 days based on service",
      sick: "14–22 days based on service",
      parental: "98 days maternity; 7 days paternity",
      holidays: "11+ public holidays (varies by state)",
    },
    tax: "Progressive personal income tax 0–30%. EPF and SOCSO contributions apply.",
    visa: "Employment Pass categories (I/II/III) and Professional Visit Pass.",
  },
];

export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);