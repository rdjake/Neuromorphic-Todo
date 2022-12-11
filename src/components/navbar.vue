<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import {
   clearDragImage,
   createList,
   generateNewListName,
} from "../methods/methods";
import { DraggableEvent, List } from "../types/types";
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

      const onListMoved = (event: DraggableEvent<List>) => {
         if (!props.lists) return;
         const { element, newIndex } = event.moved;
         const syncedLists = props.lists.filter((x) => x !== element);
         syncedLists.splice(newIndex, 0, element);
         emit("update:lists", syncedLists);
      };

      const themeIcon = ref("moon");

      const switchTheme = () => {
         const theme = document.getElementById("theme");
         theme?.toggleAttribute("dark");
         themeIcon.value = theme?.hasAttribute("dark") ? "sun" : "moon";
      };

      return {
         selectList,
         addList,
         deleteList,
         onListMoved,
         switchTheme,
         themeIcon,
         clearDragImage,
      };
   },
});

export default NavBar;
</script>
<template>
   <nav
      class="flex flex-col pt-10 bg-bgBlue rounded-3xl select-none h-screen md:h-[initial] overflow-y-scroll md:overflow-y-hidden transition-opacity duration-500 md:opacity-100"
      :class="{ 'opacity-0': currentList }"
   >
      <div
         class="min-h-[5rem] mx-4 rounded-3xl flex justify-center items-center gap-2 text-2xl text-textBlue shadow-neuroLogo"
      >
         <span>NEUROMORPHIC</span>
         <v-button id="theme" :iconType="themeIcon" @click="switchTheme" />
      </div>
      <div
         class="mt-16 mb-4 ml-12 mr-8 text-center flex items-center justify-between"
      >
         <strong class="font-bold text-xl">Списки</strong>
         <v-button iconType="plus" @click="addList" />
      </div>

      <draggable
         :list="lists"
         itemKey="id"
         :animation="300"
         handle=".handle"
         class="md:overflow-y-scroll"
         @change="onListMoved"
         @dragstart="clearDragImage"
      >
         <template #item="{ element }">
            <div
               style="transform: none !important"
               class="grid grid-cols-[1fr_2rem_2rem] justify-between items-center text-left pl-6 pr-2 py-2 ml-6 mr-4 rounded-xl"
               :class="
                  element === currentList
                     ? 'bg-bgBlueSelected'
                     : 'hover:bg-bgBlueSelectedHover'
               "
               @click="selectList(element)"
            >
               <span class="break-all">{{ element.name }}</span>
               <v-button
                  iconType="handle"
                  flat
                  faded
                  class="handle cursor-move select-none"
               />
               <v-button
                  iconType="close"
                  flat
                  faded
                  @click.stop="deleteList(element.id)"
               />
            </div>
         </template>
      </draggable>
   </nav>
</template>
