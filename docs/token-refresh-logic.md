# Lógica de Renovação Automática de Access Token

## Visão Geral

O sistema implementa uma lógica automática para renovar o access token quando ele expira, garantindo uma experiência de usuário contínua sem necessidade de fazer login novamente.

## Como Funciona

### 1. Interceptor de Requisição

-   Adiciona automaticamente o access token do localStorage ao header `Authorization` de todas as requisições
-   Formato: `Bearer {accessToken}`

### 2. Interceptor de Resposta

-   Monitora todas as respostas da API
-   Quando detecta erro 401 (Unauthorized), tenta renovar o token automaticamente

### 3. Processo de Renovação

1. **Detecção**: Erro 401 é capturado pelo interceptor
2. **Verificação**: Confirma que não é uma tentativa de renovação anterior (`!_retry`)
3. **Renovação**: Chama o endpoint `/refresh-token` para obter novo access token
4. **Atualização**: Salva o novo token no localStorage
5. **Retry**: Repete a requisição original com o novo token

### 4. Tratamento de Falha

-   Se a renovação falhar, limpa o localStorage
-   Redireciona o usuário para `/sign-in`
-   Rejeita a Promise com o erro original

## Estrutura de Arquivos

### `src/utils/api-util.ts`

-   Configuração dos interceptors do Axios
-   Lógica principal de renovação automática

### `src/services/session-service.ts`

-   Método `generateNewAccessToken()` para renovar o token
-   Usa instância separada do Axios para evitar dependência circular

### `src/interfaces/session-interface.ts`

-   Tipagem TypeScript para as respostas de autenticação

## Fluxo de Execução

```
Requisição → Interceptor Request → API → Interceptor Response
                                                    ↓
                                              Erro 401?
                                                    ↓
                                              Sim → Renovar Token
                                                    ↓
                                              Sucesso → Retry Requisição
                                                    ↓
                                              Falha → Logout + Redirect
```

## Benefícios

-   **Experiência do Usuário**: Não precisa fazer login novamente quando o token expira
-   **Segurança**: Tokens de curta duração com renovação automática
-   **Transparência**: Processo acontece automaticamente sem intervenção do usuário
-   **Robustez**: Tratamento adequado de falhas na renovação

## Considerações

-   O refresh token deve estar válido para que a renovação funcione
-   Se o refresh token também expirar, o usuário será redirecionado para login
-   A lógica evita loops infinitos usando a flag `_retry`
