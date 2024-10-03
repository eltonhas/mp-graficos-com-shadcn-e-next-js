import Image from 'next/image'

import Logo from '@/assets/frame.png'

export function Header() {
  return (
    <div className="flex items-center gap-4">
      <Image src={Logo} alt="Imagem da pagina" />
      <div className="font-alt">
        <p className="font-bold text-3xl text-headings">
          Gastos dos Senadores Brasileiros
        </p>
        <p className="font-medium text-sub-heading">
          Gastos dos senadores brasileiros total por estado (UF) - CEAPS
        </p>
      </div>
    </div>
  )
}
