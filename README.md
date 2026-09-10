# Login do Mal: O Simulador da Pior Experiência do Usuário

## Sobre o Projeto

O projeto consiste em um simulador de interface intencionalmente hostil, focado em quebrar convenções consolidadas de Design de Interação, Usabilidade e Acessibilidade Web. A proposta simula um fluxo comum de autenticação (Login), transformando-o em um quebra-cabeça digital irritante, mas que ainda mantém uma condição de vitória viável.

### O Fluxo Desenvolvido
* O usuário tenta preencher o email, recebendo validações enganosas.
* O campo de senha recusa a primeira tentativa com feedback sarcástico e exige regras ocultas.
* É imposta a leitura obrigatória de um termo extenso em *Lorem Ipsum* com velocidade de rolagem severamente reduzida e barra de rolagem oculta.
* É exigida a resolução de um Captcha matemático (equação do segundo grau).
* O botão principal de submissão foge ativamente do cursor do mouse, exigindo o uso da navegação via teclado (`Tab` + `Enter`) ou paciência até que ele se canse após quatro tentativas de esquiva.
* A submissão bem-sucedida exibe uma tela comemorativa com as métricas de persistência do usuário.

---

## Princípios e Heurísticas Violados

| Elemento Caótico | Princípio / Heurística Violada | Descrição Teórica da Falha |
| :--- | :--- | :--- |
| **Botão de avanço fujão** | *Controle e Liberdade do Usuário (Nielsen #3)* | O sistema remove a agência e autonomia do usuário ao impedir a interação física direta com o botão de submissão primário. |
| **Recusa arbitrária da 1ª senha** | *Visibilidade do Status do Sistema (Nielsen #1) e Prevenção de Erros (Nielsen #5)* | O formulário apaga o dado inserido sem justificativa técnica válida ("senha feia"), gerando confusão sobre o real estado do sistema. |
| **Regras contraditórias e invisíveis** | *Ajuda aos Usuários para Reconhecer e Recuperar-se de Erros (Nielsen #9)* | Dizer que a senha requer e proíbe letras maiúsculas simultaneamente impede qualquer correção lógica por parte do usuário. |
| **Cores invertidas nos botões** | *Consistência e Padrões (Nielsen #4)* | Quebra convenções mentais globais ao associar a cor verde chamativa a uma ação destrutiva (*Cancelar*) e um cinza apagado à ação primária (*Avançar*). |
| **Validação dúbia de email** | *Comunicação Eficiente de Erros (Nielsen #9)* | Apresentar mensagem de sucesso verde ("Endereço perfeito") para emails inválidos e logo depois exibir o erro real quebra a confiança do usuário. |
| **Fechar modal descentralizado** | *Mapeamento Natural e Padrões (Nielsen #2 e #4)* | Posicionar o botão `✕` em cantos aleatórios da tela distante da caixa de diálogo quebra o modelo conceitual de fechamento de modais. |
| **Baixo contraste intencional** | *Acessibilidade WCAG 2.1 (Critério 1.4.3 - Contraste Mínimo)* | As regras e observações utilizam tons como `#dedad0` sobre fundo `#fbf7ef`, ficando muito abaixo da razão mínima de contraste recomendada (4.5:1). |
| **Rolagem forçada e lenta dos termos** | *Eficiência de Uso (Nielsen #7) e Operabilidade (WCAG)* | Interceptar e desacelerar a física natural de rolagem com remoção de scrollbar prejudica a eficiência e impõe barreiras a tecnologias assistivas. |
| **Resposta ao "Esqueci minha senha"** | *Ajuda e Documentação (Nielsen #10)* | Responder com sarcasmo e sem link de redefinição impede que o usuário recupere suas credenciais. |

---

## Proposta de Correção / Versão Ideal

* **Posicionamento e Estados dos Botões:** O botão de avanço/login deve permanecer estático, com cor de destaque primária acessível (ex.: azul ou verde escuro com contraste > 4.5:1), rótulo claro ("Entrar") e feedback imediato de carregamento. O botão secundário ("Cancelar") deve adotar padrão *ghost* (apenas contorno) ou link textual discreto.
* **Validação em Tempo Real e Transparente:** As regras de senha precisam ser visíveis antes da digitação (ex.: lista de requisitos com *checkmarks* dinâmicos). O email deve validar o formato RFC padrão sem mensagens falsas de aprovação.
* **Tratamento de Esquecimento de Senha:** O link deve redirecionar para um fluxo seguro de recuperação com envio de token ou link de redefinição para a caixa de entrada do usuário.
* **Acessibilidade e Contraste:** Todos os textos auxiliares e regras devem atender estritamente ao nível AA da WCAG, utilizando tipografia com peso e cor que garantam legibilidade imediata (ex.: cinzas mais escuros como `#4a4453`).
* **Termos de Uso Acessíveis:** Os termos devem ser apresentados em linguagem clara, com rolagem nativa fluida, caixa redimensionável ou resumo executivo dos pontos principais, permitindo aceite imediato.
* **Substituição do Captcha:** Métodos acessíveis invisíveis (como Cloudflare Turnstile ou reCAPTCHA v3) devem ser utilizados para validação de bots sem sobrecarregar o usuário com operações cognitivas ou cálculos manuais.

---

## Como Executar

### Pré-requisitos
* Navegador web moderno (Google Chrome, Firefox, Edge, etc.).

### Rodando Localmente
1. Clone o repositório em sua máquina:
   ```bash
   git clone [https://github.com/pedronosrinsk/PiorSitedoMundo](https://github.com/pedronosrinsk/PiorSitedoMundo.git)
