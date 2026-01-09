import { createMemoryHistory, createRouter } from "vue-router";
import vCart from "@/components/v-cart.vue";
import vCatalog from "@/components/v-catalog.vue";
// import vCatalogItem from "@/components/v-catalog-item.vue";

const routes = [
  { path: "/", 
    name: 'catalog',
    component: vCatalog,
    props: true
  },
  { path: "/cart",
     name: "cart", 
     component: vCart, 
     props: true 
  },
  // {
  //   path: "/catalog-item",
  //   name: "catalog-item",
  //   component: vCatalogItem,
  //   props: true,
  // },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
