import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Event } from '../types';

interface EventListProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  events: Event[];
  onAddEvent: () => void;
  onEditEvent: (event: Event, index: number) => void;
  onDeleteEvent: (index: number) => void;
}

export const EventList: React.FC<EventListProps> = ({
  isOpen,
  onClose,
  date,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent
}) => {
  const [filter, setFilter] = useState('');

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Events for {date.toDateString()}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Input
            placeholder="Filter events..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[300px]">
            {filteredEvents.map((event, index) => (
              <div key={index} className="mb-4 p-2 border rounded">
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {event.startTime} - {event.endTime}
                </p>
                {event.description && (
                  <p className="text-sm mt-1">{event.description}</p>
                )}
                <div className="mt-2 flex justify-end space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onEditEvent(event, index)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDeleteEvent(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        <Button onClick={onAddEvent} className="mt-4">
          Add Event
        </Button>
      </DialogContent>
    </Dialog>
  );
};

