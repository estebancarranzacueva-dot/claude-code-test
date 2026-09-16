import { useState } from 'react';

interface AddHabitFormProps {
  onAdd: (name: string, description?: string, color?: string, icon?: string) => void;
}

const COLORS = ['#e57373', '#64b5f6', '#81c784', '#ffb74d', '#ba68c8', '#4db6ac'];

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    onAdd(trimmedName, description.trim(), color, icon.trim());
    setName('');
    setDescription('');
    setIcon('');
  }

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <div className="add-habit-row">
        <input
          type="text"
          placeholder="New habit name (e.g. Drink water)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-habit-name"
          required
        />
        <input
          type="text"
          placeholder="Icon (emoji)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="add-habit-icon"
          maxLength={4}
        />
        <button type="submit" className="add-habit-submit">
          Add habit
        </button>
      </div>
      <div className="add-habit-row">
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="add-habit-description"
        />
        <div className="color-picker">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-swatch${c === color ? ' selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              aria-label={`Choose color ${c}`}
            />
          ))}
        </div>
      </div>
    </form>
  );
}
