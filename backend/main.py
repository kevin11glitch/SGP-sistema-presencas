from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from passlib.context import CryptContext

app = FastAPI()

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NovoUsuario(BaseModel):
    nome_completo: str
    email: str
    senha: str

@app.post("/api/usuarios/registrar")
def registrar_usuario(usuario: NovoUsuario):
    try:
        conexao = sqlite3.connect('sgp_dados.db')
        cursor = conexao.cursor()
        
        senha_limpa = usuario.senha.strip()[:72]
        senha_criptografada = pwd_context.hash(senha_limpa)
        
        cursor.execute(
            '''INSERT INTO usuarios (nome_completo, email, senha, role) 
               VALUES (?, ?, ?, ?)''',
            (usuario.nome_completo, usuario.email, senha_criptografada, 'comum')
        )
        
        conexao.commit()
        return {"mensagem": "Conta criada com segurança!"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado.")
    finally:
        conexao.close()

# --- ROTA DE LOGIN ---
@app.post("/api/usuarios/login")
def login_usuario(usuario: UsuarioLogin):
    try:
        conexao = sqlite3.connect('sgp_dados.db')
        cursor = conexao.cursor()
        
        cursor.execute("SELECT id, nome_completo, senha, role FROM usuarios WHERE email = ?", (usuario.email,))
        resultado = cursor.fetchone()
        
        # Cortamos a senha aqui também para bater com o que foi registrado
        senha_login_limpa = usuario.senha.strip()[:72]
        
        if resultado and pwd_context.verify(senha_login_limpa, resultado[2]):
            return {
                "mensagem": f"Bem-vindo(a), {resultado[1]}!",
                "usuario_id": resultado[0],
                "nome_completo": resultado[1],
                "role": resultado[3]
            }
        else:
            raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")
    finally:
        conexao.close()