'use client';

export type SkillPoint = { label: string; value: number };

export default function RadarSkillChart({ skills }: { skills: SkillPoint[] }) {
  const center = 150;
  const radius = 100;
  const point = (value: number, index: number, scale = radius) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / skills.length;
    const distance = (value / 100) * scale;
    return [center + Math.cos(angle) * distance, center + Math.sin(angle) * distance];
  };
  const polygon = (values: number[], scale = radius) => values.map((value, index) => point(value, index, scale).join(',')).join(' ');
  const rings = [25, 50, 75, 100];

  return <div className="radar-wrap"><svg className="radar-chart" viewBox="0 0 300 300" role="img" aria-label="Skill profile radar chart">
    {rings.map((ring) => <polygon key={ring} points={polygon(skills.map(() => ring), radius)} className="radar-ring" />)}
    {skills.map((skill, index) => { const [x, y] = point(100, index); const [labelX, labelY] = point(122, index); return <g key={skill.label}><line x1={center} y1={center} x2={x} y2={y} className="radar-axis" /><text x={labelX} y={labelY} className="radar-label" textAnchor="middle" dominantBaseline="middle">{skill.label}</text></g>; })}
    <polygon points={polygon(skills.map((skill) => skill.value))} className="radar-area" />
    {skills.map((skill, index) => { const [x, y] = point(skill.value, index); return <circle key={`${skill.label}-point`} cx={x} cy={y} r="4" className="radar-point" />; })}
  </svg><div className="radar-legend">{skills.map((skill) => <div key={`${skill.label}-legend`}><span>{skill.label}</span><strong>{skill.value}</strong></div>)}</div></div>;
}
