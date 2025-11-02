CREATE TABLE [dbo].[Compras] (
    [compraID]         INT             NOT NULL,
    [usuarioID]        INT             NULL,
    [eventoID]         INT             NULL,
    [dataCompra]       DATE            NULL,
    [quantidadeCompra] INT             NULL,
    [tipoIngresso]     VARCHAR (1)     NULL,
    [preco]            DECIMAL (10, 2) NULL,
    [statusCompra]     INT             NULL,
    [metodoPagamento]  VARCHAR (50)    NULL,
    [cupomDesconto]    BIT             NULL,
    [codigoTransacao]  VARCHAR (1)     NULL,
    [valorDesconto]    INT             NULL,
    [dataReembolso]    DATE            NULL,
    [valorReembolso]   DECIMAL (10, 2) NULL,
    [statusReembolso]  VARCHAR (1)     NULL,
    [motivoReembolso]  VARCHAR (1)     NULL,
    PRIMARY KEY CLUSTERED ([compraID] ASC),
    CONSTRAINT [FK_Compras_Eventos] FOREIGN KEY ([eventoID]) REFERENCES [dbo].[Eventos] ([eventoID]),
    CONSTRAINT [FK_Compras_Usuarios] FOREIGN KEY ([usuarioID]) REFERENCES [dbo].[Usuarios] ([usuarioID])
);

