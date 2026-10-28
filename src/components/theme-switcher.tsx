"use client";

import { useId, useRef, useState } from "react";
import { Check, Lock, Palette, Moon, Sun, X, ArrowRight, Loader2 } from "lucide-react";
import { LANDING_THEMES, getLandingTheme } from "@/lib/themes";
import { useLandingTheme } from "@/components/theme-provider";
import { APP_URL } from "@/lib/urls";
import styles from "./theme-switcher.module.css";

type Filter = "all" | "dark" | "light" | "owned";

export function ThemeSwitcher() {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("default");
  const [filter, setFilter] = useState<Filter>("all");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { authenticated, ownedThemeIds, equippedThemeId, equipTheme } = useLandingTheme();
  const selected = getLandingTheme(selectedId);
  const owned = ownedThemeIds.includes(selectedId);
  const active = selectedId === equippedThemeId;
  const themes = LANDING_THEMES.filter((theme) => filter === "all" || (filter === "owned" ? ownedThemeIds.includes(theme.id) : theme.mode === filter));

  function show() {
    setSelectedId(equippedThemeId);
    setFilter("all");
    setError(null);
    setMessage(null);
    dialog.current?.showModal();
    setOpen(true);
  }

  async function apply() {
    if (!owned || pending || active) return;
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const result = await equipTheme(selectedId);
      if (result) setError(result);
      else setMessage(`Tema ${selected.label} aplicado.`);
    } catch {
      setError("Não foi possível aplicar o tema. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return <>
    <button type="button" onClick={show} aria-label="Personalizar aparência" aria-haspopup="dialog" aria-expanded={open} className={styles.trigger}>
      <Palette size={18} aria-hidden="true" /><span>Temas</span>
    </button>
    <dialog ref={dialog} aria-labelledby={titleId} className={styles.dialog} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <div><p className={styles.eyebrow}>DO SEU JEITO</p><h2 id={titleId}>Sua identidade, suas cores.</h2><p>Compare os estilos e escolha o que combina com você.</p></div>
          <button autoFocus type="button" onClick={() => dialog.current?.close()} aria-label="Fechar temas" className={styles.close}><X size={20} /></button>
        </header>
        <div className={styles.content}>
          <div className={styles.catalog}>
            <div className={styles.filters} role="group" aria-label="Filtrar temas">
              {([{id:"all", label:"Todos"}, {id:"dark", label:"Escuros"}, {id:"light", label:"Claros"}, {id:"owned", label:"Meus temas"}] as const).map((item) => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
            </div>
            <div className={styles.grid} aria-label="Galeria de temas" aria-busy={pending}>
              {themes.map((theme) => <button key={theme.id} type="button" className={styles.theme} aria-pressed={selectedId === theme.id} aria-label={`Visualizar ${theme.label}${!ownedThemeIds.includes(theme.id) ? ", não adquirido" : ""}`} onClick={() => { setSelectedId(theme.id); setError(null); setMessage(null); }} disabled={pending}>
                <span className={styles.miniature} style={{background:theme.vars["--background"], color:theme.vars["--primary"]}} aria-hidden="true"><i style={{background:theme.vars["--surface"]}} /><span><b /><em style={{background:theme.vars["--accent"]}} /><small /></span>{theme.id === equippedThemeId && <Check size={14} />}</span>
                <span className={styles.themeName}>{theme.label}{!ownedThemeIds.includes(theme.id) && <Lock size={12} aria-hidden="true" />}</span>
                <span className={styles.caption}>{theme.id === equippedThemeId ? "Em uso" : ownedThemeIds.includes(theme.id) ? "Disponível" : "Prévia"}</span>
              </button>)}
            </div>
          </div>
          <aside className={styles.preview} aria-label="Prévia do tema selecionado">
            <div className={styles.sample} style={{background:selected.vars["--background"], color:selected.vars["--foreground"], borderColor:selected.vars["--border"]}}>
              <div className={styles.sampleTop}><Palette size={18} style={{color:selected.vars["--primary"]}} /><span>HEXAVANTE</span>{selected.mode === "light" ? <Sun size={16} /> : <Moon size={16} />}</div>
              <span className={styles.sampleChip} style={{color:selected.vars["--accent"]}}>SEU ESPAÇO DE EVOLUÇÃO</span>
              <strong>Um novo olhar.<br />Novas possibilidades.</strong>
              <div className={styles.sampleCards}><span style={{background:selected.vars["--surface"]}}>Aprenda</span><span style={{background:selected.vars["--surface"]}}>Evolua</span></div>
              <span className={styles.sampleButton} style={{background:selected.vars["--primary"],color:selected.vars["--primary-fg"] || "#fff"}}>Seu próximo passo <ArrowRight size={14} /></span>
            </div>
            <div className={styles.details}><h3>{selected.label}</h3><p>{selected.mode === "light" ? "Visual claro" : "Visual escuro"} · {selected.fx.length ? "Com efeitos visuais" : "Sem efeitos animados"}</p><div className={styles.swatches} aria-label="Paleta de cores">{["--background", "--primary", "--accent", "--foreground"].map((key) => <span key={key} style={{background:selected.vars[key as keyof typeof selected.vars]}} />)}</div></div>
            <p className={styles.hint}>{owned ? "A prévia não altera seu tema. Aplique quando encontrar o seu favorito." : "Você pode conhecer este estilo aqui. Para aplicar, é preciso ter o tema na sua conta."}</p>
            {owned ? <button className={styles.apply} type="button" onClick={() => void apply()} disabled={pending || active}>{pending ? <><Loader2 size={16} className="animate-spin" />Aplicando...</> : active ? <><Check size={16} />Tema em uso</> : <>Aplicar tema<ArrowRight size={16} /></>}</button> : <a className={styles.apply} href={`${APP_URL}/${authenticated ? "shop" : "login"}`}><Lock size={15} />{authenticated ? "Ver temas na loja" : "Entrar para liberar temas"}</a>}
            <p className={styles.feedback} role="status">{message}</p>{error && <p role="alert" className={styles.error}>{error}</p>}
          </aside>
        </div>
      </div>
    </dialog>
  </>;
}
