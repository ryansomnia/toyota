"use client";


export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Subtile Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12">
        
        {/* TOP AREA */}
        <div className="grid lg:grid-cols-2 gap-14 pb-20 border-b border-white/5">
          
          {/* LEFT */}
          <div>
            <div className="text-2xl font-black tracking-tighter mb-6">
              TOYOTA<span className="text-red-600">CIBUBUR</span>

              <span
                className="
                  block
                  text-[8px]
                  tracking-[4px]
                  text-slate-500
                  font-bold
                  uppercase
                  mt-1
                "
              >
                SetiaJaya
              </span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-md">
              Dealer resmi Toyota dengan standar pelayanan internasional.
              Kami hadir untuk memberikan pengalaman pembelian kendaraan
              yang cepat, nyaman, dan terpercaya.
            </p>

            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <span className="text-white font-semibold">Alamat:</span>
                <br />
                Jl. Alternatif Cibubur No.61, Harjamukti, Depok
              </div>

              <div>
                <span className="text-white font-semibold">Jam Operasional:</span>
                <br />
                Senin - Minggu • 08.00 - 16.00
              </div>
            </div>

            {/* <div className="flex gap-4 mt-8">
              {["IG", "FB"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="
                    w-10 h-10
                    rounded-full
                    border border-white/10
                    flex items-center justify-center
                    text-[10px]
                    font-bold
                    hover:bg-red-600
                    hover:border-red-600
                    transition-all
                  "
                >
                  {s}
                </a>
              ))}
            </div> */}
          </div>

          {/* RIGHT - MAP */}
          <div>
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[4px] font-black text-red-600 mb-2">
                Lokasi Dealer
              </p>

              <h3 className="text-3xl font-black tracking-tight">
                Kunjungi Showroom Kami
              </h3>
            </div>

            <div
  className="
    overflow-hidden
    rounded-[28px]
    border border-white/10
    h-[320px]
    shadow-[0_20px_50px_rgba(0,0,0,0.3)]
  "
>
  <iframe
    src="https://maps.google.com/maps?q=Setiajaya%20Toyota%20Cibubur&z=15&output=embed"
    className="w-full h-full"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          className="
            pt-12
            flex flex-col md:flex-row gap-6
            items-center justify-between
            text-[10px]
            font-bold
            uppercase
            tracking-widest
            text-slate-600
          "
        >
          <p>
            © 2026 SETIA JAYA TOYOTA CIBUBUR. ALL RIGHTS RESERVED.
          </p>

          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>

            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}