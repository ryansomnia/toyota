export function ProfileSection() {
    return (
<section className="py-10 md:py-20 bg-white" id="profil">
<div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Kolom Kiri: Profil & Sambutan */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0">
                <div className="w-48 h-[19rem] bg-slate-200 rounded-[24px] overflow-hidden relative shadow-lg">
                  {/* TODO: Ganti src dengan path foto sales yang sebenarnya */}
                  <img 
                    src="/images/daniel.jpeg" 
                    alt="Sales Consultant" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 py-2">
                <p className="text-slate-600 leading-relaxed mb-6 text-[15px] sm:text-base text-justify">
                  Selamat datang di <strong className="text-slate-900 font-semibold">Setiajaya Toyota Cibubur</strong>, dealer dan bengkel Resmi Toyota. Kami melayani Anda untuk kebutuhan pembelian kendaraan Toyota, baik secara tunai maupun kredit. Tersedia berbagai tipe, varian, spesifikasi dan harga kendaraan dengan beragam promo. Kami juga menyediakan layanan purna jual untuk servis mobil dan penjualan part. Dapatkan pengalaman pembelian dan perawatan kendaraan Toyota terbaik sesuai dengan kebutuhan Anda di sini.
                </p>
                <p className="text-red-500 font-medium text-sm leading-relaxed">
                  Jl. Alternatif Cibubur No.42, Jatikarya, Kec. Jatisampurna, Kota Bekasi
                </p>
              </div>
            </div>
  
            {/* Kolom Kanan: Jam Operasional */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-slate-50/80 backdrop-blur-sm rounded-[32px] p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h3 className="text-lg font-bold text-center text-slate-900 mb-8 tracking-wide">
                  JAM OPERASIONAL
                </h3>
                
                <div className="space-y-6">
                  {/* Showroom */}
                  <div className="border-b border-slate-200/60 pb-5">
                    <div className="flex justify-between items-center mb-3 cursor-pointer group">
                      <div className="flex items-center gap-3 font-semibold text-slate-800">
                        <span className="text-xl">🚗</span> Showroom
                      </div>
                      <span className="text-slate-400 text-xs transition-transform group-hover:translate-y-0.5">▼</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-slate-600 pl-9 pr-2">
                      <span>Setiap Hari : 08:00 - 16:00</span>
                      <span className="flex items-center gap-2 text-green-600 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Buka
                      </span>
                    </div>
                  </div>
  
                  {/* Bengkel */}
                  <div>
                    <div className="flex justify-between items-center mb-3 cursor-pointer group">
                      {/* <div className="flex items-center gap-3 font-semibold text-slate-800">
                        <span className="text-xl">🔧</span> Bengkel & Suku Cadang
                      </div> */}
                      {/* <span className="text-slate-400 text-xs transition-transform group-hover:translate-y-0.5">▼</span> */}
                    </div>
                    {/* <div className="flex justify-between items-center text-sm text-slate-600 pl-9 pr-2">
                      <span>Selasa : 08:00 - 17:00</span>
                      <span className="flex items-center gap-2 text-green-600 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Buka
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  }