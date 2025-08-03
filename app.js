// Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');
const resultsInfo = document.getElementById('results-info');
const detailsSection = document.getElementById('details-section');
const detailsContainer = document.getElementById('details-container');
const backLink = document.getElementById('back-link');

// Hard-coded data (copied from data.json)
let attorneys = [
    {
        name: "César R. Corretjer Roses",
        barNumber: "TS-6,720",
        status: "Suspended",
        sanctions: [
            {
                caseNumber: "2022TSPR28",
                date: "2022-03-16",
                description: "Suspensión inmediata e indefinida del ejercicio de la abogacía por incumplir con los requerimientos del Tribunal Supremo y por no mantener actualizada su información en el Registro Único de Abogados y Abogadas.",
                source: ":contentReference[oaicite:0]{index=0}"
            }
        ]
    },
    {
        name: "Nydmilia Rodríguez Olmeda",
        barNumber: "TS-14,794",
        status: "Suspended",
        sanctions: [
            {
                caseNumber: "2022TSPR29",
                date: "2022-03-17",
                description: "Suspensión inmediata e indefinida del ejercicio de la abogacía y de la notaría por incumplir con los requerimientos del Programa de Educación Jurídica Continua y con las órdenes del Tribunal Supremo.",
                source: ":contentReference[oaicite:1]{index=1}"
            }
        ]
    },
    {
        name: "Juan Carlos Rodríguez Benítez",
        barNumber: "TS-14,868",
        status: "Suspended",
        sanctions: [
            {
                caseNumber: "2022TSPR21",
                date: "2022-02-18",
                description: "Suspensión inmediata e indefinida del ejercicio de la abogacía por incumplir con las órdenes del Tribunal Supremo y los requerimientos del Programa de Educación Jurídica Continua.",
                source: ":contentReference[oaicite:2]{index=2}"
            }
        ]
    },
    {
        name: "Danitza Santiago Ortiz",
        barNumber: "CP-2020-0011",
        status: "Suspended",
        sanctions: [
            {
                caseNumber: "2024TSPR126",
                date: "2024-12-05",
                description: "Suspensión inmediata e indefinida del ejercicio de la abogacía por violación a los Cánones 9, 12, 18, 19 y 26 del Código de Ética Profesional.",
                source: ":contentReference[oaicite:3]{index=3}"
            }
        ]
    },
    {
        name: "Carlos R. Torres Torres",
        barNumber: "TS-13,334",
        status: "Reinstated",
        sanctions: [
            {
                caseNumber: "2024TSPR125",
                date: "2024-12-04",
                description: "Reinstalación al ejercicio de la abogacía.",
                source: ":contentReference[oaicite:4]{index=4}"
            }
        ]
    },
    {
        name: "María del Mar Martín Hidalgo",
        barNumber: "TS-17,951",
        status: "Suspended",
        sanctions: [
            {
                caseNumber: "2024TSPR123",
                date: "2024-11-27",
                description: "Suspensión indefinida del ejercicio de la abogacía y la notaría como medida de protección social.",
                source: ":contentReference[oaicite:5]{index=5}"
            }
        ]
    },
    {
        name: "Jorge Iván Mártir González",
        barNumber: "AB-2024-0067",
        status: "Censured",
        sanctions: [
            {
                caseNumber: "2024TSPR121",
                date: "2024-11-15",
                description: "Censura enérgica por la conducta desplegada durante una vista sobre orden de protección al amparo de la Ley Núm. 246-2011.",
                source: ":contentReference[oaicite:6]{index=6}"
            }
        ]
    },
    {
        name: "Roberto Cruz Mena",
        barNumber: "AB-2024-0067",
        status: "Suspended",
        sanctions: [
            {
                caseNumber: "2024TSPR119",
                date: "2024-11-14",
                description: "Suspensión inmediata e indefinida del ejercicio de la abogacía por incumplimiento con los requerimientos del Tribunal Supremo.",
                source: ":contentReference[oaicite:7]{index=7}"
            }
        ]
    },
    {
        name: "José E. Santiago Maldonado",
        barNumber: "AB-2023-0210",
        status: "Suspended",
        sanctions: [
            {
                caseNumber: "2024TSPR118",
                date: "2024-11-14",
                description: "Suspensión inmediata por el término de tres meses del ejercicio de la abogacía por infringir los Cánones 18, 19, 20, 23 y 25 del Código de Ética Profesional.",
                source: ":contentReference[oaicite:8]{index=8}"
            }
        ]
    },
    {
        name: "María L. Pérez Vargas",
        barNumber: "TS-8,870",
        status: "Suspended",
        sanctions: [
            {
                caseNumber: "2024TSPR117",
                date: "2024-11-13",
                description: "Suspensión inmediata e indefinida del ejercicio de la notaría por craso incumplimiento con las órdenes y requerimientos del Tribunal Supremo y sus dependencias.",
                source: ":contentReference[oaicite:9]{index=9}"
            }
        ]
    }
];

