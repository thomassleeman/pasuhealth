import FullWidthContainerTopToBottom from "@/components/containers/FullWidthContainerTopToBottom";

export default function ContactLayout({
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
