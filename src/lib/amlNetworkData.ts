export interface NetworkNode {
  id: string;
  name: string;
  value: number;
  category: number;
  riskScore: number;
  typology?: string;
  itemStyle: { color: string };
}

export interface NetworkEdge {
  source: string;
  target: string;
  value: number;
  lineStyle: { width: number; color: string };
}

export interface AmlNetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  categories: Array<{ name: string }>;
}

export const amlNetworkData: AmlNetworkData = {
  "categories": [
    {
      "name": "Normal"
    },
    {
      "name": "Suspicious"
    },
    {
      "name": "Confirmed Fraud"
    }
  ],
  "nodes": [
    {
      "id": "100428660",
      "name": "100428660",
      "value": 2728386,
      "category": 2,
      "riskScore": 90,
      "typology": null,
      "itemStyle": {
        "color": "#134e4a"
      }
    },
    {
      "id": "800825340",
      "name": "800825340",
      "value": 2728386,
      "category": 1,
      "riskScore": 62,
      "typology": null,
      "itemStyle": {
        "color": "#0d9488"
      }
    },
    {
      "id": "805B716C0",
      "name": "805B716C0",
      "value": 203170,
      "category": 1,
      "riskScore": 62,
      "typology": null,
      "itemStyle": {
        "color": "#0d9488"
      }
    },
    {
      "id": "8000F4580",
      "name": "8000F4580",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8000F5340",
      "name": "8000F5340",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8000EC280",
      "name": "8000EC280",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8017BF800",
      "name": "8017BF800",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8000EDEC0",
      "name": "8000EDEC0",
      "value": 2686,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "80AEF5310",
      "name": "80AEF5310",
      "value": 2686,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8000F4510",
      "name": "8000F4510",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8011305D0",
      "name": "8011305D0",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8000F4FE0",
      "name": "8000F4FE0",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "812ED62E0",
      "name": "812ED62E0",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "80012FD90",
      "name": "80012FD90",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "812ED6380",
      "name": "812ED6380",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "80012FE00",
      "name": "80012FE00",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "805B34210",
      "name": "805B34210",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "800131B10",
      "name": "800131B10",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8131A9A80",
      "name": "8131A9A80",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8005F0B50",
      "name": "8005F0B50",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "810B0FB40",
      "name": "810B0FB40",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "8005FB700",
      "name": "8005FB700",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    },
    {
      "id": "813600910",
      "name": "813600910",
      "value": 1000,
      "category": 0,
      "riskScore": 15,
      "typology": null,
      "itemStyle": {
        "color": "#99f6e4"
      }
    }
  ],
  "edges": [
    {
      "source": "100428660",
      "target": "800825340",
      "value": 2728386,
      "lineStyle": {
        "width": 5,
        "color": "#0f766e"
      }
    },
    {
      "source": "100428660",
      "target": "805B716C0",
      "value": 203170,
      "lineStyle": {
        "width": 5,
        "color": "#0f766e"
      }
    },
    {
      "source": "8000F4580",
      "target": "8000F5340",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "8000EC280",
      "target": "8017BF800",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "8000EDEC0",
      "target": "80AEF5310",
      "value": 2686,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "8000F4510",
      "target": "8011305D0",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "8000F4FE0",
      "target": "812ED62E0",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "80012FD90",
      "target": "812ED6380",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "80012FE00",
      "target": "805B34210",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "800131B10",
      "target": "8131A9A80",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "8005F0B50",
      "target": "810B0FB40",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    },
    {
      "source": "8005FB700",
      "target": "813600910",
      "value": 1000,
      "lineStyle": {
        "width": 1,
        "color": "#ccfbf1"
      }
    }
  ]
};
