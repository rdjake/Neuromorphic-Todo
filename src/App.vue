<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { getSampleList } from "./methods/methods";
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

      return { lists, currentList };
   },
});

export default App;
</script>

<template>
   <div class="h-screen w-screen grid grid-cols-[300px_auto] p-3 text-textBlue">
      <NavBar v-model:lists="lists" v-model:currentList="currentList" />
      <div class="flex justify-center">
         <TodoList v-model="currentList" />
      </div>
   </div>
</template>
