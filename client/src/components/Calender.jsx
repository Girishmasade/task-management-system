// Calender.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styles

const Calender = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">📅 TMS Calendar</h2>
      <Calendar
        onChange={setValue}
        value={value}
      />
      <p className="mt-4 text-center">
        Selected Date: <strong>{value.toDateString()}</strong>
      </p>
    </div>
  );
};

export default Calender;
