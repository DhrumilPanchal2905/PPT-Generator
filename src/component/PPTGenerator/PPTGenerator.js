'use client'

import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent';
import generatePpt from './generatePpt.js';

const PPTGenerator = () => {
  const jsonData = `{
    "title": "Sales Report",
    "slides": [
      {
        "heading": "Q1 Sales",
        "data": {},
        "labels": [],
        "colorLabels": {},
        "colors": {},
        "chartId": "chart-1"
      },
      {
        "heading": "YARN DIVISION",
        "heading2": "ESTIMATED AIRTEX UKG",
        "data": {
          "MRPL": {
            "values": [7.5, 6.6, 4.7],
            "colors": ["RED", "BLUE", "GREEN"]
          },
          "MTS": {
            "values": [2.5, 0.0, 0.0],
            "colors": ["RED", "BLUE", "GREEN"]
          },
          "MTD": {
            "values": [4.1, 3.7, 3.1],
            "colors": ["RED", "BLUE", "GREEN"]
          },
          "AVG": {
            "values": [4.0, 3.9, 3.2],
            "colors": ["RED", "BLUE", "GREEN"]
          }
        },
        "labels": ["MRPL", "MTS", "MTD", "AVG"],
        "colorLabels": {
          "JAN": "RED",
          "FEB": "BLUE",
          "MAR": "GREEN"
        },
        "colors": {
          "RED": "rgba(255, 0, 0, 0.4)",
          "BLUE": "rgba(0, 0, 255, 0.4)",
          "GREEN": "rgba(0, 255, 0, 0.4)"
        },
        "chartId": "chart-0"
      },
      {
        "heading": "Q2 Sales",
        "data": {},
        "labels": [],
        "colorLabels": {},
        "colors": {},
        "chartId": "chart-1"
      },
      {
        "heading": "Sales Data",
        "heading2": "Below data is IMP",
        "data": {
          "MRPL": {
            "values": [5, 5, 2.5],
            "colors": ["GREEN", "BLUE", "GREEN"]
          },
          "MTS": {
            "values": [2.5, 1.2, 0.0],
            "colors": ["BLUE", "BLUE", "GREEN"]
          },
          "MTD": {
            "values": [4.1, 3.7, 3.1],
            "colors": ["RED", "BLUE", "GREEN"]
          },
          "AVG": {
            "values": [4.0, 3.9, 3.2],
            "colors": ["RED", "BLUE", "GREEN"]
          }
        },
        "labels": ["MRPL", "MTS", "MTD", "AVG"],
        "colorLabels": {
          "APR": "RED",
          "MAY": "BLUE",
          "JUN": "GREEN"
        },
        "colors": {
          "RED": "rgba(255, 0, 0, 0.4)",
          "BLUE": "rgba(0, 0, 255, 0.4)",
          "GREEN": "rgba(0, 255, 0, 0.4)"
        },
        "chartId": "chart-2"
      },
      {
        "heading": "Yarn Division",
        "heading2": "Estimated MTD Pie Chart",
        "table": {
          "headers": ["MTD FIGURE", "MAY.24", "APR.24", "FEB.24"],
           "headerBackgroundColors": ["F8E8EE", "FFF1DC", "FFCEFE", "AAC4FF"],
          "rows": [
            {"columns": ["WORKING EFF.", "72.0%", "74.0%", "77.0%"], "backgroundColor": "D0F5BE"},
            {"columns": ["NET EFFICIENCY (IN %)", "44.9%", "46.6%", "65.8%"], "backgroundColor": "FFFFFF"},
            {"columns": ["PROGRAM SHORT", "35.0%", "37.4%", "11.8%"], "backgroundColor": "FFFFFF"},
            {"columns": ["OTHER", "8.8%", "13.5%", "14.9%"], "backgroundColor": "FFFFFF"},
            {"columns": ["CHANGE OVER", "3.8%", "0.6%", "1.6%"], "backgroundColor": "FFFFFF"},
            {"columns": ["POWER", "2.9%", "0.6%", "1.6%"], "backgroundColor": "FFFFFF"},
            {"columns": ["IDLE SPINDLE", "2.9%", "0.5%", "0.8%"], "backgroundColor": "FFFFFF"},
            {"columns": ["SAMPLING", "2.6%", "0.5%", "1.4%"], "backgroundColor": "FFFFFF"},
            {"columns": ["POY SHORT", "1.1%", "0.2%", "0.4%"], "backgroundColor": "FFFFFF"},
            {"columns": ["MAINTENANCE", "0.5%", "0.1%", "0.4%"], "backgroundColor": "FFFFFF"},
            {"columns": ["MAINTENANCE", "0.5%", "0.1%", "0.4%"], "backgroundColor": "FFFFFF"},
            {"columns": ["MAINTENANCE", "0.5%", "0.1%", "0.4%"], "backgroundColor": "FFFFFF"},
            {"columns": ["MAINTENANCE", "0.5%", "0.1%", "0.4%"], "backgroundColor": "FFFFFF"}
          ]
        }
      }
    ]
  }`;

  const parsedData = JSON.parse(jsonData);
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setChartsReady(true), 1000); // Allow some time for charts to render
  }, []);

  const renderSlideContent = slide => {
    if (slide.table) {
      return (
        <>
          <h2 style={{ textDecoration: 'underline', textAlign: 'center' }}>
            {slide.heading}
          </h2>
          {slide.heading2 && (
            <h3 style={{ textAlign: 'center' }}>{slide.heading2}</h3>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px'
            }}>
            <table
              style={{
                borderCollapse: 'collapse',
                width: '80%',
                // backgroundColor: '#FFFFFF',
                // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px'
              }}>
              <thead>
                <tr>
                  {slide.table.headers.map((header, index) => (
                    <th
                      key={index}
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor:
                          `#${slide.table.headerBackgroundColors[index]}` ||
                          '#ffff'
                      }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.table.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      backgroundColor: row.backgroundColor
                        ? `#${row.backgroundColor}`
                        : 'white'
                    }}>
                    {row.columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        style={{ border: '1px solid black', padding: '8px' }}>
                        {col}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    if (!slide.data || Object.keys(slide.data).length === 0) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
          <h2>{slide.heading}</h2>
        </div>
      );
    } else {
      return (
        <>
          <h2 style={{ textDecoration: 'underline', textAlign: 'center' }}>
            {slide.heading}
          </h2>
          {slide.heading2 && (
            <h3 style={{ textAlign: 'center' }}>{slide.heading2}</h3>
          )}
          <div
            style={{
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#FFFFFF',
              // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '16px'
            }}>
            <ChartComponent
              data={slide.data}
              labels={slide.labels}
              colorLabels={slide.colorLabels}
              colors={slide.colors}
              chartId={slide.chartId}
            />
          </div>
        </>
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        // backgroundColor: '#F0F0F0',
        // boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {parsedData.title}
      </h1>
      {parsedData.slides.map((slide, index) => (
        <div
          key={index}
          style={{
            marginBottom: '40px',
            borderBottom:
              index !== parsedData.slides.length - 1
                ? '1px solid #CCCCCC'
                : 'none',
            paddingBottom: '20px'
          }}>
          {renderSlideContent(slide)}
        </div>
      ))}
      <button
        style={{
          display: 'block',
          margin: 'auto',
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: chartsReady ? '#4CAF50' : '#CCCCCC',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '4px',
          cursor: chartsReady ? 'pointer' : 'not-allowed'
        }}
        onClick={() => chartsReady && generatePpt(parsedData)}>
        Generate PPT
      </button>
    </div>
  );
};

export default PPTGenerator;
