import { adminEmployees } from '../data/adminMock'
import distributors from '../data/mockDistributors'
import dealers from '../data/mockDealers'
import products from '../data/mockProducts'
import orders from '../data/mockOrders'
import warehouse from '../data/mockWarehouse'

export function getEmployees(){
  return Promise.resolve(adminEmployees)
}
export function getDistributors(){
  return Promise.resolve(distributors)
}
export function getDistributorById(id:string){
  return Promise.resolve(distributors.find(d=>String(d.id)===String(id)))
}
export function getDealers(){
  return Promise.resolve(dealers)
}
export function getDealerById(id:string){
  return Promise.resolve(dealers.find(d=>String(d.id)===String(id)))
}
export function getProducts(){
  return Promise.resolve(products)
}
export function getProductById(id:string){
  return Promise.resolve(products.find(p=>String(p.id)===String(id)))
}
export function getOrders(){
  return Promise.resolve(orders)
}
export function getOrderById(id:string){
  return Promise.resolve(orders.find(o=>String(o.orderId)===String(id)))
}
export function getWarehouse(){
  return Promise.resolve(warehouse)
}
export function getDispatches(){
  return Promise.resolve([{id:'LR-001',vehicle:'MH12AB1234',driver:'Ramesh',status:'In Transit',eta:'2026-07-24'}])
}
export function getInvoices(){
  return Promise.resolve([{invoice: 'INV-1001', order:'ORD-1001', party:'Shri Dealer', amount:12500, status:'Paid'}])
}
