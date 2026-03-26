import { LoginPage } from "@/components/LoginPage";
import { SignupPage } from "@/components/SignupPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  CheckCircle2,
  Droplets,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Star,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PHONE = "7890070592";
const WHATSAPP_URL = `https://wa.me/91${PHONE}?text=Hello%2C+I+want+to+place+an+order+with+M%2Fs+Lokenath+Water+Suppliers`;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Products", id: "products" },
  { label: "Price List", id: "pricing" },
  { label: "About Us", id: "about" },
  { label: "Order", id: "order" },
  { label: "Contact", id: "contact" },
];

const products = [
  {
    id: 1,
    icon: Package,
    title: "Pabitra Mineral Water",
    image: "/assets/generated/product-mineral-water.dim_400x300.jpg",
    description:
      "Premium quality Pabitra mineral water available in multiple pack sizes for homes, offices, and institutions.",
    items: [
      "500ml Cases — 24 pcs per case",
      "1L Cases — 12 pcs per case",
      "2L Cases — available on order",
    ],
    badge: "Best Seller",
  },
  {
    id: 2,
    icon: Star,
    title: "Campa Beverages",
    image: "/assets/generated/product-campa-beverages.dim_400x300.jpg",
    description:
      "India's iconic Campa brand cold drinks in all flavours and sizes, perfect for retail, events, and bulk orders.",
    items: [
      "Campa Cola — 200ml, 500ml",
      "Campa Lemon — 200ml, 500ml",
      "Campa Orange — 200ml, 500ml",
    ],
    badge: "New Stock",
  },
  {
    id: 3,
    icon: Truck,
    title: "Event Supplies",
    image: "/assets/generated/product-event-supplies.dim_400x300.jpg",
    description:
      "Curated bulk water and beverage packages for large gatherings — delivered on time, every time.",
    items: [
      "Wedding & Reception packages",
      "Medical Camp bulk water supply",
      "Social Events & Puja supplies",
    ],
    badge: "Custom Orders",
  },
];

const pabitraRates = [
  { size: "500 ml", price: "₹145", unit: "per case (24 pcs)" },
  { size: "1 Litre", price: "₹120", unit: "per case (12 pcs)" },
  { size: "2 Litre", price: "₹145", unit: "per case" },
];

