'use client';

import Icon, { type IconName } from '@/components/Icon';

export type SkillPoint = { label: string; value: number; icon: IconName };

export default function RadarSkillChart({ skills, strongest }: { skills: SkillPoint[]; strongest?: string }) {
  const center = 150;
  const radius = 98;
  const point = (value: number, index: number, scale = radius) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / skills.length;
    const distance = (value / 100) * scale;
    return [center + Math.cos(angle) * distance, center + Math.sin(angle) * distance];
  };
  const polygon = (values: number[], scale = radius) => values.map((value, index) => point(value, index, scale).join(',')).join(' ');
  const rings = [25, 50, 75, 100];

  return <div className="radar-wrap"><svg className="radar-chart" viewBox="0 0 300 300" role="img" aria-label={skills.map((skill) => `${skill.label}: ${skill.value}`).join(', ')}>
    <defs><radialGradient id="radar-fill"><stop offset="0%" stopColor="#f16d59" stopOpacity=".12" /><stop offset="100%" stopColor="#f16d59" stopOpacity=".42" /></radialGradient></defs>
    {rings.map((ring) => <polygon key={ring} points={polygon(skills.map(() => ring), radius)} className={`radar-ring ${ring === 100 ? 'outer' : ''}`} />)}
    {skills.map((skill, index) => { const [x, y] = point(100, index); return <line key={skill.label} x1={center} y1={center} x2={x} y2={y} className="radar-axis" />; })}
    <g className="radar-shape"><polygon points={polygon(skills.map((skill) => skill.value))} className="radar-area" />
      {skills.map((skill, index) => { const [x, y] = point(skill.value, index); return <circle key={`${skill.label}-point`} cx={x} cy={y} r={skill.label === strongest ? 5.5 : 4} className={`radar-point ${skill.label === strongest ? 'is-top' : ''}`} />; })}</g>
    {skills.map((skill, index) => { const [x, y] = point(121, index); return <g key={`${skill.label}-icon`} className={`radar-icon ${skill.label === strongest ? 'is-top' : ''}`} transform={`translate(${x - 14} ${y - 14})`}><circle cx="14" cy="14" r="14" /><g transform="translate(6 6)"><Icon name={skill.icon} size={16} strokeWidth={2} /></g></g>; })}
  </svg><div className="radar-legend">{skills.map((skill, index) => <div className={skill.label === strongest ? 'is-top' : ''} key={`${skill.label}-legend`}><span className="legend-icon"><Icon name={skill.icon} size={14} /></span><span className="legend-label">{skill.label}</span><strong>{skill.value}</strong><span className="legend-bar"><span style={{ width: `${skill.value}%`, animationDelay: `${200 + index * 90}ms` }} /></span></div>)}</div></div>;
}
