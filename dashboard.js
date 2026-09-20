const dashboardTranslations = {
  es: { back:'Volver al portafolio',eyebrow:'Demo 01 · Operaciones y analítica',intro:'Una interfaz para convertir cientos de solicitudes diarias en prioridades claras. Prueba los filtros, crea un caso ficticio y exporta los resultados.',disclaimer:'Producto y datos completamente ficticios, creados para este portafolio.',overview:'Resumen',requests:'Solicitudes',guests:'Huéspedes',reports:'Reportes',sideNote:'DEMO MODE\nLos cambios viven sólo en tu navegador.',operations:'Resumen de operaciones',export:'Exportar CSV',add:'+ Simular solicitud',search:'Buscar huésped, habitación o solicitud',allStatuses:'Todos los estados',open:'Abierta',progress:'En progreso',done:'Finalizada',allDepartments:'Todos los departamentos',openRequests:'Solicitudes abiertas',liveData:'datos de esta demo',urgent:'Prioridad urgente',needAttention:'requieren atención',completion:'Finalización',currentView:'en la vista actual',response:'Respuesta media',target:'objetivo menor a 10m',weekly:'Volumen semanal',lastSeven:'Últimos 7 días',byDepartment:'Por departamento',recent:'Solicitudes recientes',request:'Solicitud',guest:'Huésped',room:'Habitación',department:'Departamento',priority:'Prioridad',status:'Estado',normal:'Normal',high:'Alta',urgentLabel:'Urgente',results:'resultados',empty:'No hay solicitudes que coincidan con estos filtros.',created:'Solicitud ficticia añadida.',downloaded:'Archivo CSV generado.',dateLocale:'es-UY'},
  en: { back:'Back to portfolio',eyebrow:'Demo 01 · Operations and analytics',intro:'An interface that turns hundreds of daily requests into clear priorities. Try the filters, create a fictional case, and export the results.',disclaimer:'Entirely fictional product and data, created specifically for this portfolio.',overview:'Overview',requests:'Requests',guests:'Guests',reports:'Reports',sideNote:'DEMO MODE\nChanges live only in your browser.',operations:'Operations overview',export:'Export CSV',add:'+ Simulate request',search:'Search guest, room, or request',allStatuses:'All statuses',open:'Open',progress:'In progress',done:'Completed',allDepartments:'All departments',openRequests:'Open requests',liveData:'data in this demo',urgent:'Urgent priority',needAttention:'need attention',completion:'Completion rate',currentView:'in the current view',response:'Average response',target:'target under 10m',weekly:'Weekly volume',lastSeven:'Last 7 days',byDepartment:'By department',recent:'Recent requests',request:'Request',guest:'Guest',room:'Room',department:'Department',priority:'Priority',status:'Status',normal:'Normal',high:'High',urgentLabel:'Urgent',results:'results',empty:'No requests match these filters.',created:'Fictional request added.',downloaded:'CSV file generated.',dateLocale:'en-US'}
};

let language = 'es';
let requests = [
  {id:'RQ-1048',title:{es:'Toallas adicionales',en:'Extra towels'},guest:'Maya Chen',room:'804',department:'Housekeeping',priority:'normal',status:'open'},
  {id:'RQ-1047',title:{es:'Aire acondicionado sin enfriar',en:'Air conditioner not cooling'},guest:'Noah Williams',room:'312',department:'Maintenance',priority:'urgent',status:'progress'},
  {id:'RQ-1046',title:{es:'Reserva para la terraza',en:'Rooftop reservation'},guest:'Sofía Almeida',room:'521',department:'Food & Beverage',priority:'high',status:'open'},
  {id:'RQ-1045',title:{es:'Salida tardía',en:'Late check-out'},guest:'Liam Johnson',room:'1102',department:'Front Desk',priority:'normal',status:'done'},
  {id:'RQ-1044',title:{es:'Limpieza de habitación',en:'Room cleaning'},guest:'Emma Rossi',room:'417',department:'Housekeeping',priority:'high',status:'progress'},
  {id:'RQ-1043',title:{es:'Llave digital no funciona',en:'Digital key not working'},guest:'Mateo Silva',room:'605',department:'Front Desk',priority:'urgent',status:'done'}
];

