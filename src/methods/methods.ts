import { List, ListItem } from "./../types/types";
import { v4 as uuidv4 } from "uuid";

export function createListItem(text: string = ""): ListItem {
   return {
      id: uuidv4(),
      text,
      checked: false,
   };
}
export function createList(name: string = ""): List {
   return {
      id: uuidv4(),
      name,
      items: [],
   };
}

export function generateNewListName(lists: List[]){
    const newListTemplate = "Новый список ";
    const newListNumber = Math.max(
       ...lists
          .map((x) => x.name)
          .filter((x) =>
             x.match(new RegExp(`^${newListTemplate}\\d+$`))
          )
          .map((x) => parseInt(x.replace(newListTemplate, ""))),
       0
    ) + 1;
    return newListTemplate + newListNumber;
}

export function getSampleList() {
   const list1 = createList("Дела");
   for (let i = 0; i < 10; i++) {
      list1.items.push(createListItem("Сделать дело " + (i + 1)));
   }
   const list2 = createList("Покупки");
   for (let i = 0; i < 4; i++) {
      list2.items.push(createListItem("Купить " + (i + 1)));
   }
   return [list1, list2];
}
