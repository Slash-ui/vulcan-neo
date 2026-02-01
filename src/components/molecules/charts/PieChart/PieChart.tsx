import React, { forwardRef, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Typography } from '../../../foundation/Typography';
import styles from './PieChart.module.css';

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chart data
   */
  data: PieChartDataPoint[];
  /**
   * Chart width
   * @default 400
   */
  width?: number;
  /**
   * Chart height
   * @default 400
   */
  height?: number;
  /**
   * Inner radius for donut chart (0 for pie)
   * @default 0
   */
  innerRadius?: number;
  /**
   * Show labels on slices
   * @default true
   */
  showLabels?: boolean;
  /**
   * Show legend
   * @default true
   */
  showLegend?: boolean;
  /**
   * Show percentage values
   * @default false
   */
  showPercentages?: boolean;
}

const defaultColors = ['#6C5CE7', '#00B894', '#E17055', '#0984E3', '#FDCB6E', '#A29BFE', '#55EFC4', '#FAB1A0'];

/**
 * PieChart - Neomorphic D3 pie/donut chart component
 */
export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      width = 400,
      height = 400,
      innerRadius = 0,
      showLabels = true,
      showLegend = true,
      showPercentages = false,
      className,
      ...props
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const radius = Math.min(width, height) / 2 - 20;

    useEffect(() => {
      if (!svgRef.current || !data.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const total = d3.sum(data, (d) => d.value);

      // Create pie generator
      const pie = d3.pie<PieChartDataPoint>()
        .value((d) => d.value)
        .sort(null);

      // Create arc generator
      const arc = d3.arc<d3.PieArcDatum<PieChartDataPoint>>()
        .innerRadius(innerRadius)
        .outerRadius(radius);

      // Create label arc
      const labelArc = d3.arc<d3.PieArcDatum<PieChartDataPoint>>()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.6);

      // Create group
      const g = svg
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      // Draw slices
      g.selectAll('.slice')
        .data(pie(data))
        .join('path')
        .attr('class', 'slice')
        .attr('d', arc)
        .attr('fill', (d, i) => d.data.color || defaultColors[i % defaultColors.length])
        .attr('stroke', 'var(--neo-bg)')
        .attr('stroke-width', 2);

      // Add labels
      if (showLabels) {
        g.selectAll('.label')
          .data(pie(data))
          .join('text')
          .attr('class', styles.label)
          .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .text((d) => {
            if (showPercentages) {
              const percent = ((d.data.value / total) * 100).toFixed(1);
              return `${percent}%`;
            }
            return d.data.label;
          });
      }
    }, [data, width, height, innerRadius, showLabels, showPercentages, radius]);

    const classNames = [
      styles.pieChart,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const total = d3.sum(data, (d) => d.value);

    return (
      <div ref={ref} className={classNames} {...props}>
        <svg ref={svgRef} width={width} height={height} />
        {showLegend && (
          <div className={styles.legend}>
            {data.map((item, i) => (
              <div key={item.label} className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ background: item.color || defaultColors[i % defaultColors.length] }}
                />
                <Typography variant="body2" className={styles.legendLabel}>{item.label}</Typography>
                <Typography variant="body2" color="secondary" className={styles.legendValue}>
                  {showPercentages
                    ? `${((item.value / total) * 100).toFixed(1)}%`
                    : item.value}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

PieChart.displayName = 'PieChart';
