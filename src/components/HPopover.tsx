import { Popover, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

const HPopover = ({
  PopoverBtn,
  children,
}: {
  PopoverBtn: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Popover className="relative">
      <Popover.Button>{PopoverBtn}</Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-5 mt-5">
          <div className="overflow-hidden rounded-lg bg-white p-5 shadow-lg">
            {children}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
export default HPopover;
