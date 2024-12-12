import React from 'react';
import { ScrollArea } from "./ui/scroll-area"
import { Button } from "./ui/button"
import { Event } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: Date;
  events: Record<string, Event[]>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentDate, events }) => {
  const monthEvents = Object.entries(events).filter(([date]) => {
    const eventDate = new Date(date);
    return eventDate.getMonth() === currentDate.getMonth() &&
           eventDate.getFullYear() === currentDate.getFullYear();
  });

  return (
    <div className={`fixed inset-y-0 left-0 w-64 sm:w-80 bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-800 dark:text-purple-200">Month Events</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-600 dark:text-gray-300">
            &times;
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {monthEvents.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No events this month.</p>
          ) : (
            monthEvents.map(([date, dateEvents]) => (
              <div key={date} className="mb-4">
                <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">{new Date(date).toDateString()}</h3>
                {dateEvents.map((event, index) => (
                  <div key={index} className="bg-purple-100 dark:bg-purple-900 p-2 rounded mb-2">
                    <p className="font-medium text-purple-800 dark:text-purple-200">{event.name}</p>
                    <p className="text-sm text-purple-600 dark:text-purple-300">{event.startTime} - {event.endTime}</p>
                    {event.description && <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{event.description}</p>}
                  </div>
                ))}
              </div>
            ))
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

