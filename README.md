# Register Contacts API

Este projeto tem como objetivo fazer um CRUD de contatos para cada usuário cadastrado

## Tecnologias utilizadas: 

+ Node.js
+ Express.js
+ Typescript
+ PostgreSQL
+ TypeORM
+ bcryptjs
+ jsonwebtoken
+ Jest 
+ Docker

## Funções da aplicação Back-end: 

Por enquanto nesta aplicação Back end você pode: 

<br>

+ Fazer um CRUD de usuário (com autenticação e autorização, soft delete e read by ID)
+ Fazer login com usuário
+ Fazer um CRUD de contatos com relacionamento N:1 com usuário logado

<br>

## Passos para instalação: 


No terminal dentro do projeto clonado siga os seguintes passos: 

<br>
<ol>
<li> Configurar variáveis de ambiente:

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

Na variável **DATABASE_URL** e nas demais mude os nomes em caixa alta para as informações que elas referenciam. 
<br>
**Não** mude as variáveis em caixa baixa.

## Observação: ##  
A porta do servidor deve ser diferente do padrão 3000, pois nesta estará rodando a aplicação front end

</li>
<br>


<li> Instale as dependências: 

<br>  
<br>
  
~~~javascript 

yarn install

~~~

</li>
<br>

<li>
  Rodar projeto por containers Docker: 
  
<br>

Caso o Docker esteja configurado na sua máquina rode o seguinte comando: 
  

~~~javascript

docker compose up 

~~~

<br>
</li>
  
  <ol>
    Caso o Docker não esteja configurado ou o container não rode perfeitamente, siga os seguintes passos:
    
<br>
<br>
    
<li> Mude a variável de ambiente **DATABASE_URL** :
  
<br>

Dentro da variável DATABASE_URL mude a parte **@database** para **@localhost**

  
~~~javascript

DATABASE_URL=postgres://USUARIO_DO_POSTGRES:SENHA_DO_SEU_DATABASE@localhost:PORTA_POSTGRES/NOME_DO_DATABASE

~~~

</li>
    
    
<li> Rode as migrations:

<br>
<br>

~~~javascript 

yarn orm:run

~~~
</li>
    
<li> Inicie o servidor: 

<br>
<br>

~~~javascript 

yarn dev 

~~~
</li>
    
<br>
Se tudo estiver sido feito corretamente o servidor estará rodando. 
</ol>
<br>
<br>
</ol>
  
## Rodar os testes: 

Para rodar os testes utilize o seguinte comando: 

~~~javascript

yarn test 

~~~
<br>

## Utilizar a aplicação Front end: 

<br>
Depois que o servidor estiver rodando, inicie o front end seguindo os passos deste repositório: 
https://github.com/axdborges/Register-contacts-webApp

<br>








