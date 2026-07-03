import { Mail, Phone, MapPin, Clock, Building2 } from "lucide-react";

export default function Contact() {
  return (
    <section className="bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF] min-h-screen flex items-center justify-center px-4 py-12">
      
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">

        {/* HEADER */}
        <h2 className="text-3xl sm:text-4xl font-black text-[#395886] text-center mb-10 tracking-wide">
          Contact Us
        </h2>

        {/* CARD */}
        <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 transition-all duration-300 hover:shadow-2xl">

          {/* COMPANY */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EAF1FB] rounded-xl">
              <Building2 className="text-[#395886]" size={22} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#395886]">
              JobCenterPlus
            </h3>
          </div>

          {/* LOCATION */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#EAF1FB] rounded-xl">
              <MapPin className="text-[#638ECB]" size={20} />
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              No.203, A9 Road, Kilinochchi, Sri Lanka
            </p>
          </div>

          {/* EMAIL (GMAIL DIRECT OPEN) */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jobcenterpluskilinochchi0@gmail.com&su=Job%20Inquiry&body=Hello%20JobCenterPlus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 bg-[#F7F9FC] hover:bg-[#EAF1FB] p-4 rounded-xl transition-all duration-200 active:scale-95 hover:scale-[1.02] shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow">
                <Mail className="text-red-500" size={20} />
              </div>
              <span className="text-sm sm:text-base font-semibold text-gray-800">
                Send Email
              </span>
            </div>
            <span className="text-xs text-gray-500">Open</span>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/94760602121"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 bg-[#F7F9FC] hover:bg-[#EAF1FB] p-4 rounded-xl transition-all duration-200 active:scale-95 hover:scale-[1.02] shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow">
                <Phone className="text-green-500" size={20} />
              </div>
              <span className="text-sm sm:text-base font-semibold text-gray-800">
                WhatsApp Chat
              </span>
            </div>
            <span className="text-xs text-gray-500">Open</span>
          </a>

          {/* WORKING HOURS */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EAF1FB] rounded-xl">
              <Clock className="text-[#638ECB]" size={20} />
            </div>
            <p className="text-sm sm:text-base text-gray-700">
              Sat - Sun | 9:00 AM - 5:00 PM
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} JobCenterPlus. All rights reserved.
        </p>

      </div>
    </section>
  );
}