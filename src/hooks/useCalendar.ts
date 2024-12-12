import { useState, useEffect } from 'react';
import { formatDate } from '../utils/dateUtils';
import { Event } from '../types';
import prebuiltEvents from '../prebuiltEvents.json';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Record<string, Event[]>>({});

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    let initialEvents = prebuiltEvents as unknown as Record<string, Event[]>;

    if (storedEvents) {
      const parsedStoredEvents = JSON.parse(storedEvents);
      initialEvents = { ...prebuiltEvents, ...parsedStoredEvents };
    }

    setEvents(initialEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const addEvent = (date: Date, event: Event) => {
    const dateKey = formatDate(date);
    setEvents(prevEvents => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), event]
    }));
  };

  const updateEvent = (date: Date, eventIndex: number, updatedEvent: Event) => {
    const dateKey = formatDate(date);
    setEvents(prevEvents => ({
      ...prevEvents,
      [dateKey]: prevEvents[dateKey].map((event, index) =>
        index === eventIndex ? updatedEvent : event
      )
    }));
  };

  const deleteEvent = (date: Date, eventIndex: number) => {
    const dateKey = formatDate(date);
    setEvents(prevEvents => ({
      ...prevEvents,
      [dateKey]: prevEvents[dateKey].filter((_, index) => index !== eventIndex)
    }));
  };

  const getEventsForDate = (date: Date): Event[] => {
    const dateKey = formatDate(date);
    return events[dateKey] || [];
  };

  return {
    currentDate,
    selectedDate,
    setSelectedDate,
    goToPreviousMonth,
    goToNextMonth,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    events,
  };
};

