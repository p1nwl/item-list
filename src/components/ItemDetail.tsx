import type { Item } from "../types/Item";
import ItemCraftTree from "./ItemCraftTree";

interface Props {
  item: Item;
  items: Item[];
  onBack: () => void;
  onSelectItem: (item: Item) => void;
}

const statNames: Record<string, string> = {
  HP: "HP",
  HPRegen: "ед.здоровья/сек",
  MP: "MP",
  Strength: "силы",
  Agility: "ловкости",
  Intelligence: "разума",
  Defense: "защиты",
  Damage: "урона",
  Speed: "скорости",
  Attack: "атаки",
  Parameters: "к параметрам",
  MDef: "защиты от магии",
  AbilityDamage: "к урону от способностей",
  AbilityCritChance: "к шансу крита навыками",
  AbilityCritDamage: "к критическому урону навыками",
  AllExtracts: "ко всем Экстрактам",
};

const ItemDetail = ({ item, items, onSelectItem }: Props) => {
  const resolveItem = (id: string) => items.find((i) => i.id === id);
  {
    /* Отрисовка мусора */
  }
  if (item.isTrash && item.trashInfo) {
    const dropItem = items.find((i) => i.id === item.trashInfo?.dropItemId);

    return (
      <div className="p-4 pt-0 mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={item.icon ? `/icons/${item.icon}` : "/icons/dummy.png"}
            onError={(e) =>
              ((e.target as HTMLImageElement).src = "/icons/dummy.png")
            }
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

        <div className="text-sm mt-2 border-4 border-yellow-300 p-4 rounded-lg bg-yellow-50 inline-block text-gray-900">
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
              <span
                onClick={() => onSelectItem(dropItem)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                {dropItem.name}
              </span>{" "}
              с шансом 11% * количество зарядов
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pt-0 mx-auto">
      {/* Заголовок и иконка */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={item.icon ? `/icons/${item.icon}` : "/icons/dummy.png"}
          onError={(e) =>
            ((e.target as HTMLImageElement).src = "/icons/dummy.png")
          }
          alt={item.name}
          className="w-16 h-16 object-contain self-start mt-2"
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
              {item.bonus.map((b, idx) => {
                const isPositive = b.value > 0;
                const classes = isPositive
                  ? "text-green-600 font-bold"
                  : b.value < 0
                  ? "text-red-600 font-semibold"
                  : "text-gray-600";

                const display = `${isPositive ? "+" : ""}${b.value}${
                  b.percent ? "%" : ""
                }`;

                return (
                  <p key={idx} className={classes}>
                    {display} {statNames[b.stat] ?? b.stat}
                  </p>
                );
              })}
            </div>
          )}
          {/* Активные способности */}
          {item.ability && (
            <p className="mt-1 text-blue-600 font-semibold">✦ {item.ability}</p>
          )}
          {/* Ауры */}
          {item.aura && (
            <p className="mt-1 text-purple-600 font-semibold">
              Аура: {item.aura}
            </p>
          )}
          {/* Пассивные эффекты */}
          {item.effects && item.effects.length > 0 && (
            <div className="mt-1 space-y-1">
              {item.effects.map((effect, idx) => (
                <p key={idx} className="text-amber-600 font-semibold">
                  ⚡ {effect}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Дополнительная информация по предметам */}
      {item.additionalInfoTitle && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">
            {Array.isArray(item.additionalInfoTitle)
              ? item.additionalInfoTitle.map(
                  (part: string | { text: string; refId: string }, i) =>
                    typeof part === "string" ? (
                      part
                    ) : (
                      <a
                        key={i}
                        href={`/item/${part.refId}`}
                        className="text-blue-500 underline"
                      >
                        {part.text}
                      </a>
                    )
                )
              : item.additionalInfoTitle}
          </h2>

          {Array.isArray(item.additionalInfo) &&
            item.additionalInfo.length > 0 && (
              <ol className="list-decimal pl-5 space-y-1">
                {item.additionalInfo.map((text, idx) => (
                  <li key={idx}>{text}</li>
                ))}
              </ol>
            )}
        </div>
      )}

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
