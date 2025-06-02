import { useNavigate } from "react-router-dom";
import type { Item } from "../types/Item";
import ItemCraftTree from "../components/ItemCraftTree";

interface Props {
  item: Item;
  items: Item[];
  onBack: () => void;
  onSelectItem: (item: Item) => void;
}

// Словарь отображаемых названий характеристик
const statNames: Record<string, string> = {
  HP: "HP",
  MP: "MP",
  Strength: "силы",
  Agility: "ловкости",
  Intelligence: "разума",
  Armor: "брони",
  Damage: "урона",
  Speed: "скорости",
  Attack: "атаки",
};

const ItemDetail = ({ item, items, onBack, onSelectItem }: Props) => {
  const navigate = useNavigate();

  const resolveItem = (id: string) => items.find((i) => i.id === id);

  if (item.isTrash && item.trashInfo) {
    const dropItem = items.find((i) => i.id === item.trashInfo?.dropItemId);

    return (
      <div className="p-4 pt-0 mx-auto">
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

        <div className="flex items-center gap-4 mb-4">
          <img
            src={item.icon || "/icons/placeholder.png"}
            alt={item.name}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>

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

        <div className="text-sm mt-2">
          <p className="mb-1 font-bold">Награда: </p>
          <p className="font-bold text-yellow-600">
            {item.trashInfo.goldRange[0]}–{item.trashInfo.goldRange[1]} золота *
            количество зарядов
          </p>
          <p className="font-bold text-pink-600">
            {item.trashInfo.markRange[0]}–{item.trashInfo.markRange[1]} К.Меток
            * количество зарядов
          </p>
          <p className="font-bold text-purple-600">
            {item.trashInfo.xpRange[0]}–{item.trashInfo.xpRange[1]} опыта *
            количество зарядов
          </p>

          {dropItem && (
            <p className="mt-2">
              Обычная деталь инженера с шансом 11% * количество зарядов —{" "}
              <span
                onClick={() => onSelectItem(dropItem)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                {dropItem.name}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  }

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

          {/* Отображение бонусов */}
          {item.bonus && item.bonus.length > 0 && (
            <div className="mt-2">
              {item.bonus.map((b, idx) => (
                <p key={idx} className="text-red-500 font-semibold">
                  +{b.value} {statNames[b.stat] || b.stat}
                </p>
              ))}
            </div>
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
