"use client";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  allLabel?: string;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  allLabel = "全部",
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onSelect("")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selected === ""
            ? "bg-accent text-white shadow-md"
            : "bg-secondary/50 text-charcoal/70 hover:bg-secondary"
        }`}
      >
        {allLabel}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === cat
              ? "bg-accent text-white shadow-md"
              : "bg-secondary/50 text-charcoal/70 hover:bg-secondary"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
