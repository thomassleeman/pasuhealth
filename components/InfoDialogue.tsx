import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface InfoDialogueProps {
  label?: string;
  title: string;
  description: string;
  content: string;
}

export default function InfoDialogue({
  label,
  title,
  description,
  content,
}: InfoDialogueProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:cursor-pointer"
      >
        <InformationCircleIcon className="h-5 w-5 text-gray-500" />
        <span className="text-sm font-medium">{label}</span>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <Description>{description}</Description>
            <p>{content}</p>
            <div className="flex gap-4">
              <button
                className="px-2 py-1 rounded-lg border border-gray-600 hover:cursor-pointer hover:text-gray-700 hover:border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
