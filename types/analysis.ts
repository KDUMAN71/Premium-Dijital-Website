export interface AnalysisData {
  // Meta
  reportId: string;
  reportDate: string;
  preparedBy: string;

  // Müşteri
  clientName: string;
  clientUrl: string;
  sector: string;
  segment: string;
  budget?: string;
  adAccess?: string[];
  socialPlatforms?: string[];
  socialHandles?: string;

  // Genel Skor
  overallScore: number;
  scoreLabel: string;

  // Yönetici Özeti
  executiveSummary: string;
  topIssues: Array<{
    issue: string;
    risk: string;
    estimatedLoss: string;
  }>;

  // SEO & Web
  seo: {
    score: number | null;
    pageSpeed: number | null;
    mobileScore: number | null;
    technicalErrors: number;
    findings: string[];
    recommendations: string[];
    gain: string;
  };

  // PPC
  ppc: {
    score: number | null;
    competitorSpend: string;
    qualityScore: number | null;
    findings: string[];
    recommendations: string[];
    gain: string;
  };

  // Sosyal Medya
  social: {
    score: number | null;
    engagementRate: string;
    consistencyScore: number | null;
    findings: string[];
    recommendations: string[];
    gain: string;
  };

  // Dijital Operasyon
  operations: {
    score: number;
    techStack: string[];
    automationGaps: string[];
    findings: string[];
    recommendations: string[];
    gain: string;
  };

  // Rakip analizi
  competitors?: Array<{
    domain: string;
    competitionLevel: "high" | "medium" | "low";
    paidKeywords: number;
    monthlySpend?: string;
    paidSearchTraffic?: number;
  }>;

  // Bütçe senaryoları
  budgetScenarios?: Array<{
    label: string;
    dailyBudget: string;
    monthlyBudget: string;
    clicks: number;
    impressions: string;
    ctr: string;
    avgCpc: string;
    avgPosition: string;
  }>;

  // Örnek anahtar kelimeler
  sampleKeywords?: Array<{
    keyword: string;
    matchType: string;
    maxCpc: string;
    clicks: number;
    impressions: number;
    cost: string;
    ctr: string;
    avgCpc: string;
  }>;

  // Coğrafi hedefleme
  geoTargets?: Array<{
    country: string;
    percentage: number;
    color: string;
  }>;

  // Gerçek zamanlı analiz verileri
  ga4Data?: {
    sessions: number;
    bounceRate: number;
    avgSessionDuration: number;
    topSources: Array<{ source: string; sessions: number }>;
  };

  searchConsoleData?: {
    totalClicks: number;
    totalImpressions: number;
    avgCtr: number;
    avgPosition: number;
    topKeywords: Array<{
      keyword: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
  };

  // Skorlama motoru çıktıları
  generalScore?: number;
  sectorBenchmark?: {
    seo: number;
    ppc: number;
    social: number;
    operations: number;
    overall: number;
  };
  riskMatrix?: Array<{
    category: string;
    score: number;
    benchmarkScore: number;
    gap: number;
    priority: "HIGH" | "MEDIUM" | "LOW";
  }>;

  // Sadece iç rapor için
  internal?: {
    rawData: Record<string, unknown>;
    actionItems: Array<{
      priority: "HIGH" | "MEDIUM" | "LOW";
      task: string;
      owner: string;
      deadline: string;
    }>;
    salesNotes: string;
    estimatedBudget: string;
  };
}
