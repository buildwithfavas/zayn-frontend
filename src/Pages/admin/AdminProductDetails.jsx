import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const catData = [
  {
    id: 1,
    name: "Fashion",
    subs: [
      { id: 11, name: "Women", subs: [{ id: 111, name: "Tops" }, { id: 112, name: "Jeans" }] },
      { id: 12, name: "Girls", subs: [{ id: 121, name: "Kurtas & Suits" }, { id: 122, name: "Sarees" }, { id: 123, name: "Tops" }, { id: 124, name: "Kurta Sets" }] },
      { id: 13, name: "Men", subs: [{ id: 131, name: "Shirts" }, { id: 132, name: "T-Shirts" }] },
    ],
  },
  {
    id: 2,
    name: "Electronics",
    subs: [
      { id: 21, name: "Mobiles", subs: [{ id: 211, name: "Smartphones" }] },
      { id: 22, name: "Laptops", subs: [{ id: 221, name: "Gaming Laptops" }, { id: 222, name: "Ultrabooks" }] },
    ],
  },
];

function formatINR(n) {
  return `₹${Number(n).toFixed(2)}`;
}

function generateProducts() {
  const items = [];
  let pid = 1;
  catData.forEach((c) => {
    c.subs.forEach((s) => {
      const subs2 = s.subs && s.subs.length ? s.subs : [{ id: s.id * 100 + 1, name: "General" }];
      subs2.forEach((ss) => {
        for (let i = 0; i < 3; i++) {
          const base = 500 + ((pid * 17) % 400);
          const sale = base - (i + 1) * 10;
          const stock = 5 + ((pid * 7) % 20);
          items.push({
            id: pid,
            title: `${ss.name} ${s.name} ${pid % 2 ? "Shirt" : "Item"}`,
            brand: pid % 2 ? "Allen Solly" : "Roadster",
            catId: c.id,
            subId: s.id,
            subsubId: ss.id,
            price: base,
            salePrice: sale,
            sales: (pid * 3) % 10,
            stock,
            rating: (pid % 5) + 1,
            reviewsCount: (pid * 13) % 97,
            published: new Date(2023, (pid % 12), (pid % 28) + 1).toISOString().slice(0, 10),
            sizes: ["S", "M", "L", "XL"].slice(0, 3 + (pid % 2)),
            description:
              "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          });
          pid += 1;
        }
      });
    });
  });
  return items;
}

const fallbackImg = "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80&auto=format&fit=crop";

export default function AdminProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/admin/products");
  };
  const products = useMemo(() => generateProducts(), []);
  const product = products.find((p) => String(p.id) === String(id));

  // Build gallery images (2 thumbs + main)
  const gallery = useMemo(() => {
    const seed = Number(id) || 1;
    return [
      `https://images.unsplash.com/photo-1520975940505-df998d4fe4f2?w=300&q=80&auto=format&fit=crop&sig=${seed}`,
      `https://images.unsplash.com/photo-1528701800489-20be0fb0c068?w=300&q=80&auto=format&fit=crop&sig=${seed + 1}`,
      `https://images.unsplash.com/photo-1520975940505-df998d4fe4f2?w=1000&q=80&auto=format&fit=crop&sig=${seed + 2}`,
    ];
  }, [id]);
  const [active, setActive] = useState(2);

  if (!product) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Product Details</h1>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">Product not found.</div>
      </div>
    );
  }

  const cat = catData.find((c) => c.id === product.catId);
  const sub = cat?.subs.find((s) => s.id === product.subId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            onClick={goBack}
            title="Back"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            <span>Back</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Product Details</h1>
        </div>
      </div>

      {/* Product section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left images */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-16">
              {gallery.slice(0, 2).map((src, idx) => (
                <button key={src} className={`border rounded overflow-hidden ${active === idx ? "ring-2 ring-blue-500" : ""}`} onClick={() => setActive(idx)}>
                  <img src={src} alt="thumb" className="w-16 h-16 object-cover" onError={(e) => { e.currentTarget.src = fallbackImg; }} />
                </button>
              ))}
            </div>
            <div className="relative flex-1">
              <img
                src={gallery[active] || gallery[2]}
                alt={product.title}
                className="w-full rounded object-cover bg-gray-100 max-h-96"
                style={{ aspectRatio: "3/4" }}
                onError={(e) => { e.currentTarget.src = fallbackImg; }}
              />
              <button className="absolute bottom-2 right-2 bg-white/90 border border-gray-200 rounded-full p-2 shadow" title="Zoom">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z" /></svg>
              </button>
            </div>
          </div>

          {/* Right details */}
          <div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-900">{product.title}</div>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2"><span className="w-20 text-gray-500">Brand</span><span className="font-medium">: {product.brand}</span></div>
              <div className="flex items-center gap-2"><span className="w-20 text-gray-500">Category</span><span className="font-medium">: {cat?.name}</span></div>
              <div className="flex items-center gap-2"><span className="w-20 text-gray-500">SIZE</span><span className="font-medium">: {product.sizes.join(", ")}</span></div>
              <div className="flex items-center gap-2"><span className="w-20 text-gray-500">Review</span><span className="font-medium">: {String(product.reviewsCount).padStart(2, "0")} Review</span></div>
              <div className="flex items-center gap-2"><span className="w-20 text-gray-500">Published</span><span className="font-medium">: {product.published}</span></div>
            </div>

            <div className="mt-6">
              <div className="font-semibold text-gray-900">Product Description</div>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-4 py-3 font-semibold text-gray-900">Customer Reviews</div>
        <div className="divide-y divide-gray-100">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 flex gap-3 items-start">
              <img
                src={`https://i.pravatar.cc/64?img=${(Number(id) + i) % 70}`}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">Zaw Lay</div>
                  <div className="text-xs text-gray-500">2025-03-2{i}</div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg key={idx} className={`w-4 h-4 ${idx < (product.rating - (i - 1)) ? "text-yellow-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-700">{i === 1 ? "nice Product" : "good"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
