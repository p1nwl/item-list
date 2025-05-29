import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../utils/itemResolver";
import type { Item } from "../types/Item";
import ItemFilters from "../components/ItemFilters";

const ItemList = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "id">("name");
  const [dropFilter, setDropFilter] = useState("");
  const [componentFilter, setComponentFilter] = useState("");

  const navigate = useNavigate();
  const items: Item[] = getAllItems();

  const filtered = items
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) =>
      dropFilter ? item.droppedBy?.includes(dropFilter) : true
    )
    .filter((item) =>
      componentFilter ? item.components?.includes(componentFilter) : true
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Список предметов</h1>

      <ItemFilters
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        dropFilter={dropFilter}
        setDropFilter={setDropFilter}
        componentFilter={componentFilter}
        setComponentFilter={setComponentFilter}
      />

      <div className="grid gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded shadow flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate(`/item/${item.id}`)}
          >
            <img
              src={item.icon || "/icons/placeholder.png"}
              alt={item.name}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
