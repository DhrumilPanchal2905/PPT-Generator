import PptxGenJS from 'pptxgenjs';
import html2canvas from 'html2canvas';

const generatePpt = async parsedData => {
  let pptx = new PptxGenJS();

  const addTableToSlide = (slide, tableData) => {
    let headers = tableData.headers;
    let rows = tableData.rows.map(row => row.columns);
    let table = [headers, ...rows];

    // Create table structure with headers and rows
    // let table = [headers, ...rows.map(row => row.columns)];

    let maxRowsPerSlide = 15;
    let slideIndex = 0;

    while (table.length > 0) {
      let currentTable = table.slice(0, maxRowsPerSlide);
      table = table.slice(maxRowsPerSlide);

      if (slideIndex > 0) {
        slide = pptx.addSlide();
      }

      slide.addTable(
        currentTable.map((row, rowIndex) =>
          row.map((col, colIndex) => ({
            text: col,
            options: {
              fill:
                rowIndex === 0 && slideIndex === 0
                  ? (tableData.headerBackgroundColors &&
                      tableData.headerBackgroundColors[colIndex]) ||
                    'ffffff'
                  : tableData.rows[rowIndex - 1]?.backgroundColor || 'ffffff',
              color: '000000',
              align: rowIndex === 0 && slideIndex === 0 ? 'center' : 'left', // Center align headers, left align others
              bold: rowIndex === 0 && slideIndex === 0 ? true : false, // Bold headers, regular font for other cells
              fontSize: rowIndex === 0 && slideIndex === 0 ? 8 : 6, // Font size 14 for headers, font size 12 for other cells
              border: { pt: '1', color: '000000' }
            }
          }))
        ),
        { x: 0.5, y: 2.0, w: 6.0, colW: new Array(headers.length).fill(2) }
      );

      slideIndex++;
    }
  };

  for (let slideData of parsedData.slides) {
    let slide = pptx.addSlide();
    slide.addText(slideData.heading, {
      x: 0.5,
      y: 0.5,
      fontSize: 18,
      align: 'center',
      bold: true
    });
    if (slideData.heading2) {
      slide.addText(slideData.heading2, {
        x: 0.5,
        y: 1.0,
        fontSize: 14,
        align: 'center'
      });
    }
    if (slideData.data && Object.keys(slideData.data).length > 0) {
      let chartImage = await generateChartImage(slideData.chartId);
      if (chartImage) {
        slide.addImage({ data: chartImage, x: 1.0, y: 1.5, w: 5.5, h: 3.0 });
      }
    }
    if (slideData.table) {
      addTableToSlide(slide, slideData.table);
    }
  }

  pptx.writeFile({ fileName: 'presentation.pptx' });
};

const generateChartImage = async chartId => {
  try {
    const chartElement = document.getElementById(chartId);
    if (!chartElement) {
      throw new Error(`Chart element with id ${chartId} not found`);
    }
    const canvas = await html2canvas(chartElement, {
      width: chartElement.offsetWidth,
      height: chartElement.offsetHeight + 50
    });
    const imageUrl = canvas.toDataURL('image/png');
    return imageUrl;
  } catch (error) {
    console.error('Failed to generate chart image', error);
    return '';
  }
};

export default generatePpt;
