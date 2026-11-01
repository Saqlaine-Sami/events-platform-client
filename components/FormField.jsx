export default function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      {children}
      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  );
}