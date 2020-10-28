# Atividade Web Sockets + EventSource

## Quais as principais diferenças entre esta implementação e a implementação com sockets TCP?

Achei relativamente parecido usar Web Sockets e TCP, mas a interface do Web Sockets foi um pouco mais amigável e me permitiu de maneira mais fácil gerenciar a conexão. É claro que, por estar usando Web Sockets, essa atividade me permitiu rodar a partir de um browser.

## Quais as principais dificuldades com a implementação usando EventSource?

No EventSource tive um pouco de dificuldade em devolver as respostas usando o método de `write`. Às vezes a resposta do servidor não chega até o cliente, de uma maneira que me parece ser meio aleatória, não sei o bem o motivo de estar ocorrendo, mas tenho a impressão que pode ser um problema no browser devido a alguns comentários que vi sobre isso na internet.
