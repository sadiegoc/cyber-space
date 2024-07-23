<h1 align="center">Cyber Space</h1>

### O que é:
<p align="justify">
O Cyber Space é um chat de conversa onde você pode criar a sua conta, selecionar uma pessoa para conversar (estando ela online ou não) e iniciar o bate-papo. Para esse projeto eu usei VueJs junto do Bootstrap para o front-end, Sequelize para fazer o banco de dados e o Socket.io para o envio de mensagens em tempo real.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"/>
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
</p>

### Como funciona:
<p align="justify">
O front-end do projeto foi construído usando o VueJs e o Bootstrap, enquanto que o back-end trata-se de dois servidores express, cada um escutando numa porta específica.
</p>
<p align="justify">
As requisições de socket (trocas de mensagens) são tratadas no arquivo socket.js. Nele está configurado para o socket escutar todo evento "message" que chegar. Este evento recebe um parâmetro que é justamente a mensagem enviada. Na mensagem enviada estão as informações de quem é o remetente, quem é o destinatário e qual o conteúdo dela. Usando a informação de destinatário, chamo um `emit(destinatário, mensagem)` para que a mensagem vá para o destinatário correto.
</p>

### Features:
- [x] Cadastro e login de usuário
- [x] Envio e recebimento de mensagens
- [x] Mensagens salvas em banco de dados
- [ ] Perfil de usuário
- [ ] Selecionar e excluir mensagens
- [ ] Notificação de mensagens
- [ ] Mensagens lidas e não lidas

### Fazendo o clone:
```
$ git clone https://github.com/sadiegoc/cyber-space.git
```

### Baixando as dependências:
```
$ cd cyber-space
$ npm install --save
```

### Executando:
```
# inicie o servidor vue
$ npm run serve

# inicie o servidor sequelize
$ npm run database

# inicie o servidor socket.io
$ npm run socket
```
