 <p align="center">
 <img src="https://user-images.githubusercontent.com/34459397/91609575-093dfe00-e94e-11ea-8cfa-967b0e870dc5.png" alt="TaskManagement" width="400"/>
 </p>

<p align="center">
   <a href="https://www.linkedin.com/in/josu%C3%A9-batista-694bba135/">
      <img alt="Josué Batista" src="https://img.shields.io/badge/-JosuéBatista-39BBA7?style=flat&logo=Linkedin&logoColor=white" />
   </a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Josuebmota/TaskManagement?color=39BBA7">
  <a href="https://github.com/Josuebmota/TaskManagement/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Josuebmota/TaskManagement?color=39BBA7">
  </a> 
  <a href="https://github.com/Josuebmota/TaskManagement/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-39BBA7">
  </a>
  <a href="https://github.com/Josuebmota/TaskManagement/stargazers"><img alt="Stargazers" src="https://img.shields.io/github/stars/Josuebmota/TaskManagement?color=39BBA7&logo=github">
  </a>
</p>

## 👀 Demo Api
Você pode acessar a api, atravês do link abaixo:
> http://tasmanagement.herokuapp.com <br>
<a href="https://www.heroku.com/"><img src="https://img.shields.io/badge/%E2%86%91_Deploy_to-Heroku-7056bf.svg?style=flat" />
</a>

## 📌 Tecnologias Usadas
🍀 NodeJs  - Ambiente de execução javascript server-side. <br>
🚤 Express -  Framework flexivel, que gerencia uma aplicação em NodeJs. <br>
👾 Heroku - Plataforma em nuvem, utilizado para deploy de diversas aplicações.<br>
📮 Sequelize  - Trás à ApiRest, uma forma mais enxuta de consultar o banco. <br>
🔒  Jwt - ferramenta para geração de tokens de autentificação. <br>
📬 Nodemailer - Utilizado para o envio de mensagens. <br>

## 🛠️ Ferramentas Utilizadas
- [Vs Code](https://code.visualstudio.com/)
- [Insomnia](https://insomnia.rest/download/)

## 📕 Informações
ApiRest para o gerenciamento de tarefas. Onde o relacionamento de entidades pode ser observado abaixo:

<p align="center">
  <img src="https://user-images.githubusercontent.com/34459397/91489808-cca7cf00-e887-11ea-9a75-8aa84bdec334.png">
</p>

## 🚀 Execução
Antes de executar é necessario mudar as variáveis de ambiente, localizadas no arquivo [.env](https://github.com/Josuebmota/ApiCadastroUser/blob/master/.env).
```
# Clone o repositório
git clone https://github.com/Josuebmota/TaskManagement.git

# Vá para o diretório do arquivo
cd TaskManagement

# Faça o download das dependências
yarn or npm i

#Crie o banco
CREATE DATABASE gerenciador

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
>[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=GerenciadorDeTarefas&uri=https%3A%2F%2Fgithub.com%2FJosuebmota%2FGerenciadorDeTarefas%2Fblob%2Fmaster%2FInsomnia.json)

## 🐛 Problemas

Sinta-se a vontade de registrar um novo problema, com um respectivo título e descrição no repositório do [TaskManagement](https://github.com/Josuebmota/TaskManagement/issues). Se encontrar a solução, avaliarei seu Pull Request.

## 👨‍💻 [](<[https://github.com/Josuebmota/TaskManagement.git](https://github.com/Josuebmota/TaskManagement.git)#autor>)Autor

Criado por [**Josué Batista Mota** ](https://github.com/Josuebmota), <br>esse projeto está sobre [MIT license](./LICENSE) 📃.

Coloque uma ⭐️ caso esse proejto tenha lhe ajudado
