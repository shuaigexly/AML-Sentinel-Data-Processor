export interface NetworkNode {
  id: string;
  name: string;
  value: number;
  category: number; // 0=normal, 1=suspicious, 2=confirmed-fraud
  riskScore: number;
  typology?: string;
  itemStyle: { color: string };
}

export interface NetworkEdge {
  source: string;
  target: string;
  value: number;
  lineStyle: {
    width: number;
    color: string;
  };
}

export interface AmlNetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  categories: Array<{ name: string }>;
}

// Colors from primary-* scale only
const COLOR_FRAUD = '#134e4a';      // primary-800
const COLOR_SUSPICIOUS = '#0d9488'; // primary-500
const COLOR_NORMAL = '#99f6e4';     // primary-200
const EDGE_HOT = '#0f766e';         // primary-600
const EDGE_COLD = '#ccfbf1';        // primary-100

export const amlNetworkData: AmlNetworkData = {
  categories: [
    { name: 'Normal' },
    { name: 'Suspicious' },
    { name: 'Confirmed Fraud' },
  ],
  nodes: [
    // Fan-out cluster — CASE-001 (ACC-021 is the hub)
    { id: 'ACC-021', name: 'ACC-021', value: 580000, category: 2, riskScore: 82, typology: 'fan-out hub', itemStyle: { color: COLOR_FRAUD } },
    { id: 'ACC-009', name: 'ACC-009', value: 68000,  category: 1, riskScore: 62, itemStyle: { color: COLOR_SUSPICIOUS } },
    { id: 'ACC-033', name: 'ACC-033', value: 47000,  category: 1, riskScore: 58, itemStyle: { color: COLOR_SUSPICIOUS } },
    { id: 'ACC-044', name: 'ACC-044', value: 41000,  category: 1, riskScore: 54, itemStyle: { color: COLOR_SUSPICIOUS } },

    // Smurfing feeder for ACC-021
    { id: 'ACC-015', name: 'ACC-015', value: 49500,  category: 2, riskScore: 61, typology: 'smurfing', itemStyle: { color: COLOR_FRAUD } },
    { id: 'ACC-056', name: 'ACC-056', value: 28000,  category: 1, riskScore: 38, itemStyle: { color: COLOR_SUSPICIOUS } },

    // High-risk country transfer cluster — CASE-002
    { id: 'ACC-007', name: 'ACC-007', value: 3200000, category: 2, riskScore: 78, typology: 'offshore layering', itemStyle: { color: COLOR_FRAUD } },
    { id: 'ACC-034', name: 'ACC-034', value: 3200000, category: 1, riskScore: 65, itemStyle: { color: COLOR_SUSPICIOUS } },

    // Rapid-movement cluster — CASE-004
    { id: 'ACC-003', name: 'ACC-003', value: 850000,  category: 1, riskScore: 68, typology: 'rapid movement', itemStyle: { color: COLOR_SUSPICIOUS } },
    { id: 'ACC-071', name: 'ACC-071', value: 850000,  category: 1, riskScore: 55, itemStyle: { color: COLOR_SUSPICIOUS } },

    // Normal nodes (for contrast)
    { id: 'ACC-042', name: 'ACC-042', value: 24000,  category: 0, riskScore: 11, itemStyle: { color: COLOR_NORMAL } },
    { id: 'ACC-088', name: 'ACC-088', value: 180000, category: 0, riskScore: 14, itemStyle: { color: COLOR_NORMAL } },
    { id: 'ACC-099', name: 'ACC-099', value: 8500,   category: 0, riskScore:  9, typology: 'cycle entry', itemStyle: { color: COLOR_NORMAL } },
    { id: 'ACC-120', name: 'ACC-120', value: 15000,  category: 0, riskScore:  7, typology: 'cycle transit', itemStyle: { color: COLOR_NORMAL } },
    { id: 'ACC-130', name: 'ACC-130', value: 15000,  category: 0, riskScore:  5, typology: 'cycle exit', itemStyle: { color: COLOR_NORMAL } },
  ],
  edges: [
    // Fan-out from ACC-021
    { source: 'ACC-021', target: 'ACC-009', value: 68000, lineStyle: { width: 3, color: EDGE_HOT } },
    { source: 'ACC-021', target: 'ACC-033', value: 47000, lineStyle: { width: 2, color: EDGE_HOT } },
    { source: 'ACC-021', target: 'ACC-044', value: 41000, lineStyle: { width: 2, color: EDGE_HOT } },

    // Feeders into ACC-021 (smurfing)
    { source: 'ACC-015', target: 'ACC-021', value: 49500, lineStyle: { width: 2, color: EDGE_HOT } },
    { source: 'ACC-056', target: 'ACC-021', value: 28000, lineStyle: { width: 1, color: EDGE_HOT } },

    // High-risk transfer
    { source: 'ACC-007', target: 'ACC-034', value: 3200000, lineStyle: { width: 5, color: EDGE_HOT } },

    // Rapid movement
    { source: 'ACC-003', target: 'ACC-071', value: 850000, lineStyle: { width: 3, color: EDGE_HOT } },

    // Normal flows
    { source: 'ACC-042', target: 'ACC-088', value: 180000, lineStyle: { width: 1, color: EDGE_COLD } },
    { source: 'ACC-099', target: 'ACC-120', value: 8500,   lineStyle: { width: 1, color: EDGE_COLD } },
    { source: 'ACC-120', target: 'ACC-130', value: 15000,  lineStyle: { width: 1, color: EDGE_COLD } },
  ],
};
