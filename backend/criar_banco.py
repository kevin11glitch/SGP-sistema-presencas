import sqlite3

def inicializar_banco():
    conexao = sqlite3.connect('sgp_dados.db')
    cursor = conexao.cursor()

    print("Criando tabela: usuarios...")
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_completo TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        role TEXT NOT NULL
    )
    ''')

    print("Criando tabela: turmas...")
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS turmas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_disciplina TEXT NOT NULL,
        ano_turma TEXT NOT NULL
    )
    ''')

    print("Criando tabela: presencas...")
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS presencas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        turma_id INTEGER NOT NULL,
        data_aula DATE NOT NULL,
        data_registro DATETIME NOT NULL,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(turma_id) REFERENCES turmas(id)
    )
    ''')

    conexao.commit()
    conexao.close()
    print("Banco de dados criado com sucesso! As tabelas estão prontas.")

if __name__ == '__main__':
    inicializar_banco()