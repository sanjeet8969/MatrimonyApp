import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnalyticsChart = ({ data, title = 'User Growth' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        plugins: { legend: { display: false }, title: { text: title, display: true } },
        responsive: true,
        maintainAspectRatio: false
      }
    });
    return () => chart.destroy();
  }, [data, title]);

  return <canvas ref={canvasRef} className="h-72 w-full" />;
};
export default AnalyticsChart;
