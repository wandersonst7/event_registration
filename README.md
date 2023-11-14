# Projeto EventRegistration

É um Gerenciador de Eventos desenvolvido utilizando Spring-Boot com Maven para a api, ReactJS & Bootstrap 5 para o front-end.

## Detalhes
| Tecnologia | Versão | 
|---|---|
| Java | 17 | 

## Resumo das Funcionalidaedes
- Login
- Cadastro de Usuário
- CRUD de Eventos

## Banco de Dados
- PostgreSQL
## Documentação da API

#### Cadastra usuário

```http
  POST /users/register
```


#### Valida usuário

```http
  POST /users/login
```


#### Retorna todos os eventos

```http
  GET /events
```

#### Retorna um evento

```http
  GET /events/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do evento que você quer resgatar|


#### Salva um evento

```http
  POST /events
```


#### Atualiza um evento existente

```http
  PUT /events/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do evento que você quer atualizar|
