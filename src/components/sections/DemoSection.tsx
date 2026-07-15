'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/effects/ScrollReveal'

interface Product {
  id: string
  sku: string
  name: string
  category: string
  price: number
  cost: number
  stock: number
  minStock: number
  status: 'active' | 'low' | 'out'
  image: string
  imageData?: string
  createdAt: string
}

const categoryConfig: Record<string, { color: string; label: string }> = {
  Electrónicos: { color: '#3b82f6', label: 'Electrónicos' },
  Ropa: { color: '#ec4899', label: 'Ropa' },
  Alimentos: { color: '#f59e0b', label: 'Alimentos' },
  Salud: { color: '#10b981', label: 'Salud' },
  Hogar: { color: '#8b5cf6', label: 'Hogar' },
}

const categories = Object.keys(categoryConfig)

const initialProducts: Product[] = [
  { id: 'PRD-001', sku: 'LPT-PRO-X-001', name: 'Laptop Pro X 15"', category: 'Electrónicos', price: 1299.99, cost: 950.00, stock: 45, minStock: 10, status: 'active', image: 'Laptop Pro X 15"', createdAt: '15/01/2025' },
  { id: 'PRD-002', sku: 'AUR-BT-002', name: 'Auriculares Bluetooth Pro', category: 'Electrónicos', price: 89.99, cost: 52.00, stock: 12, minStock: 15, status: 'low', image: 'Auriculares Bluetooth Pro', createdAt: '22/01/2025' },
  { id: 'PRD-003', sku: 'CAM-ALG-001', name: 'Camiseta Algodón Premium', category: 'Ropa', price: 29.99, cost: 12.50, stock: 0, minStock: 20, status: 'out', image: 'Camiseta Algodón Premium', createdAt: '03/02/2025' },
  { id: 'PRD-004', sku: 'VIT-C-1000', name: 'Vitamina C 1000mg x60', category: 'Salud', price: 15.99, cost: 7.80, stock: 200, minStock: 30, status: 'active', image: 'Vitamina C 1000mg x60', createdAt: '10/02/2025' },
]

