import { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  color?: string;
};

export default function StatCard({ title, value, icon, color = 'blue' }: StatCardProps) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow border-l-4 border-${color}-500`}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500">{title}</h2>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  );
}
