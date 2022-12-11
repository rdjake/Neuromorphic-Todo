<script lang="ts">
import { DraggableEvent, List, ListItem } from "../types/types";
import { defineComponent, PropType } from "vue";
import TodoItem from "./todo-item.vue";
import { clearDragImage, createListItem } from "../methods/methods";
import draggable from "vuedraggable";

const TodoList = defineComponent({
   components: {
      draggable,
      TodoItem,
   },
   emits: ["update:modelValue"],
   props: {
      modelValue: { type: Object as PropType<List | null> },
   },
   setup(props, { emit }) {
      const deleteItem = (id: string) => {
         if (!props.modelValue) return;
         props.modelValue.items = props.modelValue.items.filter(
            (x) => x.id !== id
         );
         emit("update:modelValue", props.modelValue);
      };

      const addItem = () => {
         if (props.modelValue) props.modelValue.items.push(createListItem());
         emit("update:modelValue", props.modelValue);
      };

      const setListName = (event: Event) => {
         emit("update:modelValue", {
            ...props.modelValue,
            name: (event.target as HTMLInputElement).value,
         });
      };

      const getItemById = (id: string) =>
         props.modelValue?.items.find((x) => x.id === id) as ListItem;

      const setItem = (item: ListItem) => {
         const target = getItemById(item.id);
         Object.assign(target, item);
         emit("update:modelValue", props.modelValue);
      };

      const onListItemMoved = (event: DraggableEvent<ListItem>) => {
         if (!props.modelValue) return;
         const { element, newIndex } = event.moved;
         const items = props.modelValue.items.filter((x) => x !== element);
         items.splice(newIndex, 0, element);
         emit("update:modelValue", { ...props.modelValue, items });
      };

      return {
         emit,
         addItem,
         deleteItem,
         getItemById,
         setItem,
         onListItemMoved,
         setListName,
         clearDragImage,
      };
   },
});

export default TodoList;
</script>

<template>
   <transition
      enter-from-class="translate-y-[100%] opacity-0"
      leave-to-class="translate-y-[100%] opacity-0"
      enter-active-class="transition duration-500"
      leave-active-class="transition duration-500"
   >
      <article
         v-if="modelValue"
         class="bg-bgBlue rounded-3xl mt-10"
         style="width: clamp(400px, 100%, 800px)"
      >
         <nav class="relative flex justify-center p-7">
            <v-button
               iconType="plus"
               size="12"
               class="absolute left-8 top-1/2 -translate-y-1/2 select-none"
               @click="addItem"
            />
            <input
               type="text"
               class="text-center text-xl font-bold bg-transparent outline-none"
               v-model="modelValue.name"
               @change="setListName"
            />
            <v-button
               iconType="close"
               size="12"
               class="absolute right-6 top-1/2 -translate-y-1/2 select-none"
               @click="emit('update:modelValue', null)"
            />
         </nav>
         <draggable
            :list="modelValue.items"
            itemKey="id"
            :animation="300"
            handle=".handle"
            class="max-h-[83vh] overflow-y-scroll scroller"
            @change="onListItemMoved"
            @dragstart="clearDragImage"
         >
            <template #item="{ element }">
               <TodoItem
                  :key="element.id"
                  :modelValue="getItemById(element.id)"
                  @delete="deleteItem(element.id)"
                  @update:modelValue="setItem"
               />
            </template>
         </draggable>
      </article>
   </transition>
</template>
