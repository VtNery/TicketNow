CREATE TABLE Compras (
    compraID INT PRIMARY KEY,
    usuarioID INT,
    eventoID INT,
    dataCompra DATE,
    quantidadeCompra INT,
    tipoIngresso VARCHAR,
    preco DECIMAL(10,2),
    statusCompra INT,
    metodoPagamento VARCHAR(50),
    cupomDesconto Bit,
    codigoTransacao VARCHAR,
    valorDesconto INT,
    dataReembolso DATE,
    valorReembolso DECIMAL(10,2),
    statusReembolso VARCHAR,
    motivoReembolso VARCHAR,


    
    FOREIGN KEY (usuarioID) REFERENCES Usuarios(usuarioID),
    FOREIGN KEY (eventoID) REFERENCES Eventos(eventoID)
);