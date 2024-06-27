# Projeto Wolfy Admin
Dashboard com gráficos

## Ferramentas de Configuração
- ESLint
- Prettier

## Ferramentas de Desenvolvimento
- React
- Next
- Tailwind
- Node ( >= v18.12.1 )

## Configuração de fontes local
- Nunito Sans
```
    import { Nunito_Sans } from "next/font/google";

    const nunito = Nunito_Sans({
        weight: ["300","400","500","700"],
        subsets: ["latin"],
    });
```
- Exemplo de uso:
`<p className={${nunito.className} font-bold}>Exemplo</p>`

## Como rodar o projeto
- Instalar pacotes
`npm install`

- Rodar dev
`npm run dev`