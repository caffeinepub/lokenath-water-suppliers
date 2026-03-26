# M/s Lokenath Water Suppliers

## Current State
New project with no existing application files.

## Requested Changes (Diff)

### Add
- Full business website for M/s Lokenath Water Suppliers (wholesale mineral water and Campa beverages)
- Hero section with brand tagline and CTA
- Product categories: Mineral Water (Bulk), Campa Beverages, Event Supplies
- Order form with fields: Name, Business Name, Phone, Delivery Address, Items & Quantity, Preferred Delivery Date
- WhatsApp order button integration
- About Us section with owner names (Dilip Bhattacharya, Subhojit Bhattacharya)
- Service areas: Behala, Sarsuna, Sakherbazar (Kolkata)
- Backend to store orders submitted via the website

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: Actor to store and retrieve orders (submit order, list orders for admin)
2. Frontend: Single-page website with nav, hero, product categories, order form, about us, footer
3. Order form submits to backend and also provides WhatsApp fallback link
