import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";

export interface Note {
  id: string;
  text: string;
  dateKey: string; // "YYYY-MM" for monthly or "YYYY-MM-DD" for day-specific
  createdAt: number;
}

const STORAGE_KEY = "wall-calendar-notes";

export function useNotes(monthKey: string) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setNotes(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((updated: Note[]) => {
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }, []);

  const monthNotes = notes.filter((n) => n.dateKey === monthKey);

  const addNote = useCallback(
    (text: string, dateKey?: string) => {
      if (!text.trim()) return;
      const note: Note = {
        id: crypto.randomUUID(),
        text: text.trim(),
        dateKey: dateKey ?? monthKey,
        createdAt: Date.now(),
      };
      persist([...notes, note]);
    },
    [notes, monthKey, persist]
  );

  const deleteNote = useCallback(
    (id: string) => {
      persist(notes.filter((n) => n.id !== id));
    },
    [notes, persist]
  );

  const updateNote = useCallback(
    (id: string, text: string) => {
      persist(notes.map((n) => (n.id === id ? { ...n, text } : n)));
    },
    [notes, persist]
  );

  return { monthNotes, addNote, deleteNote, updateNote };
}
