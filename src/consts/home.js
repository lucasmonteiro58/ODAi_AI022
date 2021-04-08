export const shapes = [
  {
    name: 'circulo',
    label: 'círculo',
    path: 'circulo-pequeno',
    pathBig: 'circulo-grande'
  },
  {
    name: 'triangulo',
    label: 'triângulo',
    path: 'triangulo-pequeno',
    pathBig: 'triangulo-grande'
  },
  {
    name: 'quadrado',
    label: 'quadrado',
    path: 'quadrado-pequeno',
    pathBig: 'quadrado-grande'
  },
  {
    name: 'triangulo-isosceles',
    label: 'triângulo isósceles',
    path: 'triangulo-isosceles-pequeno',
    pathBig: 'triangulo-isosceles-grande'
  },
  {
    name: 'retangulo',
    label: 'retângulo',
    path: 'retangulo-pequeno',
    pathBig: 'retangulo-grande'
  },
  {
    name: 'pentagono',
    label: 'pentágono',
    path: 'pentagono-pequeno',
    pathBig: 'pentagono-grande'
  },
  {
    name: 'hexagono',
    label: 'hexágono',
    path: 'hexagono-pequeno',
    pathBig: 'hexagono-grande'
  }
]

export const montagem = [
  {
    nome: 'cubo',
    label: 'cubo',
    index: 0,
    imgCompleta: 'cubo-inteiro',
    imgMetade: 'metade-cubo',
    imgMontado: 'cubo-plano',
    imgPosition: {
      scale: 'scale(0.75)',
      y: '50px',
      x: '0px'
    },
    imgPositionMontado: {
      y: '50px',
      x: '0px'
    },
    pecasQnt: 2,
    pecasName: ['quadrado', 'quadrado'],
    isComplete: false
  },
  {
    nome: 'piramide-base-quadrada',
    label: 'pirâmede de base quadrada',
    index: 1,
    imgCompleta: 'piramide-basequadrada-inteiro',
    imgMetade: 'metade-piramidebasequad',
    imgMontado: 'plano-piramidebasequad',
    imgPosition: {
      scale: 'scale(0.64)',
      y: '144px',
      x: '-48px'
    },
    imgPositionMontado: {
      y: '48px',
      x: '48px'
    },
    pecasQnt: 2,
    pecasName: ['triangulo', 'triangulo'],
    isComplete: false
  },
  {
    nome: 'cilindro',
    label: 'cilindro',
    index: 2,
    imgCompleta: 'cilindro-inteiro',
    imgMetade: 'metade-cilindro',
    imgMontado: 'plano-cilindro',
    imgPosition: {
      scale: 'scale(0.73)',
      y: '137px',
      x: '0px'
    },
    imgPositionMontado: {
      y: '60px',
      x: '0px'
    },
    pecasQnt: 2,
    pecasName: ['circulo', 'circulo'],
    isComplete: false
  },
  {
    nome: 'piramide-base-hexagonal',
    label: 'pirâmide de base hexagonal',
    index: 3,
    imgCompleta: 'piramide-basehexagonal-inteiro',
    imgMetade: 'metade-piramidebasehex',
    imgMontado: 'plano-piramidebasehex',
    imgPosition: {
      scale: 'scale(0.78)',
      y: '110px',
      x: '0px'
    },
    imgPositionMontado: {
      y: '23px',
      x: '0px'
    },
    pecasQnt: 3,
    pecasName: [
      'triangulo-isosceles',
      'triangulo-isosceles',
      'triangulo-isosceles'
    ],
    isComplete: false
  },
  {
    nome: 'prisma-base-pentagonal',
    label: 'prisma de base pentagonal',
    index: 4,
    imgCompleta: 'prisma-basepentagonal-inteiro',
    imgMetade: 'metade-prismabasepenta',
    imgMontado: 'plano-prismabasepenta',
    imgPosition: {
      scale: 'scale(0.72)',
      y: '99px',
      x: '-78px'
    },
    imgPositionMontado: {
      y: '41px',
      x: '7px'
    },
    pecasQnt: 4,
    pecasName: ['retangulo', 'retangulo', 'retangulo', 'pentagono'],
    isComplete: false
  }
]
