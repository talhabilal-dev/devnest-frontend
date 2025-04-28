export function DashboardHeader({ heading, text, children }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {heading}
        </h1>
        {text && <p className="text-gray-400">{text}</p>}
      </div>
      {children}
    </div>
  );
}