const campaRates = [
  { size: "200 ml", price: "₹250", unit: "per case" },
  { size: "500 ml", price: "₹400", unit: "per case" },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [view, setView] = useState<"main" | "signup" | "login">("main");
  const [userName, setUserName] = useState("");
  const { identity, clear } = useInternetIdentity();
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    address: "",
    products: "",
    date: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOrderSuccess(true);
    setFormData({
      name: "",
      business: "",
      phone: "",
      address: "",
      products: "",
      date: "",
    });
  }

  if (view === "signup")
    return (
      <SignupPage
        onBack={() => setView("main")}
        onSwitchToLogin={() => setView("login")}
      />
    );
  if (view === "login")
    return (
      <LoginPage
        onBack={() => setView("main")}
        onSwitchToSignup={() => setView("signup")}
        onLoginSuccess={(name) => {
          setUserName(name);
          setView("main");
        }}
      />
    );
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Top Utility Bar */}
      <div className="w-full bg-[#153F61] text-white py-2">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone size={13} />
              +91 {PHONE}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              Serving Behala, Sarsuna &amp; Sakherbazar
            </span>
          </div>
          <span className="text-blue-200 text-xs">
            Wholesale Water &amp; Beverages · Kolkata
          </span>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2.5 font-bold text-[#1F5E8C] text-lg leading-tight"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-full bg-[#1F5E8C] flex items-center justify-center flex-shrink-0">
              <Droplets size={20} className="text-white" />
            </div>
            <span className="hidden sm:block">
              M/s LOKENATH
              <br />
              <span className="text-xs font-medium text-gray-500 tracking-wide">
                WATER SUPPLIERS
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-gray-600 hover:text-[#1F5E8C] transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              className="bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full px-5"
              onClick={() => scrollTo("order")}
              data-ocid="nav.primary_button"
            >
              Order Now
            </Button>
            {identity ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 font-medium">
                  {userName || "Account"}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#1F5E8C] text-[#1F5E8C] hover:bg-[#E7F1FA] rounded-full px-4"
                  onClick={() => {
                    clear();
                    setUserName("");
                  }}
                  data-ocid="nav.secondary_button"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#1F5E8C] text-[#1F5E8C] hover:bg-[#E7F1FA] rounded-full px-4"
                  onClick={() => setView("login")}
                  data-ocid="nav.secondary_button"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full px-4"
                  onClick={() => setView("signup")}
                  data-ocid="nav.primary_button"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen((o) => !o)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <nav className="flex flex-col px-4 py-3 gap-3">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    onClick={() => {
                      scrollTo(link.id);
                      setMobileOpen(false);
                    }}
                    className="text-sm font-medium text-gray-700 text-left py-1"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  className="bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full mt-1"
                  onClick={() => {
                    scrollTo("order");
                    setMobileOpen(false);
                  }}
                  data-ocid="nav.primary_button"
                >
                  Order Now
                </Button>
                {identity ? (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-700 font-medium">
                      {userName || "Account"}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#1F5E8C] text-[#1F5E8C] rounded-full px-4"
                      onClick={() => {
                        clear();
                        setUserName("");
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.secondary_button"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-1">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#1F5E8C] text-[#1F5E8C] rounded-full"
                      onClick={() => {
                        setView("login");
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.secondary_button"
                    >
                      Sign In
                    </Button>
                    <Button
                      className="flex-1 bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full"
                      onClick={() => {
                        setView("signup");
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.primary_button"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #153F61 0%, #1F5E8C 40%, #2B6FA2 70%, #3B83B7 100%)",
          minHeight: "560px",
        }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-water-products.dim_1200x600.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="flex-1 text-white"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Kolkata's Trusted Wholesaler
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Pure Water &amp; <br />
              <span className="text-blue-200">Campa Beverages</span>
              <br />
              Wholesale Supplier
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              Your trusted wholesale partner for mineral water and refreshments.
              Serving Behala, Sarsuna &amp; Sakherbazar with reliable, timely
              delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-white text-[#1F5E8C] hover:bg-blue-50 font-bold rounded-full px-8 shadow-hero"
                onClick={() => scrollTo("order")}
                data-ocid="hero.primary_button"
              >
                Place an Order
              </Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.secondary_button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-full px-8 gap-2 bg-transparent"
                >
                  <MessageCircle size={18} />
                  Order via WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/assets/generated/hero-water-products.dim_1200x600.jpg"
              alt="Water and beverages"
              className="w-full max-w-md rounded-2xl shadow-hero object-cover"
              style={{ maxHeight: 320 }}
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0 48h1440V24C1200 4 960 0 720 12S240 44 0 24v24z"
              fill="#F3F6F9"
            />
          </svg>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-[#F3F6F9]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#1F5E8C] text-sm font-bold uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Our Product Range
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Quality products at wholesale prices — from mineral water to
              popular cold drinks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`products.item.${i + 1}`}
              >
                <Card className="h-full overflow-hidden border border-gray-100 shadow-card hover:shadow-hero transition-shadow duration-300">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 bg-[#1F5E8C] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#E7F1FA] flex items-center justify-center">
                        <product.icon size={16} className="text-[#1F5E8C]" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      {product.description}
                    </p>
                    <ul className="space-y-1.5">
                      {product.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1F5E8C] mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-5 w-full bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full"
                      onClick={() => scrollTo("order")}
                      data-ocid={`products.primary_button.${i + 1}`}
                    >
                      Order This
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price List */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#1F5E8C] text-sm font-bold uppercase tracking-widest">
              Wholesale Rates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Price List
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Current wholesale rates. Contact us for bulk discounts on large
              orders.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pabitra Water Rates */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Card className="overflow-hidden border border-blue-100 shadow-md">
                <div className="bg-[#1F5E8C] px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Droplets size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      Pabitra Mineral Water
                    </h3>
                    <p className="text-blue-200 text-xs">
                      Per case wholesale rate
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#E7F1FA]">
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                          Size
                        </th>
                        <th className="text-center px-6 py-3 text-sm font-semibold text-gray-700">
                          Rate
                        </th>
                        <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                          Unit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pabitraRates.map((row, i) => (
                        <tr
                          key={row.size}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {row.size}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block bg-[#1F5E8C] text-white font-bold text-base px-4 py-1 rounded-full">
                              {row.price}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm text-gray-500">
                            {row.unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-4 border-t border-gray-100">
                    <Button
                      className="w-full bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full"
                      onClick={() => scrollTo("order")}
                      data-ocid="pricing.primary_button"
                    >
                      Order Water
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Campa Rates */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Card className="overflow-hidden border border-blue-100 shadow-md">
                <div className="bg-[#2B6FA2] px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Star size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      Campa Beverages
                    </h3>
                    <p className="text-blue-200 text-xs">
                      All flavours — Cola, Lemon, Orange
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#E7F1FA]">
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                          Size
                        </th>
                        <th className="text-center px-6 py-3 text-sm font-semibold text-gray-700">
                          Rate
                        </th>
                        <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                          Unit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaRates.map((row, i) => (
                        <tr
                          key={row.size}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {row.size}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block bg-[#2B6FA2] text-white font-bold text-base px-4 py-1 rounded-full">
                              {row.price}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm text-gray-500">
                            {row.unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-4 border-t border-gray-100">
                    <Button
                      className="w-full bg-[#2B6FA2] hover:bg-[#1F5E8C] text-white rounded-full"
                      onClick={() => scrollTo("order")}
                      data-ocid="pricing.primary_button"
                    >
                      Order Campa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.p
            className="text-center text-gray-400 text-sm mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            * Prices are per case (wholesale). Minimum order quantities apply.
            Contact us for event &amp; bulk pricing.
          </motion.p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-[#E7F1FA]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#1F5E8C] text-sm font-bold uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
                About M/s Lokenath
                <br />
                Water Suppliers
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                M/s Lokenath Water Suppliers is a premier wholesale distributor
                based in Kolkata, specialising in Pabitra mineral water and
                Campa cold drinks. We have built our reputation on delivering
                quality products with speed and consistency.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Owned and managed by <strong>Dilip Bhattacharya</strong> and{" "}
                <strong>Subhojit Bhattacharya</strong>, we take pride in
                maintaining long-term relationships with our customers across
                Behala, Sarsuna, and Sakherbazar.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Years in Business", value: "10+" },
                  { label: "Happy Clients", value: "500+" },
                  { label: "Areas Served", value: "3+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-4 text-center shadow-xs border border-blue-100"
                  >
                    <div className="text-2xl font-bold text-[#1F5E8C]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                {
                  icon: Truck,
                  title: "Reliable Delivery",
                  desc: "Timely delivery across our service areas. Never miss a stock day.",
                },
                {
                  icon: Package,
                  title: "Bulk Wholesale Rates",
                  desc: "Competitive pricing for businesses, events, and large-quantity orders.",
                },
                {
                  icon: Star,
                  title: "Quality Assured",
                  desc: "Certified brands — Pabitra mineral water and Campa beverages.",
                },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-xs border border-blue-100"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1F5E8C] flex items-center justify-center flex-shrink-0">
                    <feat.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-gray-500 text-sm">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="py-20 bg-[#F3F6F9]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#1F5E8C] text-sm font-bold uppercase tracking-widest">
              Place Your Order
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Order Online
            </h2>
            <p className="text-gray-500 mt-3">
              Fill in the form below and we'll confirm your order within a few
              hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-hero border border-gray-100">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {orderSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center py-12 text-center"
                      data-ocid="order.success_state"
                    >
                      <CheckCircle2 size={64} className="text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Order Received!
                      </h3>
                      <p className="text-gray-600 max-w-md">
                        Thank you! Your order has been received. We will contact
                        you shortly.
                      </p>
                      <Button
                        className="mt-6 bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full px-8"
                        onClick={() => setOrderSuccess(false)}
                        data-ocid="order.primary_button"
                      >
                        Place Another Order
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                    >
                      <div className="grid sm:grid-cols-2 gap-5 mb-5">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="name"
                            className="text-gray-700 font-medium"
                          >
                            Customer Name{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border-gray-200 focus:ring-[#1F5E8C]"
                            data-ocid="order.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="business"
                            className="text-gray-700 font-medium"
                          >
                            Business Name{" "}
                            <span className="text-gray-400 text-xs">
                              (optional)
                            </span>
                          </Label>
                          <Input
                            id="business"
                            name="business"
                            placeholder="Shop / company name"
                            value={formData.business}
                            onChange={handleChange}
                            className="border-gray-200"
                            data-ocid="order.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="phone"
                            className="text-gray-700 font-medium"
                          >
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="border-gray-200"
                            data-ocid="order.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="date"
                            className="text-gray-700 font-medium"
                          >
                            Preferred Delivery Date{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="border-gray-200"
                            data-ocid="order.input"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-5">
                        <Label
                          htmlFor="address"
                          className="text-gray-700 font-medium"
                        >
                          Delivery Address{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          name="address"
                          placeholder="Full delivery address including area and landmark"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          rows={2}
                          className="border-gray-200 resize-none"
                          data-ocid="order.textarea"
                        />
                      </div>

                      <div className="space-y-1.5 mb-7">
                        <Label
                          htmlFor="products"
                          className="text-gray-700 font-medium"
                        >
                          Products &amp; Quantity{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="products"
                          name="products"
                          placeholder="e.g. 10 cases Pabitra 1L, 5 cases Campa Cola 500ml, 3 cases Campa Lemon 200ml"
                          value={formData.products}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="border-gray-200 resize-none"
                          data-ocid="order.textarea"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#1F5E8C] hover:bg-[#153F61] text-white font-bold text-base py-6 rounded-xl"
                        data-ocid="order.submit_button"
                      >
                        Place Order
                      </Button>

                      <div className="mt-4 text-center">
                        <span className="text-gray-400 text-sm">or</span>
                      </div>

                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-3"
                        data-ocid="order.secondary_button"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-green-500 text-green-700 hover:bg-green-50 font-semibold py-6 rounded-xl gap-2"
                        >
                          <MessageCircle size={18} className="text-green-500" />
                          Order via WhatsApp
                        </Button>
                      </a>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1F5E8C] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Droplets size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">M/s Lokenath</div>
                  <div className="text-blue-200 text-xs tracking-wide">
                    WATER SUPPLIERS
                  </div>
                </div>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed max-w-xs mb-4">
                Your trusted wholesale partner for pure Pabitra mineral water
                and Campa cold drinks. Delivering quality to Behala, Sarsuna
                &amp; Sakherbazar.
              </p>
              <div className="text-sm text-blue-100">
                <div className="font-semibold text-white mb-1">
                  Proprietors:
                </div>
                <div>Dilip Bhattacharya</div>
                <div>Subhojit Bhattacharya</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="text-blue-200 hover:text-white text-sm transition-colors"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-blue-100">
                <li className="flex items-start gap-2">
                  <Phone size={14} className="mt-0.5 flex-shrink-0" />
                  <a
                    href={`tel:+91${PHONE}`}
                    className="hover:text-white transition-colors"
                  >
                    +91 {PHONE}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle size={14} className="mt-0.5 flex-shrink-0" />
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Order
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={14} className="mt-0.5 flex-shrink-0" />
                  <span>lokenathwater@gmail.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span>7, Ram Gopal Paul Road, Sarsuna, Kolkata - 700061</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#153F61]">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-200">
            <span>
              © {new Date().getFullYear()} M/s Lokenath Water Suppliers. All
              rights reserved.
            </span>
            <span>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
