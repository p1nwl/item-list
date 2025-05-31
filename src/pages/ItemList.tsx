import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../utils/itemResolver";
import type { Item } from "../types/Item";
import ItemFilters from "../components/ItemFilters";
import { filterItems } from "../utils/filterItems";

const STORAGE_KEY = "itemFilters";

const getInitial = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved[key] ?? fallback;
  } catch {
    return fallback;
  }
};

const ItemList = () => {
  const navigate = useNavigate();
  const items: Item[] = getAllItems();

  const [search, setSearch] = useState(() => getInitial("search", ""));
  const [sortBy, setSortBy] = useState<"name" | "id">(() =>
    getInitial("sortBy", "name")
  );
  const [dropFilter, setDropFilter] = useState(() =>
    getInitial("dropFilter", "")
  );
  const [componentFilter, setComponentFilter] = useState(() =>
    getInitial("componentFilter", "")
  );

  useEffect(() => {
    const data = { search, sortBy, dropFilter, componentFilter };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [search, sortBy, dropFilter, componentFilter]);

  const shouldRender = Boolean(search || dropFilter || componentFilter);

  const filtered = useMemo(() => {
    return filterItems(items, {
      search,
      dropFilter,
      componentFilter,
      sortBy,
    });
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
