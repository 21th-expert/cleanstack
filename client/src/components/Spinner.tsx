export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 rounded-full border-2 border-brand-100" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 animate-spin" />
      </div>
    </div>
  );
}
