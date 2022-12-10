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
   <div class="h-screen w-screen grid md:grid-cols-[300px_auto] gap-3 md:p-3 text-textBlue bg-bgBodyBlue">
      <NavBar :class="{'hidden md:block': currentList}" v-model:lists="lists" @update:lists="saveLists" v-model:currentList="currentList"  />
      <div class="flex justify-center">
         <TodoList v-model="currentList" @update:modelValue="saveLists(lists)" />
      </div>
   </div>
</template>
