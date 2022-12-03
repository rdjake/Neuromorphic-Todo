<script lang="ts">
import { List, ListItem } from "../types/types";
import { defineComponent, PropType } from "vue";
import TodoItem from "./todo-item.vue";
import { createListItem } from "../methods/methods";
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
      };

      const addItem = () => {
         if (props.modelValue) props.modelValue.items.push(createListItem());
      };

      const getItemById = (id: string) =>
         props.modelValue?.items.find((x) => x.id === id) as ListItem;

      const setItem = (item: ListItem) => {
         const target = getItemById(item.id);
         Object.assign(target, item);
      };

      return { emit, addItem, deleteItem, getItemById, setItem };
   },
});

export default TodoList;
</script>

<template>
   <transition
      enter-from-class="translate-y-[150%] opacity-0"
      leave-to-class="translate-y-[150%] opacity-0"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-500"
   >
      <article v-if="modelValue" class="list bg-bgBlue rounded-3xl mt-10">
         <nav class="relative flex justify-center p-7">
            <button
               class="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-2xl shadow-neuro5 active:shadow-neuro5Inset select-none"
               v-text="'+'"
               @click="addItem"
            />
            <input
               type="text"
               class="text-center text-xl font-bold bg-transparent outline-none"
               v-model="modelValue.name"
            />
            <button
               class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-neuro5 text-2xl active:shadow-neuro5Inset select-none"
               v-text="'&times;'"
               @click="emit('update:modelValue', null)"
            />
         </nav>
         <draggable
            :list="modelValue.items"
            itemKey="id"
            :animation="300"
            handle=".handle"
            class="max-h-[83vh] overflow-y-scroll scroller"
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
<style scoped>
.list{
   width: clamp(400px, 100%, 800px)
}
</style>