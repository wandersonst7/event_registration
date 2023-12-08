# Projeto EventRegistration

É um Gerenciador de Eventos desenvolvido utilizando Spring-Boot com Maven para a api, ReactJS & Bootstrap 5 para o front-end.

## Detalhes
| Tecnologia | Versão | 
|---|---|
| Java | 17 | 
| Spring-Boot | 3 | 
| Bootstrap | 5 |
| ReactJS | -- |

## Resumo das Funcionalidaedes
- Autenticação de Usuários
- Validação de Token
- CRUD de Eventos

## Banco de Dados
- PostgreSQL
## Documentação da API

#### Registra e Autentica o usuário

```http
  POST /auth/register
```

#### Autentica o usuário

```http
  POST /auth/login
```

#### Valida token

```http
  POST /token/verify
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


#### Atualiza um evento

```http
  PUT /events/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do evento que você quer atualizar|
