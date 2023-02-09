# Register Contacts API

Este projeto tem como objetivo fazer um CRUD de contatos para cada usuário cadastrado

## Tecnologias utilizadas: 

+ Node.js
+ Express.js
+ Typescript
+ PostgreSQL
+ bcryptjs
+ jsonwebtoken
+ Jest 
+ Docker

## Passos para instalação: 


No terminal dentro do projeto clonado siga os seguintes passos: 

<br>

+ Configurar variáveis de ambiente:

No arquivo **.env.example** mude o nome do arquivo somente para **.env** e configure as seguintes variáveis de ambiente:

~~~javascript

DATABASE_URL=postgres://USUARIO_DO_POSTGRES:SENHA_DO_SEU_DATABASE@database:PORTA_POSTGRES/NOME_DO_DATABASE
POSTGRES_USER=USUARIO_DO_POSTGRES
POSTGRES_PASSWORD=SENHA_DO_SEU_DATABASE
POSTGRES_DB=NOME_DO_DATABASE
HOST=localhost
SECRET_KEY=SUA_SECRET_KEY
POSTGRES_PORT=PORTA_POSTGRES
PORT=PORTA_SERVIDOR

~~~

Na variável **DATABASE_URL** e nas demais mude os nomes em caixa alta para as informações que eles referenciam. 
<br>
**Não** mude as variáveis em caixa baixa.

<br>

+ Rodar projeto por containers Docker: 

Caso o Docker esteja configurado na sua máquina rode o seguinte comando: 

~~~javascript

docker compose up 

~~~

<br>
Caso o Docker não esteja configurado ou o container não rode perfeitamente, siga os seguintes passos:
<br>
<br>

+ Instale as dependências: 

~~~javascript 

yarn install

~~~

+ Rode as migrations: 

~~~javascript 

yarn orm:run

~~~

+ Inicie o servidor: 

~~~javascript 

yarn dev 

~~~

<br>
Se tudo estiver sido feito corretamente o servidor estará rodando. 

<br>
<br>

## Rodar os testes: 

Para rodar os testes utilize o seguinte comando: 

~~~javascript

yarn test 

~~~
<br>

## Utilizar a aplicação Front end: 

<br>
Depois do servidor estar rodando, inicie o front end seguindo os passos deste repositório: 
https://github.com/axdborges/Register-contacts-webApp





