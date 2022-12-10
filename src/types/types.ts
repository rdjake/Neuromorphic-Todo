export type ListItem = { id: string; text: string; checked: boolean };

export type List = { id: string; name: string; items: ListItem[] };

export type DraggableEvent<T> = {
   moved: {
      element: T;
      newIndex: number;
      oldIndex: number;
   };
};
