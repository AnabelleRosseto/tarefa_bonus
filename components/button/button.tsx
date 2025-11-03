"use client" // Declaração para uso do cliente

import { ButtonHTMLAttributes, PropsWithChildren, MouseEvent, useCallback } from "react"

// Definição das propriedades aceitas pelo componente Button, estendendo as propriedades padrão de um button HTML e PropsWithChildren para suportar children
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  handleClick?: (e?: MouseEvent<HTMLButtonElement>) => void // Função opcional para lidar com cliques no botão
  backgroundColor?: string // Cor de fundo opcional do botão
  textColor?: string // Cor do texto opcional do botão
}

// Componente funcional Button que renderiza um botão personalizado
const Button = ({ children, handleClick, disabled, className = '', backgroundColor = 'green', textColor = 'gray', ...props }: ButtonProps) => {
  // Callback para lidar com cliques no botão
  const onHandleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    // Verifica se handleClick é uma função e se o botão não está desabilitado antes de executar a função
    if (handleClick instanceof Function && !disabled) {
      handleClick(e)
    }
  }, [handleClick, disabled]) // Dependências do callback de clique 

  return (
    <button
      {...props} // Passa todas as outras propriedades para o botão HTML
      onClick={onHandleClick} // Atribui o callback de clique ao evento onClick
      className={`px-4 py-2 text-${textColor}-300 rounded ${disabled ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-500' : `bg-${backgroundColor}-500 hover:bg-${backgroundColor}-700`} ${className}`} // Classes CSS condicionais baseadas em propriedades
      disabled={disabled} // Define se o botão está desabilitado ou não
    >
      {children} {/* Renderiza o conteúdo dentro do botão */}
    </button>
  )
}

export default Button // Exporta o componente Button como padrão
