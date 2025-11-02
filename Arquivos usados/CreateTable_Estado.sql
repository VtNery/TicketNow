CREATE TABLE [dbo].[Estado] (
    [id]   VARCHAR (50)          NOT NULL,
    [nome] VARCHAR (50) NULL,
    [uf]   VARCHAR (50)          NULL,
    [IBGE] VARCHAR (50)          NULL,
    [pais] VARCHAR (50)          NULL,
    [ddd]  VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

