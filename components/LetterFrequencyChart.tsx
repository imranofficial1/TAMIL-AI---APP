import React from 'react';
import { LetterFrequency } from '../types';

// Recharts is loaded from CDN and available on the window object.
declare const Recharts: any;

interface LetterFrequencyChartProps {
  data: LetterFrequency[];
}

const LetterFrequencyChart: React.FC<LetterFrequencyChartProps> = ({ data }) => {
  // Wait for Recharts to be loaded from the CDN
  if (typeof Recharts === 'undefined') {
    return (
        <div className="w-full h-96 bg-slate-800 p-4 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-slate-400">Loading Chart...</p>
        </div>
    );
  }
  
  const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } = Recharts;

  return (
    <div className="w-full h-96 bg-slate-800 p-4 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="letter" tick={{ fill: '#94a3b8' }} stroke="#64748b" />
          <YAxis tick={{ fill: '#94a3b8' }} stroke="#64748b" />
          <Tooltip
            cursor={{ fill: 'rgba(100, 116, 139, 0.3)' }}
            contentStyle={{
              backgroundColor: '#1e293b',
              borderColor: '#334155',
              color: '#e2e8f0',
            }}
          />
          <Bar dataKey="count" fill="#38bdf8" name="Frequency" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LetterFrequencyChart;