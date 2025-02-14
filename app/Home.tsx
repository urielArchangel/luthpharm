'use client'
import { BusIcon, HomeIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <section className="bg-white text-gray-800">
      <header
        className="container mx-auto px-4 my-20 flex flex-col md:flex-row items-center justify-between gap-10 fadeInUp"
        style={{ animationDelay: "0.1s" }}
      >
        <section className="max-w-lg space-y-8">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900 leading-tight">
              Seamless hospital checkouts, faster care ahead.
            </h1>
            <p className="text-base sm:text-lg my-4 text-gray-600 leading-relaxed">
              LuthPharm is an on-demand platform streamlining hospital checkouts
              with fast billing, seamless payments, and hassle-free discharge.
            </p>
          </div>
          <Link href="/store" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded py-3 px-8 text-base sm:text-lg transition-colors">
            Store
          </Link>
        </section>
        <section
          className="hero h-[50vh] w-full max-w-md bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg  mt-10 md:mt-0 fadeInUp"
          style={{ animationDelay: "0.2s" }}
        ></section>
      </header>

      <main className="container mx-auto px-4 space-y-16">
        <section className="fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-center font-bold text-xl sm:text-2xl text-blue-900 mb-12">
            What we offer
          </h2>
          <div className="flex flex-col items-center text-center gap-10">
            <div className="flex flex-col items-center space-y-4">
              <HomeIcon size={30} className="text-blue-600 hover:animate-pulse" />
              <h2 className="text-lg sm:text-xl font-bold">
                Convenient Online Ordering
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
                Browse a wide range of medications, place orders from the
                comfort of your home, and avoid waiting in long lines at the
                pharmacy.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <ShieldCheckIcon size={30} className="text-blue-600 hover:animate-pulse" />
              <h2 className="text-lg sm:text-xl font-bold">
                Secure Payment and Fast Checkout
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
                Make secure payments online with multiple payment options for a smooth and quick checkout process.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <BusIcon size={30} className="text-blue-600 hover:animate-pulse" />
              <h2 className="text-lg sm:text-xl font-bold">
                Easy Pickup at Your Preferred Pharmacy
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
                Choose a nearby pharmacy for hassle-free pickup, ensuring your medications are ready when you arrive.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 fadeInUp" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Our mission is to leverage our engineering expertise to create innovative e-health solutions that enhance patient experiences and streamline healthcare processes. We aim to bridge existing gaps in healthcare delivery, ensuring that patients and caregivers have access to efficient and compassionate care.
          </p>
        </section>

        <section className="py-8 text-right fadeInUp" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">
            About Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We are a team of 400-level Biomedical Engineering students from the University of Lagos, driven by a shared passion for healthcare innovation. Our academic background and commitment to improving patient care unites us in developing solutions that address real-world challenges in the medical field.
          </p>
        </section>

        <section className="py-8 fadeInUp" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-8">
            Meet the Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <section
              className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 opacity-75 hover:opacity-100 cursor-pointer hover:scale-105 fadeInUp"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  Ojumitunrayo Adejoro
                </h3>
              </div>
              <div className="ojumi h-[500px] bg-blue-50 bg-cover bg-center rounded-t-lg"></div>
              <div className="p-4">
                <p className="text-gray-600 leading-relaxed">
                  &quot;With a focus on e-health and m-health applications, I bring a unique perspective to our projects. My studies have provided me with insights into the integration of technology and healthcare, which I apply to develop solutions that improve patient engagement and care delivery. I am committed to utilizing digital tools to advance healthcare outcomes.&quot;
                </p>
              </div>
            </section>
            <section
              className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 opacity-75 hover:opacity-100 cursor-pointer hover:scale-105 fadeInUp"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  Busari Muideen
                </h3>
              </div>
              <div className="busari h-[500px] bg-blue-50 bg-cover bg-center rounded-t-lg"></div>
              <div className="p-4">
                <p className="text-gray-600 leading-relaxed">
                  &quot;As a dedicated biomedical engineering student, I have cultivated a strong foundation in medical device design and a keen interest in healthcare systems improvement. My academic journey has equipped me with critical thinking and problem-solving skills, enabling me to approach healthcare challenges with innovative solutions. I am passionate about leveraging technology to enhance patient experiences and streamline medical processes.&quot;
                </p>
              </div>
            </section>
            <section
              className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 opacity-75 hover:opacity-100 cursor-pointer hover:scale-105 fadeInUp"
              style={{ animationDelay: "0.9s" }}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  Deborah Macaulay
                </h3>
              </div>
              <div className="deborah h-[500px] bg-blue-50 bg-cover bg-center rounded-t-lg"></div>
              <div className="p-4">
                <p className="text-gray-600 leading-relaxed">
                  &quot;Specializing in health informatics, I explore the interface between data management and patient care. My research focuses on developing user-friendly platforms for medical applications, such as electronic health records and telemedicine systems. Through this work, I aim to create innovative solutions that enhance the quality of healthcare services, reflecting my dedication to advancing healthcare through information technology.&quot;
                </p>
              </div>
            </section>
          </div>
        </section>

        <section className="py-8 fadeInUp" style={{ animationDelay: "1s" }}>
          <h3 className="text-lg sm:text-xl font-bold text-center text-blue-900 mb-6">
            Our Values
          </h3>
          <ul className="space-y-4 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            <li>
              <span className="font-bold text-blue-600">Innovation:</span> We strive to develop creative solutions that address pressing healthcare challenges.
            </li>
            <li>
              <span className="font-bold text-blue-600">Empathy:</span> We design with the patient and caregiver experience in mind, ensuring our solutions are user-centric.
            </li>
            <li>
              <span className="font-bold text-blue-600">Collaboration:</span> We believe in the power of teamwork and actively seek partnerships with healthcare professionals and institutions.
            </li>
            <li>
              <span className="font-bold text-blue-600">Integrity:</span> We uphold the highest ethical standards in all our endeavors.
            </li>
          </ul>
        </section>
      </main>

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Home;
