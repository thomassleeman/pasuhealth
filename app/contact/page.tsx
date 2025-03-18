// app/contact/page.tsx
import { ContactForm } from "@/components/contactForm/ContactForm";

export default async function ContactPage({
  searchParams,
}: {
  //Seems like the TypeScript type definitions haven't been updated to match Next.js 15's runtime behavior. Update type definition temporarily until Next.js updates their types
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> & {
    [key: string]: string | string[] | undefined;
  };
}) {
  const params = await searchParams;
  const success = params.success === "true";
  const error = params.error as string | undefined;

  return (
    <div className="max-w-md mx-auto p-6 my-8">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <ContactForm success={success} error={error} />
    </div>
  );
}
