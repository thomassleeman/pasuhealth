import { ReactNode } from "react";

export default function FullWidthContainerTopToBottom({
  children,
  bg,
}: {
  children: ReactNode;
  bg: string;
}) {
  return (
    <div className={`${bg} w-full overflow-hidden rounded-b-3xl mt-20`}>
      {children}
    </div>
  );
}
