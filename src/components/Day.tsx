import React from 'react';
import { Button } from "./ui/button"
import { Event } from '../types';

interface DayProps {
  date: Date;
  events: Event[];
  isSelected: boolean;
  onClick: () => void;
}

export const Day: React.FC<DayProps> = ({ date, events, isSelected, onClick }) => {
  const isToday = date.toDateString() === new Date().toDateString();
  const hasEvents = events.length > 0;

  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className={`h-12 sm:h-20 p-1 sm:p-2 flex flex-col items-center justify-start text-xs sm:text-sm ${
        isToday ? 'bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700' : ''
      } ${hasEvents ? 'bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700' : ''} ${
        date.getDay() === 0 || date.getDay() === 6 ? 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800' : ''
      } ${isSelected ? 'ring-2 ring-purple-500 dark:ring-purple-400' : ''}`}
      onClick={onClick}
    >
      <span className={`font-semibold ${isToday ? 'text-blue-800 dark:text-blue-200' : ''}`}>
        {date.getDate()}
      </span>
      {hasEvents && (
        <div className="mt-1 text-xs text-yellow-800 dark:text-yellow-200">
          {events.length}
        </div>
      )}
    </Button>
  );
};

