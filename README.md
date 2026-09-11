# GA-Unit4-Project-LesOrder

**LesOrder** is a React-based POS ordering system for on-venue restaurants, covering **front-of-house ordering**, **back-of-house order management**, and **admin inventory management**. The idea came from a conversation with a friend interested in starting a cafe.

## 🚧 Project Status: UI/Code Overhaul in Progress

This project is currently undergoing a full overhaul of both UI and codebase (see branch `user-ui-overhaul`). The Guest (Customer) UI has been rebuilt first, currently running on local dummy data ahead of backend integration. Staff UI is next in the pipeline.

## Updated Screenshots (v2 — Guest UI)

| Landing                                      | Menu                                   | Product Details                                              |
| -------------------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| ![Landing](screenshots/v2-guest-landing.png) | ![Menu](screenshots/v2-guest-menu.png) | ![Product Details](screenshots/v2-guest-product-details.png) |

| Cart                                   | Orders                                     |
| -------------------------------------- | ------------------------------------------ |
| ![Cart](screenshots/v2-guest-cart.png) | ![Orders](screenshots/v2-guest-orders.png) |

## About LesOrder

LesOrder is an e-commerce style app for managing onsite ordering. Customers browse and order onsite, staff verify orders before sending them to the kitchen, and admins manage the menu.

The app is designed mobile-first for front-of-house (guest) use, and tablet-first for back-of-house (staff) and admin use.

### 3 Separate UIs

- **Guest UI** — public-facing UI for customers to browse and order food.
- **Staff UI** _(in progress)_ — staff-facing UI to view and manage incoming orders.
- **Admin UI** — admin-facing UI for managing products.

All three roles share a single landing page; role-specific paths are separated via login from that landing page.

## Current Features

#### Guest UI (v2 — overhauled)

- Categories bar to quickly jump between menu categories.
- Full menu list with sticky category header.
- Product details view with options.
- Cart with editable item quantities and price summary.
- Order submission and order confirmation view.

#### Staff UI

- Not yet implemented — see **Coming Next** below.

#### Admin UI

- Manage Products: adding, editing, and deleting products.

## Coming Next: Staff UI

The Staff UI will house orders submitted from the Guest UI. Staff log in from the shared landing page and are routed into the Staff UI, where each order moves through 4 states:

1. **New** — order is first received when a guest places it.
2. **Accepted** — staff accepts the order via a button click.
3. **Completed** — staff checks off individual items in an accepted order; once all items are checked off, the order can be marked complete.
4. **Voided** — an order can be flagged as voided while in either the **New** or **Accepted** state.

## The Tech

#### Frontend

- **React with TypeScript** — provides a clear interface between components, though authoring the interface contracts takes more upfront work.
- **MUI (Material UI)** — fast to build with out-of-the-box, but customisation has a steep learning curve and can produce unexpected results.

#### Backend

- **Flask** — a Python micro web framework, chosen to get more familiar with Python. Minimal boilerplate to get started.

#### Database

- **PostgreSQL** — switched from NoSQL to SQL; found SQL statements powerful and the backend logic easier to build on.

## .env Keys

#### Frontend

- `VITE_SERVER`

#### Backend

- `DEBUG`
- `DB`
- `DB_HOST`
- `DB_PASSWORD`
- `DB_PORT`
- `DB_USER`
- `JWT_SECRET_KEY`

## Component Tree

```
└─ App
   ├─ AppUserUI
   │ ├─ SplashPage
   │ ├─ HomePage
   │ │  ├─ CategoryBar
   │ │  │  └─ CategoryTile
   │ │  │
   │ │  ├─ ProductList
   │ │  │  └─ ProductListGroup
   │ │  │  └─ ProductTile
   │ │  │
   │ │  └─ DrawerWrapper
   │ │     └─ ProductDetails
   │ │        ├─ ProductOptions
   │ │        └─ SpinButton
   │ │
   │ ├─ CheckoutPage
   │ │  └─ Cart
   │ │     ├─ CartTile
   │ │     └─ CartSummary
   │ │
   │ └─ UserNav
   │
   ├─ AppStaffUI
   │ ├─ StaffNav
   │ ├─ OrdersBar
   │ └─ NewOrdersList
   │    └─ NewOrderCard
   │
   └─ AppAdminUI
     ├─ AdminLoginRoute
     ├─ AdminRegisterRoute
     └─ AdminDashboard
        ├─ AdminNav
        └─ ManageProductsPage
           ├─ UpdateProductCard
           ├─ NewProductCard
           └─ AUiProductCard
```

_Note: component tree reflects the pre-overhaul structure and will be updated as the UI overhaul progresses._

## Learnings

Early iterations of this project surfaced the importance of proper upfront planning — the original build ran into blockages that came directly from a lack of it. That lesson is driving the current overhaul: replanning the app flow before rebuilding each section, starting with the Guest UI.

MUI proved genuinely useful once its out-of-the-box patterns were embraced rather than fought — which also explains why so many MUI-based apps share a similar look.

## Next Steps

#### Staff (in progress)

- View incoming orders (accept or reject)
- View in-kitchen orders (accepted orders)
- Complete kitchen orders when served, with per-item check-off
- Void orders (from New or Accepted state)
- View completed orders

#### Guest

- View submitted order history
- Membership and rewards

#### Admin

- Full management of products (products, categories, options)
- Manage users (Customer members, Staff, Admin)
- Manage app settings (notifications)

#### Backend

- Connect overhauled Guest UI to backend (currently running on local dummy data)
