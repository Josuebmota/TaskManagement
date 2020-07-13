# Express API

## Tecnologias Usadas
🍀 NodeJs  - Ambiente de execução javascript server-side. <br>
🚤 Express -  Framework flexivel, que gerencia uma aplicação em NodeJs <br>
📮 Sequelize  - Trás a ApiRest, uma forma mais enxuta de consultar o banco. <br>
🔒  Jwt - ferramenta para geração de tokens de autentificação <br>
📬 Nodemailer - Utilizado para o envio de mensagens. <br> 

## Ferramentas Utilizadas
- [Vs Code](https://code.visualstudio.com/)
- [Insomnia](https://insomnia.rest/download/)

## Informações
Simples api, para gerenciamento de usuários. Onde o relacionamento de entidades pode ser observado abaixo:

<p align="center">
  <img src="https://user-images.githubusercontent.com/34459397/86523280-70ed3680-be40-11ea-993c-d181f160f1e2.png">
</p>

## Execução
```
# Clone o repositório
git clone https://github.com/Josuebmota/GerenciadorDeTarefas.git

# Vá para o diretório do arquivo
cd GerenciadorDeTarefas

# Faça o download das dependências
yarn or npm i

# Rode as migrations
yarn sequelize db:migrate
        or
npx sequelize db:migrate

# Start o projeto
yarn dev
  or
npm dev
```
Afim de facilitar os testes das rotas, efetue o download do arquivo abaixo:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=GerenciadorDeTarefas&uri=https%3A%2F%2Fgithub.com%2FJosuebmota%2FGerenciadorDeTarefas%2Fblob%2Fmaster%2FInsomnia.json)

*obs: Antes de executar é necessario mudar as variáveis de ambiente, localizadas no arquivo [.env](https://github.com/Josuebmota/ApiCadastroUser/blob/master/.env)*

## 👨‍💻 [](<[https://github.com/Josuebmota/GerenciadorDeTarefas.git](https://github.com/Josuebmota/GerenciadorDeTarefas.git)#autor>)Autor

- **Josué Batista Mota** - [GitHub](https://github.com/Josuebmota) - Email: [josuebatistam1@gmail.com](mailto:josuebatistam1@gmail.com)
