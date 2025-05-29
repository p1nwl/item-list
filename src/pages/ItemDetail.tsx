import { useNavigate } from "react-router-dom";
import type { Item } from "../types/Item";
import ItemCraftTree from "../components/ItemCraftTree";

interface Props {
  item: Item;
  items: Item[];
  onBack: () => void;
  onSelectItem: (item: Item) => void;
}

const ItemDetail = ({ item, items, onBack, onSelectItem }: Props) => {
  const navigate = useNavigate();

  const resolveItem = (id: string) => items.find((i) => i.id === id);

  return (
    <div className="p-4 pt-0 mx-auto">
      {/* Кнопки "Назад" и "На главную" */}
      <div className="flex gap-2 mb-4 mt-0">
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Назад
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline text-sm"
        >
          ⌂ На главную
        </button>
      </div>

      {/* Заголовок и иконка */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={item.icon || "/icons/placeholder.png"}
          alt={item.name}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h2 className="text-2xl font-bold">{item.name}</h2>
          {item.description ? (
            <p className="text-gray-700">{item.description}</p>
          ) : (
            <p className="text-gray-500 italic">Описание отсутствует</p>
          )}
        </div>
      </div>

      {/* Где продаётся */}
      {item.boughtFrom && (
        <p className="mb-2">
          <strong>Продаётся у:</strong> {item.boughtFrom}
        </p>
      )}

      {/* Где падает */}
      {item.droppedBy && item.droppedBy.length > 0 && (
        <div className="mb-2">
          <strong>Падает с:</strong>
          <ul className="list-disc list-inside">
            {item.droppedBy.map((source, idx) => (
              <li key={idx}>{source}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Компоненты */}
      {item.components && item.components.length > 0 && (
        <div className="mb-4">
          <strong>Компоненты:</strong>
          <ItemCraftTree
            item={item}
            allItems={items}
            onSelectItem={onSelectItem}
          />
        </div>
      )}

      {/* Крафтится в */}
      {item.craftsInto && item.craftsInto.length > 0 && (
        <div className="mb-2">
          <strong>Крафтится в:</strong>
          <ul className="list-disc list-inside">
            {item.craftsInto.map((id) => {
              const craftedItem = resolveItem(id);
              if (!craftedItem) {
                return (
                  <li key={id} className="text-red-500">
                    ❌ Не найден предмет с id: {id}
                  </li>
                );
              }
              return (
                <li
                  key={craftedItem.id}
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => onSelectItem(craftedItem)}
                >
                  {craftedItem.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
