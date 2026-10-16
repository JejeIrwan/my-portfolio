import { AppWindow, Cloud, Database, Gauge, MonitorSmartphone, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Service, ServiceIcon } from "@/lib/site";

const icons: Record<ServiceIcon, LucideIcon> = {
  app: AppWindow,
  responsive: MonitorSmartphone,
  server: Server,
  database: Database,
  cloud: Cloud,
  gauge: Gauge,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  return (
    <div className="flex h-full min-h-[168px] flex-col rounded-xl border border-border bg-card p-6">
      <Icon size={20} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
      <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{service.title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-muted">{service.description}</p>
    </div>
  );
}
