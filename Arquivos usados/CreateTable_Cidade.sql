CREATE TABLE [dbo].[Cidade] (
    [id]      VARCHAR (50)          NOT NULL,
    [nome]    VARCHAR (50) NULL,
    [uf]      VARCHAR (50)          NULL,
    [IBGE]    VARCHAR (50)          NULL,
    [uf_nome] VARCHAR (50)  NULL,
	[estado_id] VARCHAR (50)  NOT NULL,

    PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Cidade_Estado] FOREIGN KEY ([estado_id]) REFERENCES [dbo].[Estado] ([id])
);

