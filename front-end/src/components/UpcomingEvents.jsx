import React from "react";

const UpcomingEvents = () => {
  // Static data for demonstration
  const events = [
    {
      id: 1,
      name: "Career Fair 2023",
      date: "2023-12-05",
      location: "Main Campus",
    },
    { id: 2, name: "Resume Workshop", date: "2023-11-20", location: "Online" },
    {
      id: 3,
      name: "Networking Night",
      date: "2023-12-15",
      location: "City Center Hotel",
    },
    // Add more events as needed
  ];

  return (
    <div className="px-8 py-4 md:px-24 bg-white shadow-md rounded-lg ">
      <h2 className="text-xl font-extrabold text-blue-600 mb-4">
        Upcoming Career Events
      </h2>
      <ul className="flex gap-2  md:gap-16 md:flex-row flex-col items-center">
        {events.map((event) => (
          <li
            key={event.id}
            className="mb-2 p-3 h-[5rem] w-[15rem] md:w-[30rem] shadow-sm bg-gradient-to-r from-blue-500/[0.1] via-purple-500/[0.1] to-pink-500/[0.1] rounded-md "
          >
            <div className="font-medium text-gray-800 ">{event.name}</div>
            <div className="text-gray-600 text-sm">{event.date}</div>
            <div className="text-gray-700 text-xs">{event.location}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
