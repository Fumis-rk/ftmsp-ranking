# Ranking FTMSP 2025

Site estilizado com **TailwindCSS** para exibição do **Ranking 2025 da Federação de Tênis de Mesa do Estado de São Paulo (FTMSP)**.

O site mostra os atletas por categoria e, ao clicar em um atleta, exibe as etapas e os pontos conquistados.

## 🚀 Tecnologias
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [PapaParse](https://www.papaparse.com/)

## 📂 Estrutura
```
ftmsp-ranking/
 ├── public/
 │    └── ranking.csv          <-- arquivo CSV com os dados
 ├── src/
 │    ├── App.jsx              <-- código principal
 │    ├── main.jsx
 │    └── index.css
 ├── index.html
 ├── package.json
 ├── vite.config.js
 ├── tailwind.config.js
 ├── postcss.config.js
 └── README.md
```

## 🔄 Como atualizar o ranking
1. Substitua o arquivo `public/ranking.csv` pelo novo CSV da federação.
2. Faça commit no GitHub:
   ```bash
   git add public/ranking.csv
   git commit -m "Atualização do ranking"
   git push
   ```
3. O Netlify vai publicar automaticamente a versão nova do site. 🎉

## 🌐 Publicação
- O site pode ser publicado no **Netlify**, conectado diretamente ao repositório do GitHub.
- Configuração do Netlify:
  - **Build command:** `npm run build`
  - **Publish directory:** `dist`
