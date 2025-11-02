CREATE TABLE [dbo].[Eventos] (
    [eventoID]            INT           IDENTITY (1, 1) NOT NULL,
    [criadorevento]       INT           NULL,
    [titulo]              VARCHAR (50)  NULL,
    [empresa]             VARCHAR (50)  NULL,
    [eventoTipo]          INT           NULL,
    [link]                VARCHAR (255) NULL,
    [classificacaoetaria] INT           NULL,
    [estado]              VARCHAR (50)  NULL,
    [cidade]              VARCHAR (50)  NULL,
    [data]                DATE  NULL,
    [termosCondicoes]     VARCHAR (MAX) NULL,
    [descricao]           VARCHAR (MAX) NULL,
    [createdAt]           DATE  NULL,
    [updatedAt]           DATE  NULL,
    CONSTRAINT [PK_Eventos] PRIMARY KEY CLUSTERED ([eventoID] ASC),
    CONSTRAINT [FK_Eventos_Usuarios] FOREIGN KEY ([criadorevento]) REFERENCES [dbo].[Usuarios] ([usuarioID])
);