"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

interface Option {
  id: string;
  name: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  selected: Option;
  onChange: (option: Option) => void;
  required?: boolean;
}

export default function CustomSelect({
  label,
  options,
  selected,
  onChange,
  required = false,
}: CustomSelectProps) {
  return (
    <Listbox value={selected} onChange={onChange}>
      {() => (
        <div>
          <Listbox.Label className="block text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="grid w-full cursor-default grid-cols-1 rounded-md bg-transparent py-2 pr-2 pl-3 text-left text-gray-900 border-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none">
              <span className="col-start-1 row-start-1 truncate pr-6">
                {selected.name}
              </span>
              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </Listbox.Button>
            <Transition
              as="div"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    value={option}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-8 pr-4 ${
                        active ? "bg-emerald-600 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={`block whitespace-normal ${selected ? "font-semibold" : "font-normal"}`}
                        >
                          {option.name}
                        </span>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-1.5 ${
                              active ? "text-white" : "text-emerald-600"
                            }`}
                          >
                            <CheckIcon className="size-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
