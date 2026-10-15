export default function MarqueeBar() {
  const items = [
    'Oil & Gas', 'Power & Energy', 'Marine & Offshore', 'Construction & Infrastructure',
    'Metals & Fabrication', 'Industrial Maintenance', 'Project Procurement',
    'Shutdown Support', 'Quality Assurance', 'Global Supply Chain',
  ];
  // duplicate for infinite scroll
  const all = [...items, ...items];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
