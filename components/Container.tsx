import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl 2xl:max-w-9/12">{children}</div>;
}
