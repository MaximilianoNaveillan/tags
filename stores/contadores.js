import { defineStore } from "pinia";

export const useContadoresStore = defineStore("contadores", {
  state: () => ({
    contadores: [],
    filtros: { tipo: null, valor: null },
  }),
  getters: {
    contadoresFiltrados: (state) => {
      let c = [...state.contadores];
      if (state.filtros.tipo && state.filtros.valor !== null) {
        c =
          state.filtros.tipo === "mayor"
            ? c.filter((x) => x.valor > state.filtros.valor)
            : c.filter((x) => x.valor < state.filtros.valor);
      }
      return c;
    },
    sumaTotal: (state) => state.contadores.reduce((acc, c) => acc + c.valor, 0),
  },
  actions: {
    // cargar datos desde localStorage/sessionStorage (solo cliente)
    cargarDesdeStorage() {
      if (process.client) {
        const c = localStorage.getItem("contadores");
        if (c) this.contadores = JSON.parse(c);
        const f = sessionStorage.getItem("filtros");
        if (f) this.filtros = JSON.parse(f);
      }
    },

    agregar(contador) {
      this.contadores.push(contador);
      if (process.client)
        localStorage.setItem("contadores", JSON.stringify(this.contadores));
    },
    eliminar(id) {
      this.contadores = this.contadores.filter((c) => c.id !== id);
      if (process.client)
        localStorage.setItem("contadores", JSON.stringify(this.contadores));
    },
    actualizar(id, valor) {
      const c = this.contadores.find((c) => c.id === id);
      if (c) c.valor = valor;
      if (process.client)
        localStorage.setItem("contadores", JSON.stringify(this.contadores));
    },
    setFiltros(filtros) {
      this.filtros = filtros;
      if (process.client)
        sessionStorage.setItem("filtros", JSON.stringify(filtros));
    },
    ordenar(prop, dir) {
      this.contadores.sort((a, b) => {
        if (prop === "nombre") {
          return dir === "asc"
            ? a.nombre.localeCompare(b.nombre)
            : b.nombre.localeCompare(a.nombre);
        } else if (prop === "valor") {
          return dir === "asc" ? a.valor - b.valor : b.valor - a.valor;
        }
        return 0;
      });
    },
  },
});
