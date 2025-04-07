import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

      {/* Chat Drawer */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-80 h-full bg-white shadow-2xl rounded-l-2xl flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
                  <h2 className="text-lg font-semibold">Chat Support</h2>
                  <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {/* Chat Body */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                  <p className="text-gray-500 text-center">No messages yet...</p>
                </div>
                {/* Chat Input */}
                <div className="border-t p-3 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                  />
                  <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
                    Send
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
