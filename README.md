# Fala para Texto - KsProgrammer

## Visão Geral
Fala para Texto é uma aplicação web projetada para converter fala em texto. O projeto utiliza as capacidades de reconhecimento de fala do navegador para oferecer uma interface amigável e intuitiva. Ele suporta diversos idiomas, permitindo que usuários de diferentes origens interajam e se beneficiem de suas funcionalidades. O design moderno e a funcionalidade robusta tornam-no uma ferramenta valiosa para criar anotações, transcrever conversas ou simplesmente explorar a tecnologia de fala para texto.

## Funcionalidades
- **Seleção de Idioma**: Escolha entre uma ampla variedade de idiomas para transcrever a fala no idioma preferido.
- **Reconhecimento de Fala em Tempo Real**: Converte palavras faladas em texto de forma instantânea.
- **Exibição de Resultados**: Mostra o texto transcrito dinamicamente em uma área de resultado editável.
- **Download da Transcrição**: Exporte o texto transcrito como um arquivo de texto simples.
- **Função Limpar**: Resete a área de transcrição com um único clique.
- **Design Moderno**: Interface com botões intuitivos, efeitos de hover e um design visual atraente com glassmorphism.

## Tecnologias Utilizadas
- **HTML5**: Estrutura da página web.
- **CSS3**: Estilização com efeitos visuais modernos, incluindo glassmorphism.
- **JavaScript**: Funcionalidade, incluindo reconhecimento de fala e lógica de interação.
- **Boxicons**: Biblioteca de ícones para gráficos consistentes e escaláveis.

<div>
  <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

## Instalação e Uso
### Requisitos
- Um navegador moderno com suporte para a API Web Speech.

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/username/fala-para-texto.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd fala-para-texto
   ```
3. Abra o arquivo `index.html` no navegador:
   ```bash
   open index.html
   ```
4. Interaja com a aplicação:
   - Selecione um idioma no menu dropdown.
   - Clique em "Comece a gravar" para iniciar a transcrição.
   - Faça o download do resultado ou limpe a área de transcrição conforme necessário.

## Estrutura dos Arquivos
- **index.html**: Estrutura principal do HTML para o aplicativo.
- **style.css**: Folha de estilos que fornece efeitos de glassmorphism e responsividade.
- **languages.js**: Arquivo JavaScript com a lista de idiomas suportados e suas propriedades.
- **script.js**: Gerencia o reconhecimento de fala, seleção de idioma, ações dos botões e download dos resultados.

## Idiomas Suportados
A aplicação suporta mais de 50 idiomas, incluindo, mas não se limitando a:
- Português (Brasil)
- Inglês
- Espanhol
- Francês

Para uma lista completa dos idiomas suportados, consulte o arquivo `languages.js`.

## Como Funciona
1. Ao carregar a aplicação, um menu dropdown com os idiomas disponíveis é exibido.
2. O usuário seleciona um idioma e inicia o reconhecimento de fala clicando no botão de gravação.
3. A fala é convertida em texto em tempo real e exibida na interface.
4. Os usuários podem baixar a transcrição ou limpar o texto para uma nova sessão.

## Melhorias Futuras
- **Design Aprimorado**: Adicionar mais temas visuais ou opções de personalização para os usuários.
- **Integração com a Nuvem**: Permitir o salvamento dos resultados em serviços de armazenamento na nuvem.
- **Otimização para Mobile**: Refinar a usabilidade para usuários de dispositivos móveis.
- **Modo Offline**: Implementar funcionalidades de reconhecimento de fala offline.

## Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para enviar um pull request ou abrir um issue para relatar bugs, sugestões ou novas funcionalidades.

## Licença
Este projeto é licenciado sob a Licença MIT.

## Time e Créditos
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/123672196?v=4" width=115><br><sub>KsProgrammer</sub>](https://github.com/ksprogrammerbr) |  [<img loading="lazy" src="https://avatars.githubusercontent.com/u/123096146?v=4" width=115><br><sub>RsProgrammer</sub>](https://github.com/rsprogrammerbr) |
| :---: | :---: |

