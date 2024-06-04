<template>
  <header>
    <nav class="container mx-auto p-4 flex items-center justify-between">
      <p class="font-bold uppercase">Kroma</p>
      <ul class="flex items-center gap-x-4">
        <li>
          <router-link  :class="getLinkClass('/')" to="/">Swap</router-link>
        </li>
        <li>
          <router-link :class="getLinkClass('/tokens')" to="/tokens">Tokens</router-link>
        </li>
      </ul>
      <theme-toggle />
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeToggle from '../atoms/ThemeToggle.vue';

export default defineComponent({
    name: 'AppHeader',
    components: {ThemeToggle},
    computed: {
        getLinkClass() {
            return (path: string) => {
                return {
                    'py-1 px-2 leading-relaxed rounded': true, // common classes
                    'bg-violet-200 dark:bg-violet-500': this.$route.path !== path, // inactive link styles
                    'bg-violet-400 dark:bg-violet-700': this.$route.path === path // active link styles
                }
            }
        }
    }
});
</script>
