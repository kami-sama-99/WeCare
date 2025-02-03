import JoinUsButton from "./JoinUsButton"

export default function Hero() {
  return (
    <section className="bg-green-500 text-white py-20">
      <div className="container mx-auto px-6 text-center" data-aos="fade-up">
        <h1 className="text-5xl font-bold mb-4">A BETTER TOMORROW STARTS TODAY</h1>
        <p className="text-xl mb-8">
          WeCare is a community-driven platform dedicated to making cities cleaner and more sustainable. By promoting
          responsible waste management, environmental awareness, and collective action, WeCare empowers individuals to
          take small steps that lead to big changes.
        </p>
        <p className="text-2xl mb-8">Join us in creating a healthier, greener world—because together, we care! ♻✨</p>
        <JoinUsButton />
      </div>
    </section>
  )
}

