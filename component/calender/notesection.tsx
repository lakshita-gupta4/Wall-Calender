"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Trash2, Plus, PenLine } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Note } from "@/hooks/useNotes";
import type { DateRange } from "@/hooks/useCalendar";

interface Props {
  notes: Note[];
  dateRange: DateRange;
  monthKey: string;
  onAdd: (text: string, dateKey?: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export default function NotesSection({ notes, dateRange, monthKey, onAdd, onDelete, onUpdate }: Props) {
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const rangeLabel =
    dateRange.start && dateRange.end
      ? `${format(dateRange.start, "MMM d")} – ${format(dateRange.end, "MMM d")}`
      : dateRange.start
      ? format(dateRange.start, "MMM d")
      : null;

  const handleAdd = () => {
    if (!draft.trim()) return;
    const dateKey = dateRange.start
      ? format(dateRange.start, "yyyy-MM-dd")
      : monthKey;
    onAdd(draft, dateKey);
    setDraft("");
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = (id: string) => {
    onUpdate(id, editText);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-3 px-4 pb-5">
      {/* Section label */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 pb-1">
        <PenLine className="h-3.5 w-3.5 text-blue-500" />
        <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">Notes</span>
        {rangeLabel && (
          <Badge variant="secondary" className="ml-auto text-[10px] bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            {rangeLabel}
          </Badge>
        )}
      </div>

      {/* Existing notes */}
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
        <AnimatePresence initial={false}>
          {notes.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-zinc-400 italic text-center py-2"
            >
              No notes yet. Add one below.
            </motion.p>
          )}
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="group flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg px-3 py-2 border border-zinc-100 dark:border-zinc-700"
            >
              {editingId === note.id ? (
                <div className="flex-1 flex gap-1">
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="text-xs min-h-[40px] resize-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); saveEdit(note.id); }
                      if (e.key === "Escape") setEditingId(null);
                    }}
                  />
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => saveEdit(note.id)}>
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-700 dark:text-zinc-200 break-words leading-relaxed">{note.text}</p>
                    <span className="text-[10px] text-zinc-400 mt-0.5 block">
                      {note.dateKey !== monthKey ? `📅 ${note.dateKey}` : "📋 Monthly"}
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      onClick={() => startEdit(note)}
                      className="text-zinc-400 hover:text-blue-500 transition-colors"
                      aria-label="Edit note"
                    >
                      <PenLine className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onDelete(note.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                      aria-label="Delete note"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add note input */}
      <div className="flex gap-2 items-end">
        <Textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={rangeLabel ? `Note for ${rangeLabel}…` : "Add a monthly note…"}
          className="text-xs min-h-[52px] resize-none flex-1 border-zinc-200 dark:border-zinc-700 focus:border-blue-400"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAdd(); }
          }}
        />
        <Button
          size="icon"
          onClick={handleAdd}
          disabled={!draft.trim()}
          className="h-9 w-9 shrink-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          aria-label="Add note"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
