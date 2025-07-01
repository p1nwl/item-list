import { useState } from "react";
import type { Item } from "../types/Item";

interface Props {
  item: Item;
  allItems: Item[];
  onSelectItem: (item: Item) => void;
}

const ItemCraftTree = ({ item, allItems, onSelectItem }: Props) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderTree = (item: Item, level = 0) => {
    const componentsArray = Array.isArray(item.components)
      ? item.components
      : [];
    const children = componentsArray
      .map((id) => allItems.find((i) => i.id === id))
      .filter(Boolean) as Item[];

    const isExpandable = children.length > 0;
    const isExpanded = expandedIds.has(item.id);
    const source = item.droppedBy?.length
      ? { label: "Падает с:", value: item.droppedBy.join(", ") }
      : item.boughtFrom
      ? { label: "Продаётся у:", value: item.boughtFrom }
      : null;

    return (
      <div
        key={item.id}
        style={{ marginLeft: `${level * 16}px` }}
        className="mt-2"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 pr-2">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onSelectItem(item)}
            >
              {item.icon && (
                <img
                  src={item.icon || "/icons/placeholder.png"}
                  alt={item.name}
                  className="w-10 h-10 object-contain"
                />
              )}
              <span className="text-blue-600 hover:underline">{item.name}</span>
            </div>

            {isExpandable && (
              <button
                onClick={() => toggleExpand(item.id)}
                aria-label={isExpanded ? "Свернуть" : "Развернуть"}
                className="text-gray-600 hover:text-black focus:outline-none"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                  lineHeight: 1,
                  transition: "transform 0.2s ease",
                  transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                  display: "inline-block",
                  userSelect: "none",
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                &gt;
              </button>
            )}
          </div>

          {source && (
            <p className="text-sm text-gray-600 ml-12">
              <strong>{source.label}</strong> {source.value}
            </p>
          )}
        </div>

        <div
          style={{
            maxHeight: isExpanded ? 500 : 0,
            transition: "max-height 0.3s ease",
          }}
        >
          {isExpanded && (
            <div className="flex gap-2 border-t-1">
              {children.map((child) => renderTree(child, level + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return <div>{renderTree(item)}</div>;
};

export default ItemCraftTree;
