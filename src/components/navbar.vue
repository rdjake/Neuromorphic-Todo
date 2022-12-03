<script lang="ts">
import { defineComponent, PropType } from "vue";
import { createList, generateNewListName } from "../methods/methods";
import { List } from "../types/types";
import draggable from "vuedraggable";

const NavBar = defineComponent({
   components: {
      draggable,
   },
   emits: ["update:lists", "update:currentList"],
   props: {
      lists: { type: Array as PropType<List[]> },
      currentList: { type: Object as PropType<List> },
   },
   setup(props, { emit }) {
      const selectList = (list: List) => {
         if (props.currentList && props.currentList.id === list.id)
            emit("update:currentList", null);
         else emit("update:currentList", list);
      };

      const addList = () => {
         if (!props.lists) return;

         const name = generateNewListName(props.lists);
         props.lists.push(createList(name));
         emit("update:lists", props.lists);
      };

      const deleteList = (id: string) => {
         if (!props.lists) return;
         emit(
            "update:lists",
            props.lists.filter((x) => x.id !== id)
         );
         emit("update:currentList", null);
      };

      return { selectList, addList, deleteList };
   },
});

export default NavBar;
</script>
<template>
   <nav
      class="flex flex-col pt-10 bg-bgBlue rounded-3xl select-none h-screen md:h-[initial] overflow-y-scroll md:overflow-y-hidden"
   >
      <div
         class="min-h-[5rem] mx-8 rounded-3xl flex justify-center items-center text-2xl text-textBlue shadow-neuro8"
      >
         <span>NEUROMORPHIC</span>
      </div>
      <div class="mt-16 mb-4 mx-4 text-center relative">
         <button
            class="absolute left-7 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-2xl shadow-neuro3 active:shadow-neuro3Inset"
            v-text="'+'"
            @click="addList"
         />

         <strong class="font-bold text-xl">Списки</strong>
      </div>

      <draggable :list="lists" itemKey="id" :animation="300" handle=".handle" class="md:overflow-y-scroll">
         <template #item="{ element }">
            <div
               :class="[
                  'grid grid-cols-[1fr_2rem_2rem] justify-between items-center text-left pl-8 pr-2 py-2 mx-4 rounded-xl cursor-move',
                  element === currentList
                     ? 'bg-selectedBg'
                     : 'hover:bg-selectedBg/25',
               ]"
               @click="selectList(element)"
            >
               <span class="break-all">{{ element.name }}</span>
               <button
                  class="handle w-8 h-8 rounded-full text-2xl active:shadow-neuro3Inset text-textBlue/40 cursor-move select-none"
                  v-text="'≡'"
               />
               <button
                  class="w-8 h-8 rounded-full text-2xl active:shadow-neuro3Inset text-textBlue/40"
                  v-text="'&times;'"
                  @click.stop="deleteList(element.id)"
               />
            </div>
         </template>
      </draggable>
   </nav>
</template>