const t = key => dashboardTranslations[language][key] || key;
const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const badge = (value,type) => `<span class="badge badge--${type}">${escapeHtml(value)}</span>`;
const labels = { status:{open:'open',progress:'progress',done:'done'}, priority:{normal:'normal',high:'high',urgent:'urgentLabel'} };

function filteredRequests() {
  const query = document.querySelector('#request-search').value.trim().toLowerCase();
  const status = document.querySelector('#status-filter').value;
  const department = document.querySelector('#department-filter').value;
  return requests.filter(item => (status === 'all' || item.status === status) && (department === 'all' || item.department === department) && (!query || `${item.id} ${item.title[language]} ${item.guest} ${item.room}`.toLowerCase().includes(query)));
}

function renderDashboard() {
  const data = filteredRequests();
  const statusType = {open:'orange',progress:'violet',done:'green'};
  const priorityType = {normal:'green',high:'orange',urgent:'red'};
  document.querySelector('#metric-open').textContent = data.filter(item => item.status !== 'done').length;
  document.querySelector('#metric-urgent').textContent = data.filter(item => item.priority === 'urgent' && item.status !== 'done').length;
  document.querySelector('#metric-completion').textContent = `${data.length ? Math.round(data.filter(item => item.status === 'done').length / data.length * 100) : 0}%`;
  document.querySelector('#result-count').textContent = `${data.length} ${t('results')}`;
  const wrap = document.querySelector('#request-table-wrap');
  if (!data.length) { wrap.innerHTML = `<div class="empty">${t('empty')}</div>`; return; }
  wrap.innerHTML = `<table class="request-table"><thead><tr><th>${t('request')}</th><th>${t('guest')}</th><th>${t('room')}</th><th>${t('department')}</th><th>${t('priority')}</th><th>${t('status')}</th></tr></thead><tbody>${data.map(item => `<tr><td><span class="mobile-label">${t('request')}</span><span><span class="request-title">${escapeHtml(item.title[language])}</span><br><small>${item.id}</small></span></td><td><span class="mobile-label">${t('guest')}</span>${escapeHtml(item.guest)}</td><td><span class="mobile-label">${t('room')}</span>${item.room}</td><td><span class="mobile-label">${t('department')}</span>${escapeHtml(item.department)}</td><td><span class="mobile-label">${t('priority')}</span>${badge(t(labels.priority[item.priority]),priorityType[item.priority])}</td><td><span class="mobile-label">${t('status')}</span>${badge(t(labels.status[item.status]),statusType[item.status])}</td></tr>`).join('')}</tbody></table>`;
}

function toast(message) { const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2200); }
function updateDate() { document.querySelector('#dashboard-date').textContent = new Intl.DateTimeFormat(t('dateLocale'),{weekday:'long',day:'2-digit',month:'long',year:'numeric'}).format(new Date()); }

['#request-search','#status-filter','#department-filter'].forEach(selector => document.querySelector(selector).addEventListener('input',renderDashboard));
document.querySelector('#add-request').addEventListener('click',()=>{ requests.unshift({id:`RQ-${1043+requests.length}`,title:{es:'Entrega de almohada hipoalergénica',en:'Hypoallergenic pillow delivery'},guest:'Alex Morgan',room:'908',department:'Housekeeping',priority:'high',status:'open'});renderDashboard();toast(t('created')); });
document.querySelector('#export-csv').addEventListener('click',()=>{ const rows=filteredRequests();const csv=[['id','request','guest','room','department','priority','status'],...rows.map(item=>[item.id,item.title[language],item.guest,item.room,item.department,item.priority,item.status])].map(row=>row.map(cell=>`"${String(cell).replaceAll('"','""')}"`).join(',')).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));const link=document.createElement('a');link.href=url;link.download='stayops-requests.csv';link.click();URL.revokeObjectURL(url);toast(t('downloaded')); });

window.setupDemoShell({ translations:dashboardTranslations, onLanguageChange:newLanguage=>{ language=newLanguage;updateDate();renderDashboard(); } });
