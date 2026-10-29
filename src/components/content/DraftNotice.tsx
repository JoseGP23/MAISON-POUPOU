/** Aviso de borrador legal (§11): se retira cuando el texto esté revisado. */
export function DraftNotice() {
  return (
    <div role="note" className="mb-12 border-l-2 border-ocre bg-brume px-5 py-4">
      <p className="label mb-1">Borrador</p>
      <p className="text-sm text-ink-soft">
        Este texto es provisional y está pendiente de revisión legal. Todavía no constituye las condiciones definitivas de
        MAISON POUPOU.
      </p>
    </div>
  );
}
