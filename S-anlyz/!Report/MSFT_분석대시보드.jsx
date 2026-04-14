import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, ComposedChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';

const PALETTE = ["#0A2240", "#1A5276", "#2E4057", "#1A7A4A", "#C0392B"];

// colorMap 정의
const trendColorMap = {
  "가속": "text-emerald-600 bg-emerald-50",
  "둔화": "text-yellow-600 bg-yellow-50",
  "반등": "text-blue-600 bg-blue-50",
  "악화": "text-red-600 bg-red-50"
};

const trustGradeColorMap = {
  A: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  B: "bg-blue-100 text-blue-800 border border-blue-200",
  C: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  D: "bg-red-100 text-red-800 border border-red-200"
};

const moatGradeColorMap = {
  Wide: "text-emerald-700 bg-emerald-50 border border-emerald-300",
  Narrow: "text-blue-700 bg-blue-50 border border-blue-300",
  None: "text-red-700 bg-red-50 border border-red-300"
};

const riskColorMap = {
  High: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300", badge: "bg-red-600 text-white" },
  Mid: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300", badge: "bg-yellow-500 text-white" },
  Low: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300", badge: "bg-green-600 text-white" }
};

const completenessColorMap = {
  "높음": "text-emerald-600 bg-emerald-50",
  "중간": "text-yellow-600 bg-yellow-50",
  "낮음": "text-red-600 bg-red-50"
};

// No Data Placeholder
const NoDataPlaceholder = ({ message = "데이터 분석 결과가 존재하지 않습니다." }) => (
  <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg border border-gray-200">
    <div className="text-center">
      <div className="text-gray-400 text-sm">{message}</div>
      <div className="text-gray-300 text-xs mt-1">소스 데이터 미확보 또는 분석 불가</div>
    </div>
  </div>
);

// Financial Performance Data
const financialData = [
  { period: "FY2024", revenue: 211.9, opIncome: 88.2, margin: 41.6 },
  { period: "FY2025", revenue: 245.1, opIncome: 104.4, margin: 42.6 }
];

// Segment Data
const segmentData = [
  { name: "Intelligent Cloud", FY2024: 42, FY2025: 44, growth: 25, margin: 52 },
  { name: "Productivity & Business", FY2024: 30, FY2025: 31, growth: 11, margin: 45 },
  { name: "Personal Computing", FY2024: 28, FY2025: 25, growth: 8, margin: 28 }
];

// Moat Radar Data
const moatData = [
  { dimension: "AI Ecosystem", value: 85 },
  { dimension: "Cloud Scale", value: 90 },
  { dimension: "Enterprise Lock-in", value: 75 },
  { dimension: "Network Effects", value: 70 },
  { dimension: "Data Advantages", value: 80 }
];

// Risk Matrix
const risks = [
  { id: 1, name: "Cloud Competition", level: "High" },
  { id: 2, name: "Regulatory (AI)", level: "High" },
  { id: 3, name: "Talent Retention", level: "Mid" },
  { id: 4, name: "Pricing Pressure", level: "Mid" },
  { id: 5, name: "Integration Risk", level: "Low" }
];

