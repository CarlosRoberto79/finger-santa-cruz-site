import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  className = "",
  titleId,
}: SectionHeadingProps) {
  return (
    <div className={`space-y-5 ${className}`}>
      <p className="text-[0.62rem] font-bold uppercase tracking-normal text-[#C44E2A]">
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="font-display text-[2.35rem] font-[500] leading-[1] text-[#252422] sm:text-5xl sm:leading-[0.98] lg:text-6xl"
      >
        {title}
      </h2>
      {children ? (
        <div className="max-w-2xl font-display text-lg font-light leading-8 text-[#403D39]/76 sm:text-xl sm:leading-9">
          {children}
        </div>
      ) : null}
    </div>
  );
}
