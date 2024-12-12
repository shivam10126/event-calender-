import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { EventForm } from './EventForm';
import { Event } from '../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  event: Event | null;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, event }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
        </DialogHeader>
        <EventForm onSave={onSave} event={event} />
      </DialogContent>
    </Dialog>
  );
};

