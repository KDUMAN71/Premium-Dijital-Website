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
    score: number;
    pageSpeed: number;
    mobileScore: number;
    technicalErrors: number;
    findings: string[];
    recommendations: string[];
    gain: string;
  };

  // PPC
  ppc: {
    score: number;
    competitorSpend: string;
    qualityScore: number;
    findings: string[];
    recommendations: string[];
    gain: string;
  };

  // Sosyal Medya
  social: {
    score: number;
    engagementRate: string;
    consistencyScore: number;
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
