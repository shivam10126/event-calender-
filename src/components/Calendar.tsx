import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { useCalendar } from '../hooks/useCalendar';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';
import { Day } from './Day';
import { EventModal } from './EventModal';
import { EventList } from './EventList';
import { Sidebar } from './Sidebar';
import { Event } from '../types';

export const Calendar: React.FC = () => {
  const {
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
  } = useCalendar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsEventListOpen(true);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event, index: number) => {
    setEditingEvent({ ...event, index });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event: Event) => {
    if (editingEvent && selectedDate) {
      updateEvent(selectedDate, editingEvent.index, event);
    } else if (selectedDate) {
      addEvent(selectedDate, event);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (index: number) => {
    if (selectedDate) {
      deleteEvent(selectedDate, index);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePreviousMonth = () => {
    setTransitionDirection('right');
    goToPreviousMonth();
  };

  const handleNextMonth = () => {
    setTransitionDirection('left');
    goToNextMonth();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionDirection(null);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentDate]);

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Button onClick={toggleSidebar} variant="outline" size="icon" className="bg-white dark:bg-gray-800">
                <Menu className="h-4 w-4" />
              </Button>
              <h2 className="text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-200">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handlePreviousMonth} variant="outline" size="icon" className="bg-white dark:bg-gray-800">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={handleNextMonth} variant="outline" size="icon" className="bg-white dark:bg-gray-800">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className={`calendar-grid-container ${transitionDirection ? `slide-${transitionDirection}` : ''}`}>
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold text-purple-700 dark:text-purple-300 text-xs sm:text-sm">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
                return (
                  <Day
                    key={date.toISOString()}
                    date={date}
                    events={getEventsForDate(date)}
                    isSelected={!!(selectedDate && date.toDateString() === selectedDate.toDateString())}
                    onClick={() => handleDayClick(date)}
                  />
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      {selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          event={editingEvent}
        />
      )}
      {selectedDate && (
        <EventList
          isOpen={isEventListOpen}
          onClose={() => setIsEventListOpen(false)}
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentDate={currentDate}
        events={events}
      />
    </>
  );
};

