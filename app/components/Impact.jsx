export default function Impact() {
    const stats = [
      { label: "Members", value: "6,543" },
      { label: "Actions Taken", value: "321" },
      { label: "Active Users", value: "432" },
      { label: "Reports", value: "1,234" },
    ]
  
    return (
      <section className="py-20 bg-green-500 text-white">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-12 text-center">OUR IMPACT</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                <p className="text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-xl">{stat.label}</p>
              </div>
            ))}
          </div>
          <h3 className="text-3xl font-bold mt-16 mb-8 text-center">WHAT WE HAVE DONE SO FAR</h3>
        </div>
      </section>
    )
  }
  
  