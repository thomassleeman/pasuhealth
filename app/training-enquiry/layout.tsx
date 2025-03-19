import FullWidthContainerTopToBottom from "@/components/containers/FullWidthContainerTopToBottom";

export default function TrainingEnquiryLayout({
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
