<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { getSampleList, saveLists } from "./methods/methods";
import { List } from "./types/types";
import NavBar from "./components/navbar.vue";
import TodoList from "./components/todo-list.vue";

const App = defineComponent({
   components: {
      NavBar,
      TodoList,
   },
   setup() {
      const data = document.cookie ? JSON.parse(document.cookie) : getSampleList();
      const lists: Ref<List[]> = ref(data);
      const currentList: Ref<List | null> = ref(null);

      saveLists(lists.value);

      return { lists, currentList };
   },
});

export default App;
</script>

<template>
   <div class="h-screen w-screen grid md:grid-cols-[300px_auto] gap-3 md:p-3 text-textBlue">
      <NavBar :class="{'hidden md:block': currentList}" v-model:lists="lists" v-model:currentList="currentList" />
      <div class="flex justify-center">
         <TodoList v-model="currentList" />
      </div>
   </div>
</template>
