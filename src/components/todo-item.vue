<script lang="ts">
import { ListItem } from "../types/types";
import { defineComponent, PropType } from "vue";

const TodoItem = defineComponent({
   emits: ["update:modelValue", "delete"],
   props: {
      modelValue: { type: Object as PropType<ListItem> },
   },
   setup(props, { emit }) {
      const check = (item: ListItem | undefined) => {
         if (item)
            emit("update:modelValue", { ...item, checked: !item.checked });
      };

      const setText = (event: Event) => {
         emit("update:modelValue", { ...props.modelValue, text: (event.target as HTMLInputElement).value });
      };

      return { check, emit, setText };
   },
});

export default TodoItem;
</script>

<template>
   <p
      v-if="modelValue"
      class="ml-6 mr-3 pl-4 pr-2 rounded-xl flex items-center relative hover:bg-bgBlueSelectedHover focus-within:!bg-bgBlueSelected"
   >
      <v-button
         :class="modelValue.checked ? 'shadow-neuro8InsetOff' : 'shadow-neuro8'"
         @click="check(modelValue)"
      />
      <input
         type="text"
         placeholder="Новая заметка"
         v-model="modelValue.text"
         @change="setText"
         :class="[
            'grow ml-3 p-4 bg-transparent outline-none placeholder:text-textBlueFaded transition-all',
            modelValue.checked
               ? 'text-textBlueFaded' + (modelValue.text ? ' line-through' : '')
               : 'text-textBlue',
         ]"
      />
      <v-button
         iconType="handle"
         flat
         faded
         class="handle mr-3 cursor-move select-none"
      />
      <v-button
         iconType="close"
         flat
         faded
         class="mr-1 select-none"
         @click="emit('delete')"
      />
   </p>
</template>
