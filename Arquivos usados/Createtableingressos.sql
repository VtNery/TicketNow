ALTER TABLE Eventos
DROP COLUMN lote1,lote2,lote3,lote4,lote5,lote6,lote7,lote8,lote9,lote10;


select * from TiposIngresso

CREATE INDEX IX_Eventos_Ativo_DataHora ON Eventos (statusevento, data);

CREATE TABLE TiposIngresso (
    id INT IDENTITY(1,1) PRIMARY KEY,
    eventoID INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao NVARCHAR(500),
    CONSTRAINT FK_TiposIngresso_Eventos FOREIGN KEY (eventoID) REFERENCES Eventos(eventoID)
);

CREATE TABLE Lotes (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    eventoID INT NOT NULL,
    tipoIngressoID INT, -- Pode ser NULL se não usar TiposIngresso
    numeroLote INT NOT NULL,
    nomeLote VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidadeTotal INT NOT NULL,
    quantidadeVendida INT NOT NULL DEFAULT 0,
    dataInicioVenda DATETIME2 NOT NULL,
    dataFimVenda DATETIME2 NOT NULL,
    ativo BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_Lotes_Eventos FOREIGN KEY (eventoID) REFERENCES Eventos(eventoID),
    CONSTRAINT FK_Lotes_TiposIngresso FOREIGN KEY (tipoIngressoID) REFERENCES TiposIngresso(id),
    CONSTRAINT CK_Lotes_QuantidadeValida CHECK (quantidadeVendida <= quantidadeTotal), -- Restrição para garantir que vendidos <= total
    CONSTRAINT UQ_Lotes_EventoTipoNumero UNIQUE (eventoID, tipoIngressoID, numeroLote) -- Garante que não há lotes duplicados para o mesmo tipo de ingresso/evento
);
CREATE TABLE Ingressos (
    ID UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY, -- UNIQUEIDENTIFIER para um ID globalmente único (GUID)
    loteID INT NOT NULL,
    usuarioID INT NOT NULL,
    codigoUnico VARCHAR(255) NOT NULL UNIQUE, -- Código único para o ingresso (QR Code, Barcode)
    dataCompra DATETIME2 NOT NULL DEFAULT GETDATE(),
    status VARCHAR(50) NOT NULL DEFAULT 'vendido', -- 'vendido', 'utilizado', 'cancelado'
    CONSTRAINT FK_Ingressos_Lotes FOREIGN KEY (loteID) REFERENCES Lotes(id),
    CONSTRAINT FK_Ingressos_Usuarios FOREIGN KEY (usuarioID) REFERENCES Usuarios(usuarioid)
);

CREATE INDEX IX_Ingressos_LoteId ON Ingressos (loteID);
CREATE INDEX IX_Ingressos_UsuarioId ON Ingressos (usuarioID);
CREATE UNIQUE INDEX UQ_Ingressos_CodigoUnico ON Ingressos (codigoUnico);


-- Índice para busca rápida de usuários por email
CREATE UNIQUE INDEX UQ_Usuarios_Email ON Usuarios (email);
