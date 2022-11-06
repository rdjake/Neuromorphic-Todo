<script lang="ts">
import { ListItem } from "../types/types";
import { defineComponent, PropType } from "vue";

const TodoItem = defineComponent({
   emits: ["update:modelValue", "delete"],
   props: {
      modelValue: { type: Object as PropType<ListItem> },
   },
   setup(_, { emit }) {
      const check = (item: ListItem) => {
         emit("update:modelValue", { ...item, checked: !item.checked });
      };

      return { check, emit };
   },
});

export default TodoItem;
</script>

<template>
   <p
      class="ml-6 mr-3 pl-4 pr-2 rounded-xl flex items-center relative hover:bg-selectedBg/25 focus-within:!bg-selectedBg"
   >
      <button
         :class="[
            'ml-1 mr-3 w-8 h-8 rounded-full',
            modelValue.checked ? 'shadow-neuro3InsetOff' : 'shadow-neuro3',
         ]"
         @click="check(modelValue)"
      />
      <input
         type="text"
         placeholder="Новая заметка"
         v-model="modelValue.text"
         :class="[
            'grow p-4 bg-transparent outline-none placeholder:text-textBlue/30 transition-all',
            modelValue.checked
               ? 'text-textBlue/30' + (modelValue.text ? ' line-through' : '')
               : 'text-textBlue',
         ]"
      />
      <button
         class="handle mr-3 w-8 h-8 rounded-full text-2xl active:shadow-neuro3Inset text-textBlue/40 select-none"
         v-text="'≡'"
      />
      <button
         class="mr-1 w-8 h-8 rounded-full text-2xl active:shadow-neuro3Inset text-textBlue/40 select-none"
         @click="emit('delete')"
         v-text="'&times;'"
      />
   </p>
</template>
