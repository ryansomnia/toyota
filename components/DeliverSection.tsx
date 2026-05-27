const DELIVERIES = [
    {
      image: "/images/testimony/testimony1.jpeg", // Ganti dengan path foto serah terima
      car: "Toyota Fortuner GR Sport",
      name: "Pembelian Mobil",
      type: "Pembelian Kredit",
    },
    {
      image: "/images/testimony/testimony2.jpeg",
      car: "Toyota Innova Zenix Hybrid",
      name: "Pembelian Mobil",
      type: "Cash",
    }
  
  ];
  
  export function DeliverySection() {
    return (
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm uppercase tracking-[4px] text-red-500 font-semibold mb-4">
              Galeri Serah Terima
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
              Momen Bahagia
              <br />
              <span className="font-semibold text-red-500">
                Bersama Pelanggan
              </span>
            </h2>
          </div>
  
          {/* Grid 3 Pembelian */}
          <div className="grid md:grid-cols-3 gap-6">
            {DELIVERIES.map((item, idx) => (
              <div 
                key={idx}
                className="group bg-white rounded-[28px] overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                  <img 
                    src={item.image} 
                    alt={item.car}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm flex items-center gap-2">
                    <span>🚘</span> {item.car}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }