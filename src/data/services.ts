export interface ServiceItem {
  icon: string
  title: string
  description: string
  systems: string[]
}

export const services: ServiceItem[] = [
  {
    icon: 'shopping-cart',
    title: 'Comercio & Ventas',
    description: 'Sistemas POS, facturación electrónica y gestión comercial que aceleran tus ventas.',
    systems: ['POS', 'Facturación', 'Inventario', 'E-commerce', 'CRM de Ventas'],
  },
  {
    icon: 'building-store',
    title: 'Hotelería & Restaurantes',
    description: 'Soluciones completas para la industria hospitality con control operativo total.',
    systems: ['PMS Hotelero', 'POS Restaurante', 'Reservas', 'Housekeeping', 'Banquetes'],
  },
  {
    icon: 'heartbeat',
    title: 'Salud & Farmacias',
    description: 'Sistemas especializados con trazabilidad, recetario digital y telemedicina.',
    systems: ['Historia Clínica', 'Farmacia', 'Laboratorios', 'Citas', 'Telemedicina'],
  },
  {
    icon: 'book',
    title: 'Educación',
    description: 'Plataformas educativas que conectan administración, docentes, alumnos y padres.',
    systems: ['Gestión Escolar', 'Aula Virtual', 'Comunicación', 'Analytics', 'Biblioteca Digital'],
  },
  {
    icon: 'chart-bar',
    title: 'Business Intelligence',
    description: 'Dashboards y analytics que transforman datos en decisiones empresariales.',
    systems: ['Dashboards', 'Reportes', 'Alertas', 'Data Warehouse', 'Predictivo'],
  },
  {
    icon: 'code',
    title: 'Desarrollo a Medida',
    description: 'Aplicaciones web, móviles y PWA completamente personalizadas para tu negocio.',
    systems: ['Web Apps', 'Android', 'PWA', 'API', 'Cloud'],
  },
]
