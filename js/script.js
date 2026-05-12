// --- DATA ---
const timeline = [
    { year: 2017, name: "Transformer", creator: "Google Brain", params: "65M", modality: "Texto", note: "Attention Is All You Need — el paper que reconfiguró la IA" },
    { year: 2018, name: "BERT / GPT-1", creator: "Google / OpenAI", params: "340M", modality: "Texto", note: "El preentrenamiento bidireccional redefinió los benchmarks de PLN" },
    { year: 2019, name: "GPT-2", creator: "OpenAI", params: "1.5B", modality: "Texto", note: "Considerado demasiado peligroso para ser lanzado — se lanzó de todos modos" },
    { year: 2020, name: "GPT-3", creator: "OpenAI", params: "175B", modality: "Texto", note: "Primer modelo en sentirse genuinamente emergente" },
    { year: 2021, name: "DALL&middot;E / Codex", creator: "OpenAI", params: "12B", modality: "Texto + Imagen", note: "El código y las imágenes entran en la corriente principal" },
    { year: 2022, name: "ChatGPT / Stable Diffusion", creator: "OpenAI / Stability AI", params: "175B", modality: "Texto + Imagen", note: "100 millones de usuarios en 2 meses. La adopción más rápida en la historia tecnológica." },
    { year: 2023, name: "GPT-4 / Claude 2 / Gemini", creator: "Multi-lab", params: "~1T est.", modality: "Multimodal", note: "Comienza la era multimodal. Los modelos abiertos comienzan a cerrar la brecha." },
    { year: 2024, name: "Claude 3 / Gemini 1.5 / GPT-4o", creator: "Multi-lab", params: "~1&ndash;8T MoE", modality: "Multimodal", note: "Las ventanas de contexto de 1 millón de tokens se convierten en el nuevo estándar." },
    { year: 2025, name: "GPT-5 / Claude 4 / DeepSeek V3", creator: "Multi-lab", params: "671B&ndash;2T", modality: "Agéntico", note: "DeepSeek sacude la industria a $0.27/M de tokens frente a los $15 de GPT." },
    { year: 2026, name: "GPT-5.4 / Claude Opus 4.6 / Gemini 3.1", creator: "Multi-lab", params: "744B&ndash;2.5T", modality: "Agéntico", note: "La brecha entre modelos abiertos y cerrados: 0.8 puntos de benchmark." }
];

const benchmarks = {
    models: ["GPT-5.4", "Claude Opus 4.6", "Gemini 3.1 Pro", "Grok 4", "DeepSeek V4", "GLM-5", "LLaMA 4 Maverick", "Mistral Large 3"],
    GPQA:      [83.9, 87.4, 94.3, 85.1, 82.0, 79.5, 76.2, 74.8],
    SWE:       [74.9, 74.0, 63.8, 75.0, 72.5, 77.8, 68.4, 61.2],
    HumanEval: [93.1, 90.4, 88.7, 91.5, 90.0, 89.3, 85.6, 83.1],
    MMLU:      [91.4, 90.5, 94.1, 89.7, 91.0, 88.9, 87.3, 85.5]
};

const contextWindows = [
    { name: "GPT-5.4",         tokens: 128000   },
    { name: "Claude Opus 4.6", tokens: 1000000  },
    { name: "Gemini 3.1 Pro",  tokens: 2000000  },
    { name: "LLaMA 4 Scout",   tokens: 10000000 },
    { name: "DeepSeek V4",     tokens: 128000   },
    { name: "Grok 4",          tokens: 256000   }
];

const pricing = {
    "GPT-5.4":         { input: 15.00, output: 60.00 },
    "Claude Opus 4.6": { input: 15.00, output: 75.00 },
    "Gemini 3.1 Pro":  { input: 12.50, output: 37.50 },
    "DeepSeek V4":     { input:  0.28, output:  1.10 },
    "GLM-5":           { input:  0.10, output:  0.40 },
    "Grok 4":          { input: 10.00, output: 30.00 }
};

