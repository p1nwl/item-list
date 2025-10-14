import { useParams } from "react-router-dom";
import { getItemById, getAllItems } from "../utils/itemResolver";
import ItemDetail from "../components/ItemDetail";

const ItemPage = () => {
  const { id } = useParams();
  const item = getItemById(id!);
  const allItems = getAllItems();

  if (!item) return <p className="p-4 text-red-500">Предмет не найден</p>;

  return (
    <ItemDetail
      item={item}
      items={allItems}
      onBack={() => history.back()}
      onSelectItem={(item) => location.assign(`/item/${item.id}`)}
    />
  );
};

export default ItemPage;
