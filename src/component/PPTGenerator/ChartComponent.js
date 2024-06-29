'use client'
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const ChartComponent = ({ data, labels, colorLabels, colors, chartId }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !labels || labels.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    const datasets = labels.flatMap(label => {
      return data[label].values.map((value, idx) => ({
        label: '', // Remove any label to avoid showing null
        data: labels.map((_, i) =>
          i === labels.indexOf(label) ? value : null
        ),
        backgroundColor: colors[data[label].colors[idx]],
        borderColor: colors[data[label].colors[idx]].replace('0.4', '1'),
        borderWidth: 1,
        // barThickness: 60,
        // barPercentage: 0.5,
        // maxBarThickness: 0.5,
      }));
    });

    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.tooltips.enabled = false;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // MRPL, MTS, MTD, AVG, DEMO
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Labels'
            },
            ticks: {
              callback: function(value, index, ticks) {
                return labels[index % labels.length];
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Values'
            }
          }
        },
        animation: {
          onComplete: function() {
            const ctx = this.chart.ctx;
            ctx.font = '12px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'; // Align text to the middle for better display

            this.data.datasets.forEach(function(dataset) {
              dataset.data.forEach(function(value, index) {
                // Get the model (positioning info) for the current bar
                const model =
                  dataset._meta[Object.keys(dataset._meta)[0]].data[index]
                    ._model;
                if (value !== null) {
                  // Save the current context state
                  ctx.save();
                  // Translate to the position of the bar
                  ctx.translate(model.x, model.y - 5);
                  // Rotate the context to 45 degrees
                  // ctx.rotate((-45 * Math.PI) / 180);
                  // Draw the text
                  ctx.fillText(value, 0, 0);
                  // Restore the context to its original state
                  ctx.restore();
                }
              });
            });
          }
        },
        barThickness: 80, // Increase bar thickness
        barPercentage: 0.5, // Center the bars over the labels
        categoryPercentage: 0.5
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data, labels, colorLabels, colors]);

  if (!data || !labels || labels.length === 0) {
    return null;
  }

  return (
    <div id={chartId} style={{ width: '800px', height: '500px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10px'
        }}>
        {Object.keys(colorLabels).map(label => (
          <div key={label} style={{ margin: '0 10px' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: colors[colorLabels[label]],
                display: 'inline-block',
                marginRight: '5px'
              }}></div>
            {label}
          </div>
        ))}
      </div>
      <canvas ref={chartRef} width="800" height="500"></canvas>
    </div>
  );
};

export default ChartComponent;
