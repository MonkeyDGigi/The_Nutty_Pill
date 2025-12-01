import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Navigation guard to check if wallet is initialized
  Router.beforeEach((to, from, next) => {
    // Allow access to welcome page (and all its steps) and already-running page without wallet check
    if (to.path.startsWith("/welcome") || to.path === "/already-running") {
      next();
      return;
    }

    // Safely check if wallet mnemonic exists
    let hasWallet = false;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const mnemonic = localStorage.getItem("cashu.mnemonic");
        hasWallet = !!(mnemonic && mnemonic.length > 0);
      }
    } catch (e) {
      console.warn("[Router] Error checking wallet:", e);
      hasWallet = false;
    }

    if (!hasWallet) {
      // No wallet found, redirect to welcome page
      console.log("[Router] No wallet found, redirecting to welcome page");
      next("/welcome");
      return;
    }

    // Wallet exists, allow navigation
    next();
  });

  return Router;
});
