import React, { forwardRef, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import styles from './LineChart.module.css';

export interface LineChartDataPoint {
  x: number | Date;
  y: number;
}

export interface LineChartSeries {
  name: string;
  data: LineChartDataPoint[];
  color?: string;
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chart data series
   */
  data: LineChartSeries[];
  /**
   * Chart width
   * @default 600
   */
  width?: number;
  /**
   * Chart height
   * @default 400
   */
  height?: number;
  /**
   * Show grid lines
   * @default true
   */
  showGrid?: boolean;
  /**
   * Show legend
   * @default true
   */
  showLegend?: boolean;
  /**
   * Show dots on data points
   * @default true
   */
  showDots?: boolean;
  /**
   * Enable area fill
   * @default false
   */
  areaFill?: boolean;
  /**
   * X-axis label
   */
  xAxisLabel?: string;
  /**
   * Y-axis label
   */
  yAxisLabel?: string;
  /**
   * Curve type
   * @default 'monotone'
   */
  curveType?: 'linear' | 'monotone' | 'step';
}

const defaultColors = ['#6C5CE7', '#00B894', '#E17055', '#0984E3', '#FDCB6E'];

/**
 * LineChart - Neomorphic D3 line chart component
 */
export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      width = 600,
      height = 400,
      showGrid = true,
      showLegend = true,
      showDots = true,
      areaFill = false,
      xAxisLabel,
      yAxisLabel,
      curveType = 'monotone',
      className,
      ...props
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const margin = useMemo(() => ({ top: 20, right: 30, bottom: 50, left: 60 }), []);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
      if (!svgRef.current || !data.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      // Get all data points
      const allPoints = data.flatMap((s) => s.data);
      const xValues = allPoints.map((d) => d.x);
      const yValues = allPoints.map((d) => d.y);

      // Create scales
      const xScale = xValues[0] instanceof Date
        ? d3.scaleTime()
            .domain(d3.extent(xValues as Date[]) as [Date, Date])
            .range([0, innerWidth])
        : d3.scaleLinear()
            .domain(d3.extent(xValues as number[]) as [number, number])
            .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([0, (d3.max(yValues) || 0) * 1.1])
        .nice()
        .range([innerHeight, 0]);

      // Create group
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Grid lines
      if (showGrid) {
        g.append('g')
          .attr('class', styles.grid)
          .call(
            d3.axisLeft(yScale)
              .tickSize(-innerWidth)
              .tickFormat(() => '')
          );

        g.append('g')
          .attr('class', styles.grid)
          .attr('transform', `translate(0,${innerHeight})`)
          .call(
            d3.axisBottom(xScale as d3.AxisScale<d3.NumberValue>)
              .tickSize(-innerHeight)
              .tickFormat(() => '')
          );
      }

      // Line generator
      const getCurve = () => {
        switch (curveType) {
          case 'linear': return d3.curveLinear;
          case 'step': return d3.curveStep;
          default: return d3.curveMonotoneX;
        }
      };

      const line = d3.line<LineChartDataPoint>()
        .x((d) => xScale(d.x as number) as number)
        .y((d) => yScale(d.y))
        .curve(getCurve());

      // Area generator
      const area = d3.area<LineChartDataPoint>()
        .x((d) => xScale(d.x as number) as number)
        .y0(innerHeight)
        .y1((d) => yScale(d.y))
        .curve(getCurve());

      // Draw series
      data.forEach((series, i) => {
        const color = series.color || defaultColors[i % defaultColors.length];

        // Area fill
        if (areaFill) {
          g.append('path')
            .datum(series.data)
            .attr('fill', color)
            .attr('fill-opacity', 0.1)
            .attr('d', area);
        }

        // Line
        g.append('path')
          .datum(series.data)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 2.5)
          .attr('d', line);

        // Dots
        if (showDots) {
          g.selectAll(`.dot-${i}`)
            .data(series.data)
            .join('circle')
            .attr('class', `dot-${i}`)
            .attr('cx', (d) => xScale(d.x as number) as number)
            .attr('cy', (d) => yScale(d.y))
            .attr('r', 4)
            .attr('fill', 'var(--neo-bg)')
            .attr('stroke', color)
            .attr('stroke-width', 2);
        }
      });

      // X-axis
      g.append('g')
        .attr('class', styles.axis)
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale as d3.AxisScale<d3.NumberValue>));

      // Y-axis
      g.append('g')
        .attr('class', styles.axis)
        .call(d3.axisLeft(yScale));

      // X-axis label
      if (xAxisLabel) {
        g.append('text')
          .attr('class', styles.axisLabel)
          .attr('x', innerWidth / 2)
          .attr('y', innerHeight + 40)
          .attr('text-anchor', 'middle')
          .text(xAxisLabel);
      }

      // Y-axis label
      if (yAxisLabel) {
        g.append('text')
          .attr('class', styles.axisLabel)
          .attr('transform', 'rotate(-90)')
          .attr('x', -innerHeight / 2)
          .attr('y', -45)
          .attr('text-anchor', 'middle')
          .text(yAxisLabel);
      }
    }, [data, width, height, showGrid, showDots, areaFill, xAxisLabel, yAxisLabel, curveType, innerWidth, innerHeight, margin]);

    const classNames = [
      styles.lineChart,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        <svg ref={svgRef} width={width} height={height} />
        {showLegend && data.length > 1 && (
          <div className={styles.legend}>
            {data.map((series, i) => (
              <div key={series.name} className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ background: series.color || defaultColors[i % defaultColors.length] }}
                />
                <span className={styles.legendLabel}>{series.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

LineChart.displayName = 'LineChart';
