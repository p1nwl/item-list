type Props = {
  search: string;
  setSearch: (val: string) => void;
  sortBy: "name" | "id";
  setSortBy: (val: "name" | "id") => void;
  dropFilter: string;
  setDropFilter: (val: string) => void;
  componentFilter: string;
  setComponentFilter: (val: string) => void;
};

const ItemFilters = ({
  search,
  setSearch,
  sortBy,
  setSortBy,
  dropFilter,
  setDropFilter,
  componentFilter,
  setComponentFilter,
}: Props) => {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Поиск предметов"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded"
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "name" | "id")}
        className="p-2 border rounded"
      >
        <option value="name" className="text-gray-500">
          Сортировка: по названию
        </option>
        <option value="id" className="text-gray-500">
          Сортировка: по ID
        </option>
      </select>

      <input
        type="text"
        placeholder="Фильтр по источнику (droppedBy)"
        value={dropFilter}
        onChange={(e) => setDropFilter(e.target.value)}
        className="p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Фильтр по компоненту"
        value={componentFilter}
        onChange={(e) => setComponentFilter(e.target.value)}
        className="p-2 border rounded"
      />
    </div>
  );
};

export default ItemFilters;
