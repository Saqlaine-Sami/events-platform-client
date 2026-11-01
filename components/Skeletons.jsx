export function EventCardSkeleton() {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-md">
      <div className="skeleton h-48 w-full rounded-b-none" />
      <div className="card-body gap-3">
        <div className="skeleton h-5 w-20" />
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-2/5" />
        <div className="skeleton h-10 w-full mt-2" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <div className="skeleton h-10 w-1/2" />
      <div className="skeleton h-6 w-full" />
      <div className="skeleton h-6 w-5/6" />
      <div className="skeleton h-64 w-full" />
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2">
      <div className="skeleton h-80 w-full" />
      <div className="space-y-4">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-10 w-3/4" />
        <div className="skeleton h-5 w-1/2" />
        <div className="skeleton h-5 w-1/3" />
        <div className="skeleton h-28 w-full" />
        <div className="skeleton h-12 w-full" />
      </div>
    </div>
  );
}