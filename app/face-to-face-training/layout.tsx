import FullWidthContainerTopToBottom from "@/components/containers/FullWidthContainerTopToBottom";

export default function FaceToFaceTrainingLayout({
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
