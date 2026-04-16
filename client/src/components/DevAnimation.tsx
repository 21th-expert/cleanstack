import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  opacity: number; size: number; color: string;
}

interface CodeLine {
  x: number; y: number; width: number; targetWidth: number;
  color: string; opacity: number; speed: number;
  indent: number; keyword: boolean;
}

interface Terminal {
  x: number; y: number; w: number; h: number;
  lines: string[]; cursor: number; tick: number;
  opacity: number; scale: number;
}

interface FloatingTag {
  x: number; y: number; vx: number; vy: number;
  text: string; opacity: number; color: string; size: number;
}

const KEYWORDS = ['const', 'function', 'return', 'import', 'export', 'async', 'await', 'class', 'interface', 'type'];
const TAGS = ['React', 'TypeScript', 'Node.js', 'Solidity', 'Three.js', 'GraphQL', 'Docker', 'AWS', 'Prisma', 'Next.js', 'WebGL', 'GSAP', 'Figma', 'Tailwind'];
const TERMINAL_LINES = [
  '$ npm run dev', '> cleanstack@1.0.0 dev', '> vite --host',
  '✓ ready in 169ms', '$ git commit -m "feat: add hero"',
  '[main 3a7f2c1] feat: add hero', '$ docker build -t app .',
  'Step 1/8 : FROM node:20', '✓ Build complete', '$ prisma migrate dev',
  'Applying migration...', '✓ Database updated',
];

