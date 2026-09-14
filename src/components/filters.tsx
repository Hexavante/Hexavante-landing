export function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <form
      method="get"
      className="mb-8 flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
    >
      {children}
    </form>
  );
}

export function SearchField({ name, defaultValue, placeholder }: { name: string; defaultValue?: string; placeholder: string }) {
  return (
    <div className="min-w-[200px] flex-1">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        Buscar
      </label>
      <input name={name} defaultValue={defaultValue ?? ""} placeholder={placeholder} className="hx-input" />
    </div>
  );
}

export function SelectField({
  name,
  defaultValue,
  label,
  options,
}: {
  name: string;
  defaultValue?: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="w-full sm:w-48">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <select name={name} defaultValue={defaultValue ?? ""} className="hx-input">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SubmitButton() {
  return (
    <button type="submit" className="hx-btn-primary !px-6 !py-2.5">
      Filtrar
    </button>
  );
}

export function TypePills({
  baseHref,
  current,
  extra,
  items,
}: {
  baseHref: string;
  current?: string;
  extra?: string;
  items: { value: string; label: string }[];
}) {
  const hrefFor = (value?: string) => {
    const params = new URLSearchParams();
    if (value) params.set("tipo", value);
    if (extra) {
      for (const [k, v] of new URLSearchParams(extra)) params.set(k, v);
    }
    const qs = params.toString();
    return qs ? `${baseHref}?${qs}` : baseHref;
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <a href={hrefFor(undefined)} className={`hx-pill ${!current ? "hx-pill-active" : ""}`}>
        Todos
      </a>
      {items.map((item) => (
        <a
          key={item.value}
          href={hrefFor(item.value)}
          className={`hx-pill ${current === item.value ? "hx-pill-active" : ""}`}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
