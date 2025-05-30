import { useState, useMemo } from "react";
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

  const shouldRender = Boolean(search || dropFilter || componentFilter);

  const filtered = useMemo(() => {
    return items
      .filter((item) =>
        search ? item.name.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter((item) =>
        dropFilter
          ? item.droppedBy?.some((src) =>
              src.toLowerCase().includes(dropFilter.toLowerCase())
            ) ?? false
          : true
      )
      .filter((item) =>
        componentFilter
          ? item.components?.some((comp) =>
              comp.toLowerCase().includes(componentFilter.toLowerCase())
            ) ?? false
          : true
      )
      .sort((a, b) =>
        a[sortBy].localeCompare(b[sortBy], undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
  }, [items, search, dropFilter, componentFilter, sortBy]);

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

      {shouldRender ? (
        <div className="grid gap-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
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
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700">
              Ничего не найдено
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          Введите запрос в любой фильтр, чтобы увидеть результаты
        </p>
      )}
    </div>
  );
};

export default ItemList;
