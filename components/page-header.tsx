import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header>
      {eyebrow && <p className="label">{eyebrow}</p>}
      <h1 className="mt-4 max-w-[20ch] text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-[36px] lg:text-[40px]">
        {title}
      </h1>
      {children && (
        <div className="mt-6 max-w-[56ch] text-[15px] leading-7 text-muted sm:text-base">
          {children}
        </div>
      )}
    </header>
  );
}