function ProductThumb({ product, size = 'md' }: { product: Product; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-9 h-9 text-[10px]', md: 'w-11 h-11 text-xs', lg: 'w-16 h-16 text-sm' }
  const cfg = categoryConfig[product.category] || categoryConfig['Electrónicos']

  if (product.imageData) {
    return (
      <div className={`${sizes[size]} rounded-xl overflow-hidden shadow-lg shrink-0 border border-white/10`}>
        <img
          src={product.imageData}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  const initials = product.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div
      className={`${sizes[size]} rounded-xl flex items-center justify-center font-bold text-white shadow-lg shrink-0`}
      style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` }}
    >
      {initials}
    </div>
  )
}

export function DemoSection() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState({ name: '', category: '', price: '', cost: '', stock: '', minStock: '' })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const readFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) readFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) readFile(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const resetForm = () => {
    setForm({ name: '', category: '', price: '', cost: '', stock: '', minStock: '' })
    setImagePreview(null)
    setImageFile(null)
    setErrors({})
    setEditing(null)
  }

  const openNew = () => {
    resetForm()
    setShowForm(true)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }

  const openEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, price: p.price.toString(), cost: p.cost.toString(), stock: p.stock.toString(), minStock: p.minStock.toString() })
    setImagePreview(p.imageData || null)
    setImageFile(null)
    setEditing(p)
    setShowForm(true)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'El nombre del producto es obligatorio'
    if (!form.category) errs.category = 'Selecciona una categoría'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = 'Ingresa un precio válido'
    if (!form.cost || isNaN(Number(form.cost)) || Number(form.cost) <= 0) errs.cost = 'Ingresa el costo'
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) errs.stock = 'Ingresa un stock válido'
    if (!form.minStock || isNaN(Number(form.minStock)) || Number(form.minStock) < 0) errs.minStock = 'Ingresa el stock mínimo'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const save = () => {
    if (!validate()) return
    const stockNum = Number(form.stock)
    const minStockNum = Number(form.minStock)
    const status: Product['status'] = stockNum === 0 ? 'out' : stockNum <= minStockNum ? 'low' : 'active'
    const today = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })

    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id ? {
        ...p,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        cost: Number(form.cost),
        stock: stockNum,
        minStock: minStockNum,
        status,
        image: form.name,
        imageData: imagePreview || p.imageData,
      } : p))
    } else {
      const num = products.length + 1
      const id = `PRD-${String(num).padStart(3, '0')}`
      const catPrefix = form.category.slice(0, 3).toUpperCase()
      const namePrefix = form.name.split(' ').map(w => w[0]).slice(0, 3).join('').toUpperCase()
      const sku = `${catPrefix}-${namePrefix}-${String(num).padStart(3, '0')}`
      setProducts(prev => [...prev, {
        id, sku,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        cost: Number(form.cost),
        stock: stockNum,
        minStock: minStockNum,
        status,
        image: form.name,
        imageData: imagePreview || undefined,
        createdAt: today,
      }])
    }
    resetForm()
    setShowForm(false)
  }

  const remove = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const totalCost = products.reduce((sum, p) => sum + p.cost * p.stock, 0)
  const activeCount = products.filter(p => p.status === 'active').length
  const lowCount = products.filter(p => p.status === 'low').length
  const outCount = products.filter(p => p.status === 'out').length

  const statusConfig = {
    active: { label: 'Activo', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    low: { label: 'Stock Bajo', bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
    out: { label: 'Sin Stock', bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400' },
  }

  return (
    <Section id="demo" className="overflow-hidden">
      <Container>
        <SectionTitle
          label="PRUEBA EL SISTEMA"
          title="Registra productos en vivo"
          description="Interactúa con una demo real de nuestro sistema de inventario. Agrega, edita y elimina productos — todo funciona sin base de datos."
        />
      </Container>

      <Container className="max-w-6xl">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: 'Total Productos', value: products.length, color: 'text-dark-100', bg: 'from-primary/10 to-accent/5' },
              { label: 'Valor Inventario', value: `$${totalValue.toLocaleString()}`, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-500/5' },
              { label: 'Costo Total', value: `$${totalCost.toLocaleString()}`, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/5' },
              { label: 'Margen Promedio', value: products.length ? `${Math.round((1 - totalCost / (totalValue || 1)) * 100)}%` : '0%', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-500/5' },
              { label: 'Alertas', value: lowCount + outCount, color: lowCount + outCount > 0 ? 'text-red-400' : 'text-emerald-400', bg: 'from-red-500/10 to-red-500/5' },
            ].map(kpi => (
              <div key={kpi.label} className={`rounded-xl border border-white/5 bg-gradient-to-br ${kpi.bg} p-4`}>
                <div className="text-[10px] text-dark-500 font-medium uppercase tracking-wider mb-1">{kpi.label}</div>
                <div className={`font-heading text-lg md:text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/5 bg-dark-900/60 overflow-hidden shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-dark-800/40">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-[11px] text-dark-500 font-mono hidden sm:block">Sistema de Inventario — Demo Interactiva</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-dark-500 bg-dark-800/60 rounded-lg px-2.5 py-1.5 border border-white/5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  Buscar...
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openNew}
                  className="text-[11px] px-3.5 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg shadow-primary/20 flex items-center gap-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Nuevo Producto
                </motion.button>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    ref={formRef}
                    key="form"
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-dark-800/40 to-dark-900/40 p-5 sm:p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary-light">
                              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-dark-100">{editing ? 'Editar Producto' : 'Registrar Nuevo Producto'}</h3>
                            <p className="text-[11px] text-dark-500">Completa los campos para {editing ? 'actualizar el' : 'registrar un'} producto en el sistema</p>
                          </div>
                        </div>
                        <button onClick={() => { resetForm(); setShowForm(false) }} className="p-1.5 rounded-lg hover:bg-white/5 text-dark-500 hover:text-dark-300 transition-all">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                        {/* Image Upload */}
                        <div className="lg:col-span-1">
                          <label className="block text-[11px] font-medium text-dark-400 mb-2">Imagen del Producto</label>
                          <div
                            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-6 min-h-[180px] ${
                              dragOver
                                ? 'border-primary/50 bg-primary/5'
                                : imagePreview
                                  ? 'border-white/10 bg-dark-800'
                                  : 'border-white/10 bg-dark-850 hover:border-white/10 hover:bg-dark-800'
                            }`}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileInput}
                              className="hidden"
                            />

                            {imagePreview ? (
                              <div className="relative w-full h-full flex flex-col items-center">
                                <div className="relative w-full max-w-[160px] aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg mb-3">
                                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                </div>
                                <span className="text-[10px] text-dark-400 truncate max-w-full px-2">
                                  {imageFile?.name || 'Imagen cargada'}
                                </span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); removeImage() }}
                                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-red-500/80 flex items-center justify-center transition-colors"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                  </svg>
                                </button>
                                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
                              </div>
                            ) : (
                              <>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                                  dragOver ? 'bg-primary/20 scale-110' : 'bg-dark-800/50'
                                }`}>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={dragOver ? 'text-primary-light' : 'text-dark-400'}>
                                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <p className="text-xs text-dark-400 font-medium mb-0.5">
                                  {dragOver ? 'Suelta la imagen aquí' : 'Subir imagen del producto'}
                                </p>
                                <p className="text-[10px] text-dark-500">
                                  Arrastra o haz clic para seleccionar
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Fields */}
                        <div className="lg:col-span-2 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-medium text-dark-400 mb-1.5">Nombre del Producto</label>
                              <input
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="Ej. Laptop Pro X 15"
                                className="w-full rounded-xl border border-white/10 bg-dark-850 px-3.5 py-2.5 text-sm text-dark-100 placeholder-dark-600 outline-none transition-all duration-300 focus:border-primary/40 focus:bg-dark-800 focus:ring-1 focus:ring-primary/20"
                              />
                              {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-dark-400 mb-1.5">Categoría</label>
                              <div className="relative">
                                <select
                                  value={form.category}
                                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                  className="w-full rounded-xl border border-white/10 bg-dark-850 px-3.5 py-2.5 text-sm text-dark-100 outline-none transition-all duration-300 focus:border-primary/40 focus:bg-dark-800 focus:ring-1 focus:ring-primary/20 appearance-none"
                                >
                                  <option value="">Seleccionar categoría</option>
                                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
                              </div>
                              {errors.category && <p className="text-[11px] text-red-400 mt-1">{errors.category}</p>}
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-dark-400 mb-1.5">Precio de Venta ($)</label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500 text-sm">$</span>
                                <input
                                  type="number" step="0.01"
                                  value={form.price}
                                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                  placeholder="0.00"
                                  className="w-full rounded-xl border border-white/10 bg-dark-850 pl-7 pr-3.5 py-2.5 text-sm text-dark-100 placeholder-dark-600 outline-none transition-all duration-300 focus:border-primary/40 focus:bg-dark-800 focus:ring-1 focus:ring-primary/20"
                                />
                              </div>
                              {errors.price && <p className="text-[11px] text-red-400 mt-1">{errors.price}</p>}
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-dark-400 mb-1.5">Costo ($)</label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500 text-sm">$</span>
                                <input
                                  type="number" step="0.01"
                                  value={form.cost}
                                  onChange={e => setForm(f => ({ ...f, cost: e.target.value }))}
                                  placeholder="0.00"
                                  className="w-full rounded-xl border border-white/10 bg-dark-850 pl-7 pr-3.5 py-2.5 text-sm text-dark-100 placeholder-dark-600 outline-none transition-all duration-300 focus:border-primary/40 focus:bg-dark-800 focus:ring-1 focus:ring-primary/20"
                                />
                              </div>
                              {errors.cost && <p className="text-[11px] text-red-400 mt-1">{errors.cost}</p>}
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-dark-400 mb-1.5">Stock Actual</label>
                              <input
                                type="number"
                                value={form.stock}
                                onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                                placeholder="0"
                                className="w-full rounded-xl border border-white/10 bg-dark-850 px-3.5 py-2.5 text-sm text-dark-100 placeholder-dark-600 outline-none transition-all duration-300 focus:border-primary/40 focus:bg-dark-800 focus:ring-1 focus:ring-primary/20"
                              />
                              {errors.stock && <p className="text-[11px] text-red-400 mt-1">{errors.stock}</p>}
                            </div>

                            <div>
                              <label className="block text-[11px] font-medium text-dark-400 mb-1.5">Stock Mínimo</label>
                              <input
                                type="number"
                                value={form.minStock}
                                onChange={e => setForm(f => ({ ...f, minStock: e.target.value }))}
                                placeholder="0"
                                className="w-full rounded-xl border border-white/10 bg-dark-850 px-3.5 py-2.5 text-sm text-dark-100 placeholder-dark-600 outline-none transition-all duration-300 focus:border-primary/40 focus:bg-dark-800 focus:ring-1 focus:ring-primary/20"
                              />
                              {errors.minStock && <p className="text-[11px] text-red-400 mt-1">{errors.minStock}</p>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                        <button onClick={() => { resetForm(); setShowForm(false) }} className="text-xs px-4 py-2 rounded-xl border border-white/10 text-dark-400 hover:text-dark-200 hover:bg-white/5 transition-all">
                          Cancelar
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={save}
                          className="text-xs px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg shadow-primary/20 flex items-center gap-1.5"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {editing ? 'Guardar Cambios' : 'Registrar Producto'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Cards */}
              <div className="block md:hidden space-y-3">
                <AnimatePresence mode="popLayout">
                  {products.map((product) => {
                    const st = statusConfig[product.status]
                    const margin = product.cost > 0 ? Math.round((1 - product.cost / product.price) * 100) : 0
                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-2xl border border-white/5 bg-dark-800/30 p-4"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <ProductThumb product={product} size="sm" />
                            <div>
                              <div className="text-sm font-medium text-dark-100">{product.name}</div>
                              <div className="text-[10px] text-dark-500 font-mono">{product.id}</div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${st.bg} ${st.text} shrink-0`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center mb-3">
                          <div>
                            <div className="text-xs font-mono font-medium text-dark-100">${product.price.toFixed(2)}</div>
                            <div className="text-[10px] text-dark-500">Precio</div>
                          </div>
                          <div>
                            <div className={`text-xs font-mono font-medium ${product.status === 'out' ? 'text-red-400' : product.status === 'low' ? 'text-amber-400' : 'text-dark-100'}`}>
                              {product.stock}
                            </div>
                            <div className="text-[10px] text-dark-500">Stock</div>
                          </div>
                          <div>
                            <div className={`text-xs font-mono font-medium ${margin >= 30 ? 'text-emerald-500' : margin >= 15 ? 'text-amber-400' : 'text-red-400'}`}>
                              {margin}%
                            </div>
                            <div className="text-[10px] text-dark-500">Margen</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <span className="text-[10px] text-dark-500">{product.category}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(product)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/5 text-dark-500 hover:text-primary-light transition-all" title="Editar producto">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button onClick={() => remove(product.id)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-red-500/10 text-dark-500 hover:text-red-400 transition-all" title="Eliminar producto">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Table (desktop) */}
              <div className="hidden md:block overflow-x-auto -mx-6">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="text-[11px] text-dark-500 font-semibold uppercase tracking-wider border-b border-white/5">
                      <th className="text-left py-3 px-5">Producto</th>
                      <th className="text-left py-3 px-3">SKU</th>
                      <th className="text-left py-3 px-3">Categoría</th>
                      <th className="text-right py-3 px-3">Precio</th>
                      <th className="text-right py-3 px-3">Stock</th>
                      <th className="text-center py-3 px-3">Estado</th>
                      <th className="text-right py-3 px-5 w-20">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {products.map((product) => {
                        const st = statusConfig[product.status]
                        const margin = product.cost > 0 ? Math.round((1 - product.cost / product.price) * 100) : 0
                        return (
                          <motion.tr
                            key={product.id}
                            layout
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="border-b border-white/5 group hover:bg-white/[0.015] transition-colors"
                          >
                            <td className="py-3 px-5">
                              <div className="flex items-center gap-3">
                                <ProductThumb product={product} size="sm" />
                                <div>
                                  <div className="text-sm font-medium text-dark-100">{product.name}</div>
                                  <div className="text-[10px] text-dark-500 font-mono">{product.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-xs text-dark-500 font-mono">{product.sku}</td>
                            <td className="py-3 px-3">
                              <span
                                className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                                style={{
                                  color: categoryConfig[product.category]?.color,
                                  backgroundColor: `${categoryConfig[product.category]?.color}15`,
                                }}
                              >
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="text-sm font-medium text-dark-100 font-mono">${product.price.toFixed(2)}</div>
                              <div className={`text-[10px] font-mono ${margin >= 30 ? 'text-emerald-500' : margin >= 15 ? 'text-amber-400' : 'text-red-400'}`}>
                                {margin}% margen
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className={`text-sm font-mono font-medium ${product.status === 'out' ? 'text-red-400' : product.status === 'low' ? 'text-amber-400' : 'text-dark-100'}`}>
                                {product.stock}
                              </div>
                              <div className="text-[10px] text-dark-500">
                                mín. {product.minStock}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                                {st.label}
                              </span>
                            </td>
                            <td className="py-3 px-5 text-right">
                              <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <button onClick={() => openEdit(product)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/5 text-dark-500 hover:text-primary-light transition-all" title="Editar producto">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                </button>
                                <button onClick={() => remove(product.id)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-red-500/10 text-dark-500 hover:text-red-400 transition-all" title="Eliminar producto">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {products.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-dark-800/50 to-dark-900/50 flex items-center justify-center mx-auto mb-5 border border-white/5">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-dark-500">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-dark-300 mb-2">No hay productos registrados</h4>
                  <p className="text-sm text-dark-500 max-w-xs mx-auto mb-6">Comienza agregando tu primer producto al sistema de inventario.</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openNew}
                    className="text-xs px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg shadow-primary/20"
                  >
                    + Crear Primer Producto
                  </motion.button>
                </motion.div>
              )}
            </div>

            <div className="px-5 sm:px-6 py-3 border-t border-white/5 bg-dark-800/20 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] text-dark-500">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Activo ({activeCount})</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Stock Bajo ({lowCount})</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Sin Stock ({outCount})</span>
              </div>
              <div className="text-[10px] text-dark-600">
                Demo 100% funcional · Datos locales
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      <Container className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', label: 'Gestión', desc: 'Registro y control de productos' },
            { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Imágenes', desc: 'Sube fotos reales de productos' },
            { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', label: 'Alertas', desc: 'Stock bajo y sin stock' },
            { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: 'Multi-usuario', desc: 'Diseñado para equipos' },
          ].map(f => (
            <div key={f.label} className="flex items-start gap-3 rounded-xl border border-white/5 bg-dark-900/30 p-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary-light"><path d={f.icon} /></svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-dark-200">{f.label}</div>
                <div className="text-[10px] text-dark-500">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
