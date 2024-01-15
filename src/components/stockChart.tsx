import * as d3 from "d3";
import { useRef, useEffect } from "react";

interface LinePlotProps {
  data: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: LinePlotProps) {
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  // Add a check for data existence and non-empty
  const extent = data && data.length > 0 ? d3.extent(data) : [0, 0];

  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight],
  );
  const y = d3.scaleLinear(extent as [number, number], [
    height - marginBottom,
    marginTop,
  ]);
  const line = d3
    .line<number>()
    .x((d, i) => x(i))
    .y((d) => y(d));

  useEffect(() => void d3.select(gx.current!).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current!).call(d3.axisLeft(y)), [gy, y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line!(data) as string}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
