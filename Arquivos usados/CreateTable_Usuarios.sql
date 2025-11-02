CREATE TABLE [dbo].[Usuarios] (
    [usuarioID]      INT           IDENTITY (1, 1) NOT NULL,
    [nome]           VARCHAR (50)  NULL,
    [CPF]            VARCHAR (50)  NULL,
    [email]          VARCHAR (50)  NULL,
    [senha]          VARCHAR (255) NULL,
    [dataNascimento] DATE          NULL,
    [administrador]  INT           NULL,
    [createdAt]      DATE          NULL,
    [updatedAt]      DATE          NULL,
    PRIMARY KEY CLUSTERED ([usuarioID] ASC)
);

