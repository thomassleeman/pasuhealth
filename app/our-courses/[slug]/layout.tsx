import FullWidthContainerTopToBottom from "@/components/containers/FullWidthContainerTopToBottom";

export default function OurCoursesLayout({
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