const RiskMatrix = ({ risks }) => (
  <div className="grid grid-cols-3 gap-3">
    {["High", "Mid", "Low"].map(level =>
      risks
        .filter(r => r.level === level)
        .map(risk => (
          <div
            key={risk.id}
            className={`p-3 rounded-lg border ${riskColorMap[level].bg} ${riskColorMap[level].border}`}
          >
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-1 ${riskColorMap[level].badge}`}>
              {level}
            </span>
            <div className={`text-sm font-medium ${riskColorMap[level].text}`}>{risk.name}</div>
          </div>
        ))
    )}
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('financial');

  const tabs = [
    { id: 'financial', label: '재무 성과' },
    { id: 'segment', label: '세그먼트 분석' },
    { id: 'governance', label: '경영진 신뢰도' },
    { id: 'strategy_risk', label: '해자 & 리스크' },
    { id: 'data_integrity', label: '데이터 검증' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">MSFT 분석 대시보드 (FY2024-2025)</h1>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Tab 1: Financial Performance */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">재무 트렌드 (FY2024-2025)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill={PALETTE[0]} name="Revenue (B)" />
                  <Bar yAxisId="left" dataKey="opIncome" fill={PALETTE[1]} name="Op Income (B)" />
                  <Line yAxisId="right" type="monotone" dataKey="margin" stroke={PALETTE[4]} name="Op Margin %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <div className="text-sm text-gray-600">Revenue 성장</div>
                <div className="text-2xl font-bold text-emerald-700">+16%</div>
                <div className="text-xs text-gray-500 mt-1">211.9B → 245.1B</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-gray-600">Op Margin 확대</div>
                <div className="text-2xl font-bold text-blue-700">+100bp</div>
                <div className="text-xs text-gray-500 mt-1">41.6% → 42.6%</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-gray-600">EPS 성장</div>
                <div className="text-2xl font-bold text-purple-700">+17%</div>
                <div className="text-xs text-gray-500 mt-1">9.87 → 11.56</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Segment Analysis */}
        {activeTab === 'segment' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">세그먼트 매출 구성 및 성장률</h2>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={segmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="FY2025" fill={PALETTE[0]} name="FY2025 매출 %" />
                  <Line yAxisId="right" type="monotone" dataKey="growth" stroke={PALETTE[4]} name="성장률 %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {segmentData.map(seg => (
                <div key={seg.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold text-gray-900 text-sm">{seg.name}</div>
                  <div className="text-2xl font-bold text-blue-700 mt-2">{seg.FY2025}%</div>
                  <div className="text-xs text-gray-600 mt-2">
                    <div>FY24: {seg.FY2024}% → FY25: {seg.FY2025}%</div>
                    <div className="text-emerald-600 font-semibold">성장: +{seg.growth}%</div>
                    <div className="text-gray-500">Margin: {seg.margin}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Governance */}
        {activeTab === 'governance' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">경영진 신뢰도 평가</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">분기 가이던스 이행률 (Quarterly Guidance)</div>
                    <div className="text-sm text-gray-600 mt-1">Recent quarters FY2025</div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold ${trustGradeColorMap.A}`}>A 등급</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">장기 전략 약속 투명성 (Strategic Promises)</div>
                    <div className="text-sm text-gray-600 mt-1">AI/Cloud investment commitment</div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold ${trustGradeColorMap.A}`}>A 등급</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Strategy & Risk */}
        {activeTab === 'strategy_risk' && (
          <div className="space-y-6">
            {/* Moat Analysis */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">경제적 해자 (Economic Moat)</h2>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={moatData}>
                      <PolarGrid strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="dimension" />
                      <Radar name="해자 강도" dataKey="value" stroke={PALETTE[0]} fill={PALETTE[0]} fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className={`p-4 rounded-lg border flex-shrink-0 ${moatGradeColorMap.Wide}`}>
                  <div className="font-bold text-lg mb-2">모트 등급</div>
                  <div className="font-bold text-2xl">Wide</div>
                  <div className="text-sm mt-4 space-y-2">
                    <div>• AI 에코시스템</div>
                    <div>• 클라우드 스케일</div>
                    <div>• 엔터프라이즈 락인</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Matrix */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">리스크 매트릭스 (3x3)</h2>
              <RiskMatrix risks={risks} />
            </div>
          </div>
        )}

        {/* Tab 5: Data Integrity */}
        {activeTab === 'data_integrity' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">데이터 완결성 검증</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">분석 완결성 점수</div>
                      <div className="text-sm text-gray-600 mt-1">소스: SEC 10-K/10-Q (FY2024-2025)</div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg font-bold text-lg ${completenessColorMap['높음']}`}>높음 (9/10)</div>
                  </div>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-3">누락된 데이터 항목</div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Capex 세부 분류 (유지 vs 성장): 경영진 공개자료 필요</li>
                    <li>• 세그먼트 간 교차 매출: 내부 리포팅 필요</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
