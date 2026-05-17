export function AppSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
          <div className="hidden gap-3 md:flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-16 animate-pulse rounded bg-muted"
              />
            ))}
          </div>
          <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-10 w-3/4 animate-pulse rounded-md bg-muted" />
          <div className="mx-auto mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
          <div className="mx-auto mt-2 h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
              <div className="mt-5 h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="mt-5 space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function TeamSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-14 text-center">
        <div className="mx-auto h-9 w-64 animate-pulse rounded-md bg-muted" />
        <div className="mx-auto mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
            <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="mt-5 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
            </div>
            <div className="mt-5 flex gap-3">
              <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-4 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
