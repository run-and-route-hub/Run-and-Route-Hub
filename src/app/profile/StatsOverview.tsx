export type StatsOverviewProps = {
  totalMilesMonth: number;
  totalRunsMonth: number;
  avgPace: string;
  fastestMile: string;
  streakDays: number;
};

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-gray-900 to-gray-400" />
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

export default function StatsOverview({
  totalMilesMonth,
  totalRunsMonth,
  avgPace,
  fastestMile,
  streakDays,
}: StatsOverviewProps) {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard
        label="Miles this month"
        value={totalMilesMonth.toFixed(1)}
      />
      <StatCard
        label="Runs this month"
        value={totalRunsMonth}
      />
      <StatCard
        label="Avg pace"
        value={avgPace}
      />
      <StatCard
        label="Fastest Mile"
        value={fastestMile}
      />
      <StatCard
        label="Streak"
        value={`${streakDays} days`}
      />
    </section>
  );
}
