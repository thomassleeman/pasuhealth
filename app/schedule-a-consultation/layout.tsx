// app/schedule-a-consultation/layout.tsx
import FullWidthContainerTopToBottom from "@/components/containers/FullWidthContainerTopToBottom";

export default function ScheduleConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FullWidthContainerTopToBottom bg="bg-amber-50">
      {children}
    </FullWidthContainerTopToBottom>
  );
}
