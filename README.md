# Aplicativo Clima Tempo (Mock & API)

Este projeto é um aplicativo de previsão do tempo desenvolvido em React Native com Expo. Ele permite consultar dados meteorológicos de cidades, operando tanto com dados reais da OpenWeatherMap API quanto com dados simulados (Mock) para fins de teste e desenvolvimento.

> **Trabalho Final**
> 
> **Disciplina:** Laboratório de Desenvolvimento de Aplicativos Nativos
>
> **Professor:** Fabricio Dias

## 📋 Funcionalidades

O aplicativo possui as seguintes funcionalidades principais, identificadas no serviço de clima:

* **Busca por Cidade:** Permite pesquisar o clima digitando o nome da cidade.
* **Modo Híbrido (Mock/Real):**
    * **Modo Mock:** Gera dados aleatórios (temperatura, clima, vento) para testes sem necessidade de chave de API ou conexão. Tipos de clima simulados incluem "Clear", "Clouds", "Rain" e "Thunderstorm".
    * **Modo API Real:** Conecta-se à API da OpenWeatherMap para buscar dados verídicos.
* **Dados Exibidos:**
    * Temperatura atual.
    * Sensação térmica (*feels like*).
    * Umidade.
    * Velocidade do vento.
    * Descrição do clima (com suporte a localização `pt_br`).
* **Tratamento de Erros:** Gestão de erros para cidades não encontradas (404) ou chaves de API inválidas (401).

## 🚀 Tecnologias Utilizadas

As principais dependências listadas no `package.json` são:

* **Core:** [React Native](https://reactnative.dev/), [Expo](https://expo.dev/), [React](https://react.dev/).
* **UI/UX:**
    * `react-native-paper`: Biblioteca de componentes de UI.
    * `expo-linear-gradient`: Para fundos gradientes (provavelmente usado nos cartões de clima).
    * `expo-blur`: Para efeitos de desfoque.
    * `@expo/vector-icons`: Ícones vetoriais.

## 📦 Instalação e Execução

Pré-requisitos: Node.js e gerenciador de pacotes (npm ou yarn).

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Execute o projeto:**
     Utilize os scripts configurados:
    ```bash
    npx expo start
    ```
    * Para rodar no Android: `npm run android`
    * Para rodar no iOS: `npm run ios`
    * Para rodar na Web: `npm run web`
  
## 🧪 Como Testar

Caso queira testar o aplicativo diretamente, o .apk pode ser baixado no arquivo compactado [Visão do Futuro](https://github.com/DanielMonteiroC/Aplicativo_clima_tempo_mock/blob/bf8d5a2f2ec22c1d8b29e1423ee3df575eb1dd45/Vis%C3%A3o%20do%20Futuro.7z)), disponível neste repositório.

## ⚙️ Configuração da API

O arquivo `WeatherService.js` já possui uma chave de API padrão configurada para testes, mas recomenda-se o uso de uma chave própria ou o uso do modo Mock para evitar limites de requisição.

Para alterar a chave padrão, edite o arquivo `src/services/WeatherService.js`:

```javascript
const WeatherService = {
  apiKey: 'SUA_CHAVE_AQUI', // Substitua pela sua chave da OpenWeatherMap
  // ...
};
