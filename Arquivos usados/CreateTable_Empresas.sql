CREATE TABLE [dbo].[Empresas] (
    [empresaId]         INT          IDENTITY (1, 1) NOT NULL,
    [nomeEmpresa]       VARCHAR (50) NULL,
    [tipoEmpresa]       INT          NULL,
    [quantidadeEventos] INT          NULL,
    [usuarioID]         INT          NULL,
    [emailEmpresa]      VARCHAR (50) NULL,
    [telefoneEmpresa]   VARCHAR (50) NULL,
    [siteEmpresa]       VARCHAR (50) NULL,
    [entrarContato]     BIT          NULL,
    [observacoes]       VARCHAR (50) NULL,
    CONSTRAINT [PK_Empresas] PRIMARY KEY CLUSTERED ([empresaId] ASC),
    CONSTRAINT [FK_Empresas_Usuarios] FOREIGN KEY ([usuarioID]) REFERENCES [dbo].[Usuarios] ([usuarioid])
);

