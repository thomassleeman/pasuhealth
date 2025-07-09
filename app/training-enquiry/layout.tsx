import FullWidthContainerTopToBottomNoFixedNav from "@/components/containers/FullWidthContainerTopToBottomNoFixedNav";

export default function TrainingEnquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FullWidthContainerTopToBottomNoFixedNav bg="bg-amber-50">
      {children}
    </FullWidthContainerTopToBottomNoFixedNav>
  );
}
