# Babyzar 2.0

Babyzar combina Baby (Bebê) + Bazar e visa simplificar o controle de roupas dos bebês, que facilmente se perdem. Os pais poderão então registrar qual valor de compra e já sugerir um valor de venda, facilitando o uso sustentável de roupas e permitindo a geração de uma renda extra para que os pais possam comprar fraldas.
A nova versão do projeto apresenta uma ferramenta de atualização de preços, bem como uma ferramenta de conversão para moeda estrangeiras, visando atingir os mercados de Argentina, Estados Unidos e Europa.

## Índice

1. [Sobre]
2. [Execução]
3. [Tecnologias usadas]
4. [Autor]

## Sobre
Este projeto é o frontend que permite o usuário inserir novas roupas adquiridas em uma tabela, consultar as roupas existentes, deletar alguma que tenha sendo vendida e atualizar o preço de uma roupa já cadastrada no sistema. Ele permite também calcular o preço de alguma roupa em uma moeda estrangeira, a partir de uma requisição a uma API Externa (Currency Data API).

## Execução

1. Navegue para o diretório referente a pasta babyzar_front
   ```
   $ cd babyzar_front
   ```
2. Certifique-se de ter o [Docker] (https://docs.docker.com/) instalado e em execução na sua máquina.
    Primeiramente, execute o comando para construção da imagem (confirme que está no mesmo diretório da Dockerfile):
    ```
    $ docker build -t nome_da_imagem .  
    ```
    Em seguida, execute a imagem através do comando:
    ```
    $ docker run -d -p 8080:80 nome_da_imagem 
    ```
3. Em um navegador, abra o endereço http://localhost:8080/ para acessar o swagger da aplicação. Certifique-se que o containers do backend e do frontend criados estão sendo executados simultaneamente, podendo verificar por meio do Docker Desktop.

## Tecnologias usadas
HTML
CSS
JS
Docker

## Autor
Ysrael Oliveira
