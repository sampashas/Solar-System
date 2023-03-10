import Title from '../components/Title'
import Scene from '../components/Scene'

const Home = () => {
  return (
    <div className="flex flex-col relative text-[var(--bl)] overflow-hidden">
      <Title title="Solar system – Pavel Z." />
      <main className="flex flex-col items-center justify-center">
        {/* loder */}
        {/* menu */}
        {/* canvas - navigate */}
        <Scene />
      </main>
    </div>
  )
}

export default Home
