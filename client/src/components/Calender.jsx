// Calender.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styles

const Calender = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="p-4 max-w-md mx-auto dark:bg-gray-900 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">📅 TMS Calendar</h2>
      <Calendar
        className="dark:bg-gray-900 bg-white dark:text-white"
        onChange={setValue}
        value={value}
      />
      <p className="mt-4 text-center dark:text-white">
        Selected Date: <strong>{value.toDateString()}</strong>
      </p>
    </div>
  );
};

export default Calender;
