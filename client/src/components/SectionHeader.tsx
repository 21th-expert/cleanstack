export default function SectionHeader({
  label, title, subtitle, center,
}: {
  label?: string; title: string; subtitle?: string; center?: boolean;
}) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {label && <span className="label">{label}</span>}
      <h2 className={`mt-3 heading-md leading-tight ${center ? 'mx-auto' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-neutral-500 leading-relaxed text-[15px] ${center ? 'max-w-lg mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
