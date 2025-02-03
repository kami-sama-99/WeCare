export default function HowItWorks() {
    const steps = [
      { title: "REPORT", description: "Report & Track – Identify areas that need attention." },
      { title: "TAKE ACTION", description: "Take Action – Participate in clean-ups and eco-friendly initiatives." },
      { title: "WITNESS THE CHANGE", description: "See the Impact – Track your contributions and inspire change." },
    ]
  
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-12 text-center">HOW IT WORKS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  