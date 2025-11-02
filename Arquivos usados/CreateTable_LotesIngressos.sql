CREATE TABLE [dbo].[LotesIngressos] (
    [lotesIngressosID] INT             IDENTITY (1, 1) NOT NULL,
    [nome]             VARCHAR (50)    NULL,
    [preco]            DECIMAL (10, 2) NULL,
    [eventoID]         INT             NULL,
    [ativo]            BIT             DEFAULT ((1)) NULL,
    [createdAt]        DATETIME        NULL,
    [updatedAt]        DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([lotesIngressosID] ASC),
    CONSTRAINT [FK_LotesIngressos_Eventos] FOREIGN KEY ([eventoID]) REFERENCES [dbo].[Eventos] ([eventoID])
);

