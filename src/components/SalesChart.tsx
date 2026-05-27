import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Datum = { label: string; value: number };

export function SalesChart({ data, color = "#a855f7" }: { data: Datum[]; color?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = ref.current.clientWidth;
    const height = 280;
    const margin = { top: 20, right: 16, bottom: 30, left: 40 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) ?? 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const grad = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "barGrad")
      .attr("x1", "0").attr("y1", "0").attr("x2", "0").attr("y2", "1");
    grad.append("stop").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", 1);
    grad.append("stop").attr("offset", "100%").attr("stop-color", color).attr("stop-opacity", 0.3);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .style("fill", "currentColor")
      .style("font-size", "11px");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("fill", "currentColor")
      .style("font-size", "11px");

    svg.selectAll(".domain, .tick line").style("stroke", "currentColor").style("opacity", 0.2);

    svg
      .selectAll("rect.bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label)!)
      .attr("width", x.bandwidth())
      .attr("y", height - margin.bottom)
      .attr("height", 0)
      .attr("rx", 6)
      .attr("fill", "url(#barGrad)")
      .transition()
      .duration(800)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => height - margin.bottom - y(d.value));
  }, [data, color]);

  return <svg ref={ref} width="100%" height="280" className="text-foreground" />;
}

export function DonutChart({ data }: { data: Datum[] }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = 280;
    const height = 280;
    const radius = Math.min(width, height) / 2;
    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);
    const colors = ["#a855f7", "#06b6d4", "#ec4899", "#f59e0b", "#22d3ee"];
    const pie = d3.pie<Datum>().value((d) => d.value).sort(null);
    const arc = d3.arc<d3.PieArcDatum<Datum>>().innerRadius(radius * 0.6).outerRadius(radius - 4);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (_d, i) => colors[i % colors.length])
      .attr("stroke", "var(--background)")
      .attr("stroke-width", 3)
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 1);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("fill", "currentColor")
      .style("font-size", "22px")
      .style("font-weight", "700")
      .text(d3.sum(data, (d) => d.value));
  }, [data]);

  return <svg ref={ref} width="280" height="280" className="text-foreground mx-auto" />;
}