# 🎬 Desafio Técnico – TMDb Backend API

Este projeto é uma API backend construída em **NestJS + TypeScript** que consome dados da [The Movie Database (TMDb)](https://developer.themoviedb.org/reference/intro/getting-started), realiza análises estatísticas e disponibiliza informações úteis sobre os **250 filmes mais bem avaliados** da plataforma.

---

## ✅ Funcionalidades Implementadas

* Conexão com a API da TMDb 
* Média de Nota por Gênero 
* Quantidade de Filmes por Gênero
* Quantidade de Filmes por Ano
* Verificação de Filmes Trending

## 🚀 Endpoints Disponíveis

| Método | Rota                        | Descrição                                        |
| ------ | --------------------------- | ------------------------------------------------ |
| GET    | `/tmdb/top-rated`           | Retorna os 250 filmes top-rated                  |
| GET    | `/tmdb/average-by-genre`    | Média das notas por gênero                       |
| GET    | `/tmdb/count-by-genre`      | Quantidade de filmes por gênero                  |
| GET    | `/tmdb/count-by-year`       | Quantidade de filmes por ano                     |
| GET    | `/tmdb/trending-comparison` | Filmes dos top-rated que estão entre os trending |

## 🛠️ Tecnologias Utilizadas
* NestJS – Estrutura robusta e modular
* TypeScript – Tipagem estática e segurança
* Axios via @nestjs/axios

## 💽 Rodando o Projeto Localmente

1. Clone o repositório
```
git clone https://github.com/rafaelavsantosdev/tmdb.git
cd tmdb
```

2. Crie o **.env**
```
TMDB_API_KEY=sua_api_key_aqui
```

3. Instale as dependências
```
npm install
```

4. Rode o servidor
```
npm run start:dev
```

### 📜 Licença
Este projeto está sob a licença MIT.