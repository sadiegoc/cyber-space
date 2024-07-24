<h1 align="center">🚀 Cyber Space 🚀</h1>

O Cyber Space é um chat de conversa onde você pode criar a sua conta, selecionar uma pessoa para conversar (estando ela online ou não) e iniciar o bate-papo. Para esse projeto eu usei VueJs junto do Bootstrap para o front-end, Sequelize para fazer o banco de dados e o Socket.io para o envio de mensagens em tempo real.

<p align="center">
  <img src="https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"/>
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
</p>

## Como funciona:
O front-end do projeto foi construído usando o VueJs e o Bootstrap, enquanto que o back-end trata-se de dois servidores express, cada um escutando numa porta específica.

### socket
As requisições de socket são tratadas no arquivo `socket.js`. Nele está configurado para o socket escutar todo evento "message" que chegar. Este evento recebe um parâmetro que é justamente a mensagem enviada. Na mensagem enviada estão as informações de quem é o remetente, quem é o destinatário e qual o conteúdo dela. E então, usando o username do destinatário, eu consigo enviar uma mensagem para ele assim:

```
socket.on("message", (data) => {
  socket.broadcast.emit(data.receiver, JSON.stringify(data));
});
```
Dentro do VueJs, assim que o usuário é logado, uma escuta com referência ao seu username é criado dentro do `mounted ()` assim:
```
socket.on(my username, (data) => { ... });
```

### database
O banco de dados foi criado com arquitetura MVC (Model, View, Controller). Mais um servidor express está rodando aqui no arquivo `server.js`. Note que dentro de models há três arquivos, um para a tabela de registro de usuários, outro para as tabelas de chats e um terceiro que importa as configurações do banco de dados, une os modelos e exporta um objeto que será utilizado pelo controlador.

Para cada chat iniciado é criado uma nova tabela através da função `createTable (name)` em `index.js`. Nela a variável `db.table` recebe a instância do modelo da tabela de mensagens e logo em seguida a função `db.sequelize.sync()` executa o query necessário para criar a tabela caso ela não exista. O nome de cada tabela é formado por dois usernames separados por underline (ex: user1_user2). O primeiro username indica o dono da tabela e o segundo indica o destinatário. Isso quer dizer que para cada chat de conversa existem duas tabelas, uma para cada usuário envolvido na conversa. Dessa forma, qualquer um deles pode apagar mensagens sem que isso afete o chat do outro.

### front-end
A comunicação com o back-end acontece a partir do arquivo `http-common.js` - que faz o papel do cliente na comunicação com o banco de dados - e dos serviços em `src/services/` que tratam os eventos de requisição acionados pelo cliente quando ele cria uma conta nova, faz login, envia uma mensagem e etc.

## Features:
- [x] Cadastro e login de usuário
- [x] Envio e recebimento de mensagens
- [x] Mensagens salvas em banco de dados
- [ ] Perfil de usuário
- [ ] Selecionar e excluir mensagens
- [ ] Notificação de mensagens
- [ ] Mensagens lidas e não lidas

## Como usar:
### Fazendo o clone:
```
$ git clone https://github.com/sadiegoc/cyber-space.git
```

### Baixando as dependências:
```
$ cd cyber-space
$ npm install @vue/cli --save
$ npm install --save
```

### Executando o front-end:
```
$ cd frontend
$ npm run serve
```

### Executando o back-end
```
# database
$ cd backend
$ npm run database

# socket
$ cd backend
$ npm run socket
```
