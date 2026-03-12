export type CaseStatus =
  | 'new_alert'
  | 'under_review'
  | 'need_more_evidence'
  | 'ready_for_supervisor_review'
  | 'closed_false_positive'
  | 'ready_for_reporting';

export interface AmlCase {
  id: string;
  alertIds: string[];
  status: CaseStatus;
  subjectAccountId: string;
  subjectType: 'individual' | 'corporate';
  summary: string;
  keyFindings: string[];
  suggestedTypologies: string[];
  reportingUrgency: 'normal' | 'priority' | 'immediate';
  reportingDeadline?: string;
  analystNotes: string;
  lastUpdated: string;
}

export const amlCases: AmlCase[] = [
  {
    id: 'CASE-001',
    alertIds: ['ALT-0001', 'ALT-0002'],
    status: 'ready_for_supervisor_review',
    subjectAccountId: 'ACC-021',
    subjectType: 'individual',
    summary: 'High-frequency cash deposits with a confirmed fan-out distribution pattern.',
    keyFindings: [
      'A single cash transaction of CNY 68,000 exceeds the PBOC large cash threshold in AML Law Article 31.',
      'A second cash transaction of CNY 47,000 on the same day indicates threshold structuring.',
      'The account recorded 18 cash events in the last 30 days, consistent with smurfing behavior.',
      'Funds were distributed to multiple counterparties within 48 hours, confirming a fan-out pattern.',
      'The DGraph-Fin fraud score for the subject account is 82/100.',
    ],
    suggestedTypologies: ['smurfing', 'fan_out'],
    reportingUrgency: 'priority',
    reportingDeadline: '2024-11-08',
    analystNotes: 'Supervisor review pending before STR escalation.',
    lastUpdated: '2024-11-04T10:00:00Z',
  },
  {
    id: 'CASE-002',
    alertIds: ['ALT-0003'],
    status: 'under_review',
    subjectAccountId: 'ACC-007',
    subjectType: 'corporate',
    summary: 'Large corporate transfer to an individual beneficiary in a high-risk jurisdiction.',
    keyFindings: [
      'A CNY 3.2 million transfer exceeded the PBOC large transfer threshold.',
      'The receiving jurisdiction is on a FATF high-risk or monitored list.',
      'The corporate-to-individual transfer pattern is atypical for the stated business purpose.',
      'Historical transaction frequency is low, making the sudden transfer anomalous.',
    ],
    suggestedTypologies: ['layering', 'high_risk_jurisdiction'],
    reportingUrgency: 'priority',
    reportingDeadline: '2024-11-10',
    analystNotes: 'Pending supporting invoices and beneficiary verification.',
    lastUpdated: '2024-11-06T09:00:00Z',
  },
  {
    id: 'CASE-003',
    alertIds: ['ALT-0004', 'ALT-0007'],
    status: 'need_more_evidence',
    subjectAccountId: 'ACC-015',
    subjectType: 'individual',
    summary: 'Possible structuring through repeated cash transfers into a related suspicious network.',
    keyFindings: [
      'A CNY 49,500 cash transaction sits just below the CNY 50,000 reporting threshold.',
      'A related feeder account sent another cash transfer into the same network on 2024-11-11.',
      'The counterparty ACC-021 is already under active investigation in CASE-001.',
      'Additional multi-day account history is required to confirm intentional structuring.',
    ],
    suggestedTypologies: ['smurfing', 'fan_in'],
    reportingUrgency: 'normal',
    analystNotes: 'Obtain three-month transaction history before filing recommendation.',
    lastUpdated: '2024-11-11T15:00:00Z',
  },
  {
    id: 'CASE-004',
    alertIds: ['ALT-0005', 'ALT-0008'],
    status: 'ready_for_reporting',
    subjectAccountId: 'ACC-003',
    subjectType: 'individual',
    summary: 'Cross-border rapid-movement pattern with follow-on transfers and elevated routing risk.',
    keyFindings: [
      'The original remittance moved funds to a beneficiary in a high-risk jurisdiction.',
      'Follow-on movement on 2024-11-12 indicates rapid redistribution after receipt.',
      'No credible commercial rationale has been documented for the movement chain.',
      'The combined pattern aligns with layering and rapid movement typologies.',
    ],
    suggestedTypologies: ['layering', 'rapid_movement'],
    reportingUrgency: 'immediate',
    reportingDeadline: '2024-11-14',
    analystNotes: 'Case package is complete and ready for STR drafting.',
    lastUpdated: '2024-11-12T09:15:00Z',
  },
  {
    id: 'CASE-005',
    alertIds: ['ALT-0006', 'ALT-0009'],
    status: 'closed_false_positive',
    subjectAccountId: 'ACC-042',
    subjectType: 'corporate',
    summary: 'Triggered thresholds were reviewed and closed as routine commercial activity.',
    keyFindings: [
      'The large corporate transfer was validated against board-approved settlement documentation.',
      'Supporting financial statements confirmed a legitimate inter-company payment flow.',
      'The low-value POS alert did not reveal any suspicious network expansion after review.',
      'No additional escalation is required at this stage.',
    ],
    suggestedTypologies: [],
    reportingUrgency: 'normal',
    analystNotes: 'False positive closure approved. Evidence archived under quarterly settlement file.',
    lastUpdated: '2024-11-13T16:30:00Z',
  },
  {
    id: 'CASE-006',
    alertIds: ['ALT-0010'],
    status: 'new_alert',
    subjectAccountId: 'ACC-120',
    subjectType: 'individual',
    summary: 'New low-confidence transfer anomaly awaiting analyst triage.',
    keyFindings: [
      'A new alert was generated from an atypical transfer to a corporate recipient.',
      'The current risk score remains low and no corroborating alerts have been linked yet.',
      'The case is queued for first-level analyst review.',
    ],
    suggestedTypologies: ['cycle'],
    reportingUrgency: 'normal',
    analystNotes: '',
    lastUpdated: '2024-11-14T16:05:00Z',
  },
];