export default function DevAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // Colors based on theme
    const c = {
      bg:       isDark ? '#0f1117' : '#f0f4ff',
      keyword:  isDark ? '#818cf8' : '#4f46e5',
      string:   isDark ? '#34d399' : '#059669',
      comment:  isDark ? '#475569' : '#94a3b8',
      fn:       isDark ? '#60a5fa' : '#2563eb',
      punct:    isDark ? '#94a3b8' : '#64748b',
      terminal: isDark ? '#1e2535' : '#1e293b',
      termText: isDark ? '#4ade80' : '#22c55e',
      tagBg:    isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
      tagText:  isDark ? '#a5b4fc' : '#4f46e5',
      particle: isDark ? '#6366f1' : '#818cf8',
      line1:    isDark ? '#6366f1' : '#6366f1',
      line2:    isDark ? '#34d399' : '#059669',
      line3:    isDark ? '#60a5fa' : '#2563eb',
      line4:    isDark ? '#f472b6' : '#db2777',
    };

    // Init code lines (simulating editor)
    const codeLines: CodeLine[] = Array.from({ length: 28 }, (_, i) => ({
      x: 40 + Math.random() * 60,
      y: 60 + i * 22,
      width: 0,
      targetWidth: 40 + Math.random() * 220,
      color: [c.keyword, c.string, c.fn, c.punct, c.comment][Math.floor(Math.random() * 5)],
      opacity: 0.12 + Math.random() * 0.18,
      speed: 0.4 + Math.random() * 0.8,
      indent: Math.floor(Math.random() * 4) * 16,
      keyword: Math.random() > 0.6,
    }));

    // Init terminals
    const terminals: Terminal[] = [
      { x: W() * 0.62, y: H() * 0.12, w: 280, h: 160, lines: [], cursor: 0, tick: 0, opacity: 0, scale: 0.95 },
      { x: W() * 0.68, y: H() * 0.55, w: 240, h: 130, lines: [], cursor: 0, tick: 0, opacity: 0, scale: 0.95 },
    ];

    // Init floating tags
    const floatingTags: FloatingTag[] = TAGS.map((text) => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      text,
      opacity: 0.06 + Math.random() * 0.1,
      color: c.tagText,
      size: 11 + Math.random() * 4,
    }));

    // Init particles (connection dots)
    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: 0.08 + Math.random() * 0.15,
      size: 1.5 + Math.random() * 2,
      color: c.particle,
    }));

    const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const drawTerminal = (t: Terminal) => {
      if (t.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = t.opacity;
      ctx.translate(t.x + t.w / 2, t.y + t.h / 2);
      ctx.scale(t.scale, t.scale);
      ctx.translate(-(t.w / 2), -(t.h / 2));

      // Window bg
      drawRoundRect(0, 0, t.w, t.h, 8);
      ctx.fillStyle = c.terminal;
      ctx.fill();

      // Title bar
      drawRoundRect(0, 0, t.w, 24, 8);
      ctx.fillStyle = isDark ? '#1a2535' : '#0f172a';
      ctx.fill();

      // Traffic lights
      [[8, '#ef4444'], [22, '#f59e0b'], [36, '#22c55e']].forEach(([x, col]) => {
        ctx.beginPath();
        ctx.arc(x as number, 12, 4, 0, Math.PI * 2);
        ctx.fillStyle = col as string;
        ctx.globalAlpha = t.opacity * 0.7;
        ctx.fill();
      });

      // Terminal text
      ctx.globalAlpha = t.opacity;
      ctx.font = '10px "Courier New", monospace';
      t.lines.forEach((line, i) => {
        const isPrompt = line.startsWith('$');
        ctx.fillStyle = isPrompt ? c.termText : (isDark ? '#94a3b8' : '#64748b');
        ctx.fillText(line.substring(0, 32), 8, 38 + i * 14);
      });

      // Blinking cursor
      if (tick % 60 < 30) {
        ctx.fillStyle = c.termText;
        ctx.fillRect(8 + (t.lines[t.lines.length - 1]?.length || 0) * 6, 28 + t.lines.length * 14, 6, 10);
      }

      ctx.restore();
    };

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, W(), H());

      // Background
      ctx.fillStyle = c.bg;
      ctx.fillRect(0, 0, W(), H());

      // Subtle grid
      ctx.strokeStyle = isDark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.05)';
      ctx.lineWidth = 1;
      const gs = 40;
      for (let x = 0; x < W(); x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H()); ctx.stroke(); }
      for (let y = 0; y < H(); y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W(), y); ctx.stroke(); }

      // Code editor panel (left side)
      const edX = 30, edY = 30, edW = Math.min(W() * 0.5, 420), edH = H() - 60;
      drawRoundRect(edX, edY, edW, edH, 12);
      ctx.fillStyle = isDark ? 'rgba(22,27,39,0.85)' : 'rgba(255,255,255,0.85)';
      ctx.fill();
      ctx.strokeStyle = isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Editor title bar
      drawRoundRect(edX, edY, edW, 32, 12);
      ctx.fillStyle = isDark ? 'rgba(15,17,23,0.9)' : 'rgba(241,245,249,0.9)';
      ctx.fill();

      // Traffic lights
      [[edX + 14, '#ef4444'], [edX + 28, '#f59e0b'], [edX + 42, '#22c55e']].forEach(([x, col]) => {
        ctx.beginPath();
        ctx.arc(x as number, edY + 16, 5, 0, Math.PI * 2);
        ctx.fillStyle = col as string;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // File tab
      ctx.fillStyle = isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)';
      ctx.fillRect(edX + 60, edY + 6, 80, 20);
      ctx.fillStyle = isDark ? '#a5b4fc' : '#4f46e5';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('App.tsx', edX + 68, edY + 20);

      // Line numbers
      ctx.font = '11px "Courier New", monospace';
      for (let i = 0; i < 28; i++) {
        ctx.fillStyle = isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)';
        ctx.fillText(String(i + 1).padStart(2, ' '), edX + 8, edY + 50 + i * 22);
      }

      // Animated code lines
      codeLines.forEach((line, idx) => {
        if (line.width < line.targetWidth) line.width += line.speed;
        if (line.width > line.targetWidth) {
          line.width = 0;
          line.targetWidth = 40 + Math.random() * 220;
          line.color = [c.keyword, c.string, c.fn, c.punct, c.comment][Math.floor(Math.random() * 5)];
        }

        const lx = edX + 32 + line.indent;
        const ly = edY + 50 + idx * 22;
        if (ly > edY + edH - 10) return;

        // Keyword highlight bg
        if (line.keyword && line.width > 20) {
          ctx.fillStyle = isDark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)';
          ctx.fillRect(lx - 2, ly - 12, Math.min(line.width, 50), 16);
        }

        ctx.fillStyle = line.color;
        ctx.globalAlpha = line.opacity;
        ctx.fillRect(lx, ly, line.width, 3);
        ctx.globalAlpha = 1;

        // Cursor blink on last active line
        if (idx === (Math.floor(tick / 40) % 28) && tick % 60 < 30) {
          ctx.fillStyle = isDark ? '#818cf8' : '#4f46e5';
          ctx.fillRect(lx + line.width + 2, ly - 10, 2, 14);
        }
      });

      // Floating tech tags
      floatingTags.forEach(tag => {
        tag.x += tag.vx;
        tag.y += tag.vy;
        if (tag.x < -80) tag.x = W() + 40;
        if (tag.x > W() + 80) tag.x = -40;
        if (tag.y < -20) tag.y = H() + 10;
        if (tag.y > H() + 20) tag.y = -10;

        ctx.save();
        ctx.globalAlpha = tag.opacity;
        ctx.font = `bold ${tag.size}px Inter, sans-serif`;
        const tw = ctx.measureText(tag.text).width;
        const pad = 8;

        // Badge bg
        ctx.fillStyle = isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)';
        drawRoundRect(tag.x - pad, tag.y - tag.size, tw + pad * 2, tag.size + 8, 6);
        ctx.fill();
        ctx.strokeStyle = isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.fillStyle = tag.color;
        ctx.fillText(tag.text, tag.x, tag.y);
        ctx.restore();
      });

      // Particles + connections
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W()) p.vx *= -1;
        if (p.y < 0 || p.y > H()) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x, dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 80) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      // Terminals
      terminals.forEach((t, ti) => {
        // Fade in
        if (t.opacity < 0.75) t.opacity += 0.005;
        if (t.scale < 1) t.scale += 0.003;

        // Add lines periodically
        t.tick++;
        if (t.tick % 45 === 0 && t.lines.length < 7) {
          const pool = TERMINAL_LINES.filter((_, i) => i % 2 === ti % 2);
          t.lines.push(pool[t.cursor % pool.length]);
          t.cursor++;
        }
        if (t.lines.length > 7) t.lines.shift();

        // Reposition on resize
        t.x = ti === 0 ? W() * 0.62 : W() * 0.65;
        t.y = ti === 0 ? H() * 0.1 : H() * 0.55;

        drawTerminal(t);
      });

      // Typing indicator dots (bottom right of editor)
      const dotY = edY + edH - 20;
      [0, 1, 2].forEach(i => {
        const phase = (tick / 20 + i * 0.5) % 3;
        const a = phase < 1 ? phase : phase < 2 ? 2 - phase : 0;
        ctx.beginPath();
        ctx.arc(edX + edW - 40 + i * 12, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#6366f1' : '#4f46e5';
        ctx.globalAlpha = 0.3 + a * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Status bar
      ctx.fillStyle = isDark ? 'rgba(79,70,229,0.3)' : 'rgba(79,70,229,0.15)';
      ctx.fillRect(edX, edY + edH - 18, edW, 18);
      ctx.font = '9px Inter, sans-serif';
      ctx.fillStyle = isDark ? '#a5b4fc' : '#4f46e5';
      ctx.globalAlpha = 0.8;
      ctx.fillText('TypeScript  UTF-8  Ln ' + (Math.floor(tick / 30) % 28 + 1) + ', Col 1', edX + 8, edY + edH - 5);
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