const labs = [
    { name: "OpenAI", year: 2015, model: "GPT-5.4", colors: "#00a67e", bullets: ["Razonamiento agéntico", "Integración DALL&middot;E 4"], score: 93.1 },
    { name: "Anthropic", year: 2021, model: "Claude 4.6", colors: "#cc7b19", bullets: ["IA constitucional", "Líder en contexto largo"], score: 90.5 },
    { name: "Google", year: 1998, model: "Gemini 3.1", colors: "#4285f4", bullets: ["Multimodalidad nativa", "Ecosistema profundo"], score: 94.3 },
    { name: "Meta", year: 2004, model: "LLaMA 4", colors: "#0668e1", bullets: ["Líder en pesos abiertos", "Enfoque en eficiencia"], score: 87.3 },
    { name: "DeepSeek", year: 2023, model: "V4", colors: "#d4000f", bullets: ["Disruptor masivo de costos", "Arquitectura MoE"], score: 91.0 }
];

// --- UTILS ---
const $ = id => document.getElementById(id);

// --- RENDER TIMELINE ---
function renderTimeline() {
    const body = $('timeline-body');
    timeline.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.className = 'timeline-row';
        tr.setAttribute('tabindex', '0');
        if (item.year === 2022) tr.classList.add('chatgpt-row');
        if (item.year === 2026) tr.classList.add('current-row');
        
        tr.innerHTML = `
            <td>${item.year}</td>
            <td><strong>${item.name}</strong></td>
            <td>${item.creator}</td>
            <td><code style="font-family:var(--font-mono)">${item.params}</code></td>
            <td>${item.note.substring(0, 40)}...</td>
        `;

        const noteRow = document.createElement('tr');
        noteRow.className = 'timeline-note';
        noteRow.innerHTML = `<td colspan="5"><em>"${item.note}"</em></td>`;

        const toggleRow = () => {
            const isActive = noteRow.classList.contains('active');
            document.querySelectorAll('.timeline-note').forEach(n => n.classList.remove('active'));
            if (!isActive) noteRow.classList.add('active');
        };

        tr.addEventListener('click', toggleRow);
        tr.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleRow();
            }
        });

        body.appendChild(tr);
        body.appendChild(noteRow);
    });
}

// --- CANVAS CHARTS ---
function drawBarChart(canvasId, labels, data, winnerIndex, color = 'black') {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const margin = { top: 20, right: 60, bottom: 20, left: 120 };
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;
    const barHeight = height / labels.length - 10;

    ctx.clearRect(0, 0, rect.width, rect.height);

    data.forEach((val, i) => {
        const y = margin.top + i * (barHeight + 10);
        const barWidth = (val / 100) * width;

        ctx.fillStyle = (i === winnerIndex) ? '#d4000f' : '#000000';
        ctx.fillRect(margin.left, y, barWidth, barHeight);

        // Label
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 11px "IBM Plex Mono"';
        ctx.textAlign = 'right';
        ctx.fillText(labels[i], margin.left - 10, y + barHeight/2 + 4);

        // Value
        ctx.textAlign = 'left';
        ctx.fillText(val, margin.left + barWidth + 5, y + barHeight/2 + 4);
    });
}

function drawContextChart() {
    const canvas = $('chart-context');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const margin = { top: 40, right: 100, bottom: 40, left: 150 };
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;
    const barHeight = height / contextWindows.length - 15;

    // Log scale calculation
    const minVal = Math.log10(100000);
    const maxVal = Math.log10(10000000);

    contextWindows.sort((a,b) => b.tokens - a.tokens).forEach((item, i) => {
        const y = margin.top + i * (barHeight + 15);
        const logVal = Math.log10(item.tokens);
        const barWidth = ((logVal - minVal) / (maxVal - minVal)) * width;

        ctx.fillStyle = (item.name.includes('Scout')) ? '#d4000f' : '#000000';
        ctx.fillRect(margin.left, y, Math.max(barWidth, 2), barHeight);

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px "IBM Plex Mono"';
        ctx.textAlign = 'right';
        ctx.fillText(item.name, margin.left - 15, y + barHeight/2 + 5);

        ctx.textAlign = 'left';
        ctx.fillText(item.tokens.toLocaleString(), margin.left + barWidth + 10, y + barHeight/2 + 5);
    });
}

