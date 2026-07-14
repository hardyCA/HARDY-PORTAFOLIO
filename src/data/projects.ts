export interface ProjectFeature {
  title: string
  description: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  gradient: string
  gradientFrom: string
  gradientTo: string
  accentColor: string
  problem: string
  solution: string
  features: ProjectFeature[]
  metrics: { label: string; value: string }[]
  tech: string[]
}

export const projects: Project[] = [
  {
    id: 'novapos',
    title: 'NovaPOS',
    subtitle: 'Sistema de Ventas y Punto de Venta',
    category: 'Comercio',
    gradient: 'from-blue-600/20 via-cyan-600/10 to-blue-800/20',
    gradientFrom: '#1e40af',
    gradientTo: '#0891b2',
    accentColor: '#3b82f6',
    problem: 'Restaurantes y tiendas perdían ventas por sistemas POS lentos, sin integración de inventario y reportes en tiempo real.',
    solution: 'Desarrollamos un sistema POS completo con iPad/tablet, integración de inventario en tiempo real, facturación electrónica y dashboard de análisis de ventas.',
    features: [
      { title: 'POS Táctil', description: 'Interfaz optimizada para tablets con soporte para múltiples formas de pago' },
      { title: 'Inventario Tiempo Real', description: 'Control de stock sincronizado con cada venta y alertas de reorden' },
      { title: 'Reportes Ejecutivos', description: 'Dashboard con ventas diarias, productos más vendidos y tendencias' },
      { title: 'Multi-sucursal', description: 'Gestión centralizada de todas las sucursales con datos en tiempo real' },
    ],
    metrics: [
      { label: 'Reducción de tiempos', value: '60%' },
      { label: 'Ventas mensuales', value: '$2.4M' },
      { label: 'Sucursales activas', value: '15' },
      { label: 'Usuarios activos', value: '180+' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'pharmatrack',
    title: 'PharmaTrack',
    subtitle: 'Sistema de Gestión Farmacéutica',
    category: 'Salud',
    gradient: 'from-emerald-600/20 via-teal-600/10 to-green-800/20',
    gradientFrom: '#059669',
    gradientTo: '#0d9488',
    accentColor: '#10b981',
    problem: 'Farmacias con inventario desorganizado, productos vencidos no detectados y procesos manuales que generaban pérdidas.',
    solution: 'Plataforma integral con control de lotes, fechas de vencimiento, recetario digital y conexión con laboratorios para reposición automática.',
    features: [
      { title: 'Control de Lotes', description: 'Trazabilidad completa por lote con alertas de vencimiento inteligentes' },
      { title: 'Recetario Digital', description: 'Gestión de recetas electrónicas con validación de dosis y contraindicaciones' },
      { title: 'Conexión Laboratorios', description: 'Catálogo de laboratorios con precios actualizados y pedidos automatizados' },
      { title: 'Facturación Especializada', description: 'Facturación electrónica adaptada a regulaciones farmacéuticas' },
    ],
    metrics: [
      { label: 'Reducción de pérdidas', value: '85%' },
      { label: 'Productos gestionados', value: '50K+' },
      { label: 'Farmacias conectadas', value: '42' },
      { label: 'Precisión de inventario', value: '99.7%' },
    ],
    tech: ['Angular', 'Python', 'MongoDB', 'RabbitMQ', 'AWS'],
  },
  {
    id: 'hotelmaster',
    title: 'HotelMaster',
    subtitle: 'ERP Hotelero Completo',
    category: 'Hotelería',
    gradient: 'from-amber-600/20 via-orange-600/10 to-yellow-800/20',
    gradientFrom: '#d97706',
    gradientTo: '#ea580c',
    accentColor: '#f59e0b',
    problem: 'Hoteles manejando reservas en papel, sin control de disponibilidad en tiempo real ni integración con OTAs.',
    solution: 'ERP hotelero con PMS integrado, motor de reservas, canal de conexión con OTAs, gestión de housekeeping y módulo de eventos.',
    features: [
      { title: 'PMS Integrado', description: 'Gestión de reservas, check-in/checkout y asignación de habitaciones' },
      { title: 'Conexión OTAs', description: 'Sincronización bidireccional con Booking, Airbnb y Expedia' },
      { title: 'Housekeeping', description: 'Control de limpieza, mantenimiento y estado de habitaciones en tiempo real' },
      { title: 'Eventos & Banquetes', description: 'Gestión de salones, catering y cotizaciones para eventos empresariales' },
    ],
    metrics: [
      { label: 'Eficiencia operativa', value: '+45%' },
      { label: 'Habitaciones gestionadas', value: '1,200+' },
      { label: 'OTAs conectadas', value: '6' },
      { label: 'Ocupación promedio', value: '87%' },
    ],
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Socket.io', 'GCP'],
  },
  {
    id: 'eduflow',
    title: 'EduFlow',
    subtitle: 'Plataforma Educativa Inteligente',
    category: 'Educación',
    gradient: 'from-sky-600/20 via-blue-600/10 to-indigo-800/20',
    gradientFrom: '#0284c7',
    gradientTo: '#4f46e5',
    accentColor: '#0ea5e9',
    problem: 'Colegios con procesos administrativos manuales, comunicación fragmentada con padres y sin plataforma de aprendizaje en línea.',
    solution: 'Ecosistema educativo integral: gestión académica y administrativa, aula virtual, comunicación escolar y dashboard de rendimiento.',
    features: [
      { title: 'Gestión Académica', description: 'Registro de notas, asistencias, horarios y planes de estudio' },
      { title: 'Aula Virtual', description: 'Plataforma de cursos en línea con videoconferencias y contenidos interactivos' },
      { title: 'Comunicación Escolar', description: 'Notificaciones, mensajería y reportes automáticos a padres de familia' },
      { title: 'Analytics Educativo', description: 'Dashboard de rendimiento por estudiante, curso y materia con predicciones' },
    ],
    metrics: [
      { label: 'Estudiantes en plataforma', value: '8,500+' },
      { label: 'Colegios activos', value: '23' },
      { label: 'Reducción administrativa', value: '70%' },
      { label: 'Satisfacción padres', value: '94%' },
    ],
    tech: ['React', 'Django', 'PostgreSQL', 'WebRTC', 'Azure'],
  },
  {
    id: 'medisys',
    title: 'MediSys',
    subtitle: 'Sistema de Gestión Clínica',
    category: 'Salud',
    gradient: 'from-rose-600/20 via-pink-600/10 to-red-800/20',
    gradientFrom: '#e11d48',
    gradientTo: '#db2777',
    accentColor: '#f43f5e',
    problem: 'Clínicas con historias clínicas en papel, citas perdidas y facturación lenta que afectaba la experiencia del paciente.',
    solution: 'Sistema integral con historia clínica electrónica, agendamiento inteligente, telemedicina y facturación automatizada.',
    features: [
      { title: 'Historia Clínica Electrónica', description: 'Expediente digital del paciente con plantillas por especialidad' },
      { title: 'Agendamiento Inteligente', description: 'Sistema de citas con recordatorios automáticos y optimización de agenda' },
      { title: 'Telemedicina', description: 'Consultas virtuales integradas con videollamada y recetas digitales' },
      { title: 'Facturación Médica', description: 'Facturación electrónica con códigos CIE-10 y conexión aseguradoras' },
    ],
    metrics: [
      { label: 'Pacientes atendidos', value: '35K+' },
      { label: 'Clínicas activas', value: '18' },
      { label: 'Reducción esperas', value: '65%' },
      { label: 'Citas virtuales', value: '12K+' },
    ],
    tech: ['Vue.js', 'Node.js', 'MongoDB', 'WebRTC', 'Docker'],
  },
  {
    id: 'dashpro',
    title: 'DashPro',
    subtitle: 'Business Intelligence Platform',
    category: 'Analytics',
    gradient: 'from-violet-600/20 via-purple-600/10 to-fuchsia-800/20',
    gradientFrom: '#7c3aed',
    gradientTo: '#d946ef',
    accentColor: '#8b5cf6',
    problem: 'Empresas con datos dispersos en múltiples sistemas sin forma de obtener insights accionables en tiempo real.',
    solution: 'Plataforma de Business Intelligence que unifica datos de todas las fuentes empresariales en dashboards interactivos con alertas predictivas.',
    features: [
      { title: 'Unificación de Datos', description: 'Conectores inteligentes para ERP, CRM, POS, hojas de cálculo y APIs' },
      { title: 'Dashboards Interactivos', description: 'Visualizaciones drag-and-drop con filtros, drill-down y exportación' },
      { title: 'Alertas Predictivas', description: 'ML integrado para detectar anomalías, tendencias y oportunidades de negocio' },
      { title: 'Reportes Automáticos', description: 'Reportes programados por email, Slack o WhatsApp con insights clave' },
    ],
    metrics: [
      { label: 'Datos procesados/día', value: '2.5M+' },
      { label: 'Fuentes integradas', value: '50+' },
      { label: 'Tiempo de insights', value: '-80%' },
      { label: 'ROI promedio', value: '340%' },
    ],
    tech: ['React', 'Go', 'ClickHouse', 'Python', 'Kubernetes'],
  },
]
