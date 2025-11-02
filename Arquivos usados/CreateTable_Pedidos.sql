CREATE TABLE [dbo].[Pedidos] (
    [pedidoID]        INT           IDENTITY (1, 1) NOT NULL,
    [usuarioID]       INT           NULL,
    [pagamentoID]     INT           NULL,
    [statusPedido]    INT           NULL,
    [valor]           MONEY         NULL,
    [taxa]            MONEY         NULL,
    [metodoPagamento] INT           NULL,
    [bandeira]        NVARCHAR (50) NULL,
    [parcelas]        INT           NULL,
    [createdAt]       DATE          NULL,
    [updatedAt]       DATE          NULL,
    CONSTRAINT [PK_Pedidos] PRIMARY KEY CLUSTERED ([pedidoID] ASC),
    CONSTRAINT [FK_Pedidos_Usuarios] FOREIGN KEY ([usuarioID]) REFERENCES [dbo].[Usuarios] ([usuarioID])
);

