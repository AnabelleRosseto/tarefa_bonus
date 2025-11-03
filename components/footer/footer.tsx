const Footer = () => {
  return (
    <footer className="text-center p-2 bg-black text-white text-sm w-full">
      Desenvolvido por
      <a
        href="https://github.com/AnabelleRosseto"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:underline ml-1"
      >
        Anabelle Rosseto
      </a>
      {' '}@ {new Date().getFullYear()}
    </footer>
  )
}

export default Footer