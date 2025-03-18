import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const data = [
  {
    _id: "65c5bbf3787832cf99f28e6d",
    team: ["65c202d4aa62f32ffd1303cc", "65c27a0e18c0a1b750ad5cad"],
    text: "New task assigned to you. Priority: Normal.",
    notiType: "alert",
    createdAt: "2024-02-09T05:45:23.353Z",
  },
  {
    _id: "65c5f12ab5204a81bde866ab",
    team: ["65c202d4aa62f32ffd1303cc"],
    text: "New high-priority task assigned. Check now!",
    notiType: "alert",
    createdAt: "2024-02-09T09:32:26.810Z",
  },
];

const ICONS = {
  alert: (
    <HiBellAlert className="h-5 w-5 text-gray-300 group-hover:text-indigo-400" />
  ),
  message: (
    <BiSolidMessageRounded className="h-5 w-5 text-gray-300 group-hover:text-indigo-400" />
  ),
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center outline-none">
        <div className="w-11 h-11 flex items-center justify-center text-gray-200 relative">
          <IoIosNotificationsOutline className="text-3xl" />

          {data?.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 text-xs text-white font-semibold w-5 h-5 flex items-center justify-center rounded-full bg-red-600">
              {data.length}
            </span>
          )}
        </div>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -right-14 md:-right-2 z-10 mt-5 flex w-screen max-w-md px-4">
          {({ close }) =>
            data?.length > 0 && (
              <div className="w-full flex-auto overflow-hidden rounded-2xl bg-gray-800 text-sm text-gray-300 shadow-lg ring-1 ring-gray-700">
                <div className="p-4">
                  {data.slice(0, 5).map((item, index) => (
                    <div
                      key={item._id + index}
                      className="group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-700 transition"
                    >
                      <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-700">
                        {ICONS[item.notiType]}
                      </div>

                      <div>
                        <div className="flex items-center gap-3 font-semibold text-gray-200">
                          <p>{item.notiType}</p>
                          <span className="text-xs font-normal text-gray-400">
                            {moment(item.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-600 bg-gray-700">
                  <Link
                    onClick={() => close()}
                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-400 hover:bg-gray-600 transition"
                  >
                    Close
                  </Link>
                  <Link
                    onClick={() => console.log("Mark all as read")}
                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-400 hover:bg-gray-600 transition"
                  >
                    Mark All Read
                  </Link>
                </div>
              </div>
            )
          }
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NotificationPanel;
