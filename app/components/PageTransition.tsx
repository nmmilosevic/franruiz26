"use client";

import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();

  return (
    <div key={pathname} className="load-veil" aria-hidden="true">
      <span><i /><i /><i /><i /></span>
      <span><i /><i /><i /><i /></span>
      <span><i /><i /><i /><i /></span>
      <span><i /><i /><i /><i /></span>
      <span><i /><i /><i /><i /></span>
    </div>
  );
}
