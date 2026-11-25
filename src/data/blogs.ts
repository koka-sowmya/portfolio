export interface Blog {
  slug: string; title: string; summary: string; abstract: string; topics: string[];
  authors: string[]; affiliation: string; pdf: string; kind: string;
  models: { name: string; auc: string; accuracy: string; f1: string }[];
}
export const blogs: Blog[] = [{
  slug: 'research-paper',
  kind: 'Research paper',
  title: 'Can pre-treatment clinical features predict the risk of biochemical recurrence (BCR) in prostate cancer patients?',
  summary: 'A study of 179 patients using Kaplan–Meier survival analysis and five machine learning models to predict recurrence from pre-treatment clinical features.',
  abstract: 'Biochemical recurrence (BCR) after treatment for prostate cancer remains a key clinical challenge, and improving risk prediction is essential for guiding management. In this study, we evaluated whether pre-treatment clinicopathological features could predict recurrence in 179 patients. Baseline characteristics, including Gleason grade and T stage, were analyzed, and recurrence-free survival was estimated using Kaplan–Meier methods. To extend beyond traditional prognostic assessment, we applied machine learning models to classify recurrence risk using an independent train-test design. Logistic regression and support vector machine models achieved the strongest predictive performance, while tree-based models showed moderate discrimination. Our findings confirm the prognostic importance of Gleason grade groups and demonstrate that standard clinical data, when paired with machine learning approaches, can provide an accurate prediction of BCR. Logistic regression and SVM emerged as the most reliable models, suggesting that even relatively simple algorithms can achieve clinically useful discrimination. These results highlight the potential for integrating computational tools into prostate cancer risk stratification while underscoring the need for future studies that combine clinical features with molecular and genomic biomarkers to further enhance individualized prediction.',
  topics: ['Prostate Cancer', 'Gleason Grade Group', 'Biochemical Recurrence', 'Clinicopathological Data', 'Kaplan–Meier Survival Analysis', 'Machine Learning', 'Predictive Modeling'],
  authors: ['Koka Sowmya', 'Oussama Batouche'],
  affiliation: 'Lumiere Research Scholar Program',
  pdf: '/documents/research-paper.pdf',
  models: [
    { name: 'Logistic Regression', auc: '0.836', accuracy: '0.852', f1: '0.600' },
    { name: 'SVM', auc: '0.832', accuracy: '0.815', f1: '0.440' },
    { name: 'Random Forest', auc: '0.781', accuracy: '0.815', f1: '0.545' },
    { name: 'XGBoost', auc: '0.742', accuracy: '0.852', f1: '0.600' },
    { name: 'Decision Tree', auc: '0.673', accuracy: '0.815', f1: '0.500' },
  ],
}];