function drawCostScatter() {
    const canvas = $('chart-cost-scatter');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const margin = { top: 40, right: 120, bottom: 60, left: 100 };
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;

    const models = Object.keys(pricing);
    const dataPoints = models.map(name => {
        const idx = benchmarks.models.indexOf(name);
        const avgBench = (benchmarks.GPQA[idx] + benchmarks.SWE[idx] + benchmarks.HumanEval[idx] + benchmarks.MMLU[idx]) / 4;
        return { name, x: avgBench, y: pricing[name].input };
    });

    // Zoom en el eje X para separar los modelos que están muy cerca (83.8% a 85.8%)
    const minX = 83, maxX = 86.5; 
    const minY = 0.05, maxY = 30; // Escala Log Y

    // Ejes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, rect.height - margin.bottom);
    ctx.lineTo(rect.width - margin.right, rect.height - margin.bottom);
    ctx.stroke();

    // Etiqueta Eje Y (Costo)
    ctx.save();
    ctx.translate(margin.left - 70, margin.top + height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 11px "IBM Plex Mono"';
    ctx.textAlign = 'center';
    ctx.fillText('COSTO ENTRADA ($/1M)', 0, 0);
    ctx.restore();

    // Etiqueta Eje X (Rendimiento)
    ctx.fillStyle = '#000';
    ctx.font = 'bold 11px "IBM Plex Mono"';
    ctx.textAlign = 'center';
    ctx.fillText('RENDIMIENTO (PROMEDIO BENCHMARKS %)', margin.left + width / 2, rect.height - 15);

    // Ordenar por precio para manejar mejor las etiquetas (evitar tapar puntos)
    dataPoints.sort((a,b) => b.y - a.y).forEach((p, i) => {
        const xPos = margin.left + ((p.x - minX) / (maxX - minX)) * width;
        const logY = Math.log10(p.y);
        const logMinY = Math.log10(minY);
        const logMaxY = Math.log10(maxY);
        const yPos = (rect.height - margin.bottom) - ((logY - logMinY) / (logMaxY - logMinY)) * height;

        // Dibujar punto
        ctx.fillStyle = (p.name === 'DeepSeek V4') ? '#d4000f' : '#000';
        ctx.beginPath();
        ctx.arc(xPos, yPos, 6, 0, Math.PI * 2);
        ctx.fill();

        if (p.name === 'GLM-5') {
            ctx.strokeStyle = '#ffd600';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(xPos, yPos, 10, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Estrategia de etiquetas para evitar colisiones
        ctx.fillStyle = '#000';
        ctx.font = 'bold 11px "IBM Plex Mono"';
        ctx.textAlign = 'left';
        
        let labelX = xPos + 12;
        let labelY = yPos + 4;

        // Ajustes manuales específicos para la clúster de datos de 2026
        if (p.name === 'Claude Opus 4.6') { labelY -= 12; }
        if (p.name === 'GPT-5.4') { labelY += 12; }
        if (p.name === 'Grok 4') { labelX -= 60; labelY += 15; }
        if (p.name === 'GLM-5') { labelY += 20; labelX -= 20; }
        if (p.name === 'DeepSeek V4') { labelY -= 10; }

        ctx.fillText(p.name, labelX, labelY);
        
        if (p.name === 'GLM-5') {
            ctx.font = '9px "IBM Plex Mono"';
            ctx.fillText('150x más barato', labelX, labelY + 12);
        }
    });
}

// --- COST CALCULATOR ---
function setupCalculator() {
    const selA = $('calc-model-a');
    const selB = $('calc-model-b');
    if (!selA || !selB) return;
    const models = Object.keys(pricing);

    models.forEach(m => {
        const optA = new Option(m, m);
        const optB = new Option(m, m);
        selA.add(optA);
        selB.add(optB);
    });

    selA.value = "GPT-5.4";
    selB.value = "GLM-5";

    const slider = $('vol-slider');
    const update = () => {
        const vol = parseFloat(slider.value);
        const percent = ((vol - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty('--range-progress', `${percent}%`);
        $('vol-display').textContent = vol;

        const costA = vol * pricing[selA.value].input;
        const costB = vol * pricing[selB.value].input;

        $('res-a-val').textContent = `$${costA.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        $('res-b-val').textContent = `$${costB.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        $('res-a-name').textContent = selA.value;
        $('res-b-name').textContent = selB.value;

        const mult = (costA / costB).toLocaleString(undefined, {maximumFractionDigits: 0});
        $('multiplier-text').textContent = `${selB.value} ES ${mult}X MÁS BARATO POR DÍA CON ESTE VOLUMEN`;
    };

    slider.addEventListener('input', update);
    selA.addEventListener('change', update);
    selB.addEventListener('change', update);
    update();
}

// --- PLAYERS GRID ---
function renderPlayers() {
    const grid = $('players-grid');
    labs.forEach(lab => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.style.borderTop = `6px solid ${lab.colors}`;
        card.innerHTML = `
            <span class="player-mono">Est. ${lab.year}</span>
            <div class="player-name">${lab.name}</div>
            <span class="player-mono">Flagship: ${lab.model}</span>
            <ul class="player-list">
                ${lab.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
            <span class="player-score">${lab.score} GPQA</span>
        `;
        grid.appendChild(card);
    });
}

// --- TICKER ---
function startTicker() {
    let calls = 842910300;
    let papers = 142;
    let gpu = 4250100;

    setInterval(() => {
        calls += Math.floor(Math.random() * 1000);
        papers += Math.random() > 0.95 ? 1 : 0;
        gpu += Math.floor(Math.random() * 50);

        if ($('tick-calls')) $('tick-calls').textContent = calls.toLocaleString().padStart(11, '0');
        if ($('tick-papers')) $('tick-papers').textContent = papers.toString().padStart(3, '0');
        if ($('tick-gpu')) $('tick-gpu').textContent = gpu.toLocaleString().padStart(9, '0');
    }, 100);
}

// --- ANIMATION ---
function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
}

// --- INIT ---
window.addEventListener('load', () => {
    renderTimeline();
    renderPlayers();
    setupCalculator();
    startTicker();
    setupObserver();

    // Charts
    drawBarChart('chart-gpqa', benchmarks.models, benchmarks.GPQA, 2);
    drawBarChart('chart-swe', benchmarks.models, benchmarks.SWE, 5);
    drawBarChart('chart-human-eval', benchmarks.models, benchmarks.HumanEval, 0);
    drawBarChart('chart-mmlu', benchmarks.models, benchmarks.MMLU, 2);
    drawContextChart();
    drawCostScatter();

    // Cost Table
    const costBody = $('cost-table-body');
    if (costBody) {
        Object.keys(pricing).forEach(name => {
            const idx = benchmarks.models.indexOf(name);
            const ctxVal = contextWindows.find(c => c.name === name || name.includes(c.name))?.tokens || 128000;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="text-align:left"><strong>${name}</strong></td>
                <td class="${pricing[name].input < 1 ? 'highlight-yellow' : (pricing[name].input > 14 ? 'highlight-red' : '')}">$${pricing[name].input.toFixed(2)}</td>
                <td>$${pricing[name].output.toFixed(2)}</td>
                <td>${benchmarks.GPQA[idx]}</td>
                <td>${benchmarks.SWE[idx]}</td>
                <td>${(ctxVal/1000).toFixed(0)}K</td>
            `;
            costBody.appendChild(tr);
        });
    }
});

// Resize handler
window.addEventListener('resize', () => {
    drawBarChart('chart-gpqa', benchmarks.models, benchmarks.GPQA, 2);
    drawBarChart('chart-swe', benchmarks.models, benchmarks.SWE, 5);
    drawBarChart('chart-human-eval', benchmarks.models, benchmarks.HumanEval, 0);
    drawBarChart('chart-mmlu', benchmarks.models, benchmarks.MMLU, 2);
    drawContextChart();
    drawCostScatter();
});
