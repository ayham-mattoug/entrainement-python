// Web Worker : fait tourner Python (Pyodide) à part,
// pour qu'une boucle infinie ne bloque pas la page.
importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");

let pyodide;
const pret = (async () => { pyodide = await loadPyodide(); })();

self.onmessage = async (ev) => {
  const m = ev.data;
  try {
    await pret;
    if (m.type === "init") {
      pyodide.runPython(m.runner);
      self.postMessage({ id: m.id, ok: true });
      return;
    }
    pyodide.globals.set("code_etudiant", m.code);
    if (m.type === "lancer") {
      self.postMessage({ id: m.id, res: JSON.parse(pyodide.runPython("lancer(code_etudiant)")) });
    } else {
      pyodide.globals.set("tests_json", JSON.stringify(m.tests));
      self.postMessage({ id: m.id, res: JSON.parse(pyodide.runPython("verifier(code_etudiant, tests_json)")) });
    }
  } catch (e) {
    self.postMessage({ id: m.id, echec: String(e) });
  }
};