// Render initial list
renderResults("");

// Helper to escape HTML
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Event listener for search
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    renderResults(query);
});

// Render search results
function renderResults(query) {
    let results;
    if (!query) {
        results = attorneys;
    } else {
        results = attorneys.filter(at =>
            at.name.toLowerCase().includes(query) ||
            (at.barNumber && at.barNumber.toLowerCase().includes(query))
        );
    }
    if (query) {
        resultsInfo.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrados para "${query}".`;
    } else {
        resultsInfo.textContent = `Muestra ${results.length} abogado${results.length !== 1 ? 's' : ''} en la base de datos.`;
    }
    resultsList.innerHTML = '';
    results.forEach(at => {
        const li = document.createElement('li');
        const nameElem = document.createElement('span');
        nameElem.textContent = at.name;
        nameElem.style.fontWeight = 'bold';
        const barElem = document.createElement('span');
        barElem.textContent = `(${at.barNumber})`;
        barElem.classList.add('bar-number');
        const statusElem = document.createElement('span');
        statusElem.textContent = at.status;
        statusElem.classList.add('status', at.status.toLowerCase());
        li.appendChild(nameElem);
        li.appendChild(barElem);
        li.appendChild(statusElem);
        li.addEventListener('click', () => showDetails(at));
        resultsList.appendChild(li);
    });
    detailsSection.classList.add('hidden');
    searchForm.classList.remove('hidden');
}

// Show details for an attorney
function showDetails(attorney) {
    const html = [];
    html.push(`<h2>${escapeHtml(attorney.name)}</h2>`);
    html.push(`<p><strong>Número de colegiación:</strong> ${escapeHtml(attorney.barNumber)}</p>`);
    html.push(`<p><strong>Estado actual:</strong> <span class="status ${attorney.status.toLowerCase()}">${escapeHtml(attorney.status)}</span></p>`);
    html.push('<h3>Historial de sanciones</h3>');
    if (attorney.sanctions && attorney.sanctions.length) {
        html.push('<table><thead><tr><th>Fecha</th><th>Número de caso</th><th>Descripción</th></tr></thead><tbody>');
        attorney.sanctions.forEach(sanction => {
            let citation = '';
            if (sanction.source) {
                citation = `<span class="citation" title="${escapeHtml(sanction.source)}">[cita]</span>`;
            }
            html.push(
                `<tr><td>${escapeHtml(sanction.date)}</td><td>${escapeHtml(sanction.caseNumber)}</td><td>${escapeHtml(sanction.description)}${citation}</td></tr>`
            );
        });
        html.push('</tbody></table>');
    } else {
        html.push('<p>No se han encontrado sanciones.</p>');
    }
    html.push('<p class="note">Nota: Las descripciones son un resumen de las decisiones disciplinarias. Para leer la decisión completa, consulte las publicaciones oficiales del Tribunal Supremo de Puerto Rico.</p>');
    detailsContainer.innerHTML = html.join('');
    detailsSection.classList.remove('hidden');
    searchForm.classList.add('hidden');
}

// Back link to search
backLink.addEventListener('click', event => {
    event.preventDefault();
    detailsSection.classList.add('hidden');
    searchForm.classList.remove('hidden');
});
