export default function WhoWeAre() {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-8 text-center">WHO WE ARE</h2>
          <p className="text-xl mb-8 text-center">
            WeCare is a platform that empowers individuals and communities to take action for a healthier environment.
            Whether it's reducing waste, reporting pollution, or joining clean-up drives, your efforts matter.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Track Your Impact – See how your actions contribute to a greener city.",
              "Join Local Initiatives – Participate in clean-up events & awareness programs.",
              "Educate & Inspire – Learn sustainable practices and inspire others.",
            ].map((item, index) => (
              <div key={index} className="bg-green-100 p-6 rounded-lg" data-aos="fade-up" data-aos-delay={index * 100}>
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  