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
    "id": "CASE-0001",
    "alertIds": [
      "ALT-0001"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0001",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0001.",
    "keyFindings": [
      "Primary alert ALT-0001 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0002",
    "alertIds": [
      "ALT-0002"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0003",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0003.",
    "keyFindings": [
      "Primary alert ALT-0002 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0003",
    "alertIds": [
      "ALT-0003"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0005",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0005.",
    "keyFindings": [
      "Primary alert ALT-0003 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0004",
    "alertIds": [
      "ALT-0004",
      "ALT-0170"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0007",
    "subjectType": "corporate",
    "summary": "Clustered case from 2 linked alerts around ACC-0007.",
    "keyFindings": [
      "Primary alert ALT-0004 carries risk score 62/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0005",
    "alertIds": [
      "ALT-0005"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0009",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0009.",
    "keyFindings": [
      "Primary alert ALT-0005 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0006",
    "alertIds": [
      "ALT-0006"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0011",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0011.",
    "keyFindings": [
      "Primary alert ALT-0006 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0007",
    "alertIds": [
      "ALT-0091",
      "ALT-0146",
      "ALT-0176",
      "ALT-0415",
      "ALT-0072",
      "ALT-0141",
      "ALT-0148",
      "ALT-0171",
      "ALT-0182",
      "ALT-0309",
      "ALT-0412",
      "ALT-0483",
      "ALT-0460",
      "ALT-0010",
      "ALT-0066",
      "ALT-0235",
      "ALT-0428",
      "ALT-0007",
      "ALT-0029",
      "ALT-0226",
      "ALT-0288",
      "ALT-0304",
      "ALT-0366",
      "ALT-0413",
      "ALT-0458",
      "ALT-0468",
      "ALT-0495",
      "ALT-0496"
    ],
    "status": "ready_for_reporting",
    "subjectAccountId": "ACC-0013",
    "subjectType": "individual",
    "summary": "Clustered case from 28 linked alerts around ACC-0013.",
    "keyFindings": [
      "Primary alert ALT-0091 carries risk score 97/100.",
      "Case spans 29 connected accounts.",
      "Triggered rules: FREQUENT_CASH, HIGH_RISK_COUNTRY, PBOC_LARGE_CASH, PBOC_LARGE_TRANSFER, RAPID_MOVEMENT."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "immediate",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0008",
    "alertIds": [
      "ALT-0008"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0015",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0015.",
    "keyFindings": [
      "Primary alert ALT-0008 carries risk score 74/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0009",
    "alertIds": [
      "ALT-0009",
      "ALT-0318",
      "ALT-0400"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0017",
    "subjectType": "individual",
    "summary": "Clustered case from 3 linked alerts around ACC-0017.",
    "keyFindings": [
      "Primary alert ALT-0009 carries risk score 50/100.",
      "Case spans 4 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0010",
    "alertIds": [
      "ALT-0011",
      "ALT-0012"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0020",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0020.",
    "keyFindings": [
      "Primary alert ALT-0011 carries risk score 75/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0011",
    "alertIds": [
      "ALT-0013"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0023",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0023.",
    "keyFindings": [
      "Primary alert ALT-0013 carries risk score 74/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0012",
    "alertIds": [
      "ALT-0014"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0025",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0025.",
    "keyFindings": [
      "Primary alert ALT-0014 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0013",
    "alertIds": [
      "ALT-0015"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0027",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0027.",
    "keyFindings": [
      "Primary alert ALT-0015 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0014",
    "alertIds": [
      "ALT-0016"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0029",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0029.",
    "keyFindings": [
      "Primary alert ALT-0016 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0015",
    "alertIds": [
      "ALT-0017"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0031",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0031.",
    "keyFindings": [
      "Primary alert ALT-0017 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0016",
    "alertIds": [
      "ALT-0018"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0033",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0033.",
    "keyFindings": [
      "Primary alert ALT-0018 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0017",
    "alertIds": [
      "ALT-0019"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0035",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0035.",
    "keyFindings": [
      "Primary alert ALT-0019 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0018",
    "alertIds": [
      "ALT-0020"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0037",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0037.",
    "keyFindings": [
      "Primary alert ALT-0020 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0019",
    "alertIds": [
      "ALT-0021"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0039",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0039.",
    "keyFindings": [
      "Primary alert ALT-0021 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0020",
    "alertIds": [
      "ALT-0022"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0041",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0041.",
    "keyFindings": [
      "Primary alert ALT-0022 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0021",
    "alertIds": [
      "ALT-0023"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0043",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0043.",
    "keyFindings": [
      "Primary alert ALT-0023 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0022",
    "alertIds": [
      "ALT-0024"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0045",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0045.",
    "keyFindings": [
      "Primary alert ALT-0024 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0023",
    "alertIds": [
      "ALT-0025"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0047",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0047.",
    "keyFindings": [
      "Primary alert ALT-0025 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0024",
    "alertIds": [
      "ALT-0026"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0049",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0049.",
    "keyFindings": [
      "Primary alert ALT-0026 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0025",
    "alertIds": [
      "ALT-0027"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0051",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0051.",
    "keyFindings": [
      "Primary alert ALT-0027 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0026",
    "alertIds": [
      "ALT-0028"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0053",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0053.",
    "keyFindings": [
      "Primary alert ALT-0028 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0027",
    "alertIds": [
      "ALT-0101",
      "ALT-0030"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0056",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0056.",
    "keyFindings": [
      "Primary alert ALT-0101 carries risk score 63/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0028",
    "alertIds": [
      "ALT-0031"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0058",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0058.",
    "keyFindings": [
      "Primary alert ALT-0031 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0029",
    "alertIds": [
      "ALT-0032"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0060",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0060.",
    "keyFindings": [
      "Primary alert ALT-0032 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0030",
    "alertIds": [
      "ALT-0033"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0062",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0062.",
    "keyFindings": [
      "Primary alert ALT-0033 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0031",
    "alertIds": [
      "ALT-0034"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0064",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0064.",
    "keyFindings": [
      "Primary alert ALT-0034 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0032",
    "alertIds": [
      "ALT-0035"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0065",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0065.",
    "keyFindings": [
      "Primary alert ALT-0035 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0033",
    "alertIds": [
      "ALT-0036",
      "ALT-0151",
      "ALT-0292",
      "ALT-0390"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0067",
    "subjectType": "corporate",
    "summary": "Clustered case from 4 linked alerts around ACC-0067.",
    "keyFindings": [
      "Primary alert ALT-0036 carries risk score 52/100.",
      "Case spans 5 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0034",
    "alertIds": [
      "ALT-0037"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0069",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0069.",
    "keyFindings": [
      "Primary alert ALT-0037 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0035",
    "alertIds": [
      "ALT-0299",
      "ALT-0431",
      "ALT-0437",
      "ALT-0104",
      "ALT-0241",
      "ALT-0267",
      "ALT-0291",
      "ALT-0038",
      "ALT-0099",
      "ALT-0114",
      "ALT-0213",
      "ALT-0247"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0071",
    "subjectType": "individual",
    "summary": "Clustered case from 12 linked alerts around ACC-0071.",
    "keyFindings": [
      "Primary alert ALT-0299 carries risk score 67/100.",
      "Case spans 13 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0036",
    "alertIds": [
      "ALT-0039"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0073",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0073.",
    "keyFindings": [
      "Primary alert ALT-0039 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0037",
    "alertIds": [
      "ALT-0040",
      "ALT-0459"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0075",
    "subjectType": "corporate",
    "summary": "Clustered case from 2 linked alerts around ACC-0075.",
    "keyFindings": [
      "Primary alert ALT-0040 carries risk score 50/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0038",
    "alertIds": [
      "ALT-0041"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0077",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0077.",
    "keyFindings": [
      "Primary alert ALT-0041 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0039",
    "alertIds": [
      "ALT-0042"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0079",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0079.",
    "keyFindings": [
      "Primary alert ALT-0042 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0040",
    "alertIds": [
      "ALT-0043"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0081",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0081.",
    "keyFindings": [
      "Primary alert ALT-0043 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0041",
    "alertIds": [
      "ALT-0044"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0083",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0083.",
    "keyFindings": [
      "Primary alert ALT-0044 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0042",
    "alertIds": [
      "ALT-0045"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0085",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0085.",
    "keyFindings": [
      "Primary alert ALT-0045 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0043",
    "alertIds": [
      "ALT-0046"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0086",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0086.",
    "keyFindings": [
      "Primary alert ALT-0046 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0044",
    "alertIds": [
      "ALT-0047"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0088",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0088.",
    "keyFindings": [
      "Primary alert ALT-0047 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0045",
    "alertIds": [
      "ALT-0048"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0090",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0090.",
    "keyFindings": [
      "Primary alert ALT-0048 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0046",
    "alertIds": [
      "ALT-0049"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0092",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0092.",
    "keyFindings": [
      "Primary alert ALT-0049 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0047",
    "alertIds": [
      "ALT-0050"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0094",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0094.",
    "keyFindings": [
      "Primary alert ALT-0050 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0048",
    "alertIds": [
      "ALT-0051"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0096",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0096.",
    "keyFindings": [
      "Primary alert ALT-0051 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0049",
    "alertIds": [
      "ALT-0052"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0098",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0098.",
    "keyFindings": [
      "Primary alert ALT-0052 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0050",
    "alertIds": [
      "ALT-0053"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0100",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0100.",
    "keyFindings": [
      "Primary alert ALT-0053 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0051",
    "alertIds": [
      "ALT-0054"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0102",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0102.",
    "keyFindings": [
      "Primary alert ALT-0054 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0052",
    "alertIds": [
      "ALT-0055"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0104",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0104.",
    "keyFindings": [
      "Primary alert ALT-0055 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0053",
    "alertIds": [
      "ALT-0056",
      "ALT-0110"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0106",
    "subjectType": "corporate",
    "summary": "Clustered case from 2 linked alerts around ACC-0106.",
    "keyFindings": [
      "Primary alert ALT-0056 carries risk score 63/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0054",
    "alertIds": [
      "ALT-0057"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0108",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0108.",
    "keyFindings": [
      "Primary alert ALT-0057 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0055",
    "alertIds": [
      "ALT-0058"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0110",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0110.",
    "keyFindings": [
      "Primary alert ALT-0058 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0056",
    "alertIds": [
      "ALT-0059"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0112",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0112.",
    "keyFindings": [
      "Primary alert ALT-0059 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0057",
    "alertIds": [
      "ALT-0060"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0114",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0114.",
    "keyFindings": [
      "Primary alert ALT-0060 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0058",
    "alertIds": [
      "ALT-0061"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0116",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0116.",
    "keyFindings": [
      "Primary alert ALT-0061 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0059",
    "alertIds": [
      "ALT-0062"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0118",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0118.",
    "keyFindings": [
      "Primary alert ALT-0062 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0060",
    "alertIds": [
      "ALT-0063",
      "ALT-0185"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0120",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0120.",
    "keyFindings": [
      "Primary alert ALT-0063 carries risk score 50/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0061",
    "alertIds": [
      "ALT-0064"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0122",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0122.",
    "keyFindings": [
      "Primary alert ALT-0064 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0062",
    "alertIds": [
      "ALT-0065"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0124",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0124.",
    "keyFindings": [
      "Primary alert ALT-0065 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0063",
    "alertIds": [
      "ALT-0067"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0127",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0127.",
    "keyFindings": [
      "Primary alert ALT-0067 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0064",
    "alertIds": [
      "ALT-0068"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0129",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0129.",
    "keyFindings": [
      "Primary alert ALT-0068 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0065",
    "alertIds": [
      "ALT-0069"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0131",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0131.",
    "keyFindings": [
      "Primary alert ALT-0069 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0066",
    "alertIds": [
      "ALT-0070"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0133",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0133.",
    "keyFindings": [
      "Primary alert ALT-0070 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0067",
    "alertIds": [
      "ALT-0071"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0135",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0135.",
    "keyFindings": [
      "Primary alert ALT-0071 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0068",
    "alertIds": [
      "ALT-0073"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0138",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0138.",
    "keyFindings": [
      "Primary alert ALT-0073 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0069",
    "alertIds": [
      "ALT-0313",
      "ALT-0074"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0140",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0140.",
    "keyFindings": [
      "Primary alert ALT-0313 carries risk score 75/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0070",
    "alertIds": [
      "ALT-0075"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0142",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0142.",
    "keyFindings": [
      "Primary alert ALT-0075 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0071",
    "alertIds": [
      "ALT-0076"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0144",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0144.",
    "keyFindings": [
      "Primary alert ALT-0076 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0072",
    "alertIds": [
      "ALT-0077"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0146",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0146.",
    "keyFindings": [
      "Primary alert ALT-0077 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0073",
    "alertIds": [
      "ALT-0078"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0148",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0148.",
    "keyFindings": [
      "Primary alert ALT-0078 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0074",
    "alertIds": [
      "ALT-0079"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0150",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0150.",
    "keyFindings": [
      "Primary alert ALT-0079 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0075",
    "alertIds": [
      "ALT-0080"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0152",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0152.",
    "keyFindings": [
      "Primary alert ALT-0080 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0076",
    "alertIds": [
      "ALT-0081"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0154",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0154.",
    "keyFindings": [
      "Primary alert ALT-0081 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0077",
    "alertIds": [
      "ALT-0082"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0156",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0156.",
    "keyFindings": [
      "Primary alert ALT-0082 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0078",
    "alertIds": [
      "ALT-0083"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0158",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0158.",
    "keyFindings": [
      "Primary alert ALT-0083 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0079",
    "alertIds": [
      "ALT-0084"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0160",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0160.",
    "keyFindings": [
      "Primary alert ALT-0084 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0080",
    "alertIds": [
      "ALT-0293",
      "ALT-0085"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0162",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0162.",
    "keyFindings": [
      "Primary alert ALT-0293 carries risk score 63/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0081",
    "alertIds": [
      "ALT-0086"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0164",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0164.",
    "keyFindings": [
      "Primary alert ALT-0086 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0082",
    "alertIds": [
      "ALT-0087"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0166",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0166.",
    "keyFindings": [
      "Primary alert ALT-0087 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0083",
    "alertIds": [
      "ALT-0088"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0168",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0168.",
    "keyFindings": [
      "Primary alert ALT-0088 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0084",
    "alertIds": [
      "ALT-0089",
      "ALT-0300"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0170",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0170.",
    "keyFindings": [
      "Primary alert ALT-0089 carries risk score 75/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0085",
    "alertIds": [
      "ALT-0090",
      "ALT-0371"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0172",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0172.",
    "keyFindings": [
      "Primary alert ALT-0090 carries risk score 63/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0086",
    "alertIds": [
      "ALT-0092"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0175",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0175.",
    "keyFindings": [
      "Primary alert ALT-0092 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0087",
    "alertIds": [
      "ALT-0093"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0177",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0177.",
    "keyFindings": [
      "Primary alert ALT-0093 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0088",
    "alertIds": [
      "ALT-0094"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0179",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0179.",
    "keyFindings": [
      "Primary alert ALT-0094 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0089",
    "alertIds": [
      "ALT-0095",
      "ALT-0388"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0180",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0180.",
    "keyFindings": [
      "Primary alert ALT-0095 carries risk score 62/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0090",
    "alertIds": [
      "ALT-0096"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0182",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0182.",
    "keyFindings": [
      "Primary alert ALT-0096 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0091",
    "alertIds": [
      "ALT-0097"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0184",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0184.",
    "keyFindings": [
      "Primary alert ALT-0097 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0092",
    "alertIds": [
      "ALT-0098"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0186",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0186.",
    "keyFindings": [
      "Primary alert ALT-0098 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0093",
    "alertIds": [
      "ALT-0100"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0189",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0189.",
    "keyFindings": [
      "Primary alert ALT-0100 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0094",
    "alertIds": [
      "ALT-0102"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0191",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0191.",
    "keyFindings": [
      "Primary alert ALT-0102 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0095",
    "alertIds": [
      "ALT-0103"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0193",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0193.",
    "keyFindings": [
      "Primary alert ALT-0103 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0096",
    "alertIds": [
      "ALT-0105"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0196",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0196.",
    "keyFindings": [
      "Primary alert ALT-0105 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0097",
    "alertIds": [
      "ALT-0106"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0198",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0198.",
    "keyFindings": [
      "Primary alert ALT-0106 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0098",
    "alertIds": [
      "ALT-0107"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0200",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0200.",
    "keyFindings": [
      "Primary alert ALT-0107 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0099",
    "alertIds": [
      "ALT-0498",
      "ALT-0108"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0895",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0895.",
    "keyFindings": [
      "Primary alert ALT-0498 carries risk score 62/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0100",
    "alertIds": [
      "ALT-0109"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0204",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0204.",
    "keyFindings": [
      "Primary alert ALT-0109 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0101",
    "alertIds": [
      "ALT-0111"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0206",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0206.",
    "keyFindings": [
      "Primary alert ALT-0111 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0102",
    "alertIds": [
      "ALT-0112"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0208",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0208.",
    "keyFindings": [
      "Primary alert ALT-0112 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0103",
    "alertIds": [
      "ALT-0113"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0210",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0210.",
    "keyFindings": [
      "Primary alert ALT-0113 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0104",
    "alertIds": [
      "ALT-0115"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0213",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0213.",
    "keyFindings": [
      "Primary alert ALT-0115 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0105",
    "alertIds": [
      "ALT-0116"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0215",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0215.",
    "keyFindings": [
      "Primary alert ALT-0116 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0106",
    "alertIds": [
      "ALT-0117"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0217",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0217.",
    "keyFindings": [
      "Primary alert ALT-0117 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0107",
    "alertIds": [
      "ALT-0118"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0219",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0219.",
    "keyFindings": [
      "Primary alert ALT-0118 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0108",
    "alertIds": [
      "ALT-0119"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0221",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0221.",
    "keyFindings": [
      "Primary alert ALT-0119 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0109",
    "alertIds": [
      "ALT-0120"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0223",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0223.",
    "keyFindings": [
      "Primary alert ALT-0120 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0110",
    "alertIds": [
      "ALT-0121"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0225",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0225.",
    "keyFindings": [
      "Primary alert ALT-0121 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0111",
    "alertIds": [
      "ALT-0122"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0227",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0227.",
    "keyFindings": [
      "Primary alert ALT-0122 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0112",
    "alertIds": [
      "ALT-0123"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0229",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0229.",
    "keyFindings": [
      "Primary alert ALT-0123 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0113",
    "alertIds": [
      "ALT-0124"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0231",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0231.",
    "keyFindings": [
      "Primary alert ALT-0124 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0114",
    "alertIds": [
      "ALT-0125"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0233",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0233.",
    "keyFindings": [
      "Primary alert ALT-0125 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0115",
    "alertIds": [
      "ALT-0126"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0235",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0235.",
    "keyFindings": [
      "Primary alert ALT-0126 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0116",
    "alertIds": [
      "ALT-0127"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0237",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0237.",
    "keyFindings": [
      "Primary alert ALT-0127 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0117",
    "alertIds": [
      "ALT-0128"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0239",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0239.",
    "keyFindings": [
      "Primary alert ALT-0128 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0118",
    "alertIds": [
      "ALT-0129"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0241",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0241.",
    "keyFindings": [
      "Primary alert ALT-0129 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0119",
    "alertIds": [
      "ALT-0130"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0243",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0243.",
    "keyFindings": [
      "Primary alert ALT-0130 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0120",
    "alertIds": [
      "ALT-0131"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0245",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0245.",
    "keyFindings": [
      "Primary alert ALT-0131 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0121",
    "alertIds": [
      "ALT-0132"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0246",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0246.",
    "keyFindings": [
      "Primary alert ALT-0132 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0122",
    "alertIds": [
      "ALT-0133"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0248",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0248.",
    "keyFindings": [
      "Primary alert ALT-0133 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0123",
    "alertIds": [
      "ALT-0134"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0250",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0250.",
    "keyFindings": [
      "Primary alert ALT-0134 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0124",
    "alertIds": [
      "ALT-0135"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0252",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0252.",
    "keyFindings": [
      "Primary alert ALT-0135 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0125",
    "alertIds": [
      "ALT-0416",
      "ALT-0136"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0254",
    "subjectType": "corporate",
    "summary": "Clustered case from 2 linked alerts around ACC-0254.",
    "keyFindings": [
      "Primary alert ALT-0416 carries risk score 63/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0126",
    "alertIds": [
      "ALT-0137"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0256",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0256.",
    "keyFindings": [
      "Primary alert ALT-0137 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0127",
    "alertIds": [
      "ALT-0138",
      "ALT-0330"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0258",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0258.",
    "keyFindings": [
      "Primary alert ALT-0138 carries risk score 51/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0128",
    "alertIds": [
      "ALT-0139"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0260",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0260.",
    "keyFindings": [
      "Primary alert ALT-0139 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0129",
    "alertIds": [
      "ALT-0140"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0262",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0262.",
    "keyFindings": [
      "Primary alert ALT-0140 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0130",
    "alertIds": [
      "ALT-0142"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0265",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0265.",
    "keyFindings": [
      "Primary alert ALT-0142 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0131",
    "alertIds": [
      "ALT-0143"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0267",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0267.",
    "keyFindings": [
      "Primary alert ALT-0143 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0132",
    "alertIds": [
      "ALT-0144"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0268",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0268.",
    "keyFindings": [
      "Primary alert ALT-0144 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0133",
    "alertIds": [
      "ALT-0145"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0270",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0270.",
    "keyFindings": [
      "Primary alert ALT-0145 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0134",
    "alertIds": [
      "ALT-0147"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0273",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0273.",
    "keyFindings": [
      "Primary alert ALT-0147 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0135",
    "alertIds": [
      "ALT-0149"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0276",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0276.",
    "keyFindings": [
      "Primary alert ALT-0149 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0136",
    "alertIds": [
      "ALT-0150"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0278",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0278.",
    "keyFindings": [
      "Primary alert ALT-0150 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0137",
    "alertIds": [
      "ALT-0152"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0281",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0281.",
    "keyFindings": [
      "Primary alert ALT-0152 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0138",
    "alertIds": [
      "ALT-0153"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0283",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0283.",
    "keyFindings": [
      "Primary alert ALT-0153 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0139",
    "alertIds": [
      "ALT-0154"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0285",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0285.",
    "keyFindings": [
      "Primary alert ALT-0154 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0140",
    "alertIds": [
      "ALT-0155",
      "ALT-0331"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0287",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0287.",
    "keyFindings": [
      "Primary alert ALT-0155 carries risk score 63/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0141",
    "alertIds": [
      "ALT-0156"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0289",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0289.",
    "keyFindings": [
      "Primary alert ALT-0156 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0142",
    "alertIds": [
      "ALT-0157"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0291",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0291.",
    "keyFindings": [
      "Primary alert ALT-0157 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0143",
    "alertIds": [
      "ALT-0158"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0292",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0292.",
    "keyFindings": [
      "Primary alert ALT-0158 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0144",
    "alertIds": [
      "ALT-0159"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0294",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0294.",
    "keyFindings": [
      "Primary alert ALT-0159 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0145",
    "alertIds": [
      "ALT-0160"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0296",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0296.",
    "keyFindings": [
      "Primary alert ALT-0160 carries risk score 74/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0146",
    "alertIds": [
      "ALT-0161"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0298",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0298.",
    "keyFindings": [
      "Primary alert ALT-0161 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0147",
    "alertIds": [
      "ALT-0162",
      "ALT-0410"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0299",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0299.",
    "keyFindings": [
      "Primary alert ALT-0162 carries risk score 50/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0148",
    "alertIds": [
      "ALT-0163"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0301",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0301.",
    "keyFindings": [
      "Primary alert ALT-0163 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0149",
    "alertIds": [
      "ALT-0164"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0303",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0303.",
    "keyFindings": [
      "Primary alert ALT-0164 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0150",
    "alertIds": [
      "ALT-0165"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0305",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0305.",
    "keyFindings": [
      "Primary alert ALT-0165 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0151",
    "alertIds": [
      "ALT-0166"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0307",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0307.",
    "keyFindings": [
      "Primary alert ALT-0166 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0152",
    "alertIds": [
      "ALT-0167"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0309",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0309.",
    "keyFindings": [
      "Primary alert ALT-0167 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0153",
    "alertIds": [
      "ALT-0168"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0311",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0311.",
    "keyFindings": [
      "Primary alert ALT-0168 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0154",
    "alertIds": [
      "ALT-0169"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0313",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0313.",
    "keyFindings": [
      "Primary alert ALT-0169 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0155",
    "alertIds": [
      "ALT-0172"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0317",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0317.",
    "keyFindings": [
      "Primary alert ALT-0172 carries risk score 12/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0156",
    "alertIds": [
      "ALT-0173"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0318",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0318.",
    "keyFindings": [
      "Primary alert ALT-0173 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0157",
    "alertIds": [
      "ALT-0174"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0320",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0320.",
    "keyFindings": [
      "Primary alert ALT-0174 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0158",
    "alertIds": [
      "ALT-0175"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0322",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0322.",
    "keyFindings": [
      "Primary alert ALT-0175 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0159",
    "alertIds": [
      "ALT-0177"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0325",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0325.",
    "keyFindings": [
      "Primary alert ALT-0177 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0160",
    "alertIds": [
      "ALT-0178"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0327",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0327.",
    "keyFindings": [
      "Primary alert ALT-0178 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0161",
    "alertIds": [
      "ALT-0179"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0329",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0329.",
    "keyFindings": [
      "Primary alert ALT-0179 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0162",
    "alertIds": [
      "ALT-0180"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0331",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0331.",
    "keyFindings": [
      "Primary alert ALT-0180 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0163",
    "alertIds": [
      "ALT-0181"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0333",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0333.",
    "keyFindings": [
      "Primary alert ALT-0181 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0164",
    "alertIds": [
      "ALT-0183"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0336",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0336.",
    "keyFindings": [
      "Primary alert ALT-0183 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0165",
    "alertIds": [
      "ALT-0184"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0338",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0338.",
    "keyFindings": [
      "Primary alert ALT-0184 carries risk score 74/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0166",
    "alertIds": [
      "ALT-0186"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0341",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0341.",
    "keyFindings": [
      "Primary alert ALT-0186 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0167",
    "alertIds": [
      "ALT-0187"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0343",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0343.",
    "keyFindings": [
      "Primary alert ALT-0187 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0168",
    "alertIds": [
      "ALT-0188"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0345",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0345.",
    "keyFindings": [
      "Primary alert ALT-0188 carries risk score 74/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0169",
    "alertIds": [
      "ALT-0189"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0347",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0347.",
    "keyFindings": [
      "Primary alert ALT-0189 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0170",
    "alertIds": [
      "ALT-0190"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0349",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0349.",
    "keyFindings": [
      "Primary alert ALT-0190 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0171",
    "alertIds": [
      "ALT-0191"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0351",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0351.",
    "keyFindings": [
      "Primary alert ALT-0191 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0172",
    "alertIds": [
      "ALT-0192"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0353",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0353.",
    "keyFindings": [
      "Primary alert ALT-0192 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0173",
    "alertIds": [
      "ALT-0193"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0355",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0355.",
    "keyFindings": [
      "Primary alert ALT-0193 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0174",
    "alertIds": [
      "ALT-0194"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0357",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0357.",
    "keyFindings": [
      "Primary alert ALT-0194 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0175",
    "alertIds": [
      "ALT-0195"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0359",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0359.",
    "keyFindings": [
      "Primary alert ALT-0195 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0176",
    "alertIds": [
      "ALT-0196"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0361",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0361.",
    "keyFindings": [
      "Primary alert ALT-0196 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0177",
    "alertIds": [
      "ALT-0197"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0363",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0363.",
    "keyFindings": [
      "Primary alert ALT-0197 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0178",
    "alertIds": [
      "ALT-0198"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0365",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0365.",
    "keyFindings": [
      "Primary alert ALT-0198 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0179",
    "alertIds": [
      "ALT-0199"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0367",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0367.",
    "keyFindings": [
      "Primary alert ALT-0199 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0180",
    "alertIds": [
      "ALT-0200"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0369",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0369.",
    "keyFindings": [
      "Primary alert ALT-0200 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0181",
    "alertIds": [
      "ALT-0201"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0371",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0371.",
    "keyFindings": [
      "Primary alert ALT-0201 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0182",
    "alertIds": [
      "ALT-0202"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0373",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0373.",
    "keyFindings": [
      "Primary alert ALT-0202 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0183",
    "alertIds": [
      "ALT-0203"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0375",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0375.",
    "keyFindings": [
      "Primary alert ALT-0203 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0184",
    "alertIds": [
      "ALT-0204"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0377",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0377.",
    "keyFindings": [
      "Primary alert ALT-0204 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0185",
    "alertIds": [
      "ALT-0205"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0379",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0379.",
    "keyFindings": [
      "Primary alert ALT-0205 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0186",
    "alertIds": [
      "ALT-0206",
      "ALT-0484"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0381",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0381.",
    "keyFindings": [
      "Primary alert ALT-0206 carries risk score 1/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0187",
    "alertIds": [
      "ALT-0207"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0383",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0383.",
    "keyFindings": [
      "Primary alert ALT-0207 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0188",
    "alertIds": [
      "ALT-0208"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0384",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0384.",
    "keyFindings": [
      "Primary alert ALT-0208 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0189",
    "alertIds": [
      "ALT-0209"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0386",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0386.",
    "keyFindings": [
      "Primary alert ALT-0209 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0190",
    "alertIds": [
      "ALT-0210"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0388",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0388.",
    "keyFindings": [
      "Primary alert ALT-0210 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0191",
    "alertIds": [
      "ALT-0211"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0390",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0390.",
    "keyFindings": [
      "Primary alert ALT-0211 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0192",
    "alertIds": [
      "ALT-0212"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0392",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0392.",
    "keyFindings": [
      "Primary alert ALT-0212 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0193",
    "alertIds": [
      "ALT-0214"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0395",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0395.",
    "keyFindings": [
      "Primary alert ALT-0214 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0194",
    "alertIds": [
      "ALT-0215"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0397",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0397.",
    "keyFindings": [
      "Primary alert ALT-0215 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0195",
    "alertIds": [
      "ALT-0216",
      "ALT-0328"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0399",
    "subjectType": "corporate",
    "summary": "Clustered case from 2 linked alerts around ACC-0399.",
    "keyFindings": [
      "Primary alert ALT-0216 carries risk score 50/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0196",
    "alertIds": [
      "ALT-0217"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0401",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0401.",
    "keyFindings": [
      "Primary alert ALT-0217 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0197",
    "alertIds": [
      "ALT-0218"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0402",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0402.",
    "keyFindings": [
      "Primary alert ALT-0218 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0198",
    "alertIds": [
      "ALT-0219"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0404",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0404.",
    "keyFindings": [
      "Primary alert ALT-0219 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0199",
    "alertIds": [
      "ALT-0220"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0406",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0406.",
    "keyFindings": [
      "Primary alert ALT-0220 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0200",
    "alertIds": [
      "ALT-0354",
      "ALT-0221"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0641",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0641.",
    "keyFindings": [
      "Primary alert ALT-0354 carries risk score 62/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0201",
    "alertIds": [
      "ALT-0222"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0410",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0410.",
    "keyFindings": [
      "Primary alert ALT-0222 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0202",
    "alertIds": [
      "ALT-0223"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0412",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0412.",
    "keyFindings": [
      "Primary alert ALT-0223 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0203",
    "alertIds": [
      "ALT-0224"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0414",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0414.",
    "keyFindings": [
      "Primary alert ALT-0224 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0204",
    "alertIds": [
      "ALT-0225",
      "ALT-0289"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0416",
    "subjectType": "individual",
    "summary": "Clustered case from 2 linked alerts around ACC-0416.",
    "keyFindings": [
      "Primary alert ALT-0225 carries risk score 62/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0205",
    "alertIds": [
      "ALT-0227"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0419",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0419.",
    "keyFindings": [
      "Primary alert ALT-0227 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0206",
    "alertIds": [
      "ALT-0228"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0421",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0421.",
    "keyFindings": [
      "Primary alert ALT-0228 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0207",
    "alertIds": [
      "ALT-0229"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0423",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0423.",
    "keyFindings": [
      "Primary alert ALT-0229 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0208",
    "alertIds": [
      "ALT-0230"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0425",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0425.",
    "keyFindings": [
      "Primary alert ALT-0230 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0209",
    "alertIds": [
      "ALT-0231"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0427",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0427.",
    "keyFindings": [
      "Primary alert ALT-0231 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0210",
    "alertIds": [
      "ALT-0232"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0429",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0429.",
    "keyFindings": [
      "Primary alert ALT-0232 carries risk score 74/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0211",
    "alertIds": [
      "ALT-0233"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0431",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0431.",
    "keyFindings": [
      "Primary alert ALT-0233 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0212",
    "alertIds": [
      "ALT-0234"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0432",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0432.",
    "keyFindings": [
      "Primary alert ALT-0234 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0213",
    "alertIds": [
      "ALT-0236"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0435",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0435.",
    "keyFindings": [
      "Primary alert ALT-0236 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0214",
    "alertIds": [
      "ALT-0237"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0437",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0437.",
    "keyFindings": [
      "Primary alert ALT-0237 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0215",
    "alertIds": [
      "ALT-0238"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0439",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0439.",
    "keyFindings": [
      "Primary alert ALT-0238 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0216",
    "alertIds": [
      "ALT-0239"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0441",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0441.",
    "keyFindings": [
      "Primary alert ALT-0239 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0217",
    "alertIds": [
      "ALT-0240"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0442",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0442.",
    "keyFindings": [
      "Primary alert ALT-0240 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0218",
    "alertIds": [
      "ALT-0242"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0444",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0444.",
    "keyFindings": [
      "Primary alert ALT-0242 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0219",
    "alertIds": [
      "ALT-0243"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0446",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0446.",
    "keyFindings": [
      "Primary alert ALT-0243 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0220",
    "alertIds": [
      "ALT-0244"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0448",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0448.",
    "keyFindings": [
      "Primary alert ALT-0244 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0221",
    "alertIds": [
      "ALT-0245"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0450",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0450.",
    "keyFindings": [
      "Primary alert ALT-0245 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0222",
    "alertIds": [
      "ALT-0246"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0452",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0452.",
    "keyFindings": [
      "Primary alert ALT-0246 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0223",
    "alertIds": [
      "ALT-0248"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0455",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0455.",
    "keyFindings": [
      "Primary alert ALT-0248 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0224",
    "alertIds": [
      "ALT-0249"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0457",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0457.",
    "keyFindings": [
      "Primary alert ALT-0249 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0225",
    "alertIds": [
      "ALT-0250"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0459",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0459.",
    "keyFindings": [
      "Primary alert ALT-0250 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0226",
    "alertIds": [
      "ALT-0251"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0461",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0461.",
    "keyFindings": [
      "Primary alert ALT-0251 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0227",
    "alertIds": [
      "ALT-0252"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0463",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0463.",
    "keyFindings": [
      "Primary alert ALT-0252 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0228",
    "alertIds": [
      "ALT-0253"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0465",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0465.",
    "keyFindings": [
      "Primary alert ALT-0253 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0229",
    "alertIds": [
      "ALT-0254"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0467",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0467.",
    "keyFindings": [
      "Primary alert ALT-0254 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0230",
    "alertIds": [
      "ALT-0255"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0469",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0469.",
    "keyFindings": [
      "Primary alert ALT-0255 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0231",
    "alertIds": [
      "ALT-0256"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0471",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0471.",
    "keyFindings": [
      "Primary alert ALT-0256 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0232",
    "alertIds": [
      "ALT-0257"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0473",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0473.",
    "keyFindings": [
      "Primary alert ALT-0257 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0233",
    "alertIds": [
      "ALT-0258"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0475",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0475.",
    "keyFindings": [
      "Primary alert ALT-0258 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0234",
    "alertIds": [
      "ALT-0259"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0477",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0477.",
    "keyFindings": [
      "Primary alert ALT-0259 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0235",
    "alertIds": [
      "ALT-0260"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0479",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0479.",
    "keyFindings": [
      "Primary alert ALT-0260 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0236",
    "alertIds": [
      "ALT-0261"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0481",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0481.",
    "keyFindings": [
      "Primary alert ALT-0261 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0237",
    "alertIds": [
      "ALT-0262"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0483",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0483.",
    "keyFindings": [
      "Primary alert ALT-0262 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0238",
    "alertIds": [
      "ALT-0263"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0485",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0485.",
    "keyFindings": [
      "Primary alert ALT-0263 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0239",
    "alertIds": [
      "ALT-0264"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0487",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0487.",
    "keyFindings": [
      "Primary alert ALT-0264 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0240",
    "alertIds": [
      "ALT-0265"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0489",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0489.",
    "keyFindings": [
      "Primary alert ALT-0265 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0241",
    "alertIds": [
      "ALT-0266"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0491",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0491.",
    "keyFindings": [
      "Primary alert ALT-0266 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0242",
    "alertIds": [
      "ALT-0268"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0493",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0493.",
    "keyFindings": [
      "Primary alert ALT-0268 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0243",
    "alertIds": [
      "ALT-0269"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0495",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0495.",
    "keyFindings": [
      "Primary alert ALT-0269 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0244",
    "alertIds": [
      "ALT-0270"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0497",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0497.",
    "keyFindings": [
      "Primary alert ALT-0270 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0245",
    "alertIds": [
      "ALT-0271"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0499",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0499.",
    "keyFindings": [
      "Primary alert ALT-0271 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0246",
    "alertIds": [
      "ALT-0272"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0500",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0500.",
    "keyFindings": [
      "Primary alert ALT-0272 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0247",
    "alertIds": [
      "ALT-0273"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0502",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0502.",
    "keyFindings": [
      "Primary alert ALT-0273 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0248",
    "alertIds": [
      "ALT-0274"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0504",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0504.",
    "keyFindings": [
      "Primary alert ALT-0274 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0249",
    "alertIds": [
      "ALT-0275"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0506",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0506.",
    "keyFindings": [
      "Primary alert ALT-0275 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0250",
    "alertIds": [
      "ALT-0276"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0507",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0507.",
    "keyFindings": [
      "Primary alert ALT-0276 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0251",
    "alertIds": [
      "ALT-0277"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0509",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0509.",
    "keyFindings": [
      "Primary alert ALT-0277 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0252",
    "alertIds": [
      "ALT-0278"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0511",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0511.",
    "keyFindings": [
      "Primary alert ALT-0278 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0253",
    "alertIds": [
      "ALT-0279"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0513",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0513.",
    "keyFindings": [
      "Primary alert ALT-0279 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0254",
    "alertIds": [
      "ALT-0280"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0515",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0515.",
    "keyFindings": [
      "Primary alert ALT-0280 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0255",
    "alertIds": [
      "ALT-0281"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0517",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0517.",
    "keyFindings": [
      "Primary alert ALT-0281 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0256",
    "alertIds": [
      "ALT-0282"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0519",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0519.",
    "keyFindings": [
      "Primary alert ALT-0282 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0257",
    "alertIds": [
      "ALT-0283"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0521",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0521.",
    "keyFindings": [
      "Primary alert ALT-0283 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0258",
    "alertIds": [
      "ALT-0284"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0522",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0522.",
    "keyFindings": [
      "Primary alert ALT-0284 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0259",
    "alertIds": [
      "ALT-0285"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0524",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0524.",
    "keyFindings": [
      "Primary alert ALT-0285 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0260",
    "alertIds": [
      "ALT-0286"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0526",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0526.",
    "keyFindings": [
      "Primary alert ALT-0286 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0261",
    "alertIds": [
      "ALT-0287"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0528",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0528.",
    "keyFindings": [
      "Primary alert ALT-0287 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0262",
    "alertIds": [
      "ALT-0290"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0532",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0532.",
    "keyFindings": [
      "Primary alert ALT-0290 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0263",
    "alertIds": [
      "ALT-0294"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0537",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0537.",
    "keyFindings": [
      "Primary alert ALT-0294 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0264",
    "alertIds": [
      "ALT-0295"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0539",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0539.",
    "keyFindings": [
      "Primary alert ALT-0295 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0265",
    "alertIds": [
      "ALT-0296"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0541",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0541.",
    "keyFindings": [
      "Primary alert ALT-0296 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0266",
    "alertIds": [
      "ALT-0297"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0543",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0543.",
    "keyFindings": [
      "Primary alert ALT-0297 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0267",
    "alertIds": [
      "ALT-0298"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0545",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0545.",
    "keyFindings": [
      "Primary alert ALT-0298 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0268",
    "alertIds": [
      "ALT-0301"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0549",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0549.",
    "keyFindings": [
      "Primary alert ALT-0301 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0269",
    "alertIds": [
      "ALT-0302"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0550",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0550.",
    "keyFindings": [
      "Primary alert ALT-0302 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0270",
    "alertIds": [
      "ALT-0303"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0552",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0552.",
    "keyFindings": [
      "Primary alert ALT-0303 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0271",
    "alertIds": [
      "ALT-0305"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0555",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0555.",
    "keyFindings": [
      "Primary alert ALT-0305 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0272",
    "alertIds": [
      "ALT-0306"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0557",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0557.",
    "keyFindings": [
      "Primary alert ALT-0306 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0273",
    "alertIds": [
      "ALT-0307"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0559",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0559.",
    "keyFindings": [
      "Primary alert ALT-0307 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0274",
    "alertIds": [
      "ALT-0308",
      "ALT-0344"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0561",
    "subjectType": "corporate",
    "summary": "Clustered case from 2 linked alerts around ACC-0561.",
    "keyFindings": [
      "Primary alert ALT-0308 carries risk score 63/100.",
      "Case spans 3 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0275",
    "alertIds": [
      "ALT-0310"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0564",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0564.",
    "keyFindings": [
      "Primary alert ALT-0310 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0276",
    "alertIds": [
      "ALT-0311"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0565",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0565.",
    "keyFindings": [
      "Primary alert ALT-0311 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0277",
    "alertIds": [
      "ALT-0312"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0567",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0567.",
    "keyFindings": [
      "Primary alert ALT-0312 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0278",
    "alertIds": [
      "ALT-0314"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0570",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0570.",
    "keyFindings": [
      "Primary alert ALT-0314 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0279",
    "alertIds": [
      "ALT-0315"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0572",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0572.",
    "keyFindings": [
      "Primary alert ALT-0315 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0280",
    "alertIds": [
      "ALT-0316"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0574",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0574.",
    "keyFindings": [
      "Primary alert ALT-0316 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0281",
    "alertIds": [
      "ALT-0317"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0576",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0576.",
    "keyFindings": [
      "Primary alert ALT-0317 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0282",
    "alertIds": [
      "ALT-0319"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0579",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0579.",
    "keyFindings": [
      "Primary alert ALT-0319 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0283",
    "alertIds": [
      "ALT-0320"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0581",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0581.",
    "keyFindings": [
      "Primary alert ALT-0320 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0284",
    "alertIds": [
      "ALT-0321"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0583",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0583.",
    "keyFindings": [
      "Primary alert ALT-0321 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0285",
    "alertIds": [
      "ALT-0322"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0585",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0585.",
    "keyFindings": [
      "Primary alert ALT-0322 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0286",
    "alertIds": [
      "ALT-0323"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0587",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0587.",
    "keyFindings": [
      "Primary alert ALT-0323 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0287",
    "alertIds": [
      "ALT-0324"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0589",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0589.",
    "keyFindings": [
      "Primary alert ALT-0324 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0288",
    "alertIds": [
      "ALT-0325"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0591",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0591.",
    "keyFindings": [
      "Primary alert ALT-0325 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0289",
    "alertIds": [
      "ALT-0326"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0593",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0593.",
    "keyFindings": [
      "Primary alert ALT-0326 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0290",
    "alertIds": [
      "ALT-0327"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0594",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0594.",
    "keyFindings": [
      "Primary alert ALT-0327 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0291",
    "alertIds": [
      "ALT-0329"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0597",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0597.",
    "keyFindings": [
      "Primary alert ALT-0329 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0292",
    "alertIds": [
      "ALT-0332"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0600",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0600.",
    "keyFindings": [
      "Primary alert ALT-0332 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0293",
    "alertIds": [
      "ALT-0333"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0602",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0602.",
    "keyFindings": [
      "Primary alert ALT-0333 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0294",
    "alertIds": [
      "ALT-0334"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0604",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0604.",
    "keyFindings": [
      "Primary alert ALT-0334 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0295",
    "alertIds": [
      "ALT-0335"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0606",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0606.",
    "keyFindings": [
      "Primary alert ALT-0335 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0296",
    "alertIds": [
      "ALT-0336"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0608",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0608.",
    "keyFindings": [
      "Primary alert ALT-0336 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0297",
    "alertIds": [
      "ALT-0337"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0610",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0610.",
    "keyFindings": [
      "Primary alert ALT-0337 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0298",
    "alertIds": [
      "ALT-0338"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0612",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0612.",
    "keyFindings": [
      "Primary alert ALT-0338 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0299",
    "alertIds": [
      "ALT-0339"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0614",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0614.",
    "keyFindings": [
      "Primary alert ALT-0339 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0300",
    "alertIds": [
      "ALT-0340"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0616",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0616.",
    "keyFindings": [
      "Primary alert ALT-0340 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0301",
    "alertIds": [
      "ALT-0341"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0618",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0618.",
    "keyFindings": [
      "Primary alert ALT-0341 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0302",
    "alertIds": [
      "ALT-0342"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0620",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0620.",
    "keyFindings": [
      "Primary alert ALT-0342 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0303",
    "alertIds": [
      "ALT-0343"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0621",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0621.",
    "keyFindings": [
      "Primary alert ALT-0343 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0304",
    "alertIds": [
      "ALT-0345"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0624",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0624.",
    "keyFindings": [
      "Primary alert ALT-0345 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0305",
    "alertIds": [
      "ALT-0346"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0626",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0626.",
    "keyFindings": [
      "Primary alert ALT-0346 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0306",
    "alertIds": [
      "ALT-0347"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0628",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0628.",
    "keyFindings": [
      "Primary alert ALT-0347 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0307",
    "alertIds": [
      "ALT-0348"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0630",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0630.",
    "keyFindings": [
      "Primary alert ALT-0348 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0308",
    "alertIds": [
      "ALT-0349"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0632",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0632.",
    "keyFindings": [
      "Primary alert ALT-0349 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0309",
    "alertIds": [
      "ALT-0350"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0634",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0634.",
    "keyFindings": [
      "Primary alert ALT-0350 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0310",
    "alertIds": [
      "ALT-0351"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0636",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0636.",
    "keyFindings": [
      "Primary alert ALT-0351 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0311",
    "alertIds": [
      "ALT-0352"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0638",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0638.",
    "keyFindings": [
      "Primary alert ALT-0352 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0312",
    "alertIds": [
      "ALT-0353"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0640",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0640.",
    "keyFindings": [
      "Primary alert ALT-0353 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0313",
    "alertIds": [
      "ALT-0355"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0642",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0642.",
    "keyFindings": [
      "Primary alert ALT-0355 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0314",
    "alertIds": [
      "ALT-0356"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0644",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0644.",
    "keyFindings": [
      "Primary alert ALT-0356 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0315",
    "alertIds": [
      "ALT-0357"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0646",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0646.",
    "keyFindings": [
      "Primary alert ALT-0357 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0316",
    "alertIds": [
      "ALT-0358"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0647",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0647.",
    "keyFindings": [
      "Primary alert ALT-0358 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0317",
    "alertIds": [
      "ALT-0359"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0649",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0649.",
    "keyFindings": [
      "Primary alert ALT-0359 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0318",
    "alertIds": [
      "ALT-0360"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0651",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0651.",
    "keyFindings": [
      "Primary alert ALT-0360 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0319",
    "alertIds": [
      "ALT-0361"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0653",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0653.",
    "keyFindings": [
      "Primary alert ALT-0361 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0320",
    "alertIds": [
      "ALT-0362"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0655",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0655.",
    "keyFindings": [
      "Primary alert ALT-0362 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0321",
    "alertIds": [
      "ALT-0363"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0656",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0656.",
    "keyFindings": [
      "Primary alert ALT-0363 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0322",
    "alertIds": [
      "ALT-0364"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0658",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0658.",
    "keyFindings": [
      "Primary alert ALT-0364 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0323",
    "alertIds": [
      "ALT-0365"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0660",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0660.",
    "keyFindings": [
      "Primary alert ALT-0365 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0324",
    "alertIds": [
      "ALT-0367"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0663",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0663.",
    "keyFindings": [
      "Primary alert ALT-0367 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0325",
    "alertIds": [
      "ALT-0368"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0665",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0665.",
    "keyFindings": [
      "Primary alert ALT-0368 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0326",
    "alertIds": [
      "ALT-0369"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0667",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0667.",
    "keyFindings": [
      "Primary alert ALT-0369 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0327",
    "alertIds": [
      "ALT-0370"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0669",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0669.",
    "keyFindings": [
      "Primary alert ALT-0370 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0328",
    "alertIds": [
      "ALT-0372"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0672",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0672.",
    "keyFindings": [
      "Primary alert ALT-0372 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0329",
    "alertIds": [
      "ALT-0373"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0674",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0674.",
    "keyFindings": [
      "Primary alert ALT-0373 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0330",
    "alertIds": [
      "ALT-0374"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0676",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0676.",
    "keyFindings": [
      "Primary alert ALT-0374 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0331",
    "alertIds": [
      "ALT-0375"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0678",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0678.",
    "keyFindings": [
      "Primary alert ALT-0375 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0332",
    "alertIds": [
      "ALT-0376"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0680",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0680.",
    "keyFindings": [
      "Primary alert ALT-0376 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0333",
    "alertIds": [
      "ALT-0377"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0682",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0682.",
    "keyFindings": [
      "Primary alert ALT-0377 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0334",
    "alertIds": [
      "ALT-0378"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0684",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0684.",
    "keyFindings": [
      "Primary alert ALT-0378 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0335",
    "alertIds": [
      "ALT-0379"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0686",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0686.",
    "keyFindings": [
      "Primary alert ALT-0379 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0336",
    "alertIds": [
      "ALT-0380"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0687",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0687.",
    "keyFindings": [
      "Primary alert ALT-0380 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0337",
    "alertIds": [
      "ALT-0381"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0688",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0688.",
    "keyFindings": [
      "Primary alert ALT-0381 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0338",
    "alertIds": [
      "ALT-0382"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0690",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0690.",
    "keyFindings": [
      "Primary alert ALT-0382 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0339",
    "alertIds": [
      "ALT-0383"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0692",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0692.",
    "keyFindings": [
      "Primary alert ALT-0383 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0340",
    "alertIds": [
      "ALT-0384"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0694",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0694.",
    "keyFindings": [
      "Primary alert ALT-0384 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0341",
    "alertIds": [
      "ALT-0385"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0696",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0696.",
    "keyFindings": [
      "Primary alert ALT-0385 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0342",
    "alertIds": [
      "ALT-0386"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0698",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0698.",
    "keyFindings": [
      "Primary alert ALT-0386 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0343",
    "alertIds": [
      "ALT-0387"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0700",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0700.",
    "keyFindings": [
      "Primary alert ALT-0387 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0344",
    "alertIds": [
      "ALT-0389"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0703",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0703.",
    "keyFindings": [
      "Primary alert ALT-0389 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0345",
    "alertIds": [
      "ALT-0391"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0706",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0706.",
    "keyFindings": [
      "Primary alert ALT-0391 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0346",
    "alertIds": [
      "ALT-0392"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0708",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0708.",
    "keyFindings": [
      "Primary alert ALT-0392 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0347",
    "alertIds": [
      "ALT-0393"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0710",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0710.",
    "keyFindings": [
      "Primary alert ALT-0393 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0348",
    "alertIds": [
      "ALT-0394"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0712",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0712.",
    "keyFindings": [
      "Primary alert ALT-0394 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0349",
    "alertIds": [
      "ALT-0395"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0714",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0714.",
    "keyFindings": [
      "Primary alert ALT-0395 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0350",
    "alertIds": [
      "ALT-0396"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0716",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0716.",
    "keyFindings": [
      "Primary alert ALT-0396 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0351",
    "alertIds": [
      "ALT-0397"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0718",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0718.",
    "keyFindings": [
      "Primary alert ALT-0397 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0352",
    "alertIds": [
      "ALT-0398"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0720",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0720.",
    "keyFindings": [
      "Primary alert ALT-0398 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0353",
    "alertIds": [
      "ALT-0399"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0722",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0722.",
    "keyFindings": [
      "Primary alert ALT-0399 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0354",
    "alertIds": [
      "ALT-0401"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0724",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0724.",
    "keyFindings": [
      "Primary alert ALT-0401 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0355",
    "alertIds": [
      "ALT-0402"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0726",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0726.",
    "keyFindings": [
      "Primary alert ALT-0402 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0356",
    "alertIds": [
      "ALT-0403"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0728",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0728.",
    "keyFindings": [
      "Primary alert ALT-0403 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0357",
    "alertIds": [
      "ALT-0404"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0730",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0730.",
    "keyFindings": [
      "Primary alert ALT-0404 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0358",
    "alertIds": [
      "ALT-0405"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0732",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0732.",
    "keyFindings": [
      "Primary alert ALT-0405 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0359",
    "alertIds": [
      "ALT-0406"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0734",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0734.",
    "keyFindings": [
      "Primary alert ALT-0406 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0360",
    "alertIds": [
      "ALT-0407"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0736",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0736.",
    "keyFindings": [
      "Primary alert ALT-0407 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0361",
    "alertIds": [
      "ALT-0408"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0738",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0738.",
    "keyFindings": [
      "Primary alert ALT-0408 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0362",
    "alertIds": [
      "ALT-0409"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0740",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0740.",
    "keyFindings": [
      "Primary alert ALT-0409 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0363",
    "alertIds": [
      "ALT-0411"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0743",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0743.",
    "keyFindings": [
      "Primary alert ALT-0411 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0364",
    "alertIds": [
      "ALT-0414"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0747",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0747.",
    "keyFindings": [
      "Primary alert ALT-0414 carries risk score 74/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0365",
    "alertIds": [
      "ALT-0417"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0751",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0751.",
    "keyFindings": [
      "Primary alert ALT-0417 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0366",
    "alertIds": [
      "ALT-0418"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0753",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0753.",
    "keyFindings": [
      "Primary alert ALT-0418 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0367",
    "alertIds": [
      "ALT-0419"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0755",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0755.",
    "keyFindings": [
      "Primary alert ALT-0419 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0368",
    "alertIds": [
      "ALT-0420"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0757",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0757.",
    "keyFindings": [
      "Primary alert ALT-0420 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0369",
    "alertIds": [
      "ALT-0421"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0759",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0759.",
    "keyFindings": [
      "Primary alert ALT-0421 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0370",
    "alertIds": [
      "ALT-0422"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0761",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0761.",
    "keyFindings": [
      "Primary alert ALT-0422 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0371",
    "alertIds": [
      "ALT-0423"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0763",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0763.",
    "keyFindings": [
      "Primary alert ALT-0423 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0372",
    "alertIds": [
      "ALT-0424"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0765",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0765.",
    "keyFindings": [
      "Primary alert ALT-0424 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0373",
    "alertIds": [
      "ALT-0425"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0767",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0767.",
    "keyFindings": [
      "Primary alert ALT-0425 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0374",
    "alertIds": [
      "ALT-0426"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0769",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0769.",
    "keyFindings": [
      "Primary alert ALT-0426 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0375",
    "alertIds": [
      "ALT-0427"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0771",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0771.",
    "keyFindings": [
      "Primary alert ALT-0427 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0376",
    "alertIds": [
      "ALT-0429"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0774",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0774.",
    "keyFindings": [
      "Primary alert ALT-0429 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0377",
    "alertIds": [
      "ALT-0430"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0776",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0776.",
    "keyFindings": [
      "Primary alert ALT-0430 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0378",
    "alertIds": [
      "ALT-0432"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0779",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0779.",
    "keyFindings": [
      "Primary alert ALT-0432 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0379",
    "alertIds": [
      "ALT-0433"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0781",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0781.",
    "keyFindings": [
      "Primary alert ALT-0433 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0380",
    "alertIds": [
      "ALT-0434"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0783",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0783.",
    "keyFindings": [
      "Primary alert ALT-0434 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0381",
    "alertIds": [
      "ALT-0435"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0785",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0785.",
    "keyFindings": [
      "Primary alert ALT-0435 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0382",
    "alertIds": [
      "ALT-0436"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0787",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0787.",
    "keyFindings": [
      "Primary alert ALT-0436 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0383",
    "alertIds": [
      "ALT-0438"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0790",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0790.",
    "keyFindings": [
      "Primary alert ALT-0438 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0384",
    "alertIds": [
      "ALT-0439"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0791",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0791.",
    "keyFindings": [
      "Primary alert ALT-0439 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0385",
    "alertIds": [
      "ALT-0440"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0793",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0793.",
    "keyFindings": [
      "Primary alert ALT-0440 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0386",
    "alertIds": [
      "ALT-0441"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0795",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0795.",
    "keyFindings": [
      "Primary alert ALT-0441 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-10T09:00:00Z"
  },
  {
    "id": "CASE-0387",
    "alertIds": [
      "ALT-0442"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0797",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0797.",
    "keyFindings": [
      "Primary alert ALT-0442 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0388",
    "alertIds": [
      "ALT-0443"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0799",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0799.",
    "keyFindings": [
      "Primary alert ALT-0443 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0389",
    "alertIds": [
      "ALT-0444"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0801",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0801.",
    "keyFindings": [
      "Primary alert ALT-0444 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0390",
    "alertIds": [
      "ALT-0445"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0803",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0803.",
    "keyFindings": [
      "Primary alert ALT-0445 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0391",
    "alertIds": [
      "ALT-0446"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0804",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0804.",
    "keyFindings": [
      "Primary alert ALT-0446 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0392",
    "alertIds": [
      "ALT-0447"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0806",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0806.",
    "keyFindings": [
      "Primary alert ALT-0447 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0393",
    "alertIds": [
      "ALT-0448"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0807",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0807.",
    "keyFindings": [
      "Primary alert ALT-0448 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0394",
    "alertIds": [
      "ALT-0449"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0809",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0809.",
    "keyFindings": [
      "Primary alert ALT-0449 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0395",
    "alertIds": [
      "ALT-0450"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0811",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0811.",
    "keyFindings": [
      "Primary alert ALT-0450 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0396",
    "alertIds": [
      "ALT-0451"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0813",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0813.",
    "keyFindings": [
      "Primary alert ALT-0451 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0397",
    "alertIds": [
      "ALT-0452"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0815",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0815.",
    "keyFindings": [
      "Primary alert ALT-0452 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0398",
    "alertIds": [
      "ALT-0453"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0817",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0817.",
    "keyFindings": [
      "Primary alert ALT-0453 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0399",
    "alertIds": [
      "ALT-0454"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0818",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0818.",
    "keyFindings": [
      "Primary alert ALT-0454 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0400",
    "alertIds": [
      "ALT-0455"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0820",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0820.",
    "keyFindings": [
      "Primary alert ALT-0455 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0401",
    "alertIds": [
      "ALT-0456"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0822",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0822.",
    "keyFindings": [
      "Primary alert ALT-0456 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-25T09:00:00Z"
  },
  {
    "id": "CASE-0402",
    "alertIds": [
      "ALT-0457"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0824",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0824.",
    "keyFindings": [
      "Primary alert ALT-0457 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-26T09:00:00Z"
  },
  {
    "id": "CASE-0403",
    "alertIds": [
      "ALT-0461"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0829",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0829.",
    "keyFindings": [
      "Primary alert ALT-0461 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0404",
    "alertIds": [
      "ALT-0462"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0831",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0831.",
    "keyFindings": [
      "Primary alert ALT-0462 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0405",
    "alertIds": [
      "ALT-0463"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0833",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0833.",
    "keyFindings": [
      "Primary alert ALT-0463 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0406",
    "alertIds": [
      "ALT-0464"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0835",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0835.",
    "keyFindings": [
      "Primary alert ALT-0464 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0407",
    "alertIds": [
      "ALT-0465"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0837",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0837.",
    "keyFindings": [
      "Primary alert ALT-0465 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0408",
    "alertIds": [
      "ALT-0466"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0839",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0839.",
    "keyFindings": [
      "Primary alert ALT-0466 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0409",
    "alertIds": [
      "ALT-0467"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0841",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0841.",
    "keyFindings": [
      "Primary alert ALT-0467 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0410",
    "alertIds": [
      "ALT-0469"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0844",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0844.",
    "keyFindings": [
      "Primary alert ALT-0469 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-11T09:00:00Z"
  },
  {
    "id": "CASE-0411",
    "alertIds": [
      "ALT-0470"
    ],
    "status": "ready_for_supervisor_review",
    "subjectAccountId": "ACC-0846",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0846.",
    "keyFindings": [
      "Primary alert ALT-0470 carries risk score 74/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY, SMURFING."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "priority",
    "reportingDeadline": "2024-12-31",
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0412",
    "alertIds": [
      "ALT-0471"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0848",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0848.",
    "keyFindings": [
      "Primary alert ALT-0471 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-13T09:00:00Z"
  },
  {
    "id": "CASE-0413",
    "alertIds": [
      "ALT-0472"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0850",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0850.",
    "keyFindings": [
      "Primary alert ALT-0472 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0414",
    "alertIds": [
      "ALT-0473"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0852",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0852.",
    "keyFindings": [
      "Primary alert ALT-0473 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  },
  {
    "id": "CASE-0415",
    "alertIds": [
      "ALT-0474"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0853",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0853.",
    "keyFindings": [
      "Primary alert ALT-0474 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-16T09:00:00Z"
  },
  {
    "id": "CASE-0416",
    "alertIds": [
      "ALT-0475"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0855",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0855.",
    "keyFindings": [
      "Primary alert ALT-0475 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-17T09:00:00Z"
  },
  {
    "id": "CASE-0417",
    "alertIds": [
      "ALT-0476"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0857",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0857.",
    "keyFindings": [
      "Primary alert ALT-0476 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-18T09:00:00Z"
  },
  {
    "id": "CASE-0418",
    "alertIds": [
      "ALT-0477"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0859",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0859.",
    "keyFindings": [
      "Primary alert ALT-0477 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-19T09:00:00Z"
  },
  {
    "id": "CASE-0419",
    "alertIds": [
      "ALT-0478"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0861",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0861.",
    "keyFindings": [
      "Primary alert ALT-0478 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-20T09:00:00Z"
  },
  {
    "id": "CASE-0420",
    "alertIds": [
      "ALT-0479"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0863",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0863.",
    "keyFindings": [
      "Primary alert ALT-0479 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-21T09:00:00Z"
  },
  {
    "id": "CASE-0421",
    "alertIds": [
      "ALT-0480"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0865",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0865.",
    "keyFindings": [
      "Primary alert ALT-0480 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-22T09:00:00Z"
  },
  {
    "id": "CASE-0422",
    "alertIds": [
      "ALT-0481"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0867",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0867.",
    "keyFindings": [
      "Primary alert ALT-0481 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-23T09:00:00Z"
  },
  {
    "id": "CASE-0423",
    "alertIds": [
      "ALT-0482"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0869",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0869.",
    "keyFindings": [
      "Primary alert ALT-0482 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-24T09:00:00Z"
  },
  {
    "id": "CASE-0424",
    "alertIds": [
      "ALT-0485"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0873",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0873.",
    "keyFindings": [
      "Primary alert ALT-0485 carries risk score 12/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: PBOC_LARGE_TRANSFER."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-27T09:00:00Z"
  },
  {
    "id": "CASE-0425",
    "alertIds": [
      "ALT-0486"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0874",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0874.",
    "keyFindings": [
      "Primary alert ALT-0486 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-01T09:00:00Z"
  },
  {
    "id": "CASE-0426",
    "alertIds": [
      "ALT-0487"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0876",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0876.",
    "keyFindings": [
      "Primary alert ALT-0487 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: PBOC_LARGE_CASH."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-02T09:00:00Z"
  },
  {
    "id": "CASE-0427",
    "alertIds": [
      "ALT-0488"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0878",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0878.",
    "keyFindings": [
      "Primary alert ALT-0488 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-03T09:00:00Z"
  },
  {
    "id": "CASE-0428",
    "alertIds": [
      "ALT-0489"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0880",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0880.",
    "keyFindings": [
      "Primary alert ALT-0489 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-04T09:00:00Z"
  },
  {
    "id": "CASE-0429",
    "alertIds": [
      "ALT-0490"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0882",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0882.",
    "keyFindings": [
      "Primary alert ALT-0490 carries risk score 0/100.",
      "Case spans 1 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-05T09:00:00Z"
  },
  {
    "id": "CASE-0430",
    "alertIds": [
      "ALT-0491"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0883",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0883.",
    "keyFindings": [
      "Primary alert ALT-0491 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-06T09:00:00Z"
  },
  {
    "id": "CASE-0431",
    "alertIds": [
      "ALT-0492"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0885",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0885.",
    "keyFindings": [
      "Primary alert ALT-0492 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-07T09:00:00Z"
  },
  {
    "id": "CASE-0432",
    "alertIds": [
      "ALT-0493"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0887",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0887.",
    "keyFindings": [
      "Primary alert ALT-0493 carries risk score 0/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-08T09:00:00Z"
  },
  {
    "id": "CASE-0433",
    "alertIds": [
      "ALT-0494"
    ],
    "status": "closed_false_positive",
    "subjectAccountId": "ACC-0889",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0889.",
    "keyFindings": [
      "Primary alert ALT-0494 carries risk score 12/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-09T09:00:00Z"
  },
  {
    "id": "CASE-0434",
    "alertIds": [
      "ALT-0497"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0893",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0893.",
    "keyFindings": [
      "Primary alert ALT-0497 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-12T09:00:00Z"
  },
  {
    "id": "CASE-0435",
    "alertIds": [
      "ALT-0499"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0896",
    "subjectType": "individual",
    "summary": "Clustered case from 1 linked alerts around ACC-0896.",
    "keyFindings": [
      "Primary alert ALT-0499 carries risk score 50/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: none."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-14T09:00:00Z"
  },
  {
    "id": "CASE-0436",
    "alertIds": [
      "ALT-0500"
    ],
    "status": "under_review",
    "subjectAccountId": "ACC-0898",
    "subjectType": "corporate",
    "summary": "Clustered case from 1 linked alerts around ACC-0898.",
    "keyFindings": [
      "Primary alert ALT-0500 carries risk score 62/100.",
      "Case spans 2 connected accounts.",
      "Triggered rules: HIGH_RISK_COUNTRY."
    ],
    "suggestedTypologies": [],
    "reportingUrgency": "normal",
    "reportingDeadline": null,
    "analystNotes": "Generated from IBM AML HI-Small via HuggingFace.",
    "lastUpdated": "2024-11-15T09:00:00Z"
  }
];
