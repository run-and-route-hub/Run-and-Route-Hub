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
  helper,
}: {
  label: string;
  value: string | number;
  // eslint-disable-next-line react/require-default-props
  helper?: string;
}) {
  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '0.75rem',
        padding: '0.85rem 1rem',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Label */}
      <p
        style={{
          fontSize: '0.9rem',
          fontWeight: 500,
          marginBottom: 4,
        }}
      >
        {label}
      </p>

      {/* Value */}
      <p
        style={{
          fontSize: '1.4rem',
          fontWeight: 600,
          marginBottom: helper ? 4 : 0,
        }}
      >
        {value}
      </p>

      {/* Helper */}
      {helper && (
        <p
          style={{
            fontSize: '0.85rem',
            color: '#666',
            margin: 0,
          }}
        >
          {helper}
        </p>
      )}
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
    <section
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      }}
    >
      <StatCard
        label="Miles this month"
        value={totalMilesMonth.toFixed(1)}
        helper="Total distance in the last 30 days"
      />
      <StatCard
        label="Runs this month"
        value={totalRunsMonth}
        helper="Sessions logged"
      />
      <StatCard
        label="Avg pace"
        value={avgPace}
        helper="Per mile over all runs"
      />
      <StatCard
        label="Fastest mile"
        value={fastestMile}
        helper="Best recorded split"
      />
      <StatCard
        label="Streak"
        value={`${streakDays} days`}
        helper="Consecutive active days"
      />
    </section>
  );
}
