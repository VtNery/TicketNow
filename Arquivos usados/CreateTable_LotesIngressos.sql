CREATE TABLE LotesIngressos (
    ID INT PRIMARY KEY,
    nome VARCHAR(50),
    preco DECIMAL(10, 2),
    eventoID INT,
    ativo BIT DEFAULT 1 -- Adiciona a coluna "ativo" com valor padrão 1
);