function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  return m?.[1] ?? null;
}

function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m?.[1] ?? null;
}

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const yt = youtubeId(url);
  if (yt) {
    return (
      <div className="aspect-video w-full overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}`}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const vimeo = vimeoId(url);
  if (vimeo) {
    return (
      <div className="aspect-video w-full overflow-hidden bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${vimeo}`}
          title={title}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
    return (
      <video src={url} controls preload="metadata" className="aspect-video w-full bg-black">
        Seu navegador não suporta vídeo.
      </video>
    );
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-slate-900 p-6 text-center">
      <p className="text-sm text-slate-400">Este vídeo abre no provedor original.</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="hx-btn-primary">
        Assistir vídeo
      </a>
    </div>
  );
}
