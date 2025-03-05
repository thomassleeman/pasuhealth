import { ReactNode } from "react";

export default function Container({
  children,
  bg,
}: {
  children: ReactNode;
  bg: string;
}) {
  return <div className={`${bg} w-full overflow-hidden`}>{children}</div>;
}
