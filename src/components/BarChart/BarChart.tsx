import React, { forwardRef, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import styles from './BarChart.module.css';

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chart data
   */
  data: BarChartDataPoint[];
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
   * Horizontal bar chart
   * @default false
   */
  horizontal?: boolean;
  /**
   * Show grid lines
   * @default true
   */
  showGrid?: boolean;
  /**
   * Show values on bars
   * @default false
   */
  showValues?: boolean;
  /**
   * Bar border radius
   * @default 4
   */
  borderRadius?: number;
  /**
   * X-axis label
   */
  xAxisLabel?: string;
  /**
   * Y-axis label
   */
  yAxisLabel?: string;
  /**
   * Default bar color
   * @default '#6C5CE7'
   */
  color?: string;
}

/**
 * BarChart - Neomorphic D3 bar chart component
 */
export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      width = 600,
      height = 400,
      horizontal = false,
      showGrid = true,
      showValues = false,
      borderRadius = 4,
      xAxisLabel,
      yAxisLabel,
      color = '#6C5CE7',
      className,
      ...props
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const margin = useMemo(() => ({ top: 20, right: 30, bottom: 50, left: horizontal ? 100 : 60 }), [horizontal]);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
      if (!svgRef.current || !data.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      // Create scales
      const xScale = horizontal
        ? d3.scaleLinear()
            .domain([0, (d3.max(data, (d) => d.value) || 0) * 1.1])
            .nice()
            .range([0, innerWidth])
        : d3.scaleBand<string>()
            .domain(data.map((d) => d.label))
            .range([0, innerWidth])
            .padding(0.3);

      const yScale = horizontal
        ? d3.scaleBand<string>()
            .domain(data.map((d) => d.label))
            .range([0, innerHeight])
            .padding(0.3)
        : d3.scaleLinear()
            .domain([0, (d3.max(data, (d) => d.value) || 0) * 1.1])
            .nice()
            .range([innerHeight, 0]);

      // Create group
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Grid lines
      if (showGrid) {
        if (horizontal) {
          g.append('g')
            .attr('class', styles.grid)
            .call(
              d3.axisBottom(xScale as d3.ScaleLinear<number, number>)
                .tickSize(innerHeight)
                .tickFormat(() => '')
            );
        } else {
          g.append('g')
            .attr('class', styles.grid)
            .call(
              d3.axisLeft(yScale as d3.ScaleLinear<number, number>)
                .tickSize(-innerWidth)
                .tickFormat(() => '')
            );
        }
      }

      // Draw bars
      if (horizontal) {
        g.selectAll('.bar')
          .data(data)
          .join('rect')
          .attr('class', 'bar')
          .attr('x', 0)
          .attr('y', (d) => (yScale as d3.ScaleBand<string>)(d.label)!)
          .attr('width', (d) => (xScale as d3.ScaleLinear<number, number>)(d.value))
          .attr('height', (yScale as d3.ScaleBand<string>).bandwidth())
          .attr('fill', (d) => d.color || color)
          .attr('rx', borderRadius);

        if (showValues) {
          g.selectAll('.value')
            .data(data)
            .join('text')
            .attr('class', styles.value)
            .attr('x', (d) => (xScale as d3.ScaleLinear<number, number>)(d.value) + 5)
            .attr('y', (d) => (yScale as d3.ScaleBand<string>)(d.label)! + (yScale as d3.ScaleBand<string>).bandwidth() / 2)
            .attr('dy', '0.35em')
            .text((d) => d.value);
        }
      } else {
        g.selectAll('.bar')
          .data(data)
          .join('rect')
          .attr('class', 'bar')
          .attr('x', (d) => (xScale as d3.ScaleBand<string>)(d.label)!)
          .attr('y', (d) => (yScale as d3.ScaleLinear<number, number>)(d.value))
          .attr('width', (xScale as d3.ScaleBand<string>).bandwidth())
          .attr('height', (d) => innerHeight - (yScale as d3.ScaleLinear<number, number>)(d.value))
          .attr('fill', (d) => d.color || color)
          .attr('rx', borderRadius);

        if (showValues) {
          g.selectAll('.value')
            .data(data)
            .join('text')
            .attr('class', styles.value)
            .attr('x', (d) => (xScale as d3.ScaleBand<string>)(d.label)! + (xScale as d3.ScaleBand<string>).bandwidth() / 2)
            .attr('y', (d) => (yScale as d3.ScaleLinear<number, number>)(d.value) - 5)
            .attr('text-anchor', 'middle')
            .text((d) => d.value);
        }
      }

      // X-axis
      g.append('g')
        .attr('class', styles.axis)
        .attr('transform', `translate(0,${innerHeight})`)
        .call(
          horizontal
            ? d3.axisBottom(xScale as d3.ScaleLinear<number, number>)
            : d3.axisBottom(xScale as d3.ScaleBand<string>)
        );

      // Y-axis
      g.append('g')
        .attr('class', styles.axis)
        .call(
          horizontal
            ? d3.axisLeft(yScale as d3.ScaleBand<string>)
            : d3.axisLeft(yScale as d3.ScaleLinear<number, number>)
        );

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
    }, [data, width, height, horizontal, showGrid, showValues, borderRadius, color, xAxisLabel, yAxisLabel, innerWidth, innerHeight, margin]);

    const classNames = [
      styles.barChart,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        <svg ref={svgRef} width={width} height={height} />
      </div>
    );
  }
);

BarChart.displayName = 'BarChart';
