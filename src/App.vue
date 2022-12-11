<script lang="ts">
import { defineComponent, onUpdated, Ref, ref, watch } from "vue";
import { loadLists, saveLists } from "./methods/methods";
import { List } from "./types/types";
import NavBar from "./components/navbar.vue";
import TodoList from "./components/todo-list.vue";

const App = defineComponent({
   components: {
      NavBar,
      TodoList,
   },
   setup() {
      const lists: Ref<List[]> = ref(loadLists());
      const currentList: Ref<List | null> = ref(null);

      return { lists, currentList, saveLists };
   },
});

export default App;
</script>

<template>
   <div
      class="h-screen w-screen grid text-textBlue bg-bgBodyBlue md:grid-cols-[300px_auto] md:gap-3 md:p-3"
   >
      <NavBar
         v-model:lists="lists"
         @update:lists="saveLists"
         v-model:currentList="currentList"
      />
      <div
         class="flex justify-center h-screen md:h-[initial] md:translate-y-0 transition-transform duration-500"
         :class="{ 'translate-y-[-100vh]': currentList }"
      >
         <TodoList
            v-model="currentList"
            @update:modelValue="saveLists(lists)"
         />
      </div>
   </div>
</template>
