import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected }) {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b border-gray-300 dark:border-gray-700">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium outline-none transition-all duration-200",
                  selected
                    ? "border-b-2 border-blue-600 text-blue-700 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
